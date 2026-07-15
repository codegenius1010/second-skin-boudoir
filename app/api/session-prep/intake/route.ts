import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SessionIntakeSchema } from '@/lib/session-prep-schemas'
import {
  buildWebhookPayload,
  sendWebhookToGHL,
  hashPayload,
  isRetryableHttpStatus,
  calculateNextRetryTime,
  createSafeErrorMessage,
} from '@/lib/webhook-delivery'
import { createSessionPreferencesSummary, hashIpAddress, extractUserAgentSummary, generateIdempotencyKey } from '@/lib/session-prep-utils'
import { ZodError } from 'zod'

/**
 * POST /api/session-prep/intake
 * Submit a completed session prep questionnaire
 * 
 * Database-first architecture:
 * 1. Validate request
 * 2. Save intake + webhook delivery in transaction
 * 3. Return success immediately
 * 4. Attempt webhook delivery asynchronously
 * 5. Update delivery status based on webhook response
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request
    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    // Validate required fields
    const sessionId = body.sessionId as string
    const intakeData = body.intake as Record<string, unknown>

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      )
    }

    // Validate intake data schema
    let validatedIntake: Record<string, unknown>
    try {
      validatedIntake = SessionIntakeSchema.parse(intakeData)
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.issues.map(e => `${e.path.join('.')}: ${e.message}`)
        const errorDetails = {
          timestamp: new Date().toISOString(),
          sessionId,
          receivedFields: Object.keys(intakeData || {}),
          validationErrors: fieldErrors,
          intakeData: JSON.stringify(intakeData, null, 2),
        }
        console.error('[SessionPrep Validation Error]', errorDetails)
        
        // Return detailed error for debugging
        return NextResponse.json(
          {
            error: 'Validation failed - See details below',
            validationErrors: fieldErrors,
            receivedFieldCount: Object.keys(intakeData || {}).length,
            timestamp: errorDetails.timestamp,
            debugMessage: `${fieldErrors.length} validation error(s) found. First issue: ${fieldErrors[0] || 'Unknown'}`
          },
          { status: 400 }
        )
      }
      throw error
    }

    // Required acknowledgments must be true
    if (!validatedIntake.ongoingConsentAcknowledged || !validatedIntake.accurateInformationAcknowledged || !validatedIntake.imageUseElection) {
      return NextResponse.json(
        { error: 'You must acknowledge all statements and select image preferences before submitting' },
        { status: 400 }
      )
    }

    // Get IP and user agent for security logging (hashed)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const ipHash = ip !== 'unknown' ? hashIpAddress(ip) : undefined
    const uaSummary = extractUserAgentSummary(userAgent)

    // DATABASE TRANSACTION: Save intake and create webhook delivery
    const result = await prisma.$transaction(async (tx: any) => {
      // Verify session exists and belongs to valid client
      const session = await tx.photographySession.findUnique({
        where: { id: sessionId },
        include: { client: true },
      })

      if (!session) {
        throw new Error('Session not found')
      }

      // Check if intake already submitted (idempotency)
      const existingIntake = await tx.sessionIntake.findFirst({
        where: {
          sessionId,
          status: 'submitted',
        },
      })

      if (existingIntake) {
        return { intake: existingIntake, isNewSubmission: false }
      }

      // Create new session intake
      const intake = await tx.sessionIntake.create({
        data: {
          sessionId,
          status: 'submitted',
          submittedAt: new Date(),
          schemaVersion: '1.0',
          clientFirstName: (validatedIntake.clientFirstName as string) || null,
          clientLastName: (validatedIntake.clientLastName as string) || null,
          clientEmail: (validatedIntake.clientEmail as string) || null,
          clientPhone: (validatedIntake.clientPhone as string) || null,
          desiredFeelings: (validatedIntake.desiredFeelings as string[])?.length > 0 ? JSON.stringify(validatedIntake.desiredFeelings) : '[]',
          visualStyles: (validatedIntake.visualStyles as string[])?.length > 0 ? JSON.stringify(validatedIntake.visualStyles) : '[]',
          posingStyles: (validatedIntake.posingStyles as string[])?.length > 0 ? JSON.stringify(validatedIntake.posingStyles) : '[]',
          posingIntensity: (validatedIntake.posingIntensity as string) || null,
          coveragePreferences: (validatedIntake.coveragePreferences as string[])?.length > 0 ? JSON.stringify(validatedIntake.coveragePreferences) : '[]',
          coverageDecision: (validatedIntake.coverageDecision as string) || null,
          hardCoverageBoundaries: (validatedIntake.hardCoverageBoundaries as string) || null,
          poseBoundaries: (validatedIntake.poseBoundaries as string) || null,
          cameraAngleBoundaries: (validatedIntake.cameraAngleBoundaries as string) || null,
          wardrobeAdjustmentBoundaries: (validatedIntake.wardrobeAdjustmentBoundaries as string) || null,
          areasToEmphasize: (validatedIntake.areasToEmphasize as string) || null,
          areasToPhotographDiscreetly: (validatedIntake.areasToPhotographDiscreetly as string) || null,
          favoriteSong: (validatedIntake.favoriteSong as string) || null,
          favoriteArtists: (validatedIntake.favoriteArtists as string) || null,
          musicGenres: (validatedIntake.musicGenres as string[])?.length > 0 ? JSON.stringify(validatedIntake.musicGenres) : '[]',
          playlistUrl: (validatedIntake.playlistUrl as string) || null,
          explicitLyricsAllowed: (validatedIntake.explicitLyricsAllowed as string) || null,
          musicToAvoid: (validatedIntake.musicToAvoid as string) || null,
          wardrobePlans: (validatedIntake.wardrobePlans as string[])?.length > 0 ? JSON.stringify(validatedIntake.wardrobePlans) : '[]',
          wardrobeGuidanceRequested: Boolean(validatedIntake.wardrobeGuidanceRequested),
          clothingSizes: (validatedIntake.clothingSizes as string) || null,
          favoriteColorsStyles: (validatedIntake.favoriteColorsStyles as string) || null,
          dislikedColorsStyles: (validatedIntake.dislikedColorsStyles as string) || null,
          mobilityPositioningNotes: (validatedIntake.mobilityPositioningNotes as string) || null,
          supportPersonAttending: Boolean(validatedIntake.supportPersonAttending),
          supportPersonName: (validatedIntake.supportPersonName as string) || null,
          instagramHandle: (validatedIntake.instagramHandle as string) || null,
          instagramTagPermission: (validatedIntake.instagramTagPermission as string) || null,
          collaboratorCreditPermission: (validatedIntake.collaboratorCreditPermission as string) || null,
          additionalPrivateNotes: (validatedIntake.additionalPrivateNotes as string) || null,
          ongoingConsentAcknowledged: Boolean(validatedIntake.ongoingConsentAcknowledged),
          accurateInformationAcknowledged: Boolean(validatedIntake.accurateInformationAcknowledged),
          submittedIpHash: ipHash,
          userAgentSummary: uaSummary,
        },
      })

      // Create preferences summary for webhook and admin display
      const summary = createSessionPreferencesSummary(intake)

      // Update session agreement status to completed
      await tx.photographySession.update({
        where: { id: sessionId },
        data: { 
          agreementStatus: 'completed',
          agreementCompletedAt: new Date(),
        },
      })

      // Create webhook delivery record
      const idempotencyKey = generateIdempotencyKey()
      const payload = buildWebhookPayload(session.client, session, intake, summary)
      const payloadHash = hashPayload(payload)

      const webhookDelivery = await tx.webhookDelivery.create({
        data: {
          intakeId: intake.id,
          sessionId: session.id,
          idempotencyKey,
          payloadHash,
          status: 'pending',
          attemptCount: 0,
        },
      })

      return { intake, webhookDelivery, session, summary, payload, isNewSubmission: true }
    })

    const { intake, webhookDelivery, session, summary, payload, isNewSubmission } = result

    // ATTEMPT WEBHOOK DELIVERY (non-blocking)
    // Even if this fails, the intake is safely stored
    if (isNewSubmission && payload) {
      // Fire and forget: attempt delivery without blocking response
      attemptWebhookDelivery(webhookDelivery.id, payload as Record<string, unknown>).catch(error => {
        console.error('[Webhook] Failed to attempt delivery:', createSafeErrorMessage(error.message))
      })
    }

    // Return success to client
    // Note: We tell the client success even if GHL delivery is pending
    // The database is the system of record
    return NextResponse.json(
      {
        success: true,
        message: 'Your session questionnaire has been securely received',
        intakeId: intake.id,
        sessionId: session.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[SessionPrep] Intake submission error:', error instanceof Error ? error.message : String(error))

    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Failed to process session questionnaire. Please try again or contact support.' },
      { status: 500 }
    )
  }
}

/**
 * Attempt to send webhook to GHL
 * Called asynchronously after database transaction commits
 */
