import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * PATCH /api/admin/session-prep/update-session
 * Update session details (only in draft mode)
 */
export async function PATCH(request: NextRequest) {
  try {
    // Check admin authorization
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { sessionId, sessionType, sessionDate, sessionLocation } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      )
    }

    // Fetch session to check status
    const session = await prisma.photographySession.findUnique({
      where: { id: sessionId },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Only allow editing if session is in draft mode (agreementStatus is 'pending')
    if (session.agreementStatus !== 'pending') {
      return NextResponse.json(
        { error: 'Can only edit sessions in draft mode (pending status)' },
        { status: 400 }
      )
    }

    // Parse sessionDate if provided - use UTC midnight to ensure consistent date storage
    let parsedSessionDate: Date | undefined
    if (sessionDate) {
      const [year, month, day] = sessionDate.split('-').map(Number)
      // Use UTC midnight so the date is timezone-independent
      parsedSessionDate = new Date(Date.UTC(year, month - 1, day))
    }

    // Update session with provided fields
    const updatedSession = await prisma.photographySession.update({
      where: { id: sessionId },
      data: {
        ...(sessionType && { sessionType }),
        ...(sessionDate && { sessionDate: parsedSessionDate }),
        ...(sessionLocation && { sessionLocation }),
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Session details updated',
        data: {
          id: updatedSession.id,
          sessionType: updatedSession.sessionType,
          sessionDate: updatedSession.sessionDate,
          sessionLocation: updatedSession.sessionLocation,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Session Prep API] Update session error:', error)
    return NextResponse.json(
      { error: 'Failed to update session details' },
      { status: 500 }
    )
  }
}
