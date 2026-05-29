import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Destin Boudoir Photographer | Luxury Boudoir Photography',
  description: 'Private luxury boudoir photography in Destin, Miramar Beach, and the Florida Gulf Coast. Fully guided sessions with professional styling and complete privacy protection.',
  openGraph: {
    title: 'Destin Boudoir Photographer',
    description: 'Luxury, private boudoir photography in Destin and surrounding Gulf Coast areas.',
  },
}

export default function DestinBoudoirPhotographer() {
  return (
    <main>
      <Hero
        eyebrow="Destin Boudoir Photographer"
        title="Luxury Boudoir Photography in Destin, Florida"
        subtitle="Private, guided boudoir sessions for women in Destin, Miramar Beach, and the beautiful Florida Gulf Coast. Serving vacation visitors and local residents."
      />

      <Section>
        <Eyebrow>Why Choose Destin Boudoir</Eyebrow>
        <Heading>Your Private Luxury Boudoir Experience</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          Second Skin Boudoir specializes in creating safe, private, and empowering boudoir experiences for women in Destin and the surrounding Gulf Coast communities. Whether you're visiting for a special occasion, celebrating a milestone, or simply deciding to invest in yourself, we create an experience tailored entirely to you.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Vacation Sessions">
            Celebrating a birthday, anniversary, bachelorette getaway, girls' trip, or special moment? Bring boudoir into your Gulf Coast vacation and create memories that last forever.
          </Card>
          <Card title="Local Residents">
            Living in Destin or the area? Schedule your session during the season that works for you. Flexible dates and times for Destin professionals and families.
          </Card>
          <Card title="Privacy Guarantee">
            Your images stay completely private unless you choose to share them. No public posting without written permission. Your privacy is our promise.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>The Destin Boudoir Experience</Eyebrow>
        <Heading>Fully Guided Sessions with Professional Direction</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          A boudoir session with Second Skin Boudoir is not about pretending to be a model or figuring out poses on your own. It's about being guided, supported, and directed through every moment so you can relax and feel beautiful. We handle the technical details while you focus on confidence and presence.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="Consultation">
            Start with a free, private consultation to discuss your vision, answer all your questions, and plan your session. No pressure, complete transparency, and time to ask anything you're wondering about.
          </Card>
          <Card title="Wardrobe Guidance">
            We send a detailed wardrobe guide with styling suggestions, outfit ideas, and inspiration photos tailored to your style preferences and body confidence level.
          </Card>
          <Card title="Professional Session">
            1–3 hours of fully guided posing, professional lighting, wardrobe changes, and complete direction. Hair and makeup available (optional). Every pose is chosen for your flattery and comfort.
          </Card>
          <Card title="Private Reveal">
            Your images are revealed privately in 3–4 weeks, fully retouched professionally. You take time to choose collections that resonate with you. No pressure to buy everything immediately.
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Destin & Gulf Coast Service Area</Eyebrow>
            <Heading>We Serve the Entire Area</Heading>
            <p className="mt-5 text-ivory/68">
              From Destin proper to surrounding communities, we're familiar with the best locations, beautiful light, and spaces that photograph well. Whether you want a luxury hotel session, Airbnb shoot, or private location, we know how to make it work.
            </p>
            <ul className="mt-8 space-y-3 text-ivory/70">
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Destin and Miramar Beach core locations</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span><a href="/30a-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">30A area</a> (Santa Rosa Beach, Grayton, Blue Mountain Beach)</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span><a href="/fort-walton-beach-boudoir-photographer" className="text-champagne hover:text-ivory transition-colors">Fort Walton Beach</a> and Okaloosa Island</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Vacation rentals and hotel rooms throughout the area</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">✓</span>
                <span>Private locations and approved studios</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Investment Overview</h3>
            <div className="space-y-4 text-ivory/70 text-sm">
              <div>
                <p className="font-semibold text-ivory mb-1">Essential Session</p>
                <p>$300 — Includes consultation, wardrobe guidance, professional 1–3 hour session with complete posing direction, and private reveal.</p>
              </div>
              <div className="border-t border-ivory/10 pt-4">
                <p className="font-semibold text-ivory mb-1">Signature Session</p>
                <p>$549 — Everything above plus professional hair and makeup application. Ideal for first-time clients who want the full pampering experience.</p>
              </div>
              <div className="border-t border-ivory/10 pt-4">
                <p className="font-semibold text-ivory mb-1">Collections</p>
                <p>Luxury albums, digital files, and folio boxes start at $995. Most clients invest $1,500–$3,500 depending on collections chosen.</p>
              </div>
              <div className="border-t border-ivory/10 pt-4">
                <p className="font-semibold text-ivory mb-1">Payment Plans</p>
                <p>Interest-free options available before or after your reveal, so you can invest comfortably.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Perfect For</Eyebrow>
        <Heading>Why Destin Women Choose Us</Heading>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Vacation Visitors</h3>
            <p className="text-ivory/70">
              Bachelorette parties, birthday getaways, anniversary trips, girls' weekends — add boudoir to your Destin experience. Something fun, confidential, and completely memorable.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Local Professionals</h3>
            <p className="text-ivory/70">
              Living in Destin or the Gulf Coast? Book a session that fits your schedule. Flexible dates throughout the year, and we know the area intimately.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Milestone Celebrations</h3>
            <p className="text-ivory/70">
              Birthdays, anniversaries, life transitions, divorces, new chapters — boudoir becomes a powerful way to celebrate and reconnect with yourself.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Bridal Moments</h3>
            <p className="text-ivory/70">
              Pre-wedding confidence boost, bridal gift for your partner, or personal empowerment before the big day. Boudoir is the perfect bridal tradition.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <Eyebrow>Ready to Book Your Session?</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Start with a Free Consultation</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            Schedule a no-pressure conversation about your vision, goals, and any questions you have. We'll discuss timing, location, investment, and what to expect.
          </p>
          <div className="mt-8 space-y-4">
            <Button href="/contact">Request Private Consultation</Button>
            <p className="text-ivory/60">
              Call or text <span className="text-champagne font-semibold">850-608-0844</span>
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Learn More</Eyebrow>
        <Heading>Explore Every Aspect of Your Boudoir Journey</Heading>
        <p className="mt-5 max-w-2xl text-ivory/68 mx-auto">
          From understanding what to wear to seeing our portfolio, we've created detailed resources to help you feel confident about your decision.
        </p>
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <Button href="/experience">The Experience</Button>
          <Button href="/what-to-wear-boudoir-session" variant="secondary">What to Wear</Button>
          <Button href="/boudoir-pricing" variant="secondary">Pricing</Button>
          <Button href="/boudoir-portfolio" variant="secondary">Portfolio</Button>
        </div>
      </Section>
    </main>
  )
}
