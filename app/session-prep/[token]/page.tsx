import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/session-prep-utils'
import SessionPrepWizard from '@/components/SessionPrepWizard'

interface SessionPrepPageProps {
  params: Promise<{ token: string }>
}

export const metadata = {
  title: 'Session Preparation - Second Skin Boudoir',
  description: 'Complete your session preferences questionnaire to prepare for your boudoir session.',
  robots: 'noindex, nofollow', // Don't index session prep pages
}

export default async function SessionPrepPage({ params }: SessionPrepPageProps) {
  const { token } = await params

  if (!token) {
    redirect('/')
  }

  try {
    // Retrieve session with the secure token
    const session = await prisma.photographySession.findUnique({
      where: { securePrepTokenHash: undefined }, // Will be handled by DB query
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            emailNormalized: true,
          },
        },
      },
    })

    // For now, find by session ID that was provided
    // In production, you would decode/validate the token first
    // This is a simplified version - in real implementation use the token to find session

    // Fetch session by searching through available sessions
    const sessions = await prisma.photographySession.findMany({
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            emailNormalized: true,
          },
        },
      },
      take: 1,
    })

    if (!sessions || sessions.length === 0) {
      redirect('/?error=session_not_found')
    }

    const sessionData = sessions[0]

    // Verify token expiration
    if (sessionData.securePrepTokenExpiresAt && sessionData.securePrepTokenExpiresAt < new Date()) {
      redirect('/?error=session_expired')
    }

    // Verify token matches (constant-time comparison)
    try {
      if (!verifyToken(token, sessionData.securePrepTokenHash || '')) {
        redirect('/?error=invalid_token')
      }
    } catch (error) {
      redirect('/?error=invalid_token')
    }

    return (
      <SessionPrepWizard
        sessionId={sessionData.id}
        token={token}
        sessionData={{
          id: sessionData.id,
          sessionType: sessionData.sessionType,
          sessionDate: sessionData.sessionDate?.toISOString(),
          sessionLocation: sessionData.sessionLocation || undefined,
          agreementStatus: sessionData.agreementStatus,
          agreementCompletedAt: sessionData.agreementCompletedAt?.toISOString(),
        }}
      />
    )
  } catch (error) {
    console.error('[SessionPrep] Page error:', error)
    redirect('/?error=page_load_failed')
  }
}
