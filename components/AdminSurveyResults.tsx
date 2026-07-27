'use client'

import React, { useState, useEffect, useCallback } from 'react'

interface Survey {
  id: string
  sessionId: string
  overallRating: number
  overallReview?: string
  favoritePart?: string
  comfortConfidenceRating?: number
  improvementSuggestions?: string
  wouldRecommend?: boolean
  recommendationNotes?: string
  reviewStatus: string
  publishToWebsite: boolean
  submittedAt: string
  session: {
    client: {
      firstName: string
      lastName: string
    }
  }
}

interface SurveyStats {
  totalCount: number
  approvedCount: number
  rejectedCount: number
  pendingCount: number
  averageRating: number
}

export default function AdminSurveyResults({ adminToken }: { adminToken: string }) {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [stats, setStats] = useState<SurveyStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)

  const fetchSurveys = useCallback(async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') {
        params.append('reviewStatus', filter)
      }

      const response = await fetch(`/api/admin/post-shoot-surveys?${params}`, {
        headers: {
          'x-admin-token': adminToken,
        },
      })

      if (!response.ok) throw new Error('Failed to fetch surveys')

      const data = await response.json()
      setSurveys(data.surveys || [])
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching surveys:', error)
    } finally {
      setIsLoading(false)
    }
  }, [filter, adminToken])

  useEffect(() => {
    fetchSurveys()
  }, [fetchSurveys])

  const handleStatusChange = useCallback(async (surveyId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/post-shoot-surveys', {
        method: 'PATCH',
        headers: {
          'x-admin-token': adminToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyId,
          reviewStatus: newStatus,
        }),
      })

      if (!response.ok) throw new Error('Failed to update survey')

      // Refresh the list
      await fetchSurveys()
      setSelectedSurvey(null)
    } catch (error) {
      console.error('Error updating survey:', error)
    }
  }, [fetchSurveys, adminToken])

  const getStarRating = (rating: number) => {
    return '⭐'.repeat(Math.floor(rating))
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium'
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-emerald-100 text-emerald-800`
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`
      default:
        return `${baseClasses} bg-amber-100 text-amber-800`
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-rose/5 rounded-lg p-4 border border-rose/20">
            <p className="text-smoke text-sm">Total Surveys</p>
            <p className="text-2xl font-bold text-rose">{stats.totalCount}</p>
          </div>
          <div className="bg-amber-100/50 rounded-lg p-4 border border-amber-200">
            <p className="text-smoke text-sm">Pending</p>
            <p className="text-2xl font-bold text-amber-700">{stats.pendingCount}</p>
          </div>
          <div className="bg-emerald-100/50 rounded-lg p-4 border border-emerald-200">
            <p className="text-smoke text-sm">Approved</p>
            <p className="text-2xl font-bold text-emerald-700">{stats.approvedCount}</p>
          </div>
          <div className="bg-red-100/50 rounded-lg p-4 border border-red-200">
            <p className="text-smoke text-sm">Rejected</p>
            <p className="text-2xl font-bold text-red-700">{stats.rejectedCount}</p>
          </div>
          <div className="bg-champagne/10 rounded-lg p-4 border border-champagne/20">
            <p className="text-smoke text-sm">Avg Rating</p>
            <p className="text-2xl font-bold text-champagne">
              {stats.averageRating.toFixed(1)} {getStarRating(Math.round(stats.averageRating))}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === f
                ? 'bg-rose text-ivory'
                : 'bg-charcoal/20 text-ivory hover:bg-charcoal/30'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Surveys Table */}
      {isLoading ? (
        <div className="text-center py-8 text-smoke">Loading surveys...</div>
      ) : surveys.length === 0 ? (
        <div className="text-center py-8 text-smoke">No surveys found</div>
      ) : (
        <div className="space-y-3">
          {surveys.map((survey) => (
            <div
              key={survey.id}
              onClick={() => setSelectedSurvey(selectedSurvey?.id === survey.id ? null : survey)}
              className="bg-charcoal/40 border border-charcoal/60 rounded-lg p-4 cursor-pointer hover:bg-charcoal/50 transition-colors"
            >
              {/* Summary Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ivory">
                    {survey.session.client.firstName} {survey.session.client.lastName}
                  </p>
                  <p className="text-sm text-smoke">
                    {new Date(survey.submittedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{getStarRating(survey.overallRating)}</span>
                  <span className={getStatusBadge(survey.reviewStatus)}>
                    {survey.reviewStatus}
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedSurvey?.id === survey.id && (
                <div className="mt-4 pt-4 border-t border-charcoal/60 space-y-4">
                  {survey.overallReview && (
                    <div>
                      <p className="text-sm font-medium text-champagne mb-1">Overall Review</p>
                      <p className="text-ivory text-sm">{survey.overallReview}</p>
                    </div>
                  )}

                  {survey.favoritePart && (
                    <div>
                      <p className="text-sm font-medium text-champagne mb-1">Favorite Part</p>
                      <p className="text-ivory text-sm">{survey.favoritePart}</p>
                    </div>
                  )}

                  {survey.comfortConfidenceRating && (
                    <div>
                      <p className="text-sm font-medium text-champagne mb-1">Comfort & Confidence</p>
                      <p className="text-ivory text-sm">{getStarRating(survey.comfortConfidenceRating)}</p>
                    </div>
                  )}

                  {survey.improvementSuggestions && (
                    <div>
                      <p className="text-sm font-medium text-champagne mb-1">Improvement Suggestions</p>
                      <p className="text-ivory text-sm">{survey.improvementSuggestions}</p>
                    </div>
                  )}

                  {survey.wouldRecommend !== undefined && (
                    <div>
                      <p className="text-sm font-medium text-champagne mb-1">Would Recommend</p>
                      <p className="text-ivory text-sm">
                        {survey.wouldRecommend ? '✅ Yes' : '❌ No'}
                        {survey.recommendationNotes && ` - ${survey.recommendationNotes}`}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    {survey.reviewStatus !== 'approved' && (
                      <button
                        onClick={() => handleStatusChange(survey.id, 'approved')}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-ivory px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        ✓ Approve
                      </button>
                    )}
                    {survey.reviewStatus !== 'rejected' && (
                      <button
                        onClick={() => handleStatusChange(survey.id, 'rejected')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-ivory px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        ✕ Reject
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
