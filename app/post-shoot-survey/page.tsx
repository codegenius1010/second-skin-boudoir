'use client'

import React, { useState } from 'react'
import { PostShootSurveyForm } from '@/components/PostShootSurveyForm'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function PostShootSurveyPage() {
  const [success, setSuccess] = useState(false)

  if (success) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-b from-ivory via-charcoal/2 to-ivory">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-champagne to-rose rounded-full mb-4">
                  <span className="text-2xl">✓</span>
                </div>
              </div>
              <h1 className="font-serif text-3xl text-charcoal mb-3">Thank You!</h1>
              <p className="text-smoke mb-2">Your feedback has been received.</p>
              <p className="text-smoke text-sm">
                I truly appreciate you taking the time to share your experience. Your insights help me continue to provide the best service possible.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-12 bg-gradient-to-b from-ivory via-charcoal/2 to-ivory">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="font-serif text-4xl text-charcoal mb-2">
                Your Feedback Matters
              </h1>
              <p className="text-smoke">
                Help me improve by sharing your post-shoot experience
              </p>
            </div>

            <PostShootSurveyForm onSuccess={() => setSuccess(true)} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
