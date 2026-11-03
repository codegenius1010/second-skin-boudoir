'use client'

import Link from 'next/link'
import { clsx } from 'clsx'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
  }
}

type CTAButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  eventLabel?: string
}

export function CTAButton({ href, children, variant = 'primary', className, eventLabel }: CTAButtonProps) {
  function handleClick() {
    if (typeof window === 'undefined') return
    window.fbq?.('trackCustom', 'BlackFridayCTAClick', { label: eventLabel ?? href })
    window.gtag?.('event', 'black_friday_cta_click', { label: eventLabel ?? href })
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        'inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition duration-300',
        variant === 'primary' ? 'bg-bfGold text-bfBlack hover:bg-bfIvory' : 'border border-bfGold/50 text-bfIvory hover:bg-bfIvory/10',
        className
      )}
    >
      {children}
    </Link>
  )
}
