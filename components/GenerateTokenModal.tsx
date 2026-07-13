'use client'

import React, { useState } from 'react'

interface GenerateTokenModalProps {
  adminToken: string
  onClose: () => void
  onSuccess: (link: string, clientName: string) => void
}

export default function GenerateTokenModal({ adminToken, onClose, onSuccess }: GenerateTokenModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    sessionType: 'Boudoir',
    sessionDate: '',
    sessionLocation: 'Destin Studio',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/session-prep/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || undefined,
          sessionType: formData.sessionType,
          sessionDate: formData.sessionDate || undefined,
          sessionLocation: formData.sessionLocation,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate token')
      }

      const result = await response.json()
      setGeneratedLink(result.data.token.link)
      onSuccess(result.data.token.link, `${formData.firstName} ${formData.lastName}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate token')
    } finally {
      setIsLoading(false)
    }
  }

  if (generatedLink) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">✨</div>
            <h2 className="font-serif text-2xl text-charcoal mb-2">Link Generated!</h2>
            <p className="text-smoke">Share this with your client</p>
          </div>

          <div className="bg-charcoal/5 p-4 rounded-lg mb-6 break-all">
            <p className="text-xs text-smoke mb-2 font-semibold">SESSION PREP LINK</p>
            <p className="text-sm text-charcoal font-mono">{generatedLink}</p>
          </div>

          <div className="space-y-2 mb-6 p-4 bg-champagne/10 rounded-lg">
            <p className="text-xs text-smoke">
              <strong>👤 Client:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p className="text-xs text-smoke">
              <strong>📧 Email:</strong> {formData.email}
            </p>
            <p className="text-xs text-smoke">
              <strong>⏰ Expires:</strong> 30 days from now
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedLink)
                alert('Link copied to clipboard!')
              }}
              className="flex-1 px-4 py-2 bg-champagne/10 text-champagne rounded-lg hover:bg-champagne/20 transition-colors font-medium"
            >
              Copy Link
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-charcoal text-ivory rounded-lg hover:bg-charcoal/80 transition-colors font-medium"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        <h2 className="font-serif text-2xl text-charcoal mb-1">New Session Prep</h2>
        <p className="text-smoke mb-6">Generate a link for a new client</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="Jane"
                className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-charcoal/2 text-charcoal focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Doe"
                className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-charcoal/2 text-charcoal focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="jane@example.com"
              className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-charcoal/2 text-charcoal focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Phone (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="850-608-0844"
              className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-charcoal/2 text-charcoal focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Session Type</label>
              <select
                name="sessionType"
                value={formData.sessionType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-charcoal/2 text-charcoal focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
              >
                <option>Boudoir</option>
                <option>Bridal Boudoir</option>
                <option>Model Shoot</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Session Date</label>
              <input
                type="date"
                name="sessionDate"
                value={formData.sessionDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-charcoal/2 text-charcoal focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Location</label>
            <input
              type="text"
              name="sessionLocation"
              value={formData.sessionLocation}
              onChange={handleInputChange}
              placeholder="Destin Studio"
              className="w-full px-3 py-2 border border-smoke/30 rounded-lg bg-charcoal/2 text-charcoal focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none"
            />
          </div>

          {error && <div className="p-3 bg-rose/10 border border-rose text-rose rounded-lg text-sm">{error}</div>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-charcoal/10 text-charcoal rounded-lg hover:bg-charcoal/20 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-champagne to-rose text-ivory rounded-lg hover:shadow-glow disabled:opacity-50 transition-all font-medium"
            >
              {isLoading ? 'Generating...' : 'Generate Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
