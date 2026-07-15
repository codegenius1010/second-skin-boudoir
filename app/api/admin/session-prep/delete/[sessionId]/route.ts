import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * DELETE /api/admin/session-prep/delete/[sessionId]
 * Delete a session and all its related data (intakes, webhooks)
 */
export async function DELETE(
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

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
    }

    // Verify session exists
    const session = await prisma.photographySession.findUnique({
      where: { id: sessionId },
      include: { client: true },
    })

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Delete session (cascades will delete intakes and webhook deliveries)
    await prisma.photographySession.delete({
      where: { id: sessionId },
    })

    return NextResponse.json(
      {
        success: true,
        message: `Session deleted successfully for ${session.client.firstName} ${session.client.lastName}`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Session Prep API] Delete session error:', error)
    return NextResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 }
    )
  }
}
