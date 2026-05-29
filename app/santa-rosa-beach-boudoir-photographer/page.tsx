import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Santa Rosa Beach Boudoir Photographer | Luxury Boudoir Photography',
  description: 'Private luxury boudoir photography in Santa Rosa Beach, 30A, Grayton Beach, Blue Mountain Beach, and WaterColor. Fully guided sessions with privacy-first approach.',
  openGraph: {
    title: 'Santa Rosa Beach Boudoir Photographer',
    description: 'Luxury, private boudoir photography sessions in Santa Rosa Beach and surrounding 30A areas.',
  },
}

export default function SantaRosaBeachBoudoir() {
  return (
    <main>
      <Hero
        eyebrow="Santa Rosa Beach Boudoir Photographer"
        title="Luxury Boudoir Photography in Santa Rosa Beach & 30A"
        subtitle="Private, guided boudoir sessions for women in Santa Rosa Beach, Grayton Beach, Blue Mountain Beach, WaterColor, Seaside, and the beautiful 30A area."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <Card title="Local Locations">
            Shoot in your favorite Santa Rosa Beach hotel, Airbnb, studio, or private location. We know the best light and most beautiful spaces.
          </Card>
          <Card title="Vacation Sessions">
            Visiting for a girls' trip, celebration, or getaway? Bring boudoir into your Santa Rosa Beach experience.
          </Card>
          <Card title="Privacy-First">
            Your images stay private unless you choose to share. No public posting without written permission.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Santa Rosa Beach & 30A Boudoir</Eyebrow>
        <Heading>Fully Guided Sessions for Women in South Walton</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          Second Skin Boudoir serves women throughout the 30A area including Santa Rosa Beach, Grayton Beach, Blue Mountain Beach, Miramar Beach, Alys Beach, Rosemary Beach, Seaside, WaterColor, Inlet Beach, and surrounding Gulf Coast communities. Whether you are a local or visiting, we create a private, fully guided boudoir experience tailored to you.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="What You Get">
            Private consultation, personalized wardrobe guidance, professional 1–3 hour session with complete posing direction, hair and makeup (optional), private image reveal, and flexible collection options.
          </Card>
          <Card title="Session Fees">
            Essential Session ($300) or Signature Session with hair & makeup ($549). Luxury collections begin at $995. Payment plans available.
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Why Local Women Choose Us</Eyebrow>
            <Heading>Boudoir Designed for Santa Rosa Beach</Heading>
            <ul className="mt-8 space-y-3 text-ivory/70">
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>No modeling experience needed. We guide every pose, hand placement, and expression.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Vacation or local — flexible scheduling and location options throughout the area.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Private consultations before booking so you know exactly what to expect.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Your images are never shared without permission. Period.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Payment plans available so you can invest in yourself without financial stress.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">About This Area</h3>
            <p className="text-ivory/70 text-sm mb-4">
              Santa Rosa Beach and 30A are some of Florida's most beautiful Gulf Coast communities. The area includes:
            </p>
            <ul className="space-y-2 text-ivory/70 text-sm">
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Santa Rosa Beach</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Grayton Beach</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Blue Mountain Beach</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Miramar Beach</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>WaterColor & Seaside</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Alys Beach & Rosemary Beach</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Inlet Beach</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Perfect For</h3>
            <ul className="space-y-3 text-ivory/70 text-sm">
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Anniversary trips to Santa Rosa Beach</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Bachelorette getaways and girls' trips</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Birthday celebrations and milestone moments</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Local residents seeking a boost of confidence</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Bridal boudoir and wedding gifts</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Women celebrating new chapters in life</span>
              </li>
            </ul>
          </div>
          <div>
            <Eyebrow>Ready to Experience It?</Eyebrow>
            <Heading>Book Your Santa Rosa Beach Consultation</Heading>
            <p className="mt-5 text-ivory/68">
              Schedule a free, private, no-pressure consultation. We'll discuss your vision, answer all your questions, and help you feel confident about your session.
            </p>
            <div className="mt-8 space-y-3">
              <Button href="/contact">Book a Consultation</Button>
              <p className="text-ivory/60 text-sm">
                Call or text <span className="text-champagne font-semibold">850-608-0844</span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <Eyebrow>Learn More</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Explore the Full Boudoir Experience</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            From your first consultation to holding your final album, every step is designed around your comfort and confidence. Also serving <a href="/fort-walton-beach-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">Fort Walton Beach</a> and <a href="/panama-city-beach-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">Panama City Beach</a>.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Button href="/experience">The Experience</Button>
            <Button href="/what-to-wear-boudoir-session" variant="secondary">What to Wear</Button>
            <Button href="/boudoir-pricing" variant="secondary">Pricing</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
