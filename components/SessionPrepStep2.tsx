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
          <div className="max-h-96 overflow-y-auto pr-4 space-y-4 text-xs md:text-sm text-charcoal leading-relaxed">
            <div>
              <h3 className="font-serif text-lg text-charcoal mb-2 font-semibold">SECOND SKIN BOUDOIR - PHOTOGRAPHY SESSION AGREEMENT & MODEL RELEASE</h3>
              <p className="text-smoke text-xs">
                This Agreement is entered into between the Client and Second Skin Boudoir (the "Photographer").
              </p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">1. SESSION BOOKING & FEES</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>The session fee reserves your selected date and time</li>
                <li>Session fees cover: pre-session planning, wardrobe guidance, studio session, fully guided posing, and private reveal appointment</li>
                <li>Additional services (hair/makeup, location fees, digital files, albums, prints) are optional and priced separately</li>
                <li>A 50% non-refundable deposit confirms your booking</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">2. PAYMENT & INVOICING</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>Payment terms and deadlines will be specified on your invoice</li>
                <li>Accepted payment methods: credit card, bank transfer, or as mutually agreed</li>
                <li>Late payments may affect image delivery timelines</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">3. CANCELLATION & RESCHEDULING POLICY</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>One free reschedule allowed with 7+ calendar days notice</li>
                <li>Reschedules requested with less than 7 days notice require a new session fee</li>
                <li>No-shows forfeit the entire session fee unless rescheduled within 7 days</li>
                <li>Session fees are non-refundable as your date and resources are reserved</li>
                <li>Photographer may reschedule due to emergency or illness with 72 hours notice</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">4. CLIENT RESPONSIBILITIES & CONDUCT</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>Client agrees to arrive on time, prepared, and in professional condition</li>
                <li>Respectful, cooperative behavior is required throughout the session</li>
                <li>Client must follow photographer's direction for safety and image quality</li>
                <li>Any substances impairing judgment or safety are prohibited</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">5. COMFORT & BOUNDARIES</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>Your completed questionnaire guides all session boundaries and preferences</li>
                <li>You maintain full control of coverage levels and posing at all times</li>
                <li>You may pause, modify, or decline any pose without explanation</li>
                <li>Communication is encouraged throughout the session</li>
                <li>Session may be rescheduled if boundaries are incompatible with photographer's practice</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">6. PHOTOGRAPHER CREATIVE CONTROL & APPROVAL</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>Photographer retains full creative discretion over angles, lighting, editing, and composition</li>
                <li>Client receives final approval before any images are shared publicly</li>
                <li>Photographer may decline to shoot or complete session if boundaries conflict with professional standards</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">7. COPYRIGHT & OWNERSHIP</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>Photographer retains copyright to all images and derivative works</li>
                <li>Images may be used for portfolio, portfolio website, and promotional purposes</li>
                <li>Client's image privacy preference is specified in your session questionnaire and will be respected</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">8. PRIVACY & CONFIDENTIALITY</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>All personal information is kept strictly confidential</li>
                <li>Images will NOT be shared publicly, in advertising, or on social media without your written permission</li>
                <li>Default: Images are private and for your personal use only</li>
                <li>Client's Instagram handle is used only if explicit written permission is given</li>
                <li>Photographer complies with all privacy laws and data protection regulations</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">9. IMAGE DELIVERY & STORAGE</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>Images are delivered according to agreed-upon timeline and format</li>
                <li>Digital files are stored securely and retained for minimum 90 days</li>
                <li>Extended storage available upon request</li>
                <li>Client is responsible for downloading and backing up purchased files</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">10. LIABILITY & INDEMNIFICATION</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>Photography is an inherently subjective service; final images may not match expectations</li>
                <li>Photographer is not responsible for equipment failure, power outages, or acts of God</li>
                <li>Session may be rescheduled or fees refunded only for photographer's negligence</li>
                <li>Client assumes all risk related to physical positioning, movement, and comfort during session</li>
                <li>Client waives liability claims unless photographer breaches fundamental agreement terms</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">11. CONSENT & ACKNOWLEDGMENTS</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>Client confirms they are 18+ years old and able to provide legal consent</li>
                <li>Client acknowledges they have read this agreement in full and understand all terms</li>
                <li>Client confirms all information provided in the session questionnaire is accurate</li>
                <li>Client consents to being photographed and having images processed per this agreement</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal mb-1">12. GOVERNING LAW & MODIFICATIONS</p>
              <ul className="space-y-1 ml-3 text-xs list-disc text-charcoal">
                <li>This agreement is governed by the laws of the photographer's location</li>
                <li>Any modifications to this agreement must be made in writing and signed by both parties</li>
              </ul>
            </div>

            <div className="border-t border-smoke/20 pt-4 bg-charcoal/2 p-3 rounded">
              <p className="text-xs text-smoke/80">
                <strong>By checking the boxes below, you confirm that you have read and fully understand this complete agreement, and you consent to your photography session under all terms listed above.</strong>
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
