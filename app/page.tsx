import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Button } from '@/components/Button'
import { Card, Timeline } from '@/components/Cards'
import { Testimonial } from '@/components/Testimonial'
import { FAQAccordion } from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Luxury Boudoir Photography in Destin & 30A | Second Skin Boudoir',
  description: 'Luxury boudoir photography in Destin, 30A, Santa Rosa Beach, and the Florida Gulf Coast. Private, guided sessions designed to help you feel beautiful, powerful, and completely yourself.',
  openGraph: {
    title: 'Luxury Boudoir Photography in Destin & 30A',
    description: 'Private, guided boudoir photography for women in Destin and along the Florida Gulf Coast.',
  },
}

const steps = [
  { title: 'Private Consultation', body: 'We talk through your vision, comfort level, wardrobe, location, and what you want to feel when you see your images.' },
  { title: 'Styling Guidance', body: 'You receive guidance on lingerie, robes, oversized shirts, dresses, bodysuits, jewelry, heels, and pieces that feel like you.' },
  { title: 'Hair & Makeup', body: 'Choose a session with professional hair and makeup so you can relax into the experience from the start.' },
  { title: 'Guided Photoshoot', body: 'You are directed through every pose, expression, movement, and detail. No guessing. No pressure.' },
  { title: 'Private Reveal', body: 'You view your images privately and choose only what you love. Albums, wall art, and digital collections are available.' },
]

