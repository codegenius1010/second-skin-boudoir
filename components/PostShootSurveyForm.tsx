'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface PostShootSurveyFormProps {
  onSuccess?: () => void
}

export function PostShootSurveyForm({ onSuccess }: PostShootSurveyFormProps) {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('sessionId')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    overallRating: 5,
    overallReview: '',
    favoritePart: '',
    comfortConfidenceRating: 5,
    improvementSuggestions: '',
    wouldRecommend: true,
    recommendationNotes: '',
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleRatingChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTextChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleBooleanChange = (value: boolean) => {
    setFormData(prev => ({ ...prev, wouldRecommend: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (!sessionId) {
        throw new Error('Session ID is missing. Please use a valid survey link.')
      }

      const response = await fetch('/api/post-shoot-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          ...formData,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit survey')
      }

      setFormData({
        overallRating: 5,
        overallReview: '',
        favoritePart: '',
        comfortConfidenceRating: 5,
        improvementSuggestions: '',
        wouldRecommend: true,
        recommendationNotes: '',
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-rose/10 border border-rose rounded-lg">
          <p className="text-rose font-medium">{error}</p>
        </div>
      )}

      {/* Question 1: Overall Rating */}
      <div>
        <label className="block font-serif text-lg text-charcoal mb-4">
          How would you rate your overall experience?
        </label>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingChange('overallRating', rating)}
              className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                formData.overallRating === rating
                  ? 'bg-gradient-to-r from-champagne to-rose text-ivory shadow-lg scale-110'
                  : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
        <p className="text-xs text-smoke text-center mt-2">
          1 = Not Satisfied, 5 = Extremely Satisfied
        </p>
        <textarea
          id="overallReview"
          value={formData.overallReview}
          onChange={e => handleTextChange('overallReview', e.target.value)}
          placeholder="Tell us about your overall experience..."
          className="w-full px-4 py-3 mt-4 border border-smoke/30 rounded-lg bg-charcoal/2 text-ivory placeholder-smoke/60 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all resize-none"
          rows={3}
        />
      </div>

      {/* Question 2: Favorite Part */}
      <div>
        <label htmlFor="favoritePart" className="block font-serif text-lg text-charcoal mb-3">
          What was your favorite part of the shoot?
        </label>
        <textarea
          id="favoritePart"
          value={formData.favoritePart}
          onChange={e => handleTextChange('favoritePart', e.target.value)}
          placeholder="Tell me what you loved most..."
          className="w-full px-4 py-3 border border-smoke/30 rounded-lg bg-charcoal/2 text-ivory placeholder-smoke/60 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all resize-none"
          rows={3}
          required
        />
      </div>

      {/* Question 3: Comfort & Confidence */}
      <div>
        <label className="block font-serif text-lg text-charcoal mb-4">
          How well did I help you feel comfortable & confident?
        </label>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingChange('comfortConfidenceRating', rating)}
              className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                formData.comfortConfidenceRating === rating
                  ? 'bg-gradient-to-r from-champagne to-rose text-ivory shadow-lg scale-110'
                  : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
        <p className="text-xs text-smoke text-center mt-2">
          1 = Not at all, 5 = Completely
        </p>
      </div>

      {/* Question 4: Improvement Suggestions */}
      <div>
        <label htmlFor="improvementSuggestions" className="block font-serif text-lg text-charcoal mb-3">
          What could I improve for future clients? <span className="font-body text-sm text-smoke">(Optional)</span>
        </label>
        <textarea
          id="improvementSuggestions"
          value={formData.improvementSuggestions}
          onChange={e => handleTextChange('improvementSuggestions', e.target.value)}
          placeholder="Any constructive feedback is welcome..."
          className="w-full px-4 py-3 border border-smoke/30 rounded-lg bg-charcoal/2 text-ivory placeholder-smoke/60 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all resize-none"
          rows={3}
        />
      </div>

      {/* Question 5: Recommendation */}
      <div>
        <label className="block font-serif text-lg text-charcoal mb-4">
          Would you recommend my services?
        </label>
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => handleBooleanChange(true)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              formData.wouldRecommend
                ? 'bg-gradient-to-r from-champagne to-rose text-ivory shadow-lg'
                : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
            }`}
          >
            Yes, I would! 🎉
          </button>
          <button
            type="button"
            onClick={() => handleBooleanChange(false)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              !formData.wouldRecommend
                ? 'bg-gradient-to-r from-champagne to-rose text-ivory shadow-lg'
                : 'bg-charcoal/10 text-charcoal hover:bg-charcoal/20'
            }`}
          >
            Not yet
          </button>
        </div>

        {!formData.wouldRecommend && (
          <textarea
            value={formData.recommendationNotes}
            onChange={e => handleTextChange('recommendationNotes', e.target.value)}
            placeholder="Let me know what could change your mind..."
            className="w-full px-4 py-3 mt-3 border border-smoke/30 rounded-lg bg-charcoal/2 text-ivory placeholder-smoke/60 focus:outline-none focus:ring-4 focus:ring-champagne/20 focus:border-champagne transition-all resize-none"
            rows={3}
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 rounded-lg font-body font-semibold text-ivory bg-gradient-to-r from-champagne to-rose hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? 'Submitting...' : 'Submit Feedback'}
      </button>

      <p className="text-xs text-smoke text-center">
        Your feedback will be reviewed before appearing on our website
      </p>
    </form>
  )
}
