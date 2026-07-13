import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWebhookToGHL, calculateNextRetryTime, isRetryableHttpStatus, createSafeErrorMessage } from '@/lib/webhook-delivery'
import { createSessionPreferencesSummary } from '@/lib/session-prep-utils'

/**
 * POST /api/admin/session-prep/retry
 * Manually retry a failed webhook delivery
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { deliveryId } = body

    if (!deliveryId) {
      return NextResponse.json(
        { error: 'Missing deliveryId' },
        { status: 400 }
      )
    }

    // Get webhook delivery record
    const delivery = await prisma.webhookDelivery.findUnique({
      where: { id: deliveryId },
      include: {
        intake: {
          include: {
            session: {
              include: { client: true },
            },
          },
        },
      },
    })

    if (!delivery) {
      return NextResponse.json(
        { error: 'Delivery not found' },
        { status: 404 }
      )
    }

    // Rebuild payload
    const { intake } = delivery
    const session = intake.session
    const summary = createSessionPreferencesSummary(intake)

    const payload = {
      event: 'session_prep_submitted',
      schemaVersion: process.env.SESSION_PREP_WEBHOOK_SCHEMA_VERSION || '1.0',
      eventId: `admin-retry-${deliveryId}`,
      occurredAt: new Date().toISOString(),
      source: 'secondskinboudoir.com',
      client: {
        localId: session.client.id,
        firstName: session.client.firstName,
        lastName: session.client.lastName,
        email: session.client.emailNormalized,
        phone: session.client.phoneNormalized || undefined,
        instagramHandle: session.client.instagramHandle || undefined,
      },
      session: {
        localId: session.id,
        sessionType: session.sessionType,
        sessionDate: session.sessionDate?.toISOString().split('T')[0] || undefined,
        sessionLocation: session.sessionLocation || undefined,
      },
      intake: {
        localId: intake.id,
        submittedAt: intake.submittedAt?.toISOString(),
        desiredFeelings: intake.desiredFeelings.length > 0 ? intake.desiredFeelings : undefined,
        visualStyles: intake.visualStyles.length > 0 ? intake.visualStyles : undefined,
        posingStyles: intake.posingStyles.length > 0 ? intake.posingStyles : undefined,
        posingIntensity: intake.posingIntensity || undefined,
        sessionPreferencesSummary: summary,
      },
      completion: {
        questionnaireComplete: true,
        ongoingConsentAcknowledged: intake.ongoingConsentAcknowledged,
        accurateInformationAcknowledged: intake.accurateInformationAcknowledged,
      },
    }

    // Attempt delivery
    const result = await sendWebhookToGHL(payload)

    // Update delivery status
    const maxRetries = parseInt(process.env.SESSION_PREP_MAX_RETRIES || '5')
    const updateData: Record<string, unknown> = {
      attemptCount: {
        increment: 1,
      },
      lastAttemptAt: new Date(),
      lastHttpStatus: result.httpStatus,
      lastErrorSafeMessage: result.error || null,
      externalRequestId: result.externalRequestId || null,
    }

    if (result.success) {
      updateData.status = 'completed'
      updateData.deliveredAt = new Date()
    } else if (result.httpStatus && isRetryableHttpStatus(result.httpStatus)) {
      updateData.status = 'pending'
      updateData.nextAttemptAt = calculateNextRetryTime(
        delivery.attemptCount,
        parseInt(process.env.SESSION_PREP_RETRY_BASE_SECONDS || '60')
      )
    } else {
      updateData.status = 'requires_review'
    }

    const updated = await prisma.webhookDelivery.update({
      where: { id: deliveryId },
      data: updateData as any,
    })

    return NextResponse.json(
      {
        success: true,
        message: result.success ? 'Webhook delivered successfully' : 'Webhook delivery attempted',
        delivery: {
          id: updated.id,
          status: updated.status,
          attemptCount: updated.attemptCount,
          lastAttemptAt: updated.lastAttemptAt?.toISOString(),
          httpStatus: result.httpStatus,
          error: result.error,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Admin] Retry error:', error)
    return NextResponse.json(
      { error: 'Failed to retry webhook' },
      { status: 500 }
    )
  }
}
