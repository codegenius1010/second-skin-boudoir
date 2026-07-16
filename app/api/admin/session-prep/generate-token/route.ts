import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSecureToken, hashToken, normalizeEmail, normalizePhone } from '@/lib/session-prep-utils'

/**
 * GET /api/admin/session-prep/generate-token?sessionId=...
 * Retrieve the session prep link for an existing session
 */
export async function GET(request: NextRequest) {
  try {
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      )
    }

    const session = await prisma.photographySession.findUnique({
      where: { id: sessionId },
      select: { id: true, client: { select: { firstName: true, lastName: true } } },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Reconstruct the token (sessionId)
    const prepLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://secondskinboudoir.com'}/session-prep/${sessionId}`

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        clientName: `${session.client.firstName} ${session.client.lastName}`,
        prepLink,
      },
    })
  } catch (error) {
    console.error('Error fetching session prep link:', error)
    return NextResponse.json(
      { error: 'Failed to fetch session prep link' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/session-prep/generate-token
 * Generate a new session prep link for a client
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, email, phone, sessionType = 'Boudoir', sessionDate, sessionLocation = 'Destin Studio' } = body

    // Validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email' },
        { status: 400 }
      )
    }

    const normalizedEmail = normalizeEmail(email)

    // Find or create client
    let client = await prisma.client.findUnique({
      where: { emailNormalized: normalizedEmail },
    })

    if (!client) {
      client = await prisma.client.create({
        data: {
          firstName,
          lastName,
          emailNormalized: normalizedEmail,
          phoneNormalized: phone ? normalizePhone(phone) : undefined,
        },
      })
    }

    // Generate secure token
    const plainToken = generateSecureToken()
    const tokenHash = hashToken(plainToken)

    // Set expiration (30 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    // Parse sessionDate as local date (not UTC)
    let parsedSessionDate: Date | undefined
    if (sessionDate) {
      const [year, month, day] = sessionDate.split('-').map(Number)
      // Use UTC midnight so the date is timezone-independent
      parsedSessionDate = new Date(Date.UTC(year, month - 1, day))
    }

    // Create photography session
    const session = await prisma.photographySession.create({
      data: {
        clientId: client.id,
        sessionType,
        sessionDate: parsedSessionDate,
        sessionLocation,
        agreementStatus: 'pending',
        securePrepTokenHash: tokenHash,
        securePrepTokenExpiresAt: expiresAt,
      },
    })

    // Generate link
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const link = `${baseUrl}/session-prep/${plainToken}`

    return NextResponse.json(
      {
        success: true,
        data: {
          client: {
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.emailNormalized,
          },
          session: {
            id: session.id,
            sessionType: session.sessionType,
            sessionDate: session.sessionDate?.toISOString().split('T')[0],
            sessionLocation: session.sessionLocation,
          },
          token: {
            link,
            expiresAt: expiresAt.toISOString().split('T')[0],
            expiresIn: '30 days',
          },
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Admin] Generate token error:', error)
    
    // Provide more specific error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error details:', errorMessage)
    
    return NextResponse.json(
      { error: 'Failed to generate session prep link', details: process.env.NODE_ENV === 'development' ? errorMessage : undefined },
      { status: 500 }
    )
  }
}
