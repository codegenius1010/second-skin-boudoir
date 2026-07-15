'use client'

import React, { useState, useEffect } from 'react'
import AdminSessionTable from './AdminSessionTable'
import AdminSessionDetail from './AdminSessionDetail'
import GenerateTokenModal from './GenerateTokenModal'

interface Submission {
  id: string
  sessionType: string
  sessionDate?: string
  reviewStatus: string
  client: {
    id: string
    firstName: string
    lastName: string
    emailNormalized: string
    phoneNormalized?: string
  }
  intake: {
    id: string
    status: string
    submittedAt?: string
  } | null
  webhook: {
    id: string
    status: string
    attemptCount: number
    lastAttemptAt?: string
    lastErrorSafeMessage?: string
  } | null
}

interface DashboardStats {
  totalSessions: number
  submittedIntakes: number
  webhookSuccess: number
  webhookFailed: number
}

export default function AdminSessionPrepDashboard({ adminToken }: { adminToken: string }) {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalSessions: 0,
    submittedIntakes: 0,
    webhookSuccess: 0,
    webhookFailed: 0,
  })

  const [filters, setFilters] = useState({
    status: '',
    clientEmail: '',
    clientName: '',
    sessionType: '',
    page: 1,
  })

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [retryLoading, setRetryLoading] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [successNotification, setSuccessNotification] = useState<{ link: string; clientName: string } | null>(null)

  // Fetch submissions
  const fetchSubmissions = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.clientEmail) params.append('clientEmail', filters.clientEmail)
      if (filters.clientName) params.append('clientName', filters.clientName)
      if (filters.sessionType) params.append('sessionType', filters.sessionType)
      params.append('page', filters.page.toString())
      params.append('limit', '20')

      const response = await fetch(`/api/admin/session-prep/submissions?${params}`, {
        headers: {
          'x-admin-token': adminToken,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch submissions')
      }

      const result = await response.json()
      setSubmissions(result.data)

      // Calculate stats
      setStats({
        totalSessions: result.pagination.total,
        submittedIntakes: result.data.filter((s: any) => s.intake?.status === 'submitted').length,
        webhookSuccess: result.data.filter((s: any) => s.webhook?.status === 'completed').length,
        webhookFailed: result.data.filter((s: any) => s.webhook?.status === 'requires_review').length,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [filters])

  const handleRetry = async (deliveryId: string) => {
    setRetryLoading(true)
    try {
      const response = await fetch('/api/admin/session-prep/retry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({ deliveryId }),
      })

      if (!response.ok) {
        throw new Error('Failed to retry webhook')
      }

      // Refresh submissions
      await fetchSubmissions()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to retry webhook')
    } finally {
      setRetryLoading(false)
    }
  }

  const handleUpdateStatus = async (sessionId: string, newStatus: string) => {
    setRetryLoading(true)
    try {
      const response = await fetch('/api/admin/session-prep/update-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({ sessionId, reviewStatus: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      // Refresh submissions
      await fetchSubmissions()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setRetryLoading(false)
    }
  }

  const handleDelete = async (sessionId: string, clientName: string) => {
    if (!confirm(`Are you sure you want to delete the session for ${clientName}? This cannot be undone.`)) {
      return
    }

    setRetryLoading(true)
    try {
      const response = await fetch(`/api/admin/session-prep/delete/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-token': adminToken,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to delete session')
      }

      // Refresh submissions
      await fetchSubmissions()
      alert('Session deleted successfully')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete session')
    } finally {
      setRetryLoading(false)
    }
  }

  const handleRegenerateLink = async (sessionId: string, clientName: string) => {
    setRetryLoading(true)
    try {
      const response = await fetch('/api/admin/session-prep/regenerate-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({ sessionId }),
      })

      if (!response.ok) {
        throw new Error('Failed to regenerate link')
      }

      const result = await response.json()
      const prepLink = result.data.prepLink

      // Copy to clipboard
      navigator.clipboard.writeText(prepLink)
      alert(`New session prep link copied to clipboard for ${clientName}!\n\n${prepLink}`)

      // Refresh submissions
      await fetchSubmissions()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to regenerate link')
    } finally {
      setRetryLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory via-charcoal/2 to-ivory">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-2">
              Session Prep Dashboard
            </h1>
            <p className="text-lg text-smoke">Monitor intake submissions and webhook deliveries</p>
          </div>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="mt-2 px-6 py-3 bg-gradient-to-r from-champagne to-rose text-ivory rounded-lg hover:shadow-glow transition-all font-semibold whitespace-nowrap"
          >
            + New Session
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Sessions" value={stats.totalSessions} />
          <StatCard label="Submitted" value={stats.submittedIntakes} color="champagne" />
          <StatCard label="Delivered" value={stats.webhookSuccess} color="rose" />
          <StatCard label="Failed" value={stats.webhookFailed} color="rose/20" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="font-serif text-xl text-charcoal mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Intake Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-ivory text-charcoal focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
              >
                <option value="">All</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Session Type
              </label>
              <select
                value={filters.sessionType}
                onChange={(e) => setFilters({ ...filters, sessionType: e.target.value, page: 1 })}
                className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-ivory text-charcoal focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Boudoir">Boudoir</option>
                <option value="Bridal Boudoir">Bridal Boudoir</option>
                <option value="Model Shoot">Model Shoot</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Client Name
              </label>
              <input
                type="text"
                value={filters.clientName}
                onChange={(e) => setFilters({ ...filters, clientName: e.target.value, page: 1 })}
                placeholder="First or last name..."
                className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-ivory text-charcoal placeholder-smoke/50 focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Client Email
              </label>
              <input
                type="email"
                value={filters.clientEmail}
                onChange={(e) => setFilters({ ...filters, clientEmail: e.target.value, page: 1 })}
                placeholder="Search by email..."
                className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-ivory text-charcoal placeholder-smoke/50 focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {error && (
            <div className="p-4 bg-rose/10 border-b border-rose text-rose">
              {error}
            </div>
          )}
          <AdminSessionTable
            submissions={submissions}
            isLoading={isLoading || retryLoading}
            onViewDetail={setSelectedSessionId}
            onRetry={handleRetry}
            onStatusChange={(status) => setFilters({ ...filters, status, page: 1 })}
            onUpdateReviewStatus={handleUpdateStatus}
            onDelete={handleDelete}
            onRegenerateLink={handleRegenerateLink}
          />
        </div>

        {/* Detail Modal */}
        {selectedSessionId && (
          <AdminSessionDetail
            sessionId={selectedSessionId}
            adminToken={adminToken}
            onClose={() => setSelectedSessionId(null)}
          />
        )}

        {/* Generate Token Modal */}
        {showGenerateModal && (
          <GenerateTokenModal
            adminToken={adminToken}
            onClose={() => {
              setShowGenerateModal(false)
              fetchSubmissions()
            }}
            onSuccess={(link, clientName) => {
              setSuccessNotification({ link, clientName })
              setTimeout(() => setSuccessNotification(null), 8000)
            }}
          />
        )}

        {/* Success Notification */}
        {successNotification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg max-w-sm animate-pulse">
            <p className="font-semibold mb-2">✨ New session created for {successNotification.clientName}</p>
            <p className="text-sm mb-3 break-all font-mono">{successNotification.link}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(successNotification.link)
                alert('Link copied!')
              }}
              className="w-full px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors text-sm font-medium"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  color = 'charcoal',
}: {
  label: string
  value: number
  color?: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-champagne">
      <p className="text-sm text-smoke mb-1">{label}</p>
      <p className={`text-3xl font-bold text-${color}`}>{value}</p>
    </div>
  )
}