export default function Home() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://secondskinboudoir.com',
      },
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Hero
        title="Luxury Boudoir Photography in Destin & 30A"
        subtitle="Private, guided, fully-directed boudoir sessions for women across the Florida Gulf Coast who are ready to feel beautiful, powerful, and completely themselves."
        secondary={{ label: 'Explore the Experience', href: '/experience' }}
        image="/images/second-skin-boudoir-luxury-brand-hero.jpg"
      />

    <Section className="bg-smoke"><div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><Eyebrow>You are not the only one</Eyebrow><Heading>Most women arrive nervous. Almost all of them leave wondering why they waited so long.</Heading></div><div className="prose-luxury text-lg"><p>Maybe you have been waiting until you lose the weight. Maybe you feel disconnected from your body. Maybe you are newly single, newly married, becoming a mom, done raising kids, healing from something, celebrating something, or simply ready to remember who you are.</p><p>Boudoir is not about pretending to be someone else. It is about seeing the version of you that has been there the whole time. Learn more about the <a href="/experience" className="text-champagne hover:text-ivory transition-colors">fully guided boudoir experience</a> and how we make you feel safe from start to finish.</p><Button href="/contact" variant="secondary">I'm Nervous, But Interested</Button></div></div></Section>

    <Section className="bg-smoke"><div className="text-center"><Eyebrow>The promise</Eyebrow><Heading className="mx-auto max-w-3xl">This is more than a photoshoot.</Heading><p className="mx-auto mt-5 max-w-2xl text-ivory/68">It is a private, guided experience designed to help you feel safe, seen, and stunning. See examples in our <a href="/boudoir-portfolio" className="text-champagne hover:text-ivory transition-colors">gallery</a>.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3"><Card title="Fully Guided Posing">You do not need modeling experience. Every pose, hand placement, expression, and movement is guided.</Card><Card title="Privacy Comes First">Your images are never shared without written permission. Anonymous sharing options are available.</Card><Card title="Built Around Comfort">Soft, sensual, bold, covered, implied, playful, romantic — your session moves at your pace.</Card></div></Section>

    <Section><Eyebrow>The Second Skin Experience</Eyebrow><Heading>From first conversation to final reveal, everything is designed to make you feel cared for.</Heading><div className="mt-12"><Timeline items={steps} /></div><p className="mt-8 max-w-3xl text-ivory/68">During your consultation, we'll discuss <a href="/what-to-wear-boudoir-session" className="text-champagne hover:text-ivory transition-colors">what to wear</a> and answer all your questions. We'll show you examples from our <a href="/boudoir-portfolio" className="text-champagne hover:text-ivory transition-colors">portfolio</a> and create a session tailored entirely to you.</p><div className="mt-10"><Button href="/experience">See the Full Experience</Button></div></Section>

    <Section><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><div className="rounded-[2rem] border border-ivory/10 bg-gradient-to-br from-rose/25 to-champagne/10 p-10"><Heading>Boudoir is for the woman who is ready to stop waiting.</Heading><p className="mt-5 text-ivory/68">You do not need to become someone else for this. You only need to let yourself be seen. Check out our <a href="/what-to-wear-boudoir-session" className="text-champagne hover:text-ivory transition-colors">wardrobe guide</a> to see outfit ideas and styling tips.</p></div><ul className="grid gap-4 text-ivory/75">{['You want to feel desirable again','You are celebrating a birthday, wedding, anniversary, divorce, or personal milestone','You want a powerful gift for your partner','You want a private experience just for yourself','You are nervous but curious','You are tired of being overly critical of your body','You want to see yourself through a more loving lens'].map(x=><li key={x} className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-4">{x}</li>)}</ul></div></Section>

    <Section className="bg-smoke"><Eyebrow>Investment</Eyebrow><Heading>A luxury boudoir experience with flexible options and no pressure to buy what you do not love.</Heading><p className="mt-5 max-w-3xl text-ivory/68">Second Skin Boudoir uses a Session Fee + Products model. Your session fee covers the experience. Your artwork, albums, and digital collections are chosen separately after you see your images.</p><div className="mt-10 grid gap-5 md:grid-cols-2"><Card title="Essential Session — $300">Consultation, wardrobe guidance, private boudoir session, fully guided posing, and private image reveal.</Card><Card title="Signature Session — $549">Everything in Essential plus professional hair and makeup for a more polished, relaxed experience.</Card></div><p className="mt-7 text-ivory/68">Products and image collections begin at <span className="text-champagne">$995</span>. Payment plans are available.</p><div className="mt-8"><Button href="/boudoir-pricing">View Pricing & Collections</Button></div></Section>

    {/* Local Boudoir Photographer Section */}
    <Section>
      <div className="text-center">
        <Eyebrow>Serving the Florida Gulf Coast</Eyebrow>
        <Heading className="mx-auto max-w-3xl">Luxury Boudoir Photography Across Destin & 30A</Heading>
        <p className="mx-auto mt-5 max-w-2xl text-ivory/68">Whether you are in Destin, 30A, Santa Rosa Beach, Miramar Beach, Fort Walton Beach, Panama City Beach, or anywhere along the Gulf Coast, we bring the Second Skin experience to you.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
          <h3 className="text-lg font-semibold text-ivory mb-2">Destin Boudoir Photographer</h3>
          <p className="text-ivory/70 mb-4">Private luxury boudoir sessions in Destin with vacation and local options.</p>
          <Button href="/destin-boudoir-photographer" variant="secondary">Learn More</Button>
        </div>
        <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
          <h3 className="text-lg font-semibold text-ivory mb-2">30A Boudoir Photographer</h3>
          <p className="text-ivory/70 mb-4">Luxury sessions near 30A, Santa Rosa Beach, Rosemary Beach, and Seaside.</p>
          <Button href="/30a-boudoir-photographer" variant="secondary">Learn More</Button>
        </div>
        <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
          <h3 className="text-lg font-semibold text-ivory mb-2">Bridal Boudoir Photography</h3>
          <p className="text-ivory/70 mb-4">Elegant bridal sessions for wedding gifts and confidence-building moments.</p>
          <Button href="/bridal-boudoir" variant="secondary">Learn More</Button>
        </div>
        <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
          <h3 className="text-lg font-semibold text-ivory mb-2">Santa Rosa Beach & 30A</h3>
          <p className="text-ivory/70 mb-4">Private boudoir photography in South Walton communities and coastal areas.</p>
          <Button href="/santa-rosa-beach-boudoir-photographer" variant="secondary">Learn More</Button>
        </div>
        <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
          <h3 className="text-lg font-semibold text-ivory mb-2">Fort Walton Beach Boudoir</h3>
          <p className="text-ivory/70 mb-4">Luxury sessions in Fort Walton Beach, Okaloosa Island, and Northwest Florida.</p>
          <Button href="/fort-walton-beach-boudoir-photographer" variant="secondary">Learn More</Button>
        </div>
        <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
          <h3 className="text-lg font-semibold text-ivory mb-2">Panama City Beach Boudoir</h3>
          <p className="text-ivory/70 mb-4">Private boudoir photography for Gulf Coast visitors and local residents.</p>
          <Button href="/panama-city-beach-boudoir-photographer" variant="secondary">Learn More</Button>
        </div>
      </div>
    </Section>

    {/* Testimonial Section */}
    <Section className="bg-smoke">
      <div className="mb-10 text-center">
        <Eyebrow>What clients are saying</Eyebrow>
        <Heading className="mx-auto max-w-3xl">Women leave feeling more beautiful than they arrived.</Heading>
      </div>
      <Testimonial
        quote="Matthew is very respectful, calm. he kept checking making sure that I was OK. He reinsured that I was doing a good job. I was beautiful. I liked how he would tell me where to put my hands or how to pose he talk to me through it. I was nervous at first but it made me feel better about myself I would say so worth it definitely going to do it again."
        author="Laura W."
        image="/images/boudoir/LW-260.jpg"
        imageAlt="Laura W. testimonial from her boudoir session"
      />
    </Section>

    <Section><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><Eyebrow>Questions are normal</Eyebrow><Heading>Still feeling nervous? Good. That means this matters.</Heading><p className="mt-5 text-ivory/65">The experience is built for first-time clients, privacy, and comfort.</p></div><FAQAccordion items={[['I\'m not photogenic.', 'That is not your job. Lighting, posing, angles, expression, and direction are our job.'], ['I need to lose weight first.', 'You are allowed to feel beautiful before the next version of your body arrives.'], ['I do not know what to wear.', 'We help you choose pieces that flatter your body and match your comfort level.'], ['I do not want my photos online.', 'They will never be shared without written permission.']]}/><div className="mt-8"><Button href="/faq">See All Questions</Button></div></div></Section>

    <Section className="bg-smoke"><div className="text-center"><Eyebrow>Begin privately</Eyebrow><Heading className="mx-auto max-w-3xl">You are allowed to see yourself this way.</Heading><p className="mx-auto mt-5 max-w-xl text-ivory/70">Not someday. Not after the weight loss. Not after life slows down. Now.</p><div className="mt-8"><Button href="/contact">Book Your Private Consultation</Button></div></div></Section>
    </main>
  )
}
