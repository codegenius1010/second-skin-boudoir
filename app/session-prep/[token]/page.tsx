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
    // Import hashToken to find the session
    const { hashToken } = await import('@/lib/session-prep-utils')
    
    // Hash the provided token to find the matching session
    const tokenHash = hashToken(token)
    
    // Look up session by token hash
    const sessionData = await prisma.photographySession.findUnique({
      where: { securePrepTokenHash: tokenHash },
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

    if (!sessionData) {
      redirect('/?error=invalid_token')
    }

    // Verify token expiration
    if (sessionData.securePrepTokenExpiresAt && sessionData.securePrepTokenExpiresAt < new Date()) {
      redirect('/?error=session_expired')
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
          isPaidModel: sessionData.isPaidModel,
        }}
      />
    )
  } catch (error) {
    console.error('[SessionPrep] Page error:', error)
    redirect('/?error=page_load_failed')
  }
}
