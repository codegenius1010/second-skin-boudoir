'use client'

import React, { useState } from 'react'

interface SessionPrepStep2Props {
  sessionType: string
  agreementStatus: string
  agreementCompletedAt?: string | null
  onComplete: () => void
  isLoading?: boolean
}

export default function SessionPrepStep2({
  sessionType,
  agreementStatus,
  agreementCompletedAt,
  onComplete,
  isLoading,
}: SessionPrepStep2Props) {
  const [agreed, setAgreed] = useState(false)

  const isAgreed = agreementStatus === 'completed' || agreementCompletedAt

  const handleContinue = () => {
    if (isAgreed) {
      onComplete()
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
          Session Agreement
        </h1>
        <p className="text-lg text-smoke leading-relaxed">
          Please review our session agreement before proceeding
        </p>
      </div>

      {/* Agreement Content */}
      {!isAgreed && (
        <div className="bg-gradient-to-br from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-6 md:p-8 mb-8">
          <div className="max-h-96 overflow-y-auto pr-4 space-y-4 text-sm md:text-base text-smoke leading-relaxed">
            <p>
              <strong className="text-charcoal">Photography Session Agreement</strong>
            </p>

            <p>
              This agreement confirms that you are scheduling a boudoir photography session with Second Skin Boudoir.
              Our sessions are carefully designed to create a comfortable, empowering experience for every client.
            </p>

            <div>
              <p className="font-semibold text-charcoal mb-2">Session Details:</p>
              <p>• Session Type: {sessionType}</p>
              <p>• Location: As confirmed in your booking</p>
              <p>• Duration: Per your selected package</p>
            </div>

            <div>
              <p className="font-semibold text-charcoal mb-2">Your Comfort & Control:</p>
              <ul className="space-y-1 ml-4">
                <li>✓ You control all coverage and posing boundaries</li>
                <li>✓ You can pause or end the session at any time</li>
                <li>✓ Your personal questionnaire guides our entire session</li>
                <li>✓ You have final approval on all images before delivery</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-charcoal mb-2">Confidentiality:</p>
              <p>
                All images and personal information shared during your session remain strictly confidential. We never
                share your responses or images without explicit written permission.
              </p>
            </div>

            <div>
              <p className="font-semibold text-charcoal mb-2">Professional Standards:</p>
              <p>
                We maintain the highest professional and ethical standards. Your safety, comfort, and dignity are
                always our priority.
              </p>
            </div>

            <p className="text-champagne pt-2 border-t border-smoke/20">
              By proceeding, you acknowledge that you have read and understood this agreement and consent to your
              photography session.
            </p>
          </div>
        </div>
      )}

      {/* Agreement Status */}
      {isAgreed ? (
        <div className="bg-gradient-to-br from-champagne/10 to-rose/10 border border-champagne rounded-lg p-8 mb-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h3 className="font-serif text-2xl text-charcoal mb-2">Agreement Confirmed</h3>
          <p className="text-smoke">
            {agreementCompletedAt
              ? `Accepted on ${new Date(agreementCompletedAt).toLocaleDateString()}`
              : 'You have accepted the session agreement'}
          </p>
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4 p-4 bg-rose/5 border border-rose/20 rounded-lg">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-rose cursor-pointer"
            />
            <label htmlFor="agree" className="flex-1 text-sm md:text-base text-charcoal cursor-pointer">
              I have read and accept the session agreement above
            </label>
          </div>

          <div className="flex items-start gap-4 p-4 bg-charcoal/5 border border-smoke/20 rounded-lg">
            <input
              type="checkbox"
              id="understand"
              checked={agreed}
              disabled
              className="mt-1 w-5 h-5 text-champagne cursor-not-allowed"
            />
            <label className="flex-1 text-sm md:text-base text-charcoal">
              I understand that my responses will guide our entire session
            </label>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleContinue}
          disabled={isLoading || !isAgreed}
          className={`flex-1 py-4 px-6 rounded-lg font-body font-semibold transition-all duration-300 ${
            isAgreed
              ? 'bg-gradient-to-r from-champagne to-rose text-ivory hover:shadow-glow hover:scale-105 active:scale-95'
              : 'bg-smoke/30 text-smoke/50 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Processing...' : 'I Agree – Continue'}
        </button>
      </div>

      {/* Form number indicator */}
      <p className="text-center text-smoke text-sm mt-8">Step 2 of 4</p>
    </div>
  )
}
