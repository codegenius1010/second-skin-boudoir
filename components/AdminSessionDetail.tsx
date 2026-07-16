'use client'

import React, { useState, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface DetailData {
  session: {
    id: string
    sessionType: string
    sessionDate?: string
    sessionLocation?: string
    agreementStatus: string
    createdAt: string
    updatedAt: string
  }
  client: {
    id: string
    firstName: string
    lastName: string
    emailNormalized: string
    phoneNormalized?: string
    instagramHandle?: string
  }
  intakes: any[]
  webhookDeliveries: any[]
}

interface AdminSessionDetailProps {
  sessionId: string
  adminToken: string
  onClose: () => void
  editModeDefault?: boolean
}

export default function AdminSessionDetail({ sessionId, adminToken, onClose, editModeDefault = false }: AdminSessionDetailProps) {
  const [data, setData] = useState<DetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(editModeDefault)
  const [editData, setEditData] = useState({
    sessionType: '',
    sessionDate: '',
    sessionLocation: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`/api/admin/session-prep/detail/${sessionId}`, {
          headers: {
            'x-admin-token': adminToken,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to load details')
        }

        const result = await response.json()
        setData(result.data)
        // Initialize edit data with proper date formatting
        let sessionDateForInput = ''
        if (result.data.session.sessionDate) {
          const dateObj = new Date(result.data.session.sessionDate)
          // Use toISOString and extract just the date part (YYYY-MM-DD)
          const isoString = dateObj.toISOString()
          sessionDateForInput = isoString.split('T')[0]
        }
        setEditData({
          sessionType: result.data.session.sessionType || '',
          sessionDate: sessionDateForInput,
          sessionLocation: result.data.session.sessionLocation || '',
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetail()
  }, [sessionId, adminToken, editModeDefault])

  const handleSaveSessionChanges = async () => {
    if (!data) return

    try {
      setIsSaving(true)
      setSaveMessage(null)

      const response = await fetch(`/api/admin/session-prep/update-session`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({
          sessionId: data.session.id,
          sessionType: editData.sessionType,
          sessionDate: editData.sessionDate,
          sessionLocation: editData.sessionLocation,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save session')
      }

      const result = await response.json()
      setSaveMessage({ type: 'success', text: 'Session details saved successfully!' })
      
      // Update local data
      setData({
        ...data,
        session: {
          ...data.session,
          sessionType: result.data.sessionType,
          sessionDate: result.data.sessionDate,
          sessionLocation: result.data.sessionLocation,
        },
      })
      
      setIsEditMode(false)
      
      // Clear message after 2 seconds
      setTimeout(() => setSaveMessage(null), 2000)
    } catch (err) {
      setSaveMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save session',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportPDF = async () => {
    if (!data) return
    
    setIsExporting(true)
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      // Safe date formatter
      const formatDate = (date: any): string => {
        try {
          if (!date) return '—'
          const dateObj = new Date(date)
          if (isNaN(dateObj.getTime())) return '—'
          return dateObj.toLocaleString()
        } catch {
          return '—'
        }
      }

      // Format image use election to human-readable label
      const formatImageUseElection = (election: string | null | undefined): string => {
        switch (election) {
          case 'no_public_sharing':
            return 'No Public Sharing (Private Collection)'
          case 'anonymous_detail':
            return 'Anonymous/Detail Sharing'
          case 'full_model_release':
            return 'Full Model Release'
          default:
            return 'Not specified'
        }
      }

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 15
      const contentWidth = pageWidth - 2 * margin
      let yPos = margin
      const lineHeight = 6
      const smallLineHeight = 4

      // Define colors (matching brand)
      const charcoal = [44, 44, 44]
      const espresso = [33, 33, 33]
      const smoke = [100, 100, 100]
      const champagne = [224, 181, 134]
      const lightGray = [240, 240, 240]

      // Helper function to check and add new page
      const checkNewPage = (requiredHeight: number) => {
        if (yPos + requiredHeight > pageHeight - margin) {
          pdf.addPage()
          yPos = margin
          addPageHeader()
        }
      }

      // Add page header with branding
      const addPageHeader = () => {
        pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2])
        pdf.rect(margin - 5, yPos - 3, contentWidth + 10, 12, 'F')
        pdf.setFont('Helvetica', 'bold')
        pdf.setFontSize(9)
        pdf.setTextColor(charcoal[0], charcoal[1], charcoal[2])
        pdf.text('SECOND SKIN BOUDOIR', margin, yPos + 3)
        pdf.setFont('Helvetica', 'normal')
        pdf.setFontSize(7)
        pdf.setTextColor(smoke[0], smoke[1], smoke[2])
        pdf.text('Session Intake Form', pageWidth - margin - 40, yPos + 3)
        yPos += 15
      }

      // Add title and header
      pdf.setFont('Helvetica', 'bold')
      pdf.setFontSize(16)
      pdf.setTextColor(charcoal[0], charcoal[1], charcoal[2])
      pdf.text('SECOND SKIN BOUDOIR', margin, yPos)
      yPos += 8

      pdf.setFont('Helvetica', 'normal')
      pdf.setFontSize(10)
      pdf.setTextColor(smoke[0], smoke[1], smoke[2])
      pdf.text('Session Preparation Questionnaire - Complete Record', margin, yPos)
      yPos += 12

      // Function to add a section with better layout to prevent overlapping
      const addSection = (title: string, content: Array<[string, string]>) => {
        checkNewPage(8)
        
        pdf.setFont('Helvetica', 'bold')
        pdf.setFontSize(11)
        pdf.setTextColor(charcoal[0], charcoal[1], charcoal[2])
        pdf.text(title, margin, yPos)
        yPos += 7

        pdf.setDrawColor(champagne[0], champagne[1], champagne[2])
        pdf.setLineWidth(0.5)
        pdf.line(margin, yPos - 1, margin + contentWidth, yPos - 1)
        yPos += 4

        content.forEach(([label, value]) => {
          checkNewPage(8)
          
          // Put label on its own line with colon
          pdf.setFont('Helvetica', 'bold')
          pdf.setFontSize(8.5)
          pdf.setTextColor(espresso[0], espresso[1], espresso[2])
          pdf.text(label + ':', margin, yPos)
          yPos += 6  // Increased from 4 for better spacing
          
          // Put value on next line(s), indented slightly
          pdf.setFont('Helvetica', 'normal')
          pdf.setFontSize(8.5)
          pdf.setTextColor(charcoal[0], charcoal[1], charcoal[2])
          
          const valueLines = pdf.splitTextToSize(value, contentWidth - 8)
          pdf.text(valueLines, margin + 3, yPos)
          
          const textHeight = valueLines.length * lineHeight
          yPos += textHeight + 4  // Increased from 3 for better spacing
        })

        yPos += 3  // Increased from 2 for better spacing between sections
      }

      const intake = data.intakes[0]

      // Session Information
      addSection('SESSION INFORMATION', [
        ['Type', data.session.sessionType],
        ['Agreement Status', data.session.agreementStatus === 'completed' ? '✓ COMPLETED' : data.session.agreementStatus],
        ['Session Date', data.session.sessionDate ? new Date(data.session.sessionDate).toLocaleDateString() : '—'],
        ['Location', data.session.sessionLocation || '—'],
      ])

      // Client Information
      addSection('CLIENT INFORMATION (from Admin Session Setup)', [
        ['Name', `${data.client.firstName} ${data.client.lastName}`],
        ['Email', data.client.emailNormalized],
        ['Phone', data.client.phoneNormalized || '—'],
        ['Instagram', data.client.instagramHandle || '—'],
        ['Note', 'This information was entered by the admin when creating the session'],
      ])

      // Client Information from Form Submission - Contact Details (with admin fallback)
      if (intake) {
        const hasFormClientData = !!(intake.clientFirstName || intake.clientLastName || intake.clientEmail || intake.clientPhone)
        addSection('CLIENT INFORMATION (from Form Submission - Contact Details)', [
          ['Name', 
            intake.clientFirstName || intake.clientLastName 
              ? (intake.clientFirstName && intake.clientLastName ? `${intake.clientFirstName} ${intake.clientLastName}` : (intake.clientFirstName || intake.clientLastName))
              : `${data.client.firstName} ${data.client.lastName}`
          ],
          ['Email', intake.clientEmail || data.client.emailNormalized],
          ['Phone', intake.clientPhone || data.client.phoneNormalized || '—'],
          ['Note', hasFormClientData 
            ? 'This information was entered by the client during form submission. Compare with admin setup above to verify consistency.'
            : 'This submission predates the form capture feature. Contact information shown is from admin session setup.'],
        ])
      }

      // Submission Details
      if (intake) {
        const submissionContent: Array<[string, string]> = [
          ['Status', intake.status],
          ['Submitted At', formatDate(intake.submittedAt) !== '—' ? formatDate(intake.submittedAt) : 'Not submitted'],
          ['Ongoing Consent Acknowledged', intake.ongoingConsentAcknowledged ? 'Yes ✓' : 'No'],
          ['Accurate Information Acknowledged', intake.accurateInformationAcknowledged ? 'Yes ✓' : 'No'],
        ]
        
        // Image Privacy Preference
        if (intake.imageUseElection) {
          submissionContent.push(['Image Privacy Preference', formatImageUseElection(intake.imageUseElection)])
        }
        
        // MVP Compliance Fields
        submissionContent.push(
          ['Agreement Accepted', intake.agreementAccepted ? 'Yes ✓' : 'No'],
          ['Agreement Timestamp', intake.agreementAcceptedAt ? formatDate(intake.agreementAcceptedAt) : 'Not recorded'],
          ['Device IP Hash', intake.submittedIpHash || 'Not recorded'],
          ['Browser/Device', intake.userAgentSummary || 'Not recorded'],
          ['Email Verified', intake.emailVerified ? 'Yes ✓' : 'No']
        )
        
        addSection('SUBMISSION DETAILS', submissionContent)

        // Client Information from Form Submission
        const clientSubmissionContent: Array<[string, string]> = []
        clientSubmissionContent.push(['Note', 'This information was entered by the client in their form submission'])
        if (intake.instagramHandle) clientSubmissionContent.push(['Instagram Handle', intake.instagramHandle])
        if (intake.supportPersonAttending) {
          clientSubmissionContent.push(['Support Person Attending', 'Yes ✓'])
          if (intake.supportPersonName) clientSubmissionContent.push(['Support Person Name', intake.supportPersonName])
        }
        if (intake.instagramTagPermission) clientSubmissionContent.push(['Instagram Tag Permission', intake.instagramTagPermission])
        if (intake.collaboratorCreditPermission) clientSubmissionContent.push(['Collaborator Credit Permission', intake.collaboratorCreditPermission])
        if (clientSubmissionContent.length > 1) addSection('CLIENT INFORMATION (from Form Submission)', clientSubmissionContent)

        // Session Vision & Vibe
        const visionContent: Array<[string, string]> = []
        if (intake.desiredFeelings?.length > 0) visionContent.push(['Desired Feelings', intake.desiredFeelings.join(', ')])
        if (intake.visualStyles?.length > 0) visionContent.push(['Visual Styles', intake.visualStyles.join(', ')])
        if (intake.posingStyles?.length > 0) visionContent.push(['Posing Styles', intake.posingStyles.join(', ')])
        if (intake.posingIntensity) visionContent.push(['Posing Intensity', intake.posingIntensity])
        if (visionContent.length > 0) addSection('SESSION VISION & VIBE', visionContent)

        // Coverage & Boundaries
        const coverageContent: Array<[string, string]> = []
        if (intake.coveragePreferences?.length > 0) coverageContent.push(['Coverage Preferences', intake.coveragePreferences.join(', ')])
        if (intake.coverageDecision) coverageContent.push(['Coverage Decision', intake.coverageDecision])
        if (intake.hardCoverageBoundaries) coverageContent.push(['Coverage Boundaries', intake.hardCoverageBoundaries])
        if (intake.poseBoundaries) coverageContent.push(['Pose Boundaries', intake.poseBoundaries])
        if (intake.cameraAngleBoundaries) coverageContent.push(['Camera Angle Boundaries', intake.cameraAngleBoundaries])
        if (intake.wardrobeAdjustmentBoundaries) coverageContent.push(['Wardrobe Adjustment Boundaries', intake.wardrobeAdjustmentBoundaries])
        if (intake.areasToEmphasize) coverageContent.push(['Areas to Emphasize', intake.areasToEmphasize])
        if (intake.areasToPhotographDiscreetly) coverageContent.push(['Areas to Photograph Discreetly', intake.areasToPhotographDiscreetly])
        if (coverageContent.length > 0) addSection('COVERAGE & BOUNDARIES', coverageContent)

        // Music Preferences
        const musicContent: Array<[string, string]> = []
        if (intake.favoriteSong) musicContent.push(['Favorite Song', intake.favoriteSong])
        if (intake.favoriteArtists) musicContent.push(['Favorite Artists', intake.favoriteArtists])
        if (intake.musicGenres?.length > 0) musicContent.push(['Music Genres', intake.musicGenres.join(', ')])
        if (intake.playlistUrl) musicContent.push(['Playlist URL', intake.playlistUrl])
        if (intake.explicitLyricsAllowed) musicContent.push(['Explicit Lyrics Allowed', intake.explicitLyricsAllowed])
        if (intake.musicToAvoid) musicContent.push(['Music to Avoid', intake.musicToAvoid])
        if (musicContent.length > 0) addSection('MUSIC PREFERENCES', musicContent)

        // Wardrobe Planning
        const wardrobeContent: Array<[string, string]> = []
        if (intake.wardrobePlans?.length > 0) wardrobeContent.push(['Wardrobe Plans', intake.wardrobePlans.join(', ')])
        if (intake.clothingSizes) wardrobeContent.push(['Clothing Sizes', intake.clothingSizes])
        if (intake.favoriteColorsStyles) wardrobeContent.push(['Favorite Colors & Styles', intake.favoriteColorsStyles])
        if (intake.dislikedColorsStyles) wardrobeContent.push(['Disliked Colors & Styles', intake.dislikedColorsStyles])
        if (wardrobeContent.length > 0) addSection('WARDROBE PLANNING', wardrobeContent)

        // Comfort & Support
        const comfortContent: Array<[string, string]> = []
        if (intake.mobilityPositioningNotes) comfortContent.push(['Mobility & Positioning Notes', intake.mobilityPositioningNotes])
        if (intake.supportPersonAttending) comfortContent.push(['Support Person Attending', 'Yes'])
        if (intake.supportPersonName) comfortContent.push(['Support Person Name', intake.supportPersonName])
        if (comfortContent.length > 0) addSection('COMFORT & SUPPORT', comfortContent)

        // Social Media & Credits
        const socialContent: Array<[string, string]> = []
        if (intake.instagramHandle) socialContent.push(['Instagram Handle', intake.instagramHandle])
        if (intake.instagramTagPermission) socialContent.push(['Instagram Tag Permission', intake.instagramTagPermission])
        if (intake.collaboratorCreditPermission) socialContent.push(['Collaborator Credit Permission', intake.collaboratorCreditPermission])
        if (socialContent.length > 0) addSection('SOCIAL MEDIA & CREDITS', socialContent)

        // Additional Image Comments
        if (intake.additionalImageComments) {
          addSection('ADDITIONAL IMAGE COMMENTS', [
            ['Comments', intake.additionalImageComments]
          ])
        }

        // Additional Notes
        if (intake.additionalPrivateNotes) {
          addSection('ADDITIONAL NOTES', [
            ['Private Notes', intake.additionalPrivateNotes]
          ])
        }

        // Session Agreement - Part 1 (Items 1-14)
        // Force new page to ensure agreement starts on page 4
        pdf.addPage()
        yPos = margin
        addPageHeader()
        
        pdf.setFont('Helvetica', 'bold')
        pdf.setFontSize(11)
        pdf.setTextColor(charcoal[0], charcoal[1], charcoal[2])
        pdf.text('AGREEMENT DETAILS', margin, yPos)
        yPos += 7
        
        pdf.setDrawColor(champagne[0], champagne[1], champagne[2])
        pdf.setLineWidth(0.5)
        pdf.line(margin, yPos - 1, margin + contentWidth, yPos - 1)
        yPos += 6
        
        pdf.setFont('Helvetica', 'normal')
        pdf.setFontSize(7.5)
        pdf.setTextColor(smoke[0], smoke[1], smoke[2])
        
        const agreementPart1 = `SECOND SKIN BOUDOIR - PHOTOGRAPHY SESSION AGREEMENT & MODEL RELEASE

This Agreement is made between Second Skin Boudoir ("Photographer," "Studio," "we," or "us") and you ("Client," "you," or "your") for a private boudoir photography session and related products.

Privacy Default: Your images will not be shared online, in advertising, in print, or publicly unless you give written permission in the Image Privacy section of this questionnaire or in a later signed release.

1. Session Fee and Reservation: The session fee reserves the session date and covers planning, wardrobe guidance, the private boudoir session, fully guided posing, and the private reveal and ordering appointment. Unless expressly stated in writing, the session fee does not include albums, digital files, printed artwork, hair and makeup, location fees, parking, travel, sales tax, or products.

2. Artwork, Products, and Collections: Albums, digital files, printed artwork, and collections are selected separately after the session at the private reveal and ordering appointment. Product pricing and collection details are provided in the current Second Skin Boudoir pricing guide and may change until the session is booked or an order is placed.

3. Payments and Product Orders: Product orders, albums, digitals, collection upgrades, payment-plan deposits, and custom artwork orders are final once approved by you. Because products are custom-made, no product order may be canceled, refunded, reduced, or exchanged after your approval except as required by law or expressly agreed in writing by Photographer.

4. Payment Plans: If a payment plan is used, products may not be delivered until the order is paid in full unless Photographer agrees otherwise in writing. Missed, late, reversed, or disputed payments may delay editing, production, delivery, or product release. You remain responsible for the full balance of any approved order.

5. Rescheduling, Cancellation, and No-Show: You may request one reschedule with at least seven (7) calendar days notice, subject to availability. Additional reschedules, short-notice reschedules, cancellations, late arrivals, or no-shows may require a new session fee. Session fees are non-refundable because the date, planning time, and creative resources are reserved for you.

6. Late Arrival: If you arrive late, the session may be shortened to protect the schedule and location booking. Full session fees and product pricing still apply. Arrival more than thirty (30) minutes late may be treated as a no-show unless Photographer agrees otherwise.

7. Hair, Makeup, Wardrobe, and Styling: If hair and makeup are included, you agree to arrive on time with clean, dry hair and a clean face unless instructed otherwise. You are responsible for bringing wardrobe pieces, accessories, shoes, and personal items unless otherwise agreed. Photographer may provide styling guidance but does not guarantee fit, availability, or performance of any garment.

8. Artistic Style and Creative Control: You have reviewed the style and portfolio of Second Skin Boudoir and understand that photography is subjective. Photographer retains full creative discretion over lighting, posing, angles, image selection, editing style, cropping, color, retouching, and final artistic interpretation.

9. Image Selection and Editing: Photographer selects the images presented at the reveal. Raw, unedited, rejected, test, duplicate, or outtake images are not included and will not be delivered. Final images receive professional editing consistent with the Studio style. Extensive body modification, advanced retouching, composites, wardrobe alteration, background replacement, or re-editing may require additional fees.

10. Privacy and Confidentiality: Photographer will take reasonable steps to protect your privacy, image security, and confidentiality. Images will not be publicly shared without written permission. You also agree not to publicly post private behind-the-scenes materials, screenshots of unpurchased proofs, Studio communications, or confidential pricing documents without permission.

11. Copyright and Client License: Photographer owns the copyright to all images created during the session. You receive a personal-use license only for purchased digital images. You may print, share privately, post personally, and gift purchased images, but may not sell, license, alter, filter, edit, enter into contests, use commercially, provide to vendors for advertising, or claim authorship without written permission.

12. Social Media Credit and Alteration: When posting purchased images online, you agree not to apply filters, heavy edits, AI alterations, or modifications that materially change the image or Studio style. Credit to Second Skin Boudoir is appreciated but not required unless image use is commercial or promotional.

13. Image Storage and Archive: Photographer is not required to retain images indefinitely. Unpurchased images may be deleted after thirty (30) days from the reveal. Purchased final images are typically archived for at least ninety (90) days after delivery, but you are responsible for downloading and backing up delivered files.

14. Client Conduct, Safety, and Boundaries: This is a professional photography session. You agree to respectful communication and conduct. Photographer may stop or cancel the session immediately if there is harassment, unsafe conduct, intoxication, illegal activity, threats, boundary violations, or behavior that compromises safety or professionalism. In that event, no refund is due.`
        
        const agreementLines1 = pdf.splitTextToSize(agreementPart1, contentWidth)
        // Render agreement lines with page break checking
        agreementLines1.forEach((line: string) => {
          checkNewPage(6)
          pdf.text(line, margin, yPos)
          yPos += lineHeight
        })
        
        // Continue with Agreement Part 2 (Items 15-26) - let it flow naturally
        pdf.setFont('Helvetica', 'normal')
        pdf.setFontSize(7.5)
        pdf.setTextColor(smoke[0], smoke[1], smoke[2])
        
        const agreementPart2 = `15. Professional Boudoir Context, Consent, and Boundaries: You understand that boudoir photography may include discussion of intimate wardrobe, covered or implied nudity, posing, facial expression, body positioning, sensual styling, and artistic direction. You consent to receive professional direction within this context and agree that ordinary, disclosed, consent-based posing direction, wardrobe guidance, and image creation inherent in a boudoir session do not, by themselves, constitute sexual harassment or misconduct. Photographer will avoid physical contact except minor pose, hair, or wardrobe adjustments after your consent, and you may decline, pause, modify, or stop any pose or adjustment at any time.

16. Age, Capacity, and Consent: You represent that you are at least eighteen (18) years old, have the legal capacity to sign this Agreement, and are voluntarily choosing to participate. Second Skin Boudoir does not photograph minors for boudoir sessions.

17. Location Rules and Property: You agree to follow all location, hotel, rental, studio, or venue rules. You are responsible for damage caused by you or your guests to the location, props, furnishings, wardrobe items, or equipment. You are responsible for all location-specific fees unless otherwise stated in writing.

18. Guests and Companions: You may bring one supportive adult guest only if approved in advance by Photographer. Guests may be asked to leave if they interrupt the session, create discomfort, record without permission, or interfere with the creative process.

19. No Recording or Behind-the-Scenes Capture: You and guests may not photograph, film, livestream, or record the session, set, location, proofs, reveal screen, or Photographer without written permission. This protects privacy, copyright, and the controlled nature of the session.

20. Health, Physical Limitations, and Personal Responsibility: You agree to notify Photographer before the session of any relevant physical limitations, injuries, pregnancy considerations, allergies, mobility issues, or posing restrictions. You are responsible for communicating discomfort during posing. Photographer will make reasonable posing adjustments when notified.

21. Force Majeure and Unavoidable Events: Neither party is responsible for delay or non-performance caused by events beyond reasonable control, including illness, emergency, weather, venue cancellation, power outage, equipment failure, natural disaster, travel disruption, government restriction, or other unavoidable event. The remedy will generally be rescheduling or substitution of comparable services.

22. Equipment Failure and Limitation of Liability: Photographer uses reasonable care with equipment, storage, and workflow. If images are lost, damaged, unavailable, or materially defective due to equipment failure, data corruption, accident, or other cause beyond reasonable control, Photographer liability is limited to rescheduling the session or refunding amounts paid for the affected service or product.

23. Chargebacks and Collection Costs: You agree to contact Photographer first in good faith regarding any billing concern. Unauthorized chargebacks, payment reversals, or disputed payments for valid charges may result in suspension of delivery and collection of the unpaid amount, plus reasonable processing fees, collection costs, and attorney fees where allowed by law.

24. Indemnification: You agree to indemnify and hold Photographer harmless from claims, damages, losses, or expenses arising from your breach of this Agreement, your misuse of images, unauthorized commercial use, location issues, your guests, or inaccurate information provided by you.

25. Governing Law, Venue, and Dispute Resolution: This Agreement is governed by the laws of the State of Florida. The parties agree to attempt good-faith informal resolution before filing any claim. If a claim is filed, venue will be in the county in Florida where Photographer maintains its principal business location unless the parties agree otherwise in writing.

26. Entire Agreement and Severability: This Agreement, any signed product order, and any written pricing or invoice terms form the entire agreement between the parties. If any provision is found unenforceable, the remaining provisions remain in effect. Changes must be in writing and signed or acknowledged by both parties.`
        
        const agreementLines2 = pdf.splitTextToSize(agreementPart2, contentWidth)
        // Render agreement lines with page break checking
        agreementLines2.forEach((line: string) => {
          checkNewPage(6)
          pdf.text(line, margin, yPos)
          yPos += lineHeight
        })
      }

      // Add footer to all pages
      const pageCount = (pdf as any).internal.pages.length - 1
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setDrawColor(lightGray[0], lightGray[1], lightGray[2])
        pdf.setLineWidth(0.5)
        pdf.line(margin, pageHeight - margin + 2, pageWidth - margin, pageHeight - margin + 2)
        
        pdf.setFont('Helvetica', 'normal')
        pdf.setFontSize(8)
        pdf.setTextColor(smoke[0], smoke[1], smoke[2])
        pdf.text(
          `Generated: ${new Date().toLocaleString()}`,
          margin,
          pageHeight - margin + 6
        )
        pdf.text(
          `Page ${i} of ${pageCount}`,
          pageWidth - margin - 20,
          pageHeight - margin + 6
        )
      }

      // MVP Compliance Footer: Add audit trail information to final page
      const finalPageCount = pdf.getNumberOfPages()
      pdf.setPage(finalPageCount)
      
      // Add compliance footer with legal audit information - positioned higher for visibility
      pdf.setFont('Helvetica', 'bold')
      pdf.setFontSize(10)
      pdf.setTextColor(charcoal[0], charcoal[1], charcoal[2])
      
      // Position compliance section near bottom but with room to breathe
      const complianceY = pageHeight - 55  // Moved up from pageHeight - 20 (now has more space above)
      
      // Add subtle background rectangle for the compliance section
      pdf.setFillColor(240, 240, 240)  // Light gray background
      pdf.rect(margin - 3, complianceY - 5, contentWidth + 6, 48, 'F')
      
      pdf.text('DIGITALLY SIGNED CONTRACT', margin, complianceY)
      
      pdf.setFont('Helvetica', 'normal')
      pdf.setFontSize(6.5)
      pdf.setTextColor(smoke[0], smoke[1], smoke[2])
      
      // Compliance details - split into separate lines for readability
      const submissionData = intake || data.intakes[0]
      const complianceDetails = [
        `Session ID: ${data.session.id}`,
        `Submitted: ${formatDate(submissionData?.submittedAt || new Date())} | IP Hash: ${submissionData?.submittedIpHash ? submissionData.submittedIpHash : 'Not recorded'}`,
        `Device: ${submissionData?.userAgentSummary || 'Not recorded'}`,
        `Agreement: ${submissionData?.agreementAccepted ? 'Accepted ✓' : 'Not confirmed'} | Privacy: ${submissionData?.imageUseElection ? formatImageUseElection(submissionData.imageUseElection) : 'Not specified'}`,
      ]
      
      let complianceLineY = complianceY + 6
      complianceDetails.forEach((detail) => {
        pdf.text(detail, margin + 1, complianceLineY)
        complianceLineY += 4
      })
      
      // Bottom watermark
      pdf.setFont('Helvetica', 'italic')
      pdf.setFontSize(6)
      pdf.setTextColor(smoke[0], smoke[1], smoke[2])
      pdf.text('Original Submission - Do Not Alter - Immutable Audit Record', margin, pageHeight - 2)

      // Download the PDF
      const filename = `${data.client.firstName}-${data.client.lastName}-Session-Intake-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(filename)
    } catch (err) {
      console.error('PDF export failed:', err)
      alert('Failed to generate PDF')
    } finally {
      setIsExporting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">Loading...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <h3 className="font-serif text-xl text-charcoal mb-4">Error</h3>
          <p className="text-smoke mb-6">{error || 'Failed to load details'}</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-charcoal text-white rounded-lg hover:bg-charcoal/80"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  const intake = data.intakes[0]
  const webhook = data.webhookDeliveries[0]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-charcoal to-espresso p-6 border-b border-smoke/20 flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl text-ivory mb-1">
              {data.client.firstName} {data.client.lastName}
            </h2>
            <p className="text-ivory/70">{isEditMode ? 'Editing Session...' : data.session.sessionType}</p>
            {saveMessage && (
              <p className={`text-xs mt-2 ${saveMessage.type === 'success' ? 'text-champagne' : 'text-rose'}`}>
                {saveMessage.text}
              </p>
            )}
          </div>
          <div className="flex gap-3 items-center">
            {isEditMode ? (
              // Edit mode buttons
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleSaveSessionChanges}
                  disabled={isSaving}
                  className="px-3 py-1 bg-champagne/20 text-champagne text-xs rounded hover:bg-champagne/30 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditMode(false)
                    setSaveMessage(null)
                  }}
                  disabled={isSaving}
                  className="px-3 py-1 bg-rose/10 text-rose text-xs rounded hover:bg-rose/20 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              // View mode buttons
              <>
                {data.session.agreementStatus === 'pending' && (
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="px-3 py-1 bg-rose/10 text-rose text-xs rounded hover:bg-rose/20 transition-colors"
                  >
                    Edit Session
                  </button>
                )}
                {intake && (
                  <div className="flex flex-col gap-2">
                    <select 
                      value={intake.reviewStatus || 'needs_review'}
                      onChange={(e) => {
                        fetch(`/api/admin/session-prep/submissions`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                            'x-admin-token': adminToken,
                          },
                          body: JSON.stringify({
                            intakeId: intake.id,
                            reviewStatus: e.target.value,
                          }),
                        }).then(() => window.location.reload())
                      }}
                      className="px-3 py-1 border border-ivory/30 rounded-lg bg-charcoal/80 text-ivory text-xs"
                    >
                      <option value="needs_review">Needs Review</option>
                      <option value="reviewed">Reviewed</option>
                    </select>
                    <button
                      onClick={() => {
                        fetch(`/api/admin/session-prep/generate-token?sessionId=${data.session.id}`, {
                          headers: { 'x-admin-token': adminToken },
                        })
                        .then(r => r.json())
                        .then(d => {
                          navigator.clipboard.writeText(d.data.prepLink)
                          alert('Session link copied!')
                        })
                      }}
                      className="px-3 py-1 bg-champagne/20 text-champagne text-xs rounded hover:bg-champagne/30 transition-colors"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={() => {
                        if(confirm('Delete this submission?')) {
                          fetch(`/api/admin/session-prep/submissions?intakeId=${intake.id}`, {
                            method: 'DELETE',
                            headers: { 'x-admin-token': adminToken },
                          }).then(() => onClose())
                        }
                      }}
                      className="px-3 py-1 bg-rose/10 text-rose text-xs rounded hover:bg-rose/20 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
            <button
              onClick={onClose}
              className="text-ivory text-2xl hover:opacity-70"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content - this div will be captured for PDF */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8" ref={contentRef}>
          <div className="space-y-8 max-w-4xl">
            {/* Session Info */}
            <Section title="Session Information">
              {isEditMode ? (
                <div className="space-y-4 p-4 bg-charcoal/5 rounded-lg border border-smoke/20">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Session Type</label>
                    <input
                      type="text"
                      value={editData.sessionType}
                      onChange={(e) => setEditData({ ...editData, sessionType: e.target.value })}
                      className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-white text-charcoal placeholder-smoke/50 focus:outline-none focus:border-rose"
                      placeholder="e.g., Boudoir, Bridal, etc."
                    />
                  </div>
                  <div>
                    <label htmlFor="session-date" className="block text-sm font-semibold text-charcoal mb-2">Session Date 📅</label>
                    <input
                      id="session-date"
                      type="date"
                      value={editData.sessionDate}
                      onChange={(e) => setEditData({ ...editData, sessionDate: e.target.value })}
                      className="w-full px-4 py-2 border border-smoke/30 rounded-lg bg-white text-charcoal focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 cursor-pointer font-medium"
                    />
                    <p className="text-xs text-smoke mt-1">Current: {editData.sessionDate || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Location</label>
                    <input
                      type="text"
                      value={editData.sessionLocation}
                      onChange={(e) => setEditData({ ...editData, sessionLocation: e.target.value })}
                      className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-white text-charcoal placeholder-smoke/50 focus:outline-none focus:border-rose"
                      placeholder="e.g., Studio, Client Home, Destination"
                    />
                  </div>
                  <div className="p-2 bg-rose/5 border border-rose/20 rounded text-xs text-smoke italic">
                    Note: These changes will update the session details. Agreement Status cannot be changed from draft mode here.
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Detail label="Type" value={data.session.sessionType} />
                  <Detail label="Agreement Status" value={data.session.agreementStatus} />
                  <Detail label="Session Date" value={data.session.sessionDate ? new Date(data.session.sessionDate).toLocaleDateString() : '—'} />
                  <Detail label="Location" value={data.session.sessionLocation || '—'} />
                </div>
              )}
            </Section>

            {/* Client Info */}
            <Section title="Client Information (from Admin Session Setup)">
              <div className="grid grid-cols-2 gap-4">
                <Detail label="Name" value={`${data.client.firstName} ${data.client.lastName}`} />
                <Detail label="Email" value={data.client.emailNormalized} />
                <Detail label="Phone" value={data.client.phoneNormalized || '—'} />
                <Detail label="Instagram" value={data.client.instagramHandle || '—'} />
              </div>
              <div className="mt-4 p-3 bg-charcoal/5 rounded border border-smoke/20 text-xs text-smoke italic">
                Note: This information was entered by the admin when creating the session
              </div>
            </Section>

            {/* Client Submitted Contact Info (with admin fallback for old submissions) */}
            {intake && (
              <Section title="Client Information (from Form Submission - Contact Details)">
                <div className="grid grid-cols-2 gap-4">
                  <Detail 
                    label="Name" 
                    value={
                      intake.clientFirstName || intake.clientLastName 
                        ? (intake.clientFirstName && intake.clientLastName ? `${intake.clientFirstName} ${intake.clientLastName}` : (intake.clientFirstName || intake.clientLastName))
                        : `${data.client.firstName} ${data.client.lastName}`
                    } 
                  />
                  <Detail label="Email" value={intake.clientEmail || data.client.emailNormalized} />
                  <Detail label="Phone" value={intake.clientPhone || data.client.phoneNormalized || '—'} />
                </div>
                <div className="mt-4 p-3 bg-charcoal/5 rounded border border-smoke/20 text-xs text-smoke italic">
                  {intake.clientFirstName || intake.clientLastName || intake.clientEmail || intake.clientPhone 
                    ? "Note: This information was entered by the client during form submission. Compare with admin setup above to verify consistency."
                    : "Note: This submission predates the form capture feature. Contact information shown is from admin session setup."}
                </div>
              </Section>
            )}

            {/* Intake Submission Info */}
            {intake && (
              <>
                <Section title="Submission Details">
                  <div className="space-y-4">
                    <Detail label="Status" value={intake.status} />
                    <Detail label="Submitted At" value={intake.submittedAt ? new Date(intake.submittedAt).toLocaleString() : 'Not submitted'} />
                    <div className="grid grid-cols-2 gap-4">
                      <Detail label="Ongoing Consent Acknowledged" value={intake.ongoingConsentAcknowledged ? 'Yes ✓' : 'No'} />
                      <Detail label="Accurate Information Acknowledged" value={intake.accurateInformationAcknowledged ? 'Yes ✓' : 'No'} />
                    </div>
                    {intake.imageUseElection && (
                      <Detail label="Image Privacy Preference" value={intake.imageUseElection === 'no_public_sharing' ? 'No Public Sharing (Private Collection)' : intake.imageUseElection === 'anonymous_detail' ? 'Anonymous/Detail Sharing' : 'Full Model Release'} />
                    )}
                  </div>
                </Section>

                {/* Client Information from Form Submission */}
                <Section title="Client Information (from Form Submission)">
                  <div className="space-y-4">
                    {intake.instagramHandle && (
                      <Detail label="Instagram Handle" value={intake.instagramHandle} />
                    )}
                    {intake.supportPersonAttending && (
                      <div>
                        <Detail label="Support Person Attending" value="Yes ✓" />
                        {intake.supportPersonName && (
                          <Detail label="Support Person Name" value={intake.supportPersonName} />
                        )}
                      </div>
                    )}
                    {intake.instagramTagPermission && (
                      <Detail label="Instagram Tag Permission" value={intake.instagramTagPermission} />
                    )}
                    {intake.collaboratorCreditPermission && (
                      <Detail label="Collaborator Credit Permission" value={intake.collaboratorCreditPermission} />
                    )}
                    {!intake.instagramHandle && !intake.supportPersonAttending && !intake.instagramTagPermission && !intake.collaboratorCreditPermission && (
                      <Detail label="Client Info" value="No additional client information provided" />
                    )}
                  </div>
                  <div className="mt-4 p-3 bg-charcoal/5 rounded border border-smoke/20 text-xs text-smoke italic">
                    Note: This information was entered by the client in their form submission
                  </div>
                </Section>

                {/* Session Vision */}
                <Section title="Session Vision & Vibe">
                  <div className="space-y-4">
                    {intake.desiredFeelings?.length > 0 && (
                      <Detail label="Desired Feelings" value={intake.desiredFeelings.join(', ')} />
                    )}
                    {intake.visualStyles?.length > 0 && (
                      <Detail label="Visual Styles" value={intake.visualStyles.join(', ')} />
                    )}
                    {intake.posingStyles?.length > 0 && (
                      <Detail label="Posing Styles" value={intake.posingStyles.join(', ')} />
                    )}
                    {intake.posingIntensity && (
                      <Detail label="Posing Intensity" value={intake.posingIntensity} />
                    )}
                  </div>
                </Section>

                {/* Coverage & Boundaries */}
                <Section title="Coverage & Boundaries">
                  <div className="space-y-4">
                    {intake.coveragePreferences?.length > 0 && (
                      <Detail label="Coverage Preferences" value={intake.coveragePreferences.join(', ')} />
                    )}
                    {intake.coverageDecision && (
                      <Detail label="Coverage Decision" value={intake.coverageDecision} />
                    )}
                    {intake.hardCoverageBoundaries && (
                      <Detail label="Coverage Boundaries" value={intake.hardCoverageBoundaries} isLong={true} />
                    )}
                    {intake.poseBoundaries && (
                      <Detail label="Pose Boundaries" value={intake.poseBoundaries} isLong={true} />
                    )}
                    {intake.cameraAngleBoundaries && (
                      <Detail label="Camera Angle Boundaries" value={intake.cameraAngleBoundaries} isLong={true} />
                    )}
                    {intake.wardrobeAdjustmentBoundaries && (
                      <Detail label="Wardrobe Adjustment Boundaries" value={intake.wardrobeAdjustmentBoundaries} isLong={true} />
                    )}
                    {intake.areasToEmphasize && (
                      <Detail label="Areas to Emphasize" value={intake.areasToEmphasize} isLong={true} />
                    )}
                    {intake.areasToPhotographDiscreetly && (
                      <Detail label="Areas to Photograph Discreetly" value={intake.areasToPhotographDiscreetly} isLong={true} />
                    )}
                  </div>
                </Section>

                {/* Music Preferences */}
                <Section title="Music Preferences">
                  <div className="space-y-4">
                    {intake.favoriteSong && (
                      <Detail label="Favorite Song" value={intake.favoriteSong} />
                    )}
                    {intake.favoriteArtists && (
                      <Detail label="Favorite Artists" value={intake.favoriteArtists} />
                    )}
                    {intake.musicGenres?.length > 0 && (
                      <Detail label="Music Genres" value={intake.musicGenres.join(', ')} />
                    )}
                    {intake.playlistUrl && (
                      <Detail label="Playlist URL" value={intake.playlistUrl} />
                    )}
                    {intake.explicitLyricsAllowed && (
                      <Detail label="Explicit Lyrics" value={intake.explicitLyricsAllowed} />
                    )}
                    {intake.musicToAvoid && (
                      <Detail label="Music to Avoid" value={intake.musicToAvoid} isLong={true} />
                    )}
                  </div>
                </Section>

                {/* Wardrobe Planning */}
                <Section title="Wardrobe Planning">
                  <div className="space-y-4">
                    {intake.wardrobePlans?.length > 0 && (
                      <Detail label="Wardrobe Plans" value={intake.wardrobePlans.join(', ')} />
                    )}
                    {intake.wardrobeGuidanceRequested && (
                      <Detail label="Wardrobe Guidance Requested" value="Yes ✓" />
                    )}
                    {intake.clothingSizes && (
                      <Detail label="Clothing Sizes" value={intake.clothingSizes} />
                    )}
                    {intake.favoriteColorsStyles && (
                      <Detail label="Favorite Colors & Styles" value={intake.favoriteColorsStyles} isLong={true} />
                    )}
                    {intake.dislikedColorsStyles && (
                      <Detail label="Disliked Colors & Styles" value={intake.dislikedColorsStyles} isLong={true} />
                    )}
                  </div>
                </Section>

                {/* Comfort & Support */}
                <Section title="Comfort & Support">
                  <div className="space-y-4">
                    {intake.mobilityPositioningNotes && (
                      <Detail label="Mobility & Positioning Notes" value={intake.mobilityPositioningNotes} isLong={true} />
                    )}
                    {intake.supportPersonAttending && (
                      <div>
                        <Detail label="Support Person Attending" value="Yes ✓" />
                        {intake.supportPersonName && (
                          <Detail label="Support Person Name" value={intake.supportPersonName} />
                        )}
                      </div>
                    )}
                  </div>
                </Section>

                {/* Social Media & Credits */}
                <Section title="Social Media & Credits">
                  <div className="space-y-4">
                    {intake.instagramHandle && (
                      <Detail label="Instagram Handle" value={intake.instagramHandle} />
                    )}
                    {intake.instagramTagPermission && (
                      <Detail label="Instagram Tag Permission" value={intake.instagramTagPermission} />
                    )}
                    {intake.collaboratorCreditPermission && (
                      <Detail label="Collaborator Credit Permission" value={intake.collaboratorCreditPermission} />
                    )}
                  </div>
                </Section>

                {/* Additional Image Comments */}
                {intake.additionalImageComments && (
                  <Section title="Additional Image Comments">
                    <Detail label="Comments" value={intake.additionalImageComments} isLong={true} />
                  </Section>
                )}

                {/* Additional Notes */}
                {intake.additionalPrivateNotes && (
                  <Section title="Additional Private Notes">
                    <Detail label="Notes" value={intake.additionalPrivateNotes} isLong={true} />
                  </Section>
                )}

                {/* Digital Signature & Compliance Audit */}
                {(intake.agreementAccepted || intake.agreementAcceptedAt || intake.submittedIpHash || intake.userAgentSummary) && (
                  <Section title="Digital Signature & Compliance Audit Trail">
                    <div className="space-y-2 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      {intake.agreementAccepted && (
                        <Detail label="Agreement Accepted" value="Yes ✓" />
                      )}
                      {intake.agreementAcceptedAt && (
                        <Detail label="Accepted Timestamp" value={new Date(intake.agreementAcceptedAt).toLocaleString()} />
                      )}
                      {intake.submittedIpHash && (
                        <Detail label="Device IP Hash" value={intake.submittedIpHash} />
                      )}
                      {intake.userAgentSummary && (
                        <Detail label="Browser/Device" value={intake.userAgentSummary} />
                      )}
                    </div>
                  </Section>
                )}

                {/* Agreement Details */}
                <Section title="Session Agreement">
                  <div className="space-y-4 bg-charcoal/2 p-4 rounded-lg border border-smoke/20 max-h-96 overflow-y-auto text-xs leading-relaxed text-charcoal">
                    <p className="text-sm font-serif text-lg font-bold mb-3">
                      SECOND SKIN BOUDOIR - PHOTOGRAPHY SESSION AGREEMENT & MODEL RELEASE
                    </p>
                    <p className="mb-3">
                      This Agreement is made between Second Skin Boudoir ("Photographer," "Studio," "we," or "us") and you ("Client," "you," or "your") for a private boudoir photography session and related products.
                    </p>
                    <p className="mb-3 p-2 bg-charcoal/5 rounded border border-champagne/30 font-semibold">
                      Privacy Default: Your images will not be shared online, in advertising, in print, or publicly unless you give written permission in the Image Privacy section of this questionnaire or in a later signed release.
                    </p>
                    <div className="space-y-2">
                      <p><strong>1. Session Fee and Reservation:</strong> The session fee reserves the session date and covers planning, wardrobe guidance, the private boudoir session, fully guided posing, and the private reveal and ordering appointment. Unless expressly stated in writing, the session fee does not include albums, digital files, printed artwork, hair and makeup, location fees, parking, travel, sales tax, or products.</p>
                      <p><strong>2. Artwork, Products, and Collections:</strong> Albums, digital files, printed artwork, and collections are selected separately after the session at the private reveal and ordering appointment. Product pricing and collection details are provided in the current Second Skin Boudoir pricing guide and may change until the session is booked or an order is placed.</p>
                      <p><strong>3. Payments and Product Orders:</strong> Product orders, albums, digitals, collection upgrades, payment-plan deposits, and custom artwork orders are final once approved by you. Because products are custom-made, no product order may be canceled, refunded, reduced, or exchanged after your approval except as required by law or expressly agreed in writing by Photographer.</p>
                      <p><strong>4. Payment Plans:</strong> If a payment plan is used, products may not be delivered until the order is paid in full unless Photographer agrees otherwise in writing. Missed, late, reversed, or disputed payments may delay editing, production, delivery, or product release. You remain responsible for the full balance of any approved order.</p>
                      <p><strong>5. Rescheduling, Cancellation, and No-Show:</strong> You may request one reschedule with at least seven (7) calendar days notice, subject to availability. Additional reschedules, short-notice reschedules, cancellations, late arrivals, or no-shows may require a new session fee. Session fees are non-refundable because the date, planning time, and creative resources are reserved for you.</p>
                      <p><strong>6. Late Arrival:</strong> If you arrive late, the session may be shortened to protect the schedule and location booking. Full session fees and product pricing still apply. Arrival more than thirty (30) minutes late may be treated as a no-show unless Photographer agrees otherwise.</p>
                      <p><strong>7. Hair, Makeup, Wardrobe, and Styling:</strong> If hair and makeup are included, you agree to arrive on time with clean, dry hair and a clean face unless instructed otherwise. You are responsible for bringing wardrobe pieces, accessories, shoes, and personal items unless otherwise agreed. Photographer may provide styling guidance but does not guarantee fit, availability, or performance of any garment.</p>
                      <p><strong>8. Artistic Style and Creative Control:</strong> You have reviewed the style and portfolio of Second Skin Boudoir and understand that photography is subjective. Photographer retains full creative discretion over lighting, posing, angles, image selection, editing style, cropping, color, retouching, and final artistic interpretation.</p>
                      <p><strong>9. Image Selection and Editing:</strong> Photographer selects the images presented at the reveal. Raw, unedited, rejected, test, duplicate, or outtake images are not included and will not be delivered. Final images receive professional editing consistent with the Studio style. Extensive body modification, advanced retouching, composites, wardrobe alteration, background replacement, or re-editing may require additional fees.</p>
                      <p><strong>10. Privacy and Confidentiality:</strong> Photographer will take reasonable steps to protect your privacy, image security, and confidentiality. Images will not be publicly shared without written permission. You also agree not to publicly post private behind-the-scenes materials, screenshots of unpurchased proofs, Studio communications, or confidential pricing documents without permission.</p>
                      <p><strong>11. Copyright and Client License:</strong> Photographer owns the copyright to all images created during the session. You receive a personal-use license only for purchased digital images. You may print, share privately, post personally, and gift purchased images, but may not sell, license, alter, filter, edit, enter into contests, use commercially, provide to vendors for advertising, or claim authorship without written permission.</p>
                      <p><strong>12. Social Media Credit and Alteration:</strong> When posting purchased images online, you agree not to apply filters, heavy edits, AI alterations, or modifications that materially change the image or Studio style. Credit to Second Skin Boudoir is appreciated but not required unless image use is commercial or promotional.</p>
                      <p><strong>13. Image Storage and Archive:</strong> Photographer is not required to retain images indefinitely. Unpurchased images may be deleted after thirty (30) days from the reveal. Purchased final images are typically archived for at least ninety (90) days after delivery, but you are responsible for downloading and backing up delivered files.</p>
                      <p><strong>14. Client Conduct, Safety, and Boundaries:</strong> This is a professional photography session. You agree to respectful communication and conduct. Photographer may stop or cancel the session immediately if there is harassment, unsafe conduct, intoxication, illegal activity, threats, boundary violations, or behavior that compromises safety or professionalism. In that event, no refund is due.</p>
                      <p><strong>15. Professional Boudoir Context, Consent, and Boundaries:</strong> You understand that boudoir photography may include discussion of intimate wardrobe, covered or implied nudity, posing, facial expression, body positioning, sensual styling, and artistic direction. You consent to receive professional direction within this context and agree that ordinary, disclosed, consent-based posing direction, wardrobe guidance, and image creation inherent in a boudoir session do not, by themselves, constitute sexual harassment or misconduct. Photographer will avoid physical contact except minor pose, hair, or wardrobe adjustments after your consent, and you may decline, pause, modify, or stop any pose or adjustment at any time.</p>
                      <p><strong>16. Age, Capacity, and Consent:</strong> You represent that you are at least eighteen (18) years old, have the legal capacity to sign this Agreement, and are voluntarily choosing to participate. Second Skin Boudoir does not photograph minors for boudoir sessions.</p>
                      <p><strong>17. Location Rules and Property:</strong> You agree to follow all location, hotel, rental, studio, or venue rules. You are responsible for damage caused by you or your guests to the location, props, furnishings, wardrobe items, or equipment. You are responsible for all location-specific fees unless otherwise stated in writing.</p>
                      <p><strong>18. Guests and Companions:</strong> You may bring one supportive adult guest only if approved in advance by Photographer. Guests may be asked to leave if they interrupt the session, create discomfort, record without permission, or interfere with the creative process.</p>
                      <p><strong>19. No Recording or Behind-the-Scenes Capture:</strong> You and guests may not photograph, film, livestream, or record the session, set, location, proofs, reveal screen, or Photographer without written permission. This protects privacy, copyright, and the controlled nature of the session.</p>
                      <p><strong>20. Health, Physical Limitations, and Personal Responsibility:</strong> You agree to notify Photographer before the session of any relevant physical limitations, injuries, pregnancy considerations, allergies, mobility issues, or posing restrictions. You are responsible for communicating discomfort during posing. Photographer will make reasonable posing adjustments when notified.</p>
                      <p><strong>21. Force Majeure and Unavoidable Events:</strong> Neither party is responsible for delay or non-performance caused by events beyond reasonable control, including illness, emergency, weather, venue cancellation, power outage, equipment failure, natural disaster, travel disruption, government restriction, or other unavoidable event. The remedy will generally be rescheduling or substitution of comparable services.</p>
                      <p><strong>22. Equipment Failure and Limitation of Liability:</strong> Photographer uses reasonable care with equipment, storage, and workflow. If images are lost, damaged, unavailable, or materially defective due to equipment failure, data corruption, accident, or other cause beyond reasonable control, Photographer liability is limited to rescheduling the session or refunding amounts paid for the affected service or product.</p>
                      <p><strong>23. Chargebacks and Collection Costs:</strong> You agree to contact Photographer first in good faith regarding any billing concern. Unauthorized chargebacks, payment reversals, or disputed payments for valid charges may result in suspension of delivery and collection of the unpaid amount, plus reasonable processing fees, collection costs, and attorney fees where allowed by law.</p>
                      <p><strong>24. Indemnification:</strong> You agree to indemnify and hold Photographer harmless from claims, damages, losses, or expenses arising from your breach of this Agreement, your misuse of images, unauthorized commercial use, location issues, your guests, or inaccurate information provided by you.</p>
                      <p><strong>25. Governing Law, Venue, and Dispute Resolution:</strong> This Agreement is governed by the laws of the State of Florida. The parties agree to attempt good-faith informal resolution before filing any claim. If a claim is filed, venue will be in the county in Florida where Photographer maintains its principal business location unless the parties agree otherwise in writing.</p>
                      <p><strong>26. Entire Agreement and Severability:</strong> This Agreement, any signed product order, and any written pricing or invoice terms form the entire agreement between the parties. If any provision is found unenforceable, the remaining provisions remain in effect. Changes must be in writing and signed or acknowledged by both parties.</p>
                    </div>
                  </div>
                </Section>
              </>
            )}

            {/* Webhook Status */}
            {webhook && (
              <Section title="Webhook Delivery Status">
                <div className="space-y-4">
                  <Detail label="Status" value={webhook.status} />
                  <Detail label="Attempts" value={webhook.attemptCount.toString()} />
                  <Detail label="Last Attempt" value={webhook.lastAttemptAt ? new Date(webhook.lastAttemptAt).toLocaleString() : '—'} />
                  <Detail label="Delivered At" value={webhook.deliveredAt ? new Date(webhook.deliveredAt).toLocaleString() : '—'} />
                  {webhook.lastHttpStatus && (
                    <Detail label="Last HTTP Status" value={webhook.lastHttpStatus.toString()} />
                  )}
                  {webhook.lastErrorSafeMessage && (
                    <Detail label="Last Error" value={webhook.lastErrorSafeMessage} isLong={true} />
                  )}
                </div>
              </Section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-charcoal/5 p-6 border-t border-smoke/20 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-charcoal/10 text-charcoal rounded-lg hover:bg-charcoal/20 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              const json = JSON.stringify({
                session: data.session,
                client: data.client,
                intakes: data.intakes,
              }, null, 2)
              navigator.clipboard.writeText(json)
              alert('Copied to clipboard')
            }}
            className="px-6 py-2 bg-champagne/10 text-champagne rounded-lg hover:bg-champagne/20 transition-colors"
          >
            Export JSON
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-6 py-2 bg-rose/10 text-rose rounded-lg hover:bg-rose/20 transition-colors disabled:opacity-50"
          >
            {isExporting ? 'Generating PDF...' : 'Export PDF'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-serif text-lg text-charcoal mb-4">{title}</h3>
      <div className="bg-charcoal/2 p-4 rounded-lg">{children}</div>
    </div>
  )
}

function Detail({
  label,
  value,
  isLong = false,
}: {
  label: string
  value: string
  isLong?: boolean
}) {
  return (
    <div>
      <p className="text-sm font-medium text-smoke mb-1">{label}</p>
      <p className={`text-charcoal ${isLong ? 'break-words text-sm' : ''}`}>{value}</p>
    </div>
  )
}
