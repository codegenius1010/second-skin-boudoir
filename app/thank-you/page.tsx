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
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Inquiry received</Eyebrow>
          <Heading>Thank you. Your private inquiry has been received.</Heading>
          <p className="mt-6 text-lg leading-8 text-ivory/70">
            Boudoir can feel vulnerable, which is why the next step is a private consultation where we can talk through your vision, answer questions, and make sure this feels right for you.
          </p>
          <p className="mt-6 text-lg leading-8 text-ivory/70">
            <strong>There is no pressure to book.</strong> This is just a conversation about your comfort level, wardrobe ideas, privacy, pricing, and what to expect.
          </p>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="mx-auto max-w-2xl">
          <Eyebrow>Book your consultation</Eyebrow>
          <Heading>Choose a time that works for you.</Heading>
          <p className="mt-6 text-ivory/70">
            Select a 15-minute private consultation below. You'll receive a confirmation with the Zoom or phone details.
          </p>
          <div className="mt-10 flex justify-center">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/secondskinboudoir/consultation"
              style={{ minWidth: '320px', height: '700px' }}
            />
          </div>
          <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-ivory/70">
            <strong>Not ready to book yet?</strong> That is completely fine. You can explore the experience page to learn more, or reply to the confirmation email with any questions.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/experience">Explore the Experience</Button>
            <Button href="/investment" variant="secondary">View Investment</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
