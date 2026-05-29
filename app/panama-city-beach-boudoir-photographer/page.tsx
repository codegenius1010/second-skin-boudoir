import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Panama City Beach Boudoir Photographer | Luxury Boudoir Sessions',
  description: 'Private luxury boudoir photography in Panama City Beach, Destin area, and Florida Gulf Coast. Fully guided sessions with complete privacy protection.',
  openGraph: {
    title: 'Panama City Beach Boudoir Photographer',
    description: 'Luxury boudoir photography in Panama City Beach and the beautiful Florida Gulf Coast.',
  },
}

export default function PanamaCityBeachBoudoir() {
  return (
    <main>
      <Hero
        eyebrow="Panama City Beach Boudoir Photographer"
        title="Luxury Boudoir Photography in Panama City Beach"
        subtitle="Private, guided boudoir sessions for women visiting or living in Panama City Beach and the scenic Gulf Coast of Florida."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <Card title="Gulf Coast Boudoir">
            Sessions available in Panama City Beach and surrounding Gulf Coast communities. Beautiful natural light and flexible locations.
          </Card>
          <Card title="Vacation Ready">
            Visiting Panama City Beach for a trip? Add a boudoir session to your itinerary for a memory that lasts forever.
          </Card>
          <Card title="Your Privacy">
            All images kept completely private unless you choose to share. Your images, your choice, always.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Panama City Beach Boudoir Photography</Eyebrow>
        <Heading>Fully Guided Luxury Sessions for Gulf Coast Women</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          Second Skin Boudoir serves women throughout Panama City Beach and the greater Gulf Coast area. Whether you're planning a destination boudoir experience or you're a local seeking confidence and empowerment, we create a private, fully guided session tailored to you. We also serve <a href="/destin-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">Destin</a>, <a href="/30a-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">30A</a>, and <a href="/fort-walton-beach-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">Fort Walton Beach</a>.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="What's Included">
            Private consultation, wardrobe guidance, professional session with complete posing direction, hair and makeup (optional), private image reveal, and flexible collection options starting at $995.
          </Card>
          <Card title="Investment">
            Essential Session ($300) or Signature Session with styling ($549). Luxury albums and collections begin at $995. Payment plans available.
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Why Choose Second Skin Boudoir</Eyebrow>
            <Heading>Panama City Beach Boudoir You Can Trust</Heading>
            <ul className="mt-8 space-y-3 text-ivory/70">
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>No experience needed. We guide every pose and detail for beautiful, natural-looking images.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Flexible scheduling for vacationing guests and local residents alike.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Free consultation before booking so you know exactly what to expect.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Complete privacy guarantee. Your images are never shared without permission.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Accessible payment options to fit your budget and timeline.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">About Panama City Beach</h3>
            <p className="text-ivory/70 text-sm mb-4">
              Panama City Beach is a vibrant, beautiful Gulf Coast destination known for its stunning beaches, warm waters, and vacation atmosphere. Perfect for:
            </p>
            <ul className="space-y-2 text-ivory/70 text-sm">
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Spring Break trips and celebrations</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Anniversary and romantic getaways</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Bachelorette parties and girls' trips</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Birthday celebrations and milestones</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Family vacations with personal time</span>
              </li>
              <li className="flex gap-2">
                <span className="text-champagne">•</span>
                <span>Bridal boudoir for wedding gifts</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>The Boudoir Experience</Eyebrow>
        <Heading>What to Expect During Your Panama City Beach Session</Heading>
        <p className="mt-5 max-w-2xl text-ivory/68">
          We create a comfortable, private environment where you can relax and feel beautiful. Every moment is guided, every pose is chosen for you, and every image is retouched professionally.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card title="Before">
            Free consultation to discuss your vision. Wardrobe guide emailed so you know exactly what to bring. Questions answered. Comfort guaranteed.
          </Card>
          <Card title="During">
            Private session with complete direction. Hair and makeup (optional). Outfit changes. Professional styling. Confidence building throughout.
          </Card>
          <Card title="After">
            Professional retouching. Private reveal in 3-4 weeks. Time to choose collections that resonate with you. Flexible payment plans available.
          </Card>
          <Card title="Results">
            Luxury albums, digital collections, folio boxes. Artwork you'll treasure forever. Confidence that carries forward beyond the session.
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Ready to Book?</Eyebrow>
            <Heading>Start Your Panama City Beach Boudoir Journey</Heading>
            <p className="mt-5 text-ivory/68">
              Schedule a free consultation. Whether you're visiting for a week or living here year-round, let's create something beautiful together.
            </p>
            <div className="mt-8 space-y-3">
              <Button href="/contact">Book Your Consultation</Button>
              <p className="text-ivory/60 text-sm">
                Call or text <span className="text-champagne font-semibold">850-608-0844</span>
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Quick Reference</h3>
            <div className="space-y-4 text-ivory/70 text-sm">
              <div>
                <p className="font-semibold text-ivory">Essential Session</p>
                <p>$300 — Includes consultation, wardrobe guidance, fully guided session.</p>
              </div>
              <div>
                <p className="font-semibold text-ivory">Signature Session</p>
                <p>$549 — Everything above plus hair & makeup application.</p>
              </div>
              <div>
                <p className="font-semibold text-ivory">Collections</p>
                <p>Luxury albums, digital files, and folio boxes starting at $995.</p>
              </div>
              <div>
                <p className="font-semibold text-ivory">Payment Plans</p>
                <p>Interest-free options available before or after your reveal.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <Eyebrow>Discover More</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Explore the Full Boudoir Experience</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            From your first consultation to unwrapping your final album, every step is designed to make you feel confident, beautiful, and celebrated.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Button href="/experience">The Experience</Button>
            <Button href="/what-to-wear-boudoir-session" variant="secondary">What to Wear</Button>
            <Button href="/boudoir-portfolio" variant="secondary">View Portfolio</Button>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Still Have Questions?</Eyebrow>
        <Heading>Boudoir FAQ</Heading>
        <p className="mt-5 max-w-2xl text-ivory/68">
          Check our comprehensive FAQ page for answers to common questions about boudoir photography, pricing, privacy, and the session experience.
        </p>
        <div className="mt-8">
          <Button href="/faq">View FAQ</Button>
        </div>
      </Section>
    </main>
  )
}
