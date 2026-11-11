'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { blackFridayPromo, isPromoActive } from './config'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function BFLeadForm() {
  const [status, setStatus] = useState<Status>('idle')
  const searchParams = useSearchParams()
  const active = isPromoActive()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — real users never fill this hidden field.
    if (data.get('company')) {
      setStatus('success')
      return
    }

    setStatus('loading')

    const payload = {
      formType: 'black-friday',
      source: searchParams.get('utm_source') || 'black-friday-landing',
      promoId: blackFridayPromo.promoId,
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phone: data.get('phone'),
      city: data.get('city'),
      sessionType: data.get('sessionType'),
      nervousAbout: data.get('nervousAbout'),
      consultationPreference: data.get('consultationPreference'),
      timeframe: data.get('timeframe'),
      utmSource: searchParams.get('utm_source'),
      utmMedium: searchParams.get('utm_medium'),
      utmCampaign: searchParams.get('utm_campaign'),
      utmContent: searchParams.get('utm_content'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setStatus('success')
        if (typeof window !== 'undefined') {
          window.fbq?.('track', 'Lead', { content_name: blackFridayPromo.promoId })
          window.gtag?.('event', 'conversion', { send_to: 'AW-18309956218', event_category: 'black_friday_lead' })
        }
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const input =
    'w-full rounded-2xl border border-bfGold/20 bg-bfBlack px-4 py-3 text-bfIvory placeholder:text-bfIvory/35 outline-none focus:border-bfGold'

  if (status === 'success') {
    return (
      <div className="rounded-[2rem] border border-bfGold/20 bg-bfCharcoal p-8 text-center shadow-glow md:p-12">
        <h3 className="font-bf-serif text-3xl text-bfIvory">Thank You — Your Inquiry Is In!</h3>
        <p className="mt-4 text-bfIvory/75">
          We&apos;re excited to help you explore your Second Skin Boudoir experience. Watch your inbox for the next steps.
        </p>
        <div className="mt-7">
          <Link
            href={blackFridayPromo.bookingUrl}
            className="inline-flex items-center justify-center rounded-full border border-bfGold/50 px-6 py-3 text-sm font-semibold text-bfIvory transition hover:bg-bfIvory/10"
          >
            Schedule Your Private Consultation
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[2rem] border border-bfGold/20 bg-bfCharcoal p-6 shadow-glow md:p-8">
      {/* Honeypot field — hidden from sighted users and screen readers, bots tend to fill every field */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="sr-only">First name</label>
          <input id="firstName" name="firstName" required placeholder="First name *" className={input} />
        </div>
        <div>
          <label htmlFor="lastName" className="sr-only">Last name</label>
          <input id="lastName" name="lastName" required placeholder="Last name *" className={input} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <input id="email" name="email" type="email" required placeholder="Email *" className={input} />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone or text number</label>
          <input id="phone" name="phone" required placeholder="Phone or text number *" className={input} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="city" className="sr-only">City or area</label>
          <input id="city" name="city" required placeholder="City or area *" className={input} />
        </div>
        <div>
          <label htmlFor="sessionType" className="sr-only">What&apos;s the occasion?</label>
          <select id="sessionType" name="sessionType" required defaultValue="" className={input}>
            <option value="" disabled>What&apos;s the occasion? *</option>
            <option>Self-love &amp; confidence</option>
            <option>Bridal or wedding gift</option>
            <option>Anniversary gift</option>
            <option>Birthday celebration</option>
            <option>New chapter (divorce, healing)</option>
            <option>Just because I deserve it</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="nervousAbout" className="sr-only">Anything you&apos;re nervous about?</label>
        <textarea id="nervousAbout" name="nervousAbout" required placeholder="Anything you're nervous about? (We'll put your mind at ease)" rows={4} className={input} />
      </div>

      <div>
        <label htmlFor="consultationPreference" className="sr-only">How would you prefer to talk?</label>
        <select id="consultationPreference" name="consultationPreference" required defaultValue="" className={input}>
          <option value="" disabled>How would you prefer to talk? *</option>
          <option>Phone call</option>
          <option>Zoom video call (recommended - more personal)</option>
          <option>Text first, then call</option>
        </select>
      </div>

      <div>
        <label htmlFor="timeframe" className="sr-only">When are you hoping to do this?</label>
        <input id="timeframe" name="timeframe" required placeholder="When are you hoping to do this? (e.g., next month, before wedding)" className={input} />
      </div>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-bfIvory/65">
        <input required type="checkbox" className="mt-0.5 flex-shrink-0" />
        <span className="text-bfIvory/65">
          I understand my inquiry is private and my images will never be shared without written permission. By submitting this form, I consent to be contacted via phone, SMS, and email regarding my inquiry. I have read and agree to the{' '}
          <Link href={blackFridayPromo.privacyPolicyUrl} className="inline text-bfGold hover:text-bfIvory">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms-of-service" className="inline text-bfGold hover:text-bfIvory">
            Terms of Service
          </Link>
          .
        </span>
      </label>

      <button
        disabled={status === 'loading' || !active}
        className="rounded-full bg-bfGold px-6 py-4 font-semibold text-bfBlack transition hover:bg-bfIvory disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending your inquiry...' : active ? 'Claim My 50% Offer' : 'Offer Has Ended'}
      </button>

      <p className="text-xs leading-relaxed text-bfIvory/55">
        No obligation. We&apos;ll be in touch with more details about the experience and current offer.
      </p>

      {status === 'error' && (
        <p role="alert" className="text-sm text-rose">
          Something went wrong. Please call or text 850-608-0844, and we&apos;ll get you taken care of.
        </p>
      )}
    </form>
  )
}
