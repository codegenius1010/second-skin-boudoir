import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import CalendlyConsultation from './calendly-consultation'

export const metadata: Metadata = {
  title: 'Book Your 15-Minute Consultation | Second Skin Boudoir',
  description: 'Schedule a private 15-minute consultation call with Second Skin Boudoir. No pressure. Just a conversation about your vision and whether our collaboration is right for you.',
}

export default function Page() {
  return (
    <main>
      <Hero
        eyebrow="Private Consultation"
        title="Let's Talk About Your Vision"
        subtitle="Schedule a 15-minute private consultation call with me. No pressure, no sales pitch—just a conversation about whether a boudoir session is right for you."
        primary="Schedule Now"
        primaryHref="#booking"
      />

      <Section id="booking" className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Eyebrow>Quick & Simple</Eyebrow>
          <Heading>15 Minutes to Explore</Heading>
          <p className="mt-4 text-ivory/80">
            Pick a time that works for you. We'll connect via Zoom or phone—whichever is more comfortable. During our call, we'll talk about:
          </p>
          <ul className="mt-6 space-y-3 text-ivory/80">
            <li className="flex gap-3">
              <span className="text-champagne flex-shrink-0">✓</span>
              <span>Your vision for boudoir photography</span>
            </li>
            <li className="flex gap-3">
              <span className="text-champagne flex-shrink-0">✓</span>
              <span>Your comfort level and any concerns</span>
            </li>
            <li className="flex gap-3">
              <span className="text-champagne flex-shrink-0">✓</span>
              <span>What a typical session looks like</span>
            </li>
            <li className="flex gap-3">
              <span className="text-champagne flex-shrink-0">✓</span>
              <span>Options and pricing</span>
            </li>
            <li className="flex gap-3">
              <span className="text-champagne flex-shrink-0">✓</span>
              <span>Next steps if you want to move forward</span>
            </li>
          </ul>
        </div>

        {/* Calendly Embed */}
        <div className="mt-12 rounded-2xl border border-champagne/20 bg-smoke/30 p-6 overflow-hidden">
          <CalendlyConsultation />
        </div>

        {/* Info Section */}
        <div className="mt-12 space-y-6">
          <div className="rounded-lg border border-champagne/20 bg-champagne/5 p-6">
            <h3 className="text-lg font-serif text-champagne mb-3">No Commitment</h3>
            <p className="text-ivory/80 text-sm">
              This is just a conversation. There's no pressure to book a session, no upsell, and no obligation. I want to make sure boudoir is the right fit for you before we move forward.
            </p>
          </div>

          <div className="rounded-lg border border-champagne/20 bg-champagne/5 p-6">
            <h3 className="text-lg font-serif text-champagne mb-3">Your Privacy</h3>
            <p className="text-ivory/80 text-sm">
              Everything we discuss is completely confidential. I respect your privacy and your comfort above all else.
            </p>
          </div>

          <div className="rounded-lg border border-champagne/20 bg-champagne/5 p-6">
            <h3 className="text-lg font-serif text-champagne mb-3">Ready to Chat?</h3>
            <p className="text-ivory/80 text-sm mb-4">
              Select a time below. You'll receive a Zoom link or phone number via email immediately after booking.
            </p>
            <p className="text-ivory/70 text-xs">
              Have questions before booking? <a href="/contact" className="text-champagne hover:text-ivory transition-colors">Contact us</a> or call <strong className="text-champagne">+1 (850) 555-0123</strong>
            </p>
          </div>
        </div>
      </Section>
    </main>
  )
}
