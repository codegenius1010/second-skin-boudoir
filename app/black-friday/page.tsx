import type { Metadata } from 'next'
import { Suspense } from 'react'
import Image from 'next/image'
import { Section } from '@/components/Section'
import { Testimonial } from '@/components/Testimonial'
import { FAQAccordion } from '@/components/FAQAccordion'
import { site } from '@/lib/site'
import { BFHero } from './hero'
import { BFGallery } from './gallery'
import { BFLeadForm } from './lead-form'
import { BFStickyCTA } from './sticky-cta'
import { CTAButton } from './cta-button'
import { blackFridayPromo, isPromoActive, offerHeadline } from './config'

export const metadata: Metadata = {
  title: 'Early Black Friday | 50% Off Boudoir Photography | Second Skin Boudoir',
  description:
    'Discover the Second Skin Boudoir Early Black Friday offer. Enjoy 50% off luxury boudoir photography packages for a limited time.',
  alternates: { canonical: '/black-friday' },
  openGraph: {
    title: 'Early Black Friday | 50% Off Boudoir Photography',
    description:
      'Discover the Second Skin Boudoir Early Black Friday offer. Enjoy 50% off luxury boudoir photography packages for a limited time.',
    url: '/black-friday',
    images: [{ url: '/images/boudoir/LW-206.jpg' }],
  },
}

const steps = [
  { title: 'Connect With Us', body: 'Tell us a little about yourself and your interest in the experience.' },
  { title: 'Plan Your Experience', body: "We'll help you explore the experience and find the package that suits your vision." },
  { title: 'Your Moment to Shine', body: 'Enjoy a personalized boudoir photography experience designed around you.' },
]

const faqItems: string[][] = [
  [
    'What is a boudoir photography experience?',
    "It's more than a photoshoot. Second Skin Boudoir creates an intimate, private experience where elegance, confidence, and self-expression come together to produce beautiful portraits that capture your individuality.",
  ],
  [
    'Do I need previous modeling experience?',
    "No. All of our clients are real women, just like you. We take care of the posing right down to your fingertips. By the end of your session, you might just feel like a supermodel!",
  ],
  [
    'How does the Black Friday offer work?',
    "For a limited time, the Early Black Friday offer provides a reduced rate on our boudoir packages. Submit the form below and our team will walk you through full pricing, eligibility, and how the offer applies to your session.",
  ],
  [
    'How do I choose the right photography package?',
    "Packages vary based on products and session length. During your consultation, we'll help you find the package that fits your vision and explain how the current offer applies.",
  ],
  [
    'How do I get started?',
    "Share a few details in the form below. We'll reach out to answer your questions and help you explore booking your Second Skin Boudoir experience.",
  ],
]

