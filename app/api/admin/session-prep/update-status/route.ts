import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * PATCH /api/admin/session-prep/update-status
 * Update review status of a session
 */
export async function PATCH(request: NextRequest) {
  try {
    // Check admin authorization
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { sessionId, reviewStatus } = body

    if (!sessionId || !reviewStatus) {
      return NextResponse.json(
        { error: 'Missing sessionId or reviewStatus' },
        { status: 400 }
      )
    }

    // Validate review status
    if (!['needs_review', 'reviewed'].includes(reviewStatus)) {
      return NextResponse.json(
        { error: 'Invalid reviewStatus. Must be "needs_review" or "reviewed"' },
        { status: 400 }
      )
    }

    // Update session
    const session = await prisma.photographySession.update({
      where: { id: sessionId },
      data: { reviewStatus },
    })

    return NextResponse.json(
      {
        success: true,
        message: `Session review status updated to ${reviewStatus}`,
        data: { id: session.id, reviewStatus: session.reviewStatus },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Session Prep API] Update status error:', error)
    return NextResponse.json(
      { error: 'Failed to update session status' },
      { status: 500 }
    )
  }
}
