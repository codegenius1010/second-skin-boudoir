'use client'

import { useEffect } from 'react'

export default function CalendlyEmbed() {
  useEffect(() => {
    // Load Calendly script dynamically
    if (typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/matthew-ssb/nyc-second-skin-boudoir-session?background_color=f7f2ed&text_color=2a2526&primary_color=8b4f5c"
      style={{ minWidth: '320px', height: '700px' }}
    ></div>
  )
}
