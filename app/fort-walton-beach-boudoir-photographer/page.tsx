import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Fort Walton Beach Boudoir Photographer | Luxury Boudoir Sessions',
  description: 'Private luxury boudoir photography in Fort Walton Beach, Okaloosa Island, Mary Esther, and Northwest Florida Gulf Coast. Fully guided sessions with privacy guarantee.',
  openGraph: {
    title: 'Fort Walton Beach Boudoir Photographer',
    description: 'Luxury, private boudoir photography in Fort Walton Beach and surrounding areas.',
  },
}

export default function FortWaltonBeachBoudoir() {
  return (
    <main>
      <Hero
        eyebrow="Fort Walton Beach Boudoir Photographer"
        title="Luxury Boudoir Photography in Fort Walton Beach"
        subtitle="Private, guided boudoir sessions for women in Fort Walton Beach, Okaloosa Island, Mary Esther, and the scenic Northwest Florida Gulf Coast."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <Card title="Local Photographer">
            Serving Fort Walton Beach and surrounding Okaloosa County areas. Flexible locations and scheduling for locals and visitors.
          </Card>
          <Card title="Beachside Sessions">
            Gulf Coast location brings beautiful natural light, stunning backdrops, and the freedom of a private, guided experience.
          </Card>
          <Card title="Completely Private">
            Your boudoir session stays private. Images never shared without explicit written permission.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Fort Walton Beach & Okaloosa County Boudoir</Eyebrow>
        <Heading>Fully Guided Luxury Boudoir for Northwest Florida</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          Second Skin Boudoir serves Fort Walton Beach, Okaloosa Island, Mary Esther, and the broader Northwest Florida Gulf Coast. Whether you're a local seeking a confidence boost or visiting for a special occasion, we provide a private, fully guided boudoir experience designed specifically for you. We also serve the <a href="/destin-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">Destin area</a>, <a href="/30a-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">30A</a>, and <a href="/panama-city-beach-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">Panama City Beach</a>.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="The Session">
            Private consultation, personalized guidance, professional 1–3 hour session with complete posing direction, optional hair and makeup, private reveal, and flexible collection choices starting at $995.
          </Card>
          <Card title="Your Investment">
            Essential Session ($300) or Signature with styling ($549). Payment plans available so you can invest in yourself comfortably.
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Why Choose Us for Your Fort Walton Beach Boudoir</Eyebrow>
            <Heading>Confidence + Privacy + Guidance</Heading>
            <ul className="mt-8 space-y-3 text-ivory/70">
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>No modeling experience required. Every pose is guided and directable.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Local expertise. We know Fort Walton Beach and where the best light falls.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Free consultation first. You'll know exactly what to expect before booking.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Your privacy is protected. Images shared only with your permission.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Flexible payments so the investment fits your budget and timeline.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Service Area</h3>
            <p className="text-ivory/70 text-sm mb-4">
              We serve the entire Fort Walton Beach and Okaloosa County area:
            </p>
            <ul className="space-y-2 text-ivory/70 text-sm">
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Fort Walton Beach</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Okaloosa Island</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Mary Esther</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Niceville</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span><a href="/destin-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">Destin</a> (also served)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span><a href="/santa-rosa-beach-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">30A Area</a> (also served)</span>
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
                <span>Anniversary and couples' getaways to the Gulf Coast</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Bachelorette parties and girls' trips</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Birthday celebrations and special milestones</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Local women seeking confidence and empowerment</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Bridal boudoir sessions and engagement gifts</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Celebrating life changes with powerful imagery</span>
              </li>
            </ul>
          </div>
          <div>
            <Eyebrow>Ready to Book Your Session?</Eyebrow>
            <Heading>Schedule Your Fort Walton Beach Consultation</Heading>
            <p className="mt-5 text-ivory/68">
              Start with a free, private conversation. We'll discuss your goals, answer every question, and make sure you feel ready before your session.
            </p>
            <div className="mt-8 space-y-3">
              <Button href="/contact">Request Private Consultation</Button>
              <p className="text-ivory/60 text-sm">
                Call or text <span className="text-champagne font-semibold">850-608-0844</span>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <Eyebrow>Explore More</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Discover the Boudoir Photography Experience</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            From the first consultation to the final album, every moment is designed to make you feel confident, beautiful, and powerful.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Button href="/experience">The Experience</Button>
            <Button href="/boudoir-pricing" variant="secondary">Pricing & Packages</Button>
            <Button href="/boudoir-portfolio" variant="secondary">View Portfolio</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