async function attemptWebhookDelivery(
  deliveryId: string,
  payload: Record<string, unknown>
): Promise<void> {
  try {
    const maxRetries = parseInt(process.env.SESSION_PREP_MAX_RETRIES || '5')

    // Send webhook
    const result = await sendWebhookToGHL(payload)

    // Update delivery status
    await prisma.webhookDelivery.update({
      where: { id: deliveryId },
      data: {
        attemptCount: {
          increment: 1,
        },
        lastAttemptAt: new Date(),
        lastHttpStatus: result.httpStatus,
        lastErrorSafeMessage: result.error || null,
        externalRequestId: result.externalRequestId || null,
        // Determine status and next attempt based on result
        ...(result.success
          ? {
              status: 'completed',
              deliveredAt: new Date(),
            }
          : result.httpStatus && isRetryableHttpStatus(result.httpStatus)
            ? {
                status: 'pending',
                nextAttemptAt: calculateNextRetryTime(0, parseInt(process.env.SESSION_PREP_RETRY_BASE_SECONDS || '60')),
              }
            : {
                status: 'requires_review', // Permanent failure
              }),
      },
    })

    if (result.success) {
      console.log(`[Webhook] Delivery successful for intake submission`)
    } else if (result.httpStatus && isRetryableHttpStatus(result.httpStatus)) {
      console.warn(`[Webhook] Temporary error ${result.httpStatus}, scheduled retry`)
    } else {
      console.error(`[Webhook] Permanent error: ${createSafeErrorMessage(result.error || 'Unknown')}`)
    }
  } catch (error) {
    console.error('[Webhook] Error during delivery attempt:', error instanceof Error ? error.message : String(error))
  }
}
