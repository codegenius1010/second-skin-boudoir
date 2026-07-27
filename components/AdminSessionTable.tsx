'use client'

import React, { useState, useEffect } from 'react'

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

interface AdminSessionTableProps {
  submissions: Submission[]
  isLoading: boolean
  onViewDetail: (sessionId: string) => void
  onRetry: (deliveryId: string) => Promise<void>
  onStatusChange: (status: string) => void
  onUpdateReviewStatus: (sessionId: string, newStatus: string) => Promise<void>
  onDelete: (sessionId: string, clientName: string) => Promise<void>
  onRegenerateLink: (sessionId: string, clientName: string) => Promise<void>
  onGenerateSurveyLink?: (sessionId: string, clientName: string) => void
  onEdit?: (sessionId: string) => void
}

export default function AdminSessionTable({
  submissions,
  isLoading,
  onViewDetail,
  onRetry,
  onStatusChange,
  onUpdateReviewStatus,
  onDelete,
  onRegenerateLink,
  onGenerateSurveyLink,
  onEdit,
}: AdminSessionTableProps) {
  const [retryingId, setRetryingId] = useState<string | null>(null)

  const handleRetry = async (deliveryId: string) => {
    setRetryingId(deliveryId)
    try {
      await onRetry(deliveryId)
    } finally {
      setRetryingId(null)
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-champagne/20 text-champagne border border-champagne/30'
      case 'completed':
        return 'bg-rose/20 text-rose border border-rose/30'
      case 'pending':
        return 'bg-smoke/20 text-smoke border border-smoke/30'
      case 'requires_review':
        return 'bg-rose/30 text-rose border border-rose'
      default:
        return 'bg-charcoal/10 text-charcoal border border-charcoal/20'
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-smoke/30 bg-charcoal/5">
            <th className="px-4 py-3 text-left font-semibold text-charcoal">Client</th>
            <th className="px-4 py-3 text-left font-semibold text-charcoal">Session Type</th>
            <th className="px-4 py-3 text-left font-semibold text-charcoal">Session Date</th>
            <th className="px-4 py-3 text-left font-semibold text-charcoal">Intake Status</th>
            <th className="px-4 py-3 text-left font-semibold text-charcoal">Review Status</th>
            <th className="px-4 py-3 text-left font-semibold text-charcoal">Attempts</th>
            <th className="px-4 py-3 text-left font-semibold text-charcoal">Submitted</th>
            <th className="px-4 py-3 text-center font-semibold text-charcoal">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-smoke">
                Loading submissions...
              </td>
            </tr>
          ) : submissions.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-smoke">
                No submissions found
              </td>
            </tr>
          ) : (
            submissions.map((submission) => (
              <tr key={submission.id} className="border-b border-smoke/20 hover:bg-charcoal/2 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-charcoal">
                      {submission.client.firstName} {submission.client.lastName}
                    </span>
                    <span className="text-xs text-smoke">{submission.client.emailNormalized}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-charcoal">{submission.sessionType}</td>
                <td className="px-4 py-3 text-sm text-charcoal">
                  {submission.sessionDate
                    ? submission.sessionDate.split('T')[0]
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      submission.intake?.status || 'draft'
                    )}`}
                  >
                    {submission.intake?.status || 'draft'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={submission.reviewStatus || 'needs_review'}
                    onChange={(e) => onUpdateReviewStatus(submission.id, e.target.value)}
                    className="px-2 py-1 rounded text-xs font-medium border border-charcoal/20 bg-ivory text-charcoal hover:border-charcoal/50 focus:outline-none focus:ring-2 focus:ring-champagne/30"
                  >
                    <option value="needs_review">Needs Review</option>
                    <option value="reviewed">Reviewed</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-charcoal text-center">
                  {submission.webhook?.attemptCount || 0}
                </td>
                <td className="px-4 py-3 text-sm text-smoke">
                  {submission.intake?.submittedAt
                    ? new Date(submission.intake.submittedAt).toLocaleDateString()
                    : '—'}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {!submission.intake?.status || submission.intake?.status === 'draft' ? (
                      <button
                        onClick={() => onEdit?.(submission.id)}
                        className="text-xs px-2 py-1 rounded bg-rose/10 text-rose hover:bg-rose/20 transition-colors"
                        title="Edit session details (draft mode only)"
                      >
                        Edit
                      </button>
                    ) : null}
                    <button
                      onClick={() => onViewDetail(submission.id)}
                      className="text-xs px-2 py-1 rounded bg-champagne/10 text-champagne hover:bg-champagne/20 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRegenerateLink(submission.id, `${submission.client.firstName} ${submission.client.lastName}`)}
                      className="text-xs px-2 py-1 rounded bg-charcoal/10 text-charcoal hover:bg-charcoal/20 transition-colors"
                      title="Copy session prep link"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={() => onGenerateSurveyLink?.(submission.id, `${submission.client.firstName} ${submission.client.lastName}`)}
                      className="text-xs px-2 py-1 rounded bg-rose/10 text-rose hover:bg-rose/20 transition-colors"
                      title="Generate post-shoot survey link"
                    >
                      Survey
                    </button>
                    {submission.webhook?.status === 'requires_review' ||
                    submission.webhook?.status === 'pending' ? (
                      <button
                        onClick={() => submission.webhook && handleRetry(submission.webhook.id)}
                        disabled={retryingId === submission.webhook?.id}
                        className="text-xs px-2 py-1 rounded bg-rose/10 text-rose hover:bg-rose/20 disabled:opacity-50 transition-colors"
                      >
                        {retryingId === submission.webhook?.id ? 'Retrying...' : 'Retry'}
                      </button>
                    ) : null}
                    <button
                      onClick={() => onDelete(submission.id, `${submission.client.firstName} ${submission.client.lastName}`)}
                      className="text-xs px-2 py-1 rounded bg-rose/10 text-rose hover:bg-rose/20 transition-colors"
                      title="Delete this session"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
