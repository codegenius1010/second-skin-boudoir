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
      email: data.get('email'),
      phone: data.get('phone'),
      consultationPreference: data.get('preferredContact'),
      nervousAbout: data.get('message'),
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
    <form onSubmit={submit} className="grid gap-4 rounded-[2rem] border border-bfGold/20 bg-bfCharcoal p-6 shadow-glow md:p-8" noValidate>
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
          <label htmlFor="email" className="sr-only">Email address</label>
          <input id="email" name="email" type="email" required placeholder="Email address *" className={input} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="sr-only">Phone number</label>
          <input id="phone" name="phone" placeholder="Phone number (optional)" className={input} />
        </div>
        <div>
          <label htmlFor="preferredContact" className="sr-only">Preferred contact method</label>
          <select id="preferredContact" name="preferredContact" defaultValue="" className={input}>
            <option value="">Preferred contact method (optional)</option>
            <option>Email</option>
            <option>Phone</option>
            <option>Text</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="sr-only">Message or questions</label>
        <textarea id="message" name="message" placeholder="Message / questions (optional)" rows={4} className={input} />
      </div>

      <button
        disabled={status === 'loading' || !active}
        className="rounded-full bg-bfGold px-6 py-4 font-semibold text-bfBlack transition hover:bg-bfIvory disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending your inquiry...' : active ? 'Claim My 50% Offer' : 'Offer Has Ended'}
      </button>

      <p className="text-xs leading-relaxed text-bfIvory/55">
        No obligation. We&apos;ll be in touch with more details about the experience and current offer. By submitting, you agree to our{' '}
        <Link href={blackFridayPromo.privacyPolicyUrl} className="text-bfGold underline hover:text-bfIvory">
          Privacy Policy
        </Link>
        .
      </p>

      {status === 'error' && (
        <p role="alert" className="text-sm text-rose">
          Something went wrong. Please call or text 850-608-0844, and we&apos;ll get you taken care of.
        </p>
      )}
    </form>
  )
}
