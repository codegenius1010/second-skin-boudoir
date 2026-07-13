import type { Metadata } from 'next'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Opportunities | Collaborations, Paid Model Shoots & Boudoir Sessions',
  description: 'Explore Second Skin Boudoir collaboration sessions, paid model shoots, and private boudoir experiences in Destin and New York City.',
  openGraph: {
    title: 'Work With Second Skin Boudoir',
    description: 'Explore collaboration opportunities, paid model shoots, and private boudoir experiences.',
  },
}

interface OpportunityCard {
  id: string
  eyebrow: string
  title: string
  description: string
  details: string[]
  badge?: string
  ctaLabel: string
  href: string
}

const opportunities: OpportunityCard[] = [
  {
    id: 'nyc-collaboration',
    eyebrow: 'NEW YORK CITY · AUGUST 10–15, 2026',
    title: 'NYC Collaboration Sessions',
    description:
      'Apply for a limited complimentary boudoir collaboration session while Second Skin Boudoir is in Manhattan.',
    details: [
      'Complimentary private session',
      '10 professionally edited images',
      'No modeling experience required',
      'Selected images used only with written approval',
      'Limited availability',
    ],
    badge: 'Limited August Openings',
    ctaLabel: 'Apply for NYC',
    href: '/nyc-collaboration',
  },
  {
    id: 'destin-collaboration',
    eyebrow: 'DESTIN + EMERALD COAST',
    title: 'Destin Collaboration Sessions',
    description: 'A luxury boudoir experience created in exchange for approved portfolio use.',
    details: [
      'Complimentary guided session',
      '10 professionally edited images',
      'Private consultation first',
      'Image permissions agreed to in writing',
      'Application required',
    ],
    ctaLabel: 'Apply for Destin',
    href: '/collaboration',
  },
  {
    id: 'paid-model-shoots',
    eyebrow: 'PAID OPPORTUNITY · DESTIN AREA',
    title: 'Paid Model Shoots',
    description: 'Earn $150 and receive professional images during a fully guided one-hour boudoir session.',
    details: [
      '$150 paid after the completed session',
      'One-hour photography session',
      '10 edited digital images',
      'No experience required',
      'Applicants must be 21 or older',
    ],
    badge: '$150 Paid Session',
    ctaLabel: 'Apply for a Paid Shoot',
    href: '/model-shoots',
  },
  {
    id: 'private-client',
    eyebrow: 'PRIVATE CLIENT EXPERIENCE',
    title: 'Book Your Own Boudoir Session',
    description:
      'Looking for a private experience created entirely for you rather than a modeling or collaboration opportunity?',
    details: [
      'Personalized consultation',
      'Wardrobe and styling guidance',
      'Fully guided posing',
      'Private image delivery',
      'No images shared without written permission',
    ],
    ctaLabel: 'Explore Client Sessions',
    href: '/contact',
  },
]

