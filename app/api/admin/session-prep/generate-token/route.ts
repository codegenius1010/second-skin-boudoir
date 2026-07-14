import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSecureToken, hashToken, normalizeEmail, normalizePhone } from '@/lib/session-prep-utils'

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

    // Create photography session
    const session = await prisma.photographySession.create({
      data: {
        clientId: client.id,
        sessionType,
        sessionDate: sessionDate ? new Date(sessionDate) : undefined,
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
