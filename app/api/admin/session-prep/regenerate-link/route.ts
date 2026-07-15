import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSecureToken, hashToken } from '@/lib/session-prep-utils'

/**
 * POST /api/admin/session-prep/regenerate-link
 * Generate a new session prep link for an existing session
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { sessionId } = body

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

    // Generate new secure token
    const plainToken = generateSecureToken()
    const tokenHash = hashToken(plainToken)

    // Update session with new token
    const updatedSession = await prisma.photographySession.update({
      where: { id: sessionId },
      data: {
        securePrepTokenHash: tokenHash,
        securePrepTokenExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    })

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const prepLink = `${baseUrl}/session-prep/${plainToken}`

    return NextResponse.json(
      {
        success: true,
        message: 'New session prep link generated successfully',
        data: {
          sessionId: updatedSession.id,
          clientName: `${session.client.firstName} ${session.client.lastName}`,
          prepLink,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Session Prep API] Regenerate link error:', error)
    return NextResponse.json(
      { error: 'Failed to regenerate session link' },
      { status: 500 }
    )
  }
}
