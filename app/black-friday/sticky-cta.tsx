'use client'

import { useEffect, useState } from 'react'
import { CTAButton } from './cta-button'
import { isPromoActive } from './config'

export function BFStickyCTA() {
  const [visible, setVisible] = useState(false)
  const active = isPromoActive()

  useEffect(() => {
    const offerSection = document.getElementById('offer')
    const heroSection = document.getElementById('hero')
    const footer = document.querySelector('footer')
    if (!offerSection || !heroSection || !footer) return

    const state = { pastHero: false, offerInView: false, footerInView: false }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === heroSection) state.pastHero = !entry.isIntersecting
          if (entry.target === offerSection) state.offerInView = entry.isIntersecting
          if (entry.target === footer) state.footerInView = entry.isIntersecting
        }
        setVisible(state.pastHero && !state.offerInView && !state.footerInView)
      },
      { threshold: 0.1 }
    )

    observer.observe(offerSection)
    observer.observe(heroSection)
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-bfGold/20 bg-bfBlack/95 px-4 py-3 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <CTAButton href="#offer" eventLabel="sticky-mobile" className="w-full">
        {active ? 'Claim Your 50% Offer' : 'Join the Waitlist'}
      </CTAButton>
    </div>
  )
}
