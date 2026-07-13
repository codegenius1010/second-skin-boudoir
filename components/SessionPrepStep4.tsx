'use client'

import React from 'react'
import Link from 'next/link'

interface SessionPrepStep4Props {
  sessionType: string
  firstName: string
}

export default function SessionPrepStep4({ sessionType, firstName }: SessionPrepStep4Props) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Success Section */}
      <div className="text-center mb-12">
        <div className="mb-6 inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-champagne to-rose flex items-center justify-center shadow-glow">
            <span className="text-5xl">✓</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-3">
          We Have Your Preferences
        </h1>

        <p className="text-xl text-smoke leading-relaxed mb-6">
          Thank you for taking the time to share your vision, {firstName}.
        </p>

        <div className="bg-gradient-to-r from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-6 md:p-8 mb-8">
          <p className="text-base md:text-lg text-charcoal leading-relaxed">
            Your session preferences have been securely received and will guide every moment of your{' '}
            <strong className="text-champagne">{sessionType}</strong> session. We'll review everything you've shared
            and prepare a customized experience that honors your comfort, boundaries, and vision.
          </p>
        </div>
      </div>

      {/* What's Next */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-6 text-center">
          What Happens Next
        </h2>

        <div className="space-y-4">
          <TimelineItem number={1} title="We Review Your Preferences">
            <p>
              Our team carefully reviews every detail you've shared to prepare for a session that feels perfect for
              you.
            </p>
          </TimelineItem>

          <TimelineItem number={2} title="You'll Receive a Confirmation Email">
            <p>
              We'll send you final details including arrival time, parking information, and what to expect on session
              day.
            </p>
          </TimelineItem>

          <TimelineItem number={3} title="Session Day!">
            <p>
              You'll arrive to a beautifully prepared space designed for your comfort. We'll start with a conversation
              to help you feel relaxed and confident.
            </p>
          </TimelineItem>

          <TimelineItem number={4} title="Beautiful Images + Support">
            <p>
              After your session, you'll review all your images privately before we deliver your final gallery. Every
              photo is yours to approve.
            </p>
          </TimelineItem>
        </div>
      </div>

      {/* Resources Section */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-6 text-center">
          Helpful Resources
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ResourceCard title="What to Wear" href="/what-to-wear-boudoir-session">
            Get styling tips to feel confident and beautiful on your session day.
          </ResourceCard>

          <ResourceCard title="FAQ" href="/faq">
            Common questions answered by our experienced team.
          </ResourceCard>

          <ResourceCard title="Our Experience" href="/experience">
            Learn about our approach and what clients love about their sessions.
          </ResourceCard>

          <ResourceCard title="Portfolio" href="/portfolio">
            See the beautiful variety of boudoir styles we create.
          </ResourceCard>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-8 mb-8 text-center">
        <h3 className="font-serif text-2xl text-charcoal mb-3">Have Questions?</h3>
        <p className="text-smoke mb-6">
          We're here to support you. Reach out anytime before your session.
        </p>
        <div className="space-y-2 text-charcoal">
          <p>
            📧 <a href="mailto:hello@secondskinboudoir.com" className="text-champagne hover:underline">
              hello@secondskinboudoir.com
            </a>
          </p>
          <p>
            📞 <a href="tel:+18505555555" className="text-champagne hover:underline">
              (850) 555-5555
            </a>
          </p>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="bg-ivory border border-smoke/20 rounded-lg p-6 mb-8 text-center">
        <p className="text-sm text-smoke">
          🔒 <strong>Your Privacy is Protected</strong>
        </p>
        <p className="text-xs text-smoke/70 mt-2">
          All your preferences and personal information remain completely confidential. We never share your responses
          without your permission.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Link
          href="/"
          className="px-8 py-4 rounded-lg font-body font-semibold text-charcoal bg-ivory border border-smoke/20 hover:border-champagne hover:bg-ivory transition-all text-center"
        >
          Return Home
        </Link>
        <Link
          href="/faq"
          className="px-8 py-4 rounded-lg font-body font-semibold text-ivory bg-gradient-to-r from-champagne to-rose hover:shadow-glow hover:scale-105 active:scale-95 transition-all text-center"
        >
          Explore FAQ
        </Link>
      </div>

      {/* Gratitude */}
      <div className="text-center">
        <p className="text-smoke text-sm leading-relaxed">
          Thank you for choosing Second Skin Boudoir.<br />
          We can't wait to create something beautiful with you.
        </p>
      </div>

      {/* Form number indicator */}
      <p className="text-center text-smoke text-sm mt-8">Step 4 of 4 — Complete</p>
    </div>
  )
}

function TimelineItem({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4 md:gap-6">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-champagne to-rose flex items-center justify-center text-ivory font-semibold shadow-glow">
          {number}
        </div>
      </div>
      <div className="flex-1 pt-2 md:pt-3">
        <h3 className="font-serif text-lg text-charcoal mb-2">{title}</h3>
        <div className="text-smoke text-sm md:text-base leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

function ResourceCard({
  title,
  href,
  children,
}: {
  title: string
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="block p-6 border border-smoke/20 rounded-lg hover:border-champagne hover:bg-charcoal/5 transition-all group"
    >
      <h3 className="font-serif text-lg text-charcoal group-hover:text-champagne mb-2 transition-colors">
        {title} →
      </h3>
      <p className="text-sm md:text-base text-smoke">{children}</p>
    </Link>
  )
}
