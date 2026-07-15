import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/admin/session-prep/detail/[sessionId]
 * Fetch full details of a session intake
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    // Check admin authorization
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sessionId } = await params

    // Fetch full session with all related data
    const session = await prisma.photographySession.findUnique({
      where: { id: sessionId },
      include: {
        client: true,
        intakes: {
          orderBy: { submittedAt: 'desc' },
        },
        webhookDeliveries: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          session: {
            id: session.id,
            sessionType: session.sessionType,
            sessionDate: session.sessionDate?.toISOString(),
            sessionLocation: session.sessionLocation,
            agreementStatus: session.agreementStatus,
            createdAt: session.createdAt.toISOString(),
            updatedAt: session.updatedAt.toISOString(),
          },
          client: {
            id: session.client.id,
            firstName: session.client.firstName,
            lastName: session.client.lastName,
            emailNormalized: session.client.emailNormalized,
            phoneNormalized: session.client.phoneNormalized,
            instagramHandle: session.client.instagramHandle,
            ghlContactId: session.client.ghlContactId,
            createdAt: session.client.createdAt.toISOString(),
          },
          intakes: session.intakes.map((intake) => {
          // Helper function to parse JSON strings
          const parseJsonField = (field: string | null): string[] => {
            if (!field) return []
            try {
              const parsed = JSON.parse(field)
              return Array.isArray(parsed) ? parsed : []
            } catch {
              return []
            }
          }

          return {
            id: intake.id,
            status: intake.status,
            submittedAt: intake.submittedAt?.toISOString(),
            schemaVersion: intake.schemaVersion,
            clientFirstName: intake.clientFirstName,
            clientLastName: intake.clientLastName,
            clientEmail: intake.clientEmail,
            clientPhone: intake.clientPhone,
            additionalImageComments: intake.additionalImageComments,
            desiredFeelings: parseJsonField(intake.desiredFeelings),
            visualStyles: parseJsonField(intake.visualStyles),
            posingStyles: parseJsonField(intake.posingStyles),
            posingIntensity: intake.posingIntensity,
            coveragePreferences: parseJsonField(intake.coveragePreferences),
            coverageDecision: intake.coverageDecision,
            hardCoverageBoundaries: intake.hardCoverageBoundaries,
            poseBoundaries: intake.poseBoundaries,
            cameraAngleBoundaries: intake.cameraAngleBoundaries,
            wardrobeAdjustmentBoundaries: intake.wardrobeAdjustmentBoundaries,
            areasToEmphasize: intake.areasToEmphasize,
            areasToPhotographDiscreetly: intake.areasToPhotographDiscreetly,
            favoriteSong: intake.favoriteSong,
            favoriteArtists: intake.favoriteArtists,
            musicGenres: parseJsonField(intake.musicGenres),
            playlistUrl: intake.playlistUrl,
            explicitLyricsAllowed: intake.explicitLyricsAllowed,
            musicToAvoid: intake.musicToAvoid,
            wardrobePlans: parseJsonField(intake.wardrobePlans),
            wardrobeGuidanceRequested: intake.wardrobeGuidanceRequested,
            clothingSizes: intake.clothingSizes,
            favoriteColorsStyles: intake.favoriteColorsStyles,
            dislikedColorsStyles: intake.dislikedColorsStyles,
            mobilityPositioningNotes: intake.mobilityPositioningNotes,
            supportPersonAttending: intake.supportPersonAttending,
            supportPersonName: intake.supportPersonName,
            instagramHandle: intake.instagramHandle,
            instagramTagPermission: intake.instagramTagPermission,
            collaboratorCreditPermission: intake.collaboratorCreditPermission,
            additionalPrivateNotes: intake.additionalPrivateNotes,
            ongoingConsentAcknowledged: intake.ongoingConsentAcknowledged,
            accurateInformationAcknowledged: intake.accurateInformationAcknowledged,
          }
        }),
          webhookDeliveries: session.webhookDeliveries.map((delivery) => ({
            id: delivery.id,
            status: delivery.status,
            attemptCount: delivery.attemptCount,
            nextAttemptAt: delivery.nextAttemptAt?.toISOString(),
            lastAttemptAt: delivery.lastAttemptAt?.toISOString(),
            deliveredAt: delivery.deliveredAt?.toISOString(),
            lastHttpStatus: delivery.lastHttpStatus,
            lastErrorSafeMessage: delivery.lastErrorSafeMessage,
            externalRequestId: delivery.externalRequestId,
          })),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Admin] Detail fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch session details' },
      { status: 500 }
    )
  }
}
