import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashToken, verifyToken } from '@/lib/session-prep-utils'

/**
 * GET /api/session-prep/status?sessionId=X&token=Y
 * Check the status of a session prep intake
 * Returns agreement status and intake status
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const token = searchParams.get('token')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      )
    }

    // Get session
    const session = await prisma.photographySession.findUnique({
      where: { id: sessionId },
      include: {
        intakes: {
          where: { status: 'submitted' },
          orderBy: { submittedAt: 'desc' },
          take: 1,
        },
      },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Verify token if provided
    if (token && session.securePrepTokenHash) {
      try {
        if (!verifyToken(token, session.securePrepTokenHash)) {
          return NextResponse.json(
            { error: 'Invalid or expired prep link' },
            { status: 403 }
          )
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Invalid or expired prep link' },
          { status: 403 }
        )
      }

      // Check token expiration
      if (session.securePrepTokenExpiresAt && session.securePrepTokenExpiresAt < new Date()) {
        return NextResponse.json(
          { error: 'Session prep link has expired' },
          { status: 403 }
        )
      }
    }

    // Build status response
    return NextResponse.json(
      {
        success: true,
        session: {
          id: session.id,
          sessionType: session.sessionType,
          sessionDate: session.sessionDate?.toISOString(),
          sessionLocation: session.sessionLocation,
        },
        agreement: {
          status: session.agreementStatus,
          completedAt: session.agreementCompletedAt?.toISOString(),
          templateType: session.agreementTemplateType,
        },
        intake: {
          submitted: session.intakes.length > 0,
          submittedAt: session.intakes[0]?.submittedAt?.toISOString(),
          version: session.intakes[0]?.schemaVersion,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[SessionPrep] Status check error:', error instanceof Error ? error.message : String(error))

    return NextResponse.json(
      { error: 'Failed to check session status' },
      { status: 500 }
    )
  }
}
