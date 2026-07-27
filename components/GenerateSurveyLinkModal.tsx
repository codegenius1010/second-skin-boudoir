'use client'

import React from 'react'

interface GenerateSurveyLinkModalProps {
  sessionId: string
  clientName: string
  onClose: () => void
}

export default function GenerateSurveyLinkModal({
  sessionId,
  clientName,
  onClose,
}: GenerateSurveyLinkModalProps) {
  const surveyLink = `${typeof window !== 'undefined' ? window.location.origin : ''}/post-shoot-survey?sessionId=${sessionId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(surveyLink)
    alert('Survey link copied to clipboard!')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="font-serif text-2xl text-charcoal mb-2">Survey Link Ready!</h2>
          <p className="text-smoke">Share this with your client</p>
        </div>

        <div className="bg-charcoal/5 p-4 rounded-lg mb-6">
          <p className="text-xs text-smoke mb-2 font-semibold">POST-SHOOT SURVEY LINK</p>
          <p className="text-sm text-charcoal font-mono break-all">{surveyLink}</p>
        </div>

        <div className="space-y-2 mb-6 p-4 bg-rose/10 rounded-lg border border-rose/20">
          <p className="text-xs text-charcoal font-semibold">📝 Client</p>
          <p className="text-sm text-charcoal">{clientName}</p>
          <p className="text-xs text-smoke mt-2">
            ⏰ Client can submit feedback anytime after their shoot
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className="flex-1 py-3 px-4 rounded-lg font-semibold text-ivory bg-gradient-to-r from-champagne to-rose hover:shadow-glow transition-all"
          >
            Copy Link
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-lg font-semibold text-charcoal bg-charcoal/10 hover:bg-charcoal/20 transition-all"
          >
            Close
          </button>
        </div>

        <p className="text-xs text-smoke text-center mt-4">
          💡 You can also copy from the URL bar or send the link via email
        </p>
      </div>
    </div>
  )
}