export default function BlackFridayPage() {
  const active = isPromoActive()

  return (
    <main className="bg-bfBlack text-bfIvory">
      <BFHero />

      {/* Section 2 — The Experience */}
      <Section className="bg-bfCharcoal">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-bfGold">The Experience</p>
            <h2 className="mt-4 font-bf-serif text-4xl leading-tight text-bfIvory md:text-5xl">
              More Than a Photoshoot. <span className="font-bf-serif-italic italic text-bfGold">An Experience.</span>
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-bfIvory/70">
              Step into an experience where elegance, confidence, and self-expression come together. Second Skin
              Boudoir creates intimate, beautiful portraits that capture your individuality and celebrate your
              story.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-bfGold/15">
            <Image
              src="/images/boudoir/LH-032.jpg"
              alt="Elegant boudoir portrait wrapped in a soft wrap"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </Section>

      {/* Section 3 — Featured Gallery */}
      <Section className="bg-bfBlack">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-bfGold">Featured Photography</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-bf-serif text-4xl leading-tight text-bfIvory md:text-5xl">
            A Glimpse Into the Artistry
          </h2>
        </div>
        <BFGallery />
      </Section>

      {/* Section 4 — Black Friday Exclusive */}
      <Section id="exclusive-offer" className="bg-bfCharcoal">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-bfGold/25 bg-bfBlack p-8 text-center shadow-glow md:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-bfGold">An Exclusive Invitation</p>
          <h2 className="mt-5 font-bf-serif text-4xl text-bfIvory md:text-5xl">
            {active ? offerHeadline() : 'This Offer Has Ended'}
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-bfIvory/70">
            {active
              ? 'For a limited time, enjoy an exclusive opportunity to experience Second Skin Boudoir at a reduced rate on our photography packages.'
              : "Thank you for your interest. This promotion is no longer available, but we'd still love to help you plan your experience."}
          </p>
          <div className="mt-9">
            <CTAButton href="#offer" eventLabel="exclusive-offer">
              {active ? 'Claim My Offer' : 'Join the Waitlist'}
            </CTAButton>
          </div>
          {(blackFridayPromo.endDate || blackFridayPromo.terms) && (
            <div className="mt-8 border-t border-bfGold/15 pt-6 text-xs leading-relaxed text-bfTaupe">
              {blackFridayPromo.endDate && <p>Offer valid through {blackFridayPromo.endDate}.</p>}
              {blackFridayPromo.terms && <p className="mt-2">{blackFridayPromo.terms}</p>}
            </div>
          )}
        </div>
      </Section>

      {/* Section 5 — What to Expect */}
      <Section className="bg-bfBlack">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-bfGold">What to Expect</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-bf-serif text-4xl leading-tight text-bfIvory md:text-5xl">
            Your Experience, Step by Step
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-[1.75rem] border border-bfGold/15 bg-bfCharcoal p-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-bfGold text-sm font-semibold text-bfGold">
                {i + 1}
              </div>
              <h3 className="font-bf-serif text-xl text-bfIvory">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-bfIvory/65">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 6 — Testimonials */}
      <Section className="bg-bfCharcoal">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-bfGold">What Clients Are Saying</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-bf-serif text-4xl leading-tight text-bfIvory md:text-5xl">
            Women Leave Feeling More Beautiful Than They Arrived
          </h2>
        </div>
        <div className="space-y-8">
          <Testimonial
            quote={`I loved that I was shown the shots through the experience. It really helped me feel like I was part of the outcome and could help me tweak any poses to make sure I got the perfect shot!

Favorite Part: I felt extremely comfortable the entire session. It honestly felt like I was shooting with a friend!`}
            author="Lindsey M."
            image="/images/boudoir/LM1.jpg"
            imageAlt="Lindsey M. testimonial from her boudoir session"
          />
          <Testimonial
            quote={`It was a great experience and I felt great and amazing while doing it and even after leaving.

Favorite Part: My favorite part of the shoot was more personal to me — doing something for me that I wanted for once. I felt beautiful and confident.`}
            author="Kaylin K."
            image="/images/boudoir/KK-19.jpg"
            imageAlt="Kaylin K. testimonial from her boudoir session"
          />
        </div>
      </Section>

      {/* Section 7 — Lead Capture */}
      <Section id="offer" className="bg-bfBlack">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-bfGold">Claim Your Offer</p>
            <h2 className="mt-4 font-bf-serif text-4xl leading-tight text-bfIvory md:text-5xl">
              Your Experience Starts Here.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-bfIvory/70">
              Ready to discover your Second Skin Boudoir experience? Share a few details below, and we&apos;ll help
              you explore our Early Black Friday offer.
            </p>
          </div>
          <div className="mt-8">
            <Suspense fallback={<div className="h-[520px] rounded-[2rem] border border-bfGold/20 bg-bfCharcoal" />}>
              <BFLeadForm />
            </Suspense>
          </div>
          <p className="mt-6 text-center text-sm text-bfTaupe">
            Prefer to call or text? {site.phone} · {site.email}
          </p>
        </div>
      </Section>

      {/* Section 8 — FAQ */}
      <Section className="bg-bfCharcoal">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-bfGold">Frequently Asked Questions</p>
            <h2 className="mt-4 font-bf-serif text-4xl leading-tight text-bfIvory md:text-5xl">Good to Know</h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </Section>

      {/* Section 9 — Final CTA */}
      <section className="relative overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute inset-0">
          <Image src="/images/boudoir/LM3.jpg" alt="Empowering boudoir silhouette portrait" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-bfBlack/75" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-bf-serif text-4xl leading-tight text-bfIvory md:text-5xl">This Moment Is Yours.</h2>
          <p className="mx-auto mt-5 max-w-xl text-bfIvory/80">
            Make space for an experience that&apos;s entirely about you.
          </p>
          <div className="mt-9 flex justify-center">
            <CTAButton href="#offer" eventLabel="final-cta">
              {active ? 'Claim Your 50% Offer' : 'Join the Waitlist'}
            </CTAButton>
          </div>
        </div>
      </section>

      <BFStickyCTA />
    </main>
  )
}