export default function OpportunitiesPage() {
  return (
    <main>
      {/* HERO */}
      <Hero
        eyebrow="WORK WITH SECOND SKIN BOUDOIR"
        title="Choose Your Experience"
        subtitle="Explore current collaboration opportunities, paid model shoots, and private boudoir experiences in Destin and New York City."
        primary="Explore Opportunities"
        primaryHref="#opportunities"
      />

      <Section>
        <div className="text-center mb-8">
          <p className="text-champagne text-lg font-semibold">Private. Guided. Tasteful.</p>
          <p className="text-ivory/60 text-sm mt-2">
            Professional models, aspiring models, creators, moms, and first-timers are welcome.
          </p>
        </div>
      </Section>

      {/* OPPORTUNITY CARDS */}
      <Section id="opportunities">
        <div className="grid md:grid-cols-2 gap-8">
          {opportunities.map((opp) => (
            <Link
              key={opp.id}
              href={opp.href}
              className="group relative flex flex-col rounded-[2rem] border border-ivory/10 bg-ivory/[0.035] p-8 shadow-glow transition-all duration-300 hover:border-champagne/30 hover:bg-ivory/[0.055]"
            >
              {/* Card Content */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-champagne">{opp.eyebrow}</p>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl leading-tight text-ivory">{opp.title}</h3>
                  {opp.badge && (
                    <span className="flex-shrink-0 inline-block rounded-full bg-champagne/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-champagne whitespace-nowrap">
                      {opp.badge}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-ivory/75 leading-relaxed">{opp.description}</p>

                <div className="mt-6 space-y-2">
                  {opp.details.map((detail, idx) => (
                    <div key={idx} className="flex gap-3 text-sm text-ivory/70">
                      <span className="text-champagne flex-shrink-0">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button - Bottom */}
              <div className="mt-8 pt-6 border-t border-ivory/10">
                <span className="block w-full text-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide bg-champagne text-charcoal group-hover:bg-ivory transition duration-300">
                  {opp.ctaLabel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* HOW TO CHOOSE */}
      <Section className="bg-smoke">
        <div className="max-w-3xl">
          <Heading className="text-center mb-12">Not Sure Which Is Right for You?</Heading>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-champagne">Collaboration</h3>
              <p className="mt-2 text-ivory/75">
                Best for someone comfortable allowing specifically approved images to be used in the Second Skin
                Boudoir portfolio.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-champagne">Paid Model Shoot</h3>
              <p className="mt-2 text-ivory/75">
                Best for someone seeking payment, professional images, and experience in front of the camera.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-champagne">Private Client Session</h3>
              <p className="mt-2 text-ivory/75">
                Best for someone who wants complete privacy and a session designed solely around her personal
                experience.
              </p>
            </div>

            <div className="rounded-[2rem] border border-champagne/30 bg-champagne/10 p-6 mt-8">
              <p className="text-sm text-ivory/80">
                <span className="text-champagne font-semibold">→ Every opportunity begins with a private conversation.</span>{' '}
                Applying does not commit you to booking a session.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* TRUST AND SAFETY */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Heading className="text-center mb-12">Your Comfort Comes First</Heading>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-ivory/10 bg-ivory/[0.035] p-6">
              <p className="font-semibold text-champagne">Private consultation before the session</p>
              <p className="mt-2 text-sm text-ivory/70">
                Every opportunity begins with a conversation about your comfort level, boundaries, and goals.
              </p>
            </div>

            <div className="rounded-[2rem] border border-ivory/10 bg-ivory/[0.035] p-6">
              <p className="font-semibold text-champagne">Fully guided posing and expression</p>
              <p className="mt-2 text-sm text-ivory/70">
                No awkward guessing or figuring it out alone. Direction every step of the way.
              </p>
            </div>

            <div className="rounded-[2rem] border border-ivory/10 bg-ivory/[0.035] p-6">
              <p className="font-semibold text-champagne">Clear boundaries and ongoing consent</p>
              <p className="mt-2 text-sm text-ivory/70">
                You stay in control. Any questions or concerns are addressed immediately.
              </p>
            </div>

            <div className="rounded-[2rem] border border-ivory/10 bg-ivory/[0.035] p-6">
              <p className="font-semibold text-champagne">Trusted friend or support person welcome</p>
              <p className="mt-2 text-sm text-ivory/70">
                Bring a friend for comfort and support. You are never alone or pressured.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-champagne/30 bg-champagne/10 p-6 mt-8">
            <p className="text-sm text-ivory/80">
              <strong className="text-champagne">No explicit nudity is required.</strong> You remain in control of
              your wardrobe, poses, comfort level, and image permissions.
            </p>
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-smoke">
        <div className="max-w-2xl mx-auto text-center">
          <Heading className="mb-4">Ready to Take the Next Step?</Heading>
          <p className="text-ivory/75 mb-8">
            Choose the opportunity that feels right for you and submit a private application or consultation request.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/nyc-collaboration">View NYC Opportunities</Button>
            <Button href="/collaboration" variant="secondary">
              View Destin Opportunities
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
