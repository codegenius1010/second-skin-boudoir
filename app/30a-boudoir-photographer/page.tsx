import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: '30A Boudoir Photographer | Santa Rosa Beach Boudoir Photography',
  description: 'Luxury boudoir photography in 30A: Santa Rosa Beach, Rosemary Beach, Alys Beach, WaterColor, Seaside, and Grayton Beach. Private, fully guided sessions.',
  openGraph: {
    title: '30A Boudoir Photographer',
    description: 'Luxury boudoir photography for women in 30A and surrounding South Walton communities.',
  },
}

export default function ThirtyABoudoirPhotographer() {
  return (
    <main>
      <Hero
        eyebrow="30A Boudoir Photographer"
        title="Luxury Boudoir Photography in 30A"
        subtitle="Elegant, private boudoir sessions for women in Santa Rosa Beach, Rosemary Beach, Alys Beach, WaterColor, Seaside, Grayton Beach, Blue Mountain Beach, and surrounding communities."
      />

      <Section>
        <Eyebrow>The 30A Boudoir Experience</Eyebrow>
        <Heading>Luxury Photography for Life's Beautiful Moments</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          30A is known for its laid-back elegance, stunning natural beauty, and vibrant community. Second Skin Boudoir brings that same relaxed luxury to your boudoir experience — no pretense, no pressure, just thoughtful, artistic photography that celebrates you.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Elevated & Elegant">
            Boudoir that feels sophisticated, artistic, and thoughtfully directed. No gimmicks, no over-the-top styling — just timeless, beautiful imagery.
          </Card>
          <Card title="Vacation & Local">
            Perfect for 30A vacation getaways, milestone celebrations, or if you're a local resident seeking confidence and connection with your body.
          </Card>
          <Card title="Complete Privacy">
            Your session is private. Images shared only with your written permission. Your comfort and confidentiality are always our priority.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Why Choose 30A Boudoir Photography</Eyebrow>
        <Heading>Professional, Private, and Designed Around You</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          A boudoir session isn't about modeling. It's about being seen, guided, and celebrated. Second Skin Boudoir creates that experience by handling every detail — lighting, posing, wardrobe, styling — so you can simply relax and feel beautiful. We know 30A, we know the best light, and we know how to create stunning imagery that feels authentically you.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="Consultation">
            Free, private, no-pressure conversation about your vision, budget, timeline, and any concerns. We answer everything and help you feel confident before booking.
          </Card>
          <Card title="Wardrobe Planning">
            Detailed guide with outfit suggestions, styling tips, and inspiration photos tailored to your body confidence and aesthetic preferences.
          </Card>
          <Card title="Professional Session">
            1–3 hours of fully guided posing, professional lighting, wardrobe changes, and complete artistic direction. Hair and makeup available (optional).
          </Card>
          <Card title="Reveal & Collections">
            Your images revealed privately in 3–4 weeks, fully retouched. You choose collections that resonate with you at your own pace.
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>30A Service Area</Eyebrow>
            <Heading>We Know Every Community</Heading>
            <p className="mt-5 text-ivory/68">
              From Rosemary Beach's architectural elegance to Grayton Beach's artistic vibe, each 30A community has its own character. We know the best locations, the beautiful light at different times, and how to capture each area's unique aesthetic.
            </p>
            <div className="mt-8 space-y-2 text-ivory/70">
              <p className="font-semibold text-champagne">Communities we serve:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-champagne">•</span>
                  <span>Santa Rosa Beach (<a href="/santa-rosa-beach-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">dedicated page</a>)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-champagne">•</span>
                  <span>Rosemary Beach</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-champagne">•</span>
                  <span>Alys Beach</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-champagne">•</span>
                  <span>WaterColor</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-champagne">•</span>
                  <span>Seaside</span>
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
                  <span>Inlet Beach</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Session Investment</h3>
            <div className="space-y-4 text-ivory/70 text-sm">
              <div>
                <p className="font-semibold text-ivory mb-1">Essential Session</p>
                <p>$300 — Professional 1–3 hour session with wardrobe guidance, complete posing direction, and private reveal.</p>
              </div>
              <div className="border-t border-ivory/10 pt-4">
                <p className="font-semibold text-ivory mb-1">Signature Session</p>
                <p>$549 — Everything above plus professional hair and makeup. Ideal for clients wanting the full pampering experience.</p>
              </div>
              <div className="border-t border-ivory/10 pt-4">
                <p className="font-semibold text-ivory mb-1">Collections</p>
                <p>Luxury albums, digital files, and folio boxes start at $995. Most clients invest $1,500–$3,500 total.</p>
              </div>
              <div className="border-t border-ivory/10 pt-4">
                <p className="font-semibold text-ivory mb-1">Payment Plans</p>
                <p>Interest-free options make it easy to invest in yourself comfortably.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Perfect For</Eyebrow>
        <Heading>Why 30A Women & Visitors Choose Us</Heading>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Vacation Getaways</h3>
            <p className="text-ivory/70">
              Bachelorette weekends, anniversary trips, girls' vacations, birthday celebrations — add boudoir to your 30A experience. Something fun, private, and truly memorable.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Local Residents</h3>
            <p className="text-ivory/70">
              Living in 30A year-round or seasonally? Schedule a session that fits your lifestyle. Flexible dates throughout the year with complete understanding of the area.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Milestone Moments</h3>
            <p className="text-ivory/70">
              Birthdays, anniversaries, divorces, new chapters, life transitions — boudoir becomes a powerful way to celebrate and reconnect with yourself.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Bridal Confidence</h3>
            <p className="text-ivory/70">
              Pre-wedding boost, bridal gift for your partner, or personal empowerment before the big day. Boudoir is the perfect way to feel stunning before and after saying "I do."
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>What Makes Us Different</Eyebrow>
            <Heading>Guided, Not Posed. Empowered, Not Exposed.</Heading>
            <p className="mt-5 text-ivory/68">
              You don't need modeling experience. You don't need to know what to do with your hands or how to position your body. We guide every moment. You simply show up, relax, and let us handle the artistry.
            </p>
            <ul className="mt-8 space-y-3 text-ivory/70">
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Every pose professionally directed</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Wardrobe chosen for your comfort level</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>No guessing about final cost — transparent pricing</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Images stay private unless you choose to share</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Professional retouching included</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">The Timeline</h3>
            <div className="space-y-4 text-ivory/70 text-sm">
              <div className="flex gap-3">
                <span className="font-semibold text-champagne">1.</span>
                <div>
                  <p className="font-semibold text-ivory">Consultation (Now)</p>
                  <p>Free chat about your goals and vision.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-champagne">2.</span>
                <div>
                  <p className="font-semibold text-ivory">Planning (1–2 weeks)</p>
                  <p>Wardrobe guide and styling tips sent.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-champagne">3.</span>
                <div>
                  <p className="font-semibold text-ivory">Session Day</p>
                  <p>1–3 hours of guided, professional photography.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-champagne">4.</span>
                <div>
                  <p className="font-semibold text-ivory">Reveal (3–4 weeks)</p>
                  <p>See all your images. Choose collections at your pace.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="text-center">
          <Eyebrow>Ready to Book Your 30A Session?</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Start with a Free Consultation</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            Schedule a private, no-pressure conversation to discuss your vision, answer all your questions, and plan your perfect session.
          </p>
          <div className="mt-8 space-y-4">
            <Button href="/contact">Request Private Consultation</Button>
            <p className="text-ivory/60">
              Call or text <span className="text-champagne font-semibold">850-608-0844</span>
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <Eyebrow>Learn More</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Explore the Full Boudoir Experience</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            From understanding what to wear to seeing our portfolio, we've created resources to help you feel confident about your boudoir journey.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Button href="/experience">The Experience</Button>
            <Button href="/what-to-wear-boudoir-session" variant="secondary">What to Wear</Button>
            <Button href="/boudoir-pricing" variant="secondary">Pricing</Button>
            <Button href="/boudoir-portfolio" variant="secondary">Portfolio</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
