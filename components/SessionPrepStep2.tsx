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
  const [agreedTerms, setAgreedTerms] = useState(false)
  const [agreedPrivacy, setAgreedPrivacy] = useState(false)

  const isAgreed = agreementStatus === 'completed' || agreementCompletedAt

  const handleContinue = () => {
    if (isAgreed || (agreedTerms && agreedPrivacy)) {
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
          <div className="max-h-96 overflow-y-auto pr-4 space-y-6 text-sm md:text-base text-smoke leading-relaxed">
            <div>
              <h3 className="font-serif text-xl text-charcoal mb-3">Photography Session Agreement</h3>
              <p>
                This agreement confirms that you are scheduling a boudoir photography session with Second Skin Boudoir. 
                Our sessions are carefully designed to create a comfortable, empowering experience for every client.
              </p>
            </div>

            <div>
              <p className="font-semibold text-charcoal mb-2">Session Details & Reservation:</p>
              <p className="text-sm">
                The session fee reserves your selected date and covers planning, wardrobe guidance, the private boudoir 
                session, fully guided posing, and your private reveal and ordering appointment. Additional services, 
                products, albums, digital files, hair and makeup, and location fees are selected separately.
              </p>
            </div>

            <div>
              <p className="font-semibold text-charcoal mb-2">Your Comfort & Control:</p>
              <ul className="space-y-1 ml-4 text-sm">
                <li>✓ You control all coverage and posing boundaries at all times</li>
                <li>✓ You can pause, modify, or end any pose at any time</li>
                <li>✓ Your personal questionnaire guides our entire session</li>
                <li>✓ You have final approval on all images before delivery</li>
                <li>✓ Full creative discretion remains with the photographer</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-charcoal mb-2">Image Rights & Privacy:</p>
              <p className="text-sm">
                All images and personal information shared during your session remain strictly confidential. Your images 
                will not be shared publicly, in advertising, or on social media unless you provide written permission via 
                the Image Use Election section.
              </p>
            </div>

            <div>
              <p className="font-semibold text-charcoal mb-2">Cancellations & Rescheduling:</p>
              <p className="text-sm">
                You may request one free reschedule with at least 7 calendar days notice. Additional reschedules, 
                short-notice cancellations, or no-shows may require a new session fee. Session fees are non-refundable 
                as the date and creative resources are reserved for you.
              </p>
            </div>

            <div>
              <p className="font-semibold text-charcoal mb-2">Professional Standards:</p>
              <p className="text-sm">
                We maintain the highest professional and ethical standards. Your safety, comfort, dignity, and 
                confidentiality are always our priority. Respectful conduct is required during your session.
              </p>
            </div>

            <div className="pt-2 border-t border-smoke/20">
              <p className="text-xs text-smoke/80">
                By checking the boxes below, you acknowledge that you have read and understood this agreement and consent 
                to your photography session under these terms.
              </p>
            </div>
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
        <div className="space-y-4 mb-8">
          {/* First checkbox */}
          <div className="flex items-start gap-4 p-4 bg-rose/5 border border-rose/20 rounded-lg hover:border-rose/40 transition-colors">
            <input
              type="checkbox"
              id="agree-terms"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-1 w-5 h-5 text-rose cursor-pointer flex-shrink-0"
            />
            <label htmlFor="agree-terms" className="flex-1 text-sm md:text-base text-charcoal cursor-pointer">
              I have read and accept the session agreement and terms above
            </label>
          </div>

          {/* Second checkbox */}
          <div className="flex items-start gap-4 p-4 bg-charcoal/5 border border-smoke/20 rounded-lg hover:border-smoke/40 transition-colors">
            <input
              type="checkbox"
              id="agree-privacy"
              checked={agreedPrivacy}
              onChange={(e) => setAgreedPrivacy(e.target.checked)}
              className="mt-1 w-5 h-5 text-champagne cursor-pointer flex-shrink-0"
            />
            <label htmlFor="agree-privacy" className="flex-1 text-sm md:text-base text-charcoal cursor-pointer">
              I understand my responses will guide our entire session and my privacy is protected
            </label>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleContinue}
          disabled={isLoading || (!isAgreed && !agreedTerms) || (!isAgreed && !agreedPrivacy)}
          className={`flex-1 py-4 px-6 rounded-lg font-body font-semibold transition-all duration-300 ${
            isAgreed || (agreedTerms && agreedPrivacy)
              ? 'bg-gradient-to-r from-champagne to-rose text-ivory hover:shadow-glow hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-smoke/30 text-smoke/50 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Processing...' : 'I Agree – Continue'}
        </button>
      </div>
    </div>
  )
}
