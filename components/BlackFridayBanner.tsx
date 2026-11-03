'use client'

import { useState } from 'react'
import Link from 'next/link'
import { isPromoActive, offerHeadline } from '@/app/black-friday/config'

export function BlackFridayBanner() {
  const [dismissed, setDismissed] = useState(false)
  const active = isPromoActive()

  if (dismissed || !active) return null

  return (
    <div className="relative mt-[73px] bg-charcoal border-b border-champagne/40">
      <div className="mx-auto max-w-7xl px-5 py-3 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-center lg:text-left">
            <span className="font-semibold text-champagne">Early Black Friday:</span>{' '}
            <span className="text-ivory/85">{offerHeadline()}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 whitespace-nowrap">
          <Link
            href="/black-friday"
            className="text-xs font-medium text-champagne hover:text-rose transition-colors underline"
          >
            Learn More
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-ivory/40 hover:text-ivory/60 transition-colors p-1"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
