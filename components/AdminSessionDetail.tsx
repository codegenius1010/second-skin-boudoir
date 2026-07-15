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
    if (!contentRef.current || !data) return
    
    setIsExporting(true)
    try {
      // Get the element to export (without buttons)
      const element = contentRef.current
      
      // Create canvas from HTML
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      })
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })
      
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pageWidth - 20 // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      let yPosition = 10
      let remainingHeight = imgHeight
      let pageNumber = 1
      
      while (remainingHeight > 0) {
        const canvasHeight = Math.min(remainingHeight, pageHeight - 20)
        const srcHeight = (canvasHeight * canvas.height) / imgHeight
        
        // Add page number and timestamp
        if (pageNumber > 1) {
          pdf.addPage()
        }
        
        pdf.addImage(
          imgData,
          'PNG',
          10,
          10,
          imgWidth,
          canvasHeight,
          `page${pageNumber}`,
          'FAST'
        )
        
        // Add footer with timestamp and page number
        pdf.setFontSize(8)
        pdf.setTextColor(128, 128, 128)
        pdf.text(
          `Generated: ${new Date().toLocaleString()} | Page ${pageNumber}`,
          10,
          pageHeight - 5
        )
        
        remainingHeight -= canvasHeight
        yPosition += canvasHeight
        pageNumber++
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
