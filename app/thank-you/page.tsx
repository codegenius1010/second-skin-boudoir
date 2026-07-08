import type { Metadata } from 'next'
import Script from 'next/script'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Button } from '@/components/Button'

export const metadata: Metadata = { 
  title: 'Thank You', 
  description: 'Thank you for contacting Second Skin Boudoir.' 
}

export default function Page() {
  return (
    <main className="pt-28">
      <Script
        id="meta-submit-application"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `fbq('track', 'SubmitApplication');`,
        }}
      />
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Inquiry received</Eyebrow>
          <Heading>Thank you. Your private inquiry has been received.</Heading>
          <p className="mt-6 text-lg leading-8 text-ivory/70">
            We've received your message and will be reaching out to you within 24 hours using the contact method you provided.
          </p>
          <div className="mt-8 rounded-2xl border border-champagne/20 bg-champagne/5 p-6">
            <p className="text-sm text-ivory/80 mb-2">
              <strong className="text-champagne">What's next?</strong>
            </p>
            <ul className="text-sm text-ivory/70 space-y-2 text-left max-w-sm mx-auto">
              <li>✓ We'll reach out at the contact details you provided</li>
              <li>✓ You'll have a private, no-pressure consultation</li>
              <li>✓ No commitment — just a conversation about your vision</li>
              <li>✓ Your privacy is always guaranteed</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="mx-auto max-w-2xl">
          <Eyebrow>Want to move faster?</Eyebrow>
          <Heading>Schedule Your Consultation Now</Heading>
          <p className="mt-6 text-ivory/70">
            Or skip ahead and pick a 15-minute private consultation time directly. You'll receive confirmation with Zoom or phone details immediately.
          </p>
          <div className="mt-10 flex justify-center">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/matthew-ssb/second-skin-boudoir?hide_gdpr_banner=1"
              style={{ minWidth: '320px', maxWidth: '900px', width: '100%', height: '600px' }}
            />
          </div>
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Still exploring?</Eyebrow>
          <p className="text-ivory/70">
            Learn more about our approach, pricing, what to wear, and see examples of work from other clients who were nervous too.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/experience">How It Works</Button>
            <Button href="/boudoir-portfolio" variant="secondary">See the Portfolio</Button>
            <Button href="/what-to-wear-boudoir-session" variant="secondary">What to Wear</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
