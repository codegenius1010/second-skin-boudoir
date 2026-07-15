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
}

export default function AdminSessionDetail({ sessionId, adminToken, onClose }: AdminSessionDetailProps) {
  const [data, setData] = useState<DetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)
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
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetail()
  }, [sessionId, adminToken])

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
          yPos += 4
          
          // Put value on next line(s), indented slightly
          pdf.setFont('Helvetica', 'normal')
          pdf.setFontSize(8.5)
          pdf.setTextColor(charcoal[0], charcoal[1], charcoal[2])
          
          const valueLines = pdf.splitTextToSize(value, contentWidth - 8)
          pdf.text(valueLines, margin + 3, yPos)
          
          const textHeight = valueLines.length * lineHeight
          yPos += textHeight + 3
        })

        yPos += 2
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
      addSection('CLIENT INFORMATION', [
        ['Name', `${data.client.firstName} ${data.client.lastName}`],
        ['Email', data.client.emailNormalized],
        ['Phone', data.client.phoneNormalized || '—'],
        ['Instagram', data.client.instagramHandle || '—'],
      ])

      // Submission Details
      if (intake) {
        addSection('SUBMISSION DETAILS', [
          ['Status', intake.status],
          ['Submitted At', formatDate(intake.submittedAt) !== '—' ? formatDate(intake.submittedAt) : 'Not submitted'],
          ['Form Completed At', formatDate(intake.createdAt)],
          ['Ongoing Consent Acknowledged', intake.ongoingConsentAcknowledged ? 'Yes ✓' : 'No'],
          ['Accurate Information Acknowledged', intake.accurateInformationAcknowledged ? 'Yes ✓' : 'No'],
        ])

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

        // Additional Notes
        if (intake.additionalPrivateNotes) {
          addSection('ADDITIONAL NOTES', [
            ['Private Notes', intake.additionalPrivateNotes]
          ])
        }
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
            <p className="text-ivory/70">{data.session.sessionType}</p>
          </div>
          <button
            onClick={onClose}
            className="text-ivory text-2xl hover:opacity-70"
          >
            ✕
          </button>
        </div>

        {/* Content - this div will be captured for PDF */}
        <div className="flex-1 overflow-y-auto p-6" ref={contentRef}>
          <div className="space-y-8 max-w-4xl">
            {/* Session Info */}
            <Section title="Session Information">
              <div className="grid grid-cols-2 gap-4">
                <Detail label="Type" value={data.session.sessionType} />
                <Detail label="Agreement Status" value={data.session.agreementStatus} />
                <Detail label="Session Date" value={data.session.sessionDate ? new Date(data.session.sessionDate).toLocaleDateString() : '—'} />
                <Detail label="Location" value={data.session.sessionLocation || '—'} />
              </div>
            </Section>

            {/* Client Info */}
            <Section title="Client Information">
              <div className="grid grid-cols-2 gap-4">
                <Detail label="Email" value={data.client.emailNormalized} />
                <Detail label="Phone" value={data.client.phoneNormalized || '—'} />
                <Detail label="Instagram" value={data.client.instagramHandle || '—'} />
              </div>
            </Section>

            {/* Intake Submission Info */}
            {intake && (
              <>
                <Section title="Submission Details">
                  <div className="space-y-4">
                    <Detail label="Status" value={intake.status} />
                    <Detail label="Submitted At" value={intake.submittedAt ? new Date(intake.submittedAt).toLocaleString() : 'Not submitted'} />
                    <Detail label="Form Completed At" value={new Date(intake.createdAt).toLocaleString()} />
                    <div className="grid grid-cols-2 gap-4">
                      <Detail label="Ongoing Consent Acknowledged" value={intake.ongoingConsentAcknowledged ? 'Yes ✓' : 'No'} />
                      <Detail label="Accurate Information Acknowledged" value={intake.accurateInformationAcknowledged ? 'Yes ✓' : 'No'} />
                    </div>
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

                {/* Additional Notes */}
                {intake.additionalPrivateNotes && (
                  <Section title="Additional Private Notes">
                    <Detail label="Notes" value={intake.additionalPrivateNotes} isLong={true} />
                  </Section>
                )}
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
