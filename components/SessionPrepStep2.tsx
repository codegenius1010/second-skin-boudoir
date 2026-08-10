'use client'

import React, { useState } from 'react'

interface SessionPrepStep2Props {
  sessionType: string
  agreementStatus: string
  agreementCompletedAt?: string | null
  isPaidModel?: boolean
  hourlyRate?: number | string
  hoursScheduled?: number
  onComplete: () => void
  isLoading?: boolean
}

export default function SessionPrepStep2({
  sessionType,
  agreementStatus,
  agreementCompletedAt,
  isPaidModel = false,
  hourlyRate,
  hoursScheduled,
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
        <p className="text-lg text-charcoal/70 leading-relaxed">
          Please review our session agreement before proceeding
        </p>
      </div>

      {/* Agreement Content */}
      {!isAgreed && (
        <div className="bg-gradient-to-br from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-6 md:p-8 mb-8">
          <div className="max-h-96 overflow-y-auto pr-4 space-y-4 text-xs md:text-sm text-charcoal leading-relaxed">
            {isPaidModel ? (
              // PAID MODEL AGREEMENT
              <>
                <div>
                  <h3 className="font-serif text-lg text-charcoal/70 mb-2 font-semibold">SECOND SKIN BOUDOIR - PAID MODEL SESSION AGREEMENT</h3>
                  <p className="text-charcoal text-xs mb-3">
                    This Agreement is made between Second Skin Boudoir ("Photographer," "Studio," "we," or "us") and you ("Model," "you," or "your") for a paid professional model photography session.
                  </p>
                  <p className="text-charcoal text-xs font-semibold mb-3 p-2 bg-charcoal/5 rounded border border-champagne/30">
                    Privacy & Confidentiality: All session details, compensation, and communications are confidential. Images from this session may be used for portfolio, educational, and promotional purposes unless you have a separate written agreement restricting image use.
                  </p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">1. Compensation and Payment Terms</p>
                  <p className="text-xs text-charcoal">You agree to participate in this paid professional model session in exchange for compensation as follows{hourlyRate || hoursScheduled ? ':' : '. Payment terms, including amount, timing, and method, are subject to the written compensation agreement provided by Photographer.'}
                  {hourlyRate || hoursScheduled ? (
                    <>
                      {hourlyRate && <> - Hourly Rate: ${Number(hourlyRate).toFixed(2)}</>}
                      {hoursScheduled && <> - Duration: {hoursScheduled} hour{hoursScheduled !== 1 ? 's' : ''}</>}
                      {hourlyRate && hoursScheduled && <> - Total Estimated Compensation: ${(Number(hourlyRate) * hoursScheduled).toFixed(2)}</>}
                      . Payment terms, including timing and method, are subject to the written compensation agreement provided by Photographer.
                    </>
                  ) : null}</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">2. Professional Context and Consent</p>
                  <p className="text-xs text-charcoal">You understand that this is a professional photography session and you consent to receive professional direction within the context of the agreed-upon session. You agree that ordinary, disclosed, consent-based posing direction, wardrobe guidance, and artistic direction inherent in a professional model session do not, by themselves, constitute inappropriate conduct. You may decline, pause, modify, or stop any pose or direction at any time, and the session will adjust accordingly.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">3. Copyright and Image Ownership</p>
                  <p className="text-xs text-charcoal">Photographer owns the copyright to all images created during the session. You grant Photographer the right to use, edit, reproduce, distribute, and display images from this session for portfolio, editorial, advertising, promotional, educational, and commercial purposes. Images may be used online, in print, in advertising, and in exhibitions without additional compensation or approval beyond what is specified in the written compensation agreement.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">4. Model Release</p>
                  <p className="text-xs text-charcoal">By signing this agreement, you grant Second Skin Boudoir a full model release and hereby authorize Photographer to use images from this session for all purposes described above. You agree that you will not receive additional compensation, credit, or approval rights for the use of these images.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">5. Image Use and Attribution</p>
                  <p className="text-xs text-charcoal">You are welcome to use, share, and enjoy images from this session for any personal purpose. If you post images on social media or publicly, we ask that you provide credit to Second Skin Boudoir and tag @secondskinboudoir so we may celebrate your work and share your beautiful images with our community. You may edit, filter, or modify images as you wish. Photographer retains the right to use images for portfolio, editorial, advertising, and promotional purposes as outlined in Section 3.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">6. Confidentiality and Non-Disclosure</p>
                  <p className="text-xs text-charcoal">You agree to maintain confidentiality regarding session details, compensation, location, creative direction, and Photographer communications. You may not disclose compensation amounts, session details, or behind-the-scenes information without written permission.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">7. Recording and Photography</p>
                  <p className="text-xs text-charcoal">You may not record, photograph, or film the session, location, or Photographer without written permission. This protects the professional nature and creative integrity of the work.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">8. Conduct and Safety</p>
                  <p className="text-xs text-charcoal">This is a professional photography session. You agree to respectful communication and professional conduct. Photographer may stop or cancel the session immediately if there is harassment, unsafe conduct, intoxication, illegal activity, threats, boundary violations, or behavior that compromises safety or professionalism. In that event, compensation may be forfeited according to the written compensation agreement.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">9. Physical Limitations and Health</p>
                  <p className="text-xs text-charcoal">You agree to notify Photographer before the session of any physical limitations, injuries, allergies, pregnancy considerations, mobility issues, or posing restrictions. You are responsible for communicating discomfort during posing. Photographer will make reasonable posing adjustments when notified.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">10. Rescheduling and Cancellation</p>
                  <p className="text-xs text-charcoal">Session dates and times are subject to mutual agreement. Cancellations or reschedules must follow the terms outlined in the written compensation agreement. Failure to appear at the scheduled session may result in forfeiture of compensation unless otherwise agreed in writing.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">11. Age and Legal Capacity</p>
                  <p className="text-xs text-charcoal">You represent that you are at least eighteen (18) years old, have the legal capacity to sign this Agreement, and are voluntarily agreeing to participate in this professional model session.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">12. Indemnification</p>
                  <p className="text-xs text-charcoal">You agree to indemnify and hold Photographer harmless from claims, damages, losses, or expenses arising from your breach of this Agreement, misuse of images, or your conduct during the session.</p>
                </div>

                <div className="border-t border-smoke/20 pt-3">
                  <p className="font-semibold text-charcoal/70 mb-1">13. Entire Agreement</p>
                  <p className="text-xs text-charcoal">This Agreement, together with the written compensation agreement, constitutes the entire agreement between the parties. Changes must be in writing and signed by both parties.</p>
                </div>

                <div className="border-t border-smoke/20 pt-4 bg-charcoal/2 p-3 rounded border-l-4 border-l-champagne">
                  <p className="text-xs text-charcoal">
                    <strong>By checking the boxes below, you confirm that you have read and fully understand this professional model agreement, and you consent to participate in this paid photography session under all terms listed above.</strong>
                  </p>
                </div>
              </>
            ) : (
              // STANDARD CLIENT AGREEMENT (Original)
              <>
                <div>
                  <h3 className="font-serif text-lg text-charcoal/70 mb-2 font-semibold">SECOND SKIN BOUDOIR - PHOTOGRAPHY SESSION AGREEMENT & MODEL RELEASE</h3>
                  <p className="text-charcoal text-xs mb-3">
                    This Agreement is made between Second Skin Boudoir ("Photographer," "Studio," "we," or "us") and you ("Client," "you," or "your") for a private boudoir photography session and related products.
                  </p>
                  <p className="text-charcoal text-xs font-semibold mb-3 p-2 bg-charcoal/5 rounded border border-champagne/30">
                    Privacy Default: Your images will not be shared online, in advertising, in print, or publicly unless you give written permission in the Image Privacy section of this questionnaire or in a later signed release.
                  </p>
                </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">1. Session Fee and Reservation</p>
              <p className="text-xs text-charcoal">The session fee reserves the session date and covers planning, wardrobe guidance, the private boudoir session, fully guided posing, and the private reveal and ordering appointment. Unless expressly stated in writing, the session fee does not include albums, digital files, printed artwork, hair and makeup, location fees, parking, travel, sales tax, or products.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">2. Artwork, Products, and Collections</p>
              <p className="text-xs text-charcoal">Albums, digital files, printed artwork, and collections are selected separately after the session at the private reveal and ordering appointment. Product pricing and collection details are provided in the current Second Skin Boudoir pricing guide and may change until the session is booked or an order is placed.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">3. Payments and Product Orders</p>
              <p className="text-xs text-charcoal">Product orders, albums, digitals, collection upgrades, payment-plan deposits, and custom artwork orders are final once approved by you. Because products are custom-made, no product order may be canceled, refunded, reduced, or exchanged after your approval except as required by law or expressly agreed in writing by Photographer.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">4. Payment Plans</p>
              <p className="text-xs text-charcoal">If a payment plan is used, products may not be delivered until the order is paid in full unless Photographer agrees otherwise in writing. Missed, late, reversed, or disputed payments may delay editing, production, delivery, or product release. You remain responsible for the full balance of any approved order.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">5. Rescheduling, Cancellation, and No-Show</p>
              <p className="text-xs text-charcoal">You may request one reschedule with at least seven (7) calendar days notice, subject to availability. Additional reschedules, short-notice reschedules, cancellations, late arrivals, or no-shows may require a new session fee. Session fees are non-refundable because the date, planning time, and creative resources are reserved for you.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">6. Late Arrival</p>
              <p className="text-xs text-charcoal">If you arrive late, the session may be shortened to protect the schedule and location booking. Full session fees and product pricing still apply. Arrival more than thirty (30) minutes late may be treated as a no-show unless Photographer agrees otherwise.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">7. Hair, Makeup, Wardrobe, and Styling</p>
              <p className="text-xs text-charcoal">If hair and makeup are included, you agree to arrive on time with clean, dry hair and a clean face unless instructed otherwise. You are responsible for bringing wardrobe pieces, accessories, shoes, and personal items unless otherwise agreed. Photographer may provide styling guidance but does not guarantee fit, availability, or performance of any garment.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">8. Artistic Style and Creative Control</p>
              <p className="text-xs text-charcoal">You have reviewed the style and portfolio of Second Skin Boudoir and understand that photography is subjective. Photographer retains full creative discretion over lighting, posing, angles, image selection, editing style, cropping, color, retouching, and final artistic interpretation.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">9. Image Selection and Editing</p>
              <p className="text-xs text-charcoal">Photographer selects the images presented at the reveal. Raw, unedited, rejected, test, duplicate, or outtake images are not included and will not be delivered. Final images receive professional editing consistent with the Studio style. Extensive body modification, advanced retouching, composites, wardrobe alteration, background replacement, or re-editing may require additional fees.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">10. Privacy and Confidentiality</p>
              <p className="text-xs text-charcoal">Photographer will take reasonable steps to protect your privacy, image security, and confidentiality. Images will not be publicly shared without written permission. You also agree not to publicly post private behind-the-scenes materials, screenshots of unpurchased proofs, Studio communications, or confidential pricing documents without permission.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">11. Copyright and Client License</p>
              <p className="text-xs text-charcoal">Photographer owns the copyright to all images created during the session. You receive a personal-use license only for purchased digital images. You may print, share privately, post personally, and gift purchased images, but may not sell, license, alter, filter, edit, enter into contests, use commercially, provide to vendors for advertising, or claim authorship without written permission.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">12. Social Media Credit and Alteration</p>
              <p className="text-xs text-charcoal">When posting purchased images online, you agree not to apply filters, heavy edits, AI alterations, or modifications that materially change the image or Studio style. Credit to Second Skin Boudoir is appreciated but not required unless image use is commercial or promotional.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">13. Image Storage and Archive</p>
              <p className="text-xs text-charcoal">Photographer is not required to retain images indefinitely. Unpurchased images may be deleted after thirty (30) days from the reveal. Purchased final images are typically archived for at least ninety (90) days after delivery, but you are responsible for downloading and backing up delivered files.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">14. Client Conduct, Safety, and Boundaries</p>
              <p className="text-xs text-charcoal">This is a professional photography session. You agree to respectful communication and conduct. Photographer may stop or cancel the session immediately if there is harassment, unsafe conduct, intoxication, illegal activity, threats, boundary violations, or behavior that compromises safety or professionalism. In that event, no refund is due.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">15. Professional Boudoir Context, Consent, and Boundaries</p>
              <p className="text-xs text-charcoal">You understand that boudoir photography may include discussion of intimate wardrobe, covered or implied nudity, posing, facial expression, body positioning, sensual styling, and artistic direction. You consent to receive professional direction within this context and agree that ordinary, disclosed, consent-based posing direction, wardrobe guidance, and image creation inherent in a boudoir session do not, by themselves, constitute sexual harassment or misconduct. Photographer will avoid physical contact except minor pose, hair, or wardrobe adjustments after your consent, and you may decline, pause, modify, or stop any pose or adjustment at any time.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">16. Age, Capacity, and Consent</p>
              <p className="text-xs text-charcoal">You represent that you are at least eighteen (18) years old, have the legal capacity to sign this Agreement, and are voluntarily choosing to participate. Second Skin Boudoir does not photograph minors for boudoir sessions.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">17. Location Rules and Property</p>
              <p className="text-xs text-charcoal">You agree to follow all location, hotel, rental, studio, or venue rules. You are responsible for damage caused by you or your guests to the location, props, furnishings, wardrobe items, or equipment. You are responsible for all location-specific fees unless otherwise stated in writing.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">18. Guests and Companions</p>
              <p className="text-xs text-charcoal">You may bring one supportive adult guest only if approved in advance by Photographer. Guests may be asked to leave if they interrupt the session, create discomfort, record without permission, or interfere with the creative process.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">19. No Recording or Behind-the-Scenes Capture</p>
              <p className="text-xs text-charcoal">You and guests may not photograph, film, livestream, or record the session, set, location, proofs, reveal screen, or Photographer without written permission. This protects privacy, copyright, and the controlled nature of the session.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">20. Health, Physical Limitations, and Personal Responsibility</p>
              <p className="text-xs text-charcoal">You agree to notify Photographer before the session of any relevant physical limitations, injuries, pregnancy considerations, allergies, mobility issues, or posing restrictions. You are responsible for communicating discomfort during posing. Photographer will make reasonable posing adjustments when notified.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">21. Force Majeure and Unavoidable Events</p>
              <p className="text-xs text-charcoal">Neither party is responsible for delay or non-performance caused by events beyond reasonable control, including illness, emergency, weather, venue cancellation, power outage, equipment failure, natural disaster, travel disruption, government restriction, or other unavoidable event. The remedy will generally be rescheduling or substitution of comparable services.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">22. Equipment Failure and Limitation of Liability</p>
              <p className="text-xs text-charcoal">Photographer uses reasonable care with equipment, storage, and workflow. If images are lost, damaged, unavailable, or materially defective due to equipment failure, data corruption, accident, or other cause beyond reasonable control, Photographer liability is limited to rescheduling the session or refunding amounts paid for the affected service or product.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">23. Chargebacks and Collection Costs</p>
              <p className="text-xs text-charcoal">You agree to contact Photographer first in good faith regarding any billing concern. Unauthorized chargebacks, payment reversals, or disputed payments for valid charges may result in suspension of delivery and collection of the unpaid amount, plus reasonable processing fees, collection costs, and attorney fees where allowed by law.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">24. Indemnification</p>
              <p className="text-xs text-charcoal">You agree to indemnify and hold Photographer harmless from claims, damages, losses, or expenses arising from your breach of this Agreement, your misuse of images, unauthorized commercial use, location issues, your guests, or inaccurate information provided by you.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">25. Governing Law, Venue, and Dispute Resolution</p>
              <p className="text-xs text-charcoal">This Agreement is governed by the laws of the State of Florida. The parties agree to attempt good-faith informal resolution before filing any claim. If a claim is filed, venue will be in the county in Florida where Photographer maintains its principal business location unless the parties agree otherwise in writing.</p>
            </div>

            <div className="border-t border-smoke/20 pt-3">
              <p className="font-semibold text-charcoal/70 mb-1">26. Entire Agreement and Severability</p>
              <p className="text-xs text-charcoal">This Agreement, any signed product order, and any written pricing or invoice terms form the entire agreement between the parties. If any provision is found unenforceable, the remaining provisions remain in effect. Changes must be in writing and signed or acknowledged by both parties.</p>
            </div>

            <div className="border-t border-smoke/20 pt-4 bg-charcoal/2 p-3 rounded border-l-4 border-l-champagne">
              <p className="text-xs text-charcoal">
                <strong>By checking the boxes below, you confirm that you have read and fully understand this complete 26-point agreement, and you consent to your photography session under all terms listed above.</strong>
              </p>
            </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Agreement Status */}
      {isAgreed ? (
        <div className="bg-gradient-to-br from-champagne/10 to-rose/10 border border-champagne rounded-lg p-8 mb-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h3 className="font-serif text-2xl text-charcoal/70 mb-2">Agreement Confirmed</h3>
          <p className="text-charcoal">
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
              className="mt-1 w-5 h-5 text-charcoal/70 cursor-pointer flex-shrink-0"
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
              ? 'bg-gradient-to-r from-champagne to-rose text-charcoal hover:shadow-glow hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-smoke/30 text-smoke/50 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Processing...' : 'I Agree – Continue'}
        </button>
      </div>
    </div>
  )
}
