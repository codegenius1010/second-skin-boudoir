'use client'

import React, { useState, useEffect } from 'react'

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
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
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

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Session Info */}
          <Section title="Session Information">
            <div className="grid grid-cols-2 gap-4">
              <Detail label="Type" value={data.session.sessionType} />
              <Detail label="Status" value={data.session.agreementStatus} />
              <Detail label="Date" value={data.session.sessionDate ? new Date(data.session.sessionDate).toLocaleDateString() : '—'} />
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

          {/* Intake Data */}
          {intake && (
            <Section title="Session Preferences">
              <div className="space-y-4">
                {intake.desiredFeelings?.length > 0 && (
                  <Detail label="Desired Feelings" value={intake.desiredFeelings.join(', ')} />
                )}
                {intake.visualStyles?.length > 0 && (
                  <Detail label="Visual Styles" value={intake.visualStyles.join(', ')} />
                )}
                {intake.coveragePreferences?.length > 0 && (
                  <Detail label="Coverage Preferences" value={intake.coveragePreferences.join(', ')} />
                )}
                {intake.favoriteSong && (
                  <Detail label="Favorite Song" value={intake.favoriteSong} />
                )}
                {intake.hardCoverageBoundaries && (
                  <Detail label="Coverage Boundaries" value={intake.hardCoverageBoundaries} isLong={true} />
                )}
                {intake.additionalPrivateNotes && (
                  <Detail label="Additional Notes" value={intake.additionalPrivateNotes} isLong={true} />
                )}
              </div>
            </Section>
          )}

          {/* Webhook Status */}
          {webhook && (
            <Section title="Webhook Delivery">
              <div className="space-y-4">
                <Detail label="Status" value={webhook.status} />
                <Detail label="Attempts" value={webhook.attemptCount.toString()} />
                <Detail label="Last Attempt" value={webhook.lastAttemptAt ? new Date(webhook.lastAttemptAt).toLocaleString() : '—'} />
                <Detail label="Delivered" value={webhook.deliveredAt ? new Date(webhook.deliveredAt).toLocaleString() : '—'} />
                {webhook.lastHttpStatus && (
                  <Detail label="HTTP Status" value={webhook.lastHttpStatus.toString()} />
                )}
                {webhook.lastErrorSafeMessage && (
                  <Detail label="Last Error" value={webhook.lastErrorSafeMessage} isLong={true} />
                )}
              </div>
            </Section>
          )}
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
              // Copy JSON to clipboard
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
