import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import CalendlyEmbed from './calendly-embed'

export const metadata: Metadata = {
  title: 'Complimentary NYC Boudoir Collaboration | August 10-15 | Second Skin Boudoir',
  description: 'Join a complimentary boudoir photography collaboration in New York City. Matthew is in NYC August 10-15. No fees. Limited availability. Book your private session now.',
}

export default function Page() {
  return (
    <main>
      <Hero
        eyebrow="NYC August 10-15 • Complimentary Collaboration"
        title="Your Private Boudoir Session in New York"
        subtitle="Join an exclusive, complimentary boudoir photography collaboration. An intimate, professional experience designed to celebrate your beauty, confidence, and sensuality. No session fees. Limited availability in NYC."
        primary="Book Your Session"
        primaryHref="#booking"
      />

      <Section id="booking" className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Eyebrow>Schedule Your Session</Eyebrow>
          <Heading>Let&apos;s create something beautiful together</Heading>
          <p className="mt-4 text-ivory/80">
            Select your preferred date and time below. Your complete experience takes 1.5–2 hours and includes consultation, styling guidance, and a private photoshoot.
          </p>
        </div>

        {/* Calendly Embed */}
        <div className="mt-8 rounded-2xl border border-champagne/20 bg-smoke/30 p-6 overflow-hidden">
          <CalendlyEmbed />
        </div>

        {/* Info Section */}
        <div className="mt-12 space-y-6">
          <div className="rounded-lg border border-champagne/20 bg-champagne/5 p-6">
            <h3 className="text-lg font-serif text-champagne mb-3">What to Expect</h3>
            <ul className="space-y-2 text-ivory/80 text-sm">
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span><strong>Private Consultation:</strong> We&apos;ll discuss your vision, comfort level, and any boundaries before we start</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span><strong>Professional Styling:</strong> Guidance on wardrobe, positioning, and creating your perfect aesthetic</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span><strong>Intimate Session:</strong> 1.5–2 hours in a private NYC studio with expert posing direction</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span><strong>Private Reveal:</strong> View and select your favorite images in a private appointment</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-champagne/20 bg-champagne/5 p-6">
            <h3 className="text-lg font-serif text-champagne mb-3">Your Privacy is Protected</h3>
            <p className="text-ivory/80 text-sm">
              Your images will never be shared online, in advertising, or publicly without your written permission. You maintain complete control over how your images are used. Learn more about our <a href="/privacy-policy" className="text-champagne hover:text-ivory transition-colors">privacy policy</a>.
            </p>
          </div>

          <div className="rounded-lg border border-champagne/20 bg-champagne/5 p-6">
            <h3 className="text-lg font-serif text-champagne mb-3">Complimentary Collaboration</h3>
            <p className="text-ivory/80 text-sm mb-4">
              <strong>No session fees.</strong> This is a complimentary boudoir collaboration. You only pay for prints or digital images you choose to purchase. We offer flexible payment options and a 100% satisfaction guarantee.
            </p>
            <p className="text-ivory/70 text-xs">
              Learn more about <a href="/collaboration" className="text-champagne hover:text-ivory transition-colors">our collaboration process</a>. Questions? <a href="/contact" className="text-champagne hover:text-ivory transition-colors">Contact us</a> or call <strong className="text-champagne">+1 (850) 555-0123</strong>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-ivory/10">
          <p className="text-ivory/60 text-sm mb-3">
            🗽 <strong>NYC Sessions:</strong> August 10-15, 2026. Limited availability. Book early to secure your preferred date and time.
          </p>
          <p className="text-ivory/60 text-sm">
            This is a complimentary collaboration. Learn more about what makes our <a href="/collaboration" className="text-champagne hover:text-ivory transition-colors">collaboration program</a> special.
          </p>
        </div>
      </Section>
    </main>
  )
}
