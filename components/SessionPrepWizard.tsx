'use client'

import React, { useState, useEffect } from 'react'
import SessionPrepProgress from './SessionPrepProgress'
import SessionPrepStep1 from './SessionPrepStep1'
import SessionPrepStep2 from './SessionPrepStep2'
import SessionPrepStep3 from './SessionPrepStep3'
import SessionPrepStep4 from './SessionPrepStep4'

interface SessionData {
  id: string
  sessionType: string
  sessionDate?: string
  sessionLocation?: string
  agreementStatus: string
  agreementCompletedAt?: string
  isPaidModel?: boolean
}

export interface SessionPrepWizardProps {
  sessionId: string
  token: string
  sessionData: SessionData
}

export default function SessionPrepWizard({ sessionId, token, sessionData }: SessionPrepWizardProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [wizardData, setWizardData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Step 1: Client verification
  const handleStep1Complete = async (data: { firstName: string; lastName: string; email: string; phone: string }) => {
    setWizardData(data)
    setCurrentStep(2)
  }

  // Step 2: Agreement
  const handleStep2Complete = async () => {
    setCurrentStep(3)
  }

  // Step 3: Questionnaire submission
  const handleStep3Complete = async (intakeData: Record<string, unknown>) => {
    setIsLoading(true)
    setError(null)

    try {
      // Add client contact info from Step 1 to the intake data
      const intakeWithClientInfo = {
        ...intakeData,
        clientFirstName: wizardData.firstName,
        clientLastName: wizardData.lastName,
        clientEmail: wizardData.email,
        clientPhone: wizardData.phone,
      }

      console.log('[SessionPrep] Client info being added:', {
        firstName: wizardData.firstName,
        lastName: wizardData.lastName,
        email: wizardData.email,
        phone: wizardData.phone,
      })
      console.log('[SessionPrep] Complete intake data with client info:', intakeWithClientInfo)

      const response = await fetch('/api/session-prep/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          intake: intakeWithClientInfo,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('[SessionPrep] ❌ API Response Error Status:', response.status)
        console.error('[SessionPrep] Error Data:', errorData)
        console.table(errorData.validationErrors || [])
        console.error('[SessionPrep] Submitted Data:', intakeData)
        console.table(Object.entries(intakeData).slice(0, 20))
        console.error('[SessionPrep] Client Info:', {
          sessionId,
          email: wizardData.email,
          name: wizardData.firstName,
        })
        
        throw new Error(errorData.error || 'Failed to submit session preferences')
      }

      // Success - move to final step and scroll to top
      setCurrentStep(4)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMsg)
      console.error('[SessionPrep] Submission error:', {
        errorMessage: errorMsg,
        timestamp: new Date().toISOString(),
        sessionId,
        wizardData: { firstName: wizardData.firstName, lastName: wizardData.lastName, email: wizardData.email },
        intakeDataKeys: Object.keys(intakeData),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-ivory via-charcoal/2 to-ivory pt-40 md:pt-48 lg:pt-56">
      {/* Container */}
      <div className="w-full max-w-5xl mx-auto px-4 pb-8 md:pb-12 lg:pb-16">
        {/* Only render after mount to prevent hydration mismatch */}
        {!isMounted ? (
          <div className="text-center py-20">
            <p className="text-smoke">Loading...</p>
          </div>
        ) : (
          <>
        {/* Header logo/branding */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal">Second Skin Boudoir</h2>
          <p className="text-sm text-smoke mt-1">Session Preparation Questionnaire</p>
        </div>

        {/* Progress indicator */}
        <SessionPrepProgress currentStep={currentStep} totalSteps={4} />

        {/* Error message (if any) */}
        {error && (
          <div className="mb-8 p-4 bg-rose/10 border border-rose rounded-lg">
            <p className="text-rose font-semibold text-sm">
              ⚠️ Validation failed - Please try again or contact us for support
            </p>
            <details className="mt-3 text-xs text-smoke/80 bg-white/50 p-3 rounded border border-rose/20 cursor-pointer">
              <summary className="font-medium text-smoke hover:text-charcoal select-none">
                🔍 Debug Information (for support)
              </summary>
              <div className="mt-3 space-y-2 text-xs">
                <div className="bg-charcoal/5 p-2 rounded font-mono">
                  <p className="text-smoke font-semibold mb-1">Error Message:</p>
                  <p className="text-charcoal break-words">{error}</p>
                </div>
                <div className="bg-charcoal/5 p-2 rounded font-mono">
                  <p className="text-smoke font-semibold mb-1">Session ID:</p>
                  <p className="text-charcoal break-all">{sessionId}</p>
                </div>
                <div className="bg-charcoal/5 p-2 rounded font-mono">
                  <p className="text-smoke font-semibold mb-1">Email:</p>
                  <p className="text-charcoal break-all">{wizardData.email}</p>
                </div>
                <p className="text-smoke/70 italic mt-2">
                  💡 Open your browser's Developer Tools (F12) and check the Console tab for detailed error logs. 
                  Share the console output with support for faster assistance.
                </p>
              </div>
            </details>
            <p className="text-sm text-smoke/70 mt-1">
              Please try again or contact us for support.
            </p>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 lg:p-12">
          {currentStep === 1 && (
            <SessionPrepStep1
              sessionId={sessionId}
              onComplete={handleStep1Complete}
              isLoading={isLoading}
            />
          )}

          {currentStep === 2 && (
            <SessionPrepStep2
              sessionType={sessionData.sessionType}
              agreementStatus={sessionData.agreementStatus}
              agreementCompletedAt={sessionData.agreementCompletedAt}
              isPaidModel={sessionData.isPaidModel || false}
              onComplete={handleStep2Complete}
              isLoading={isLoading}
            />
          )}

          {currentStep === 3 && (
            <SessionPrepStep3 onComplete={handleStep3Complete} isLoading={isLoading} />
          )}

          {currentStep === 4 && (
            <SessionPrepStep4 sessionType={sessionData.sessionType} firstName={wizardData.firstName} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-xs text-smoke/50">
            🔒 Your information is encrypted and secure • Questions?{' '}
            <a href="mailto:hello@secondskinboudoir.com" className="text-champagne hover:underline">
              Contact us
            </a>
          </p>
        </div>
          </>
        )}
      </div>
    </div>
  )
}
