'use client'

import React, { useState } from 'react'
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
}

export interface SessionPrepWizardProps {
  sessionId: string
  token: string
  sessionData: SessionData
}

export default function SessionPrepWizard({ sessionId, token, sessionData }: SessionPrepWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [wizardData, setWizardData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

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
      const response = await fetch('/api/session-prep/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          intake: intakeData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit session preferences')
      }

      // Success - move to final step
      setCurrentStep(4)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMsg)
      console.error('[SessionPrep] Submission error:', errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-ivory via-charcoal/2 to-ivory">
      {/* Container */}
      <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 lg:py-16">
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
              ⚠️ {error}
            </p>
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
      </div>
    </div>
  )
}
