import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'
import { StudioGallery } from '@/components/StudioGallery'

export const metadata: Metadata = {
  title: 'Our Private Boudoir Studio in Destin, FL | Second Skin Boudoir',
  description: 'Step inside the private, luxury studio space where Second Skin Boudoir sessions come to life. Soft natural light, curated styling areas, and a comfortable, judgment-free environment in Destin, Florida.',
  openGraph: {
    title: 'Our Private Boudoir Studio | Second Skin Boudoir',
    description: 'A private, luxury studio space in Destin, Florida designed for comfort, privacy, and beautiful light.',
  },
}

export default function Page() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://secondskinboudoir.com' },
      { '@type': 'ListItem', position: 2, name: 'Studio', item: 'https://secondskinboudoir.com/studio' },
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Hero
        eyebrow="Our Space"
        title="A Private Studio Built for Comfort"
        subtitle="Tucked away in Destin, our studio is where every Second Skin Boudoir session begins — private, comfortable, and designed to help you feel at ease from the moment you walk in."
        image="/images/studio/SSB_Studio-01.jpg"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow>Welcome</Eyebrow>
            <Heading>This isn&apos;t a rented room. It&apos;s a space built for you.</Heading>
          </div>
          <div className="prose-luxury text-lg">
            <p>Every detail of our studio was chosen with one goal in mind: helping you feel completely comfortable in front of the camera. Soft natural light, curated backdrops, and a private, closed-door environment mean it is just you, your photographer, and (if included) your makeup artist — no outside eyes, no distractions.</p>
            <p>From the moment you arrive, you will have a dedicated styling area to change and get ready, comfortable seating to relax between looks, and a warm, welcoming atmosphere that feels more like a friend&apos;s home than a photo studio.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="text-center">
          <Eyebrow>Take a Look Inside</Eyebrow>
          <Heading className="mx-auto max-w-3xl">A glimpse of where your session happens.</Heading>
          <p className="mx-auto mt-5 max-w-2xl text-ivory/68">These are real photos of our studio space, not stock images. This is exactly what you will see when you arrive for your session.</p>
        </div>
        <div className="mt-12">
          <StudioGallery />
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          <Card title="Private & Secure">Our studio is a closed, private space. No walk-ins, no public areas — just you and your session, undisturbed.</Card>
          <Card title="Flattering Natural Light">The studio is designed around soft, natural light that flatters every skin tone and body type.</Card>
          <Card title="Comfortable Styling Areas">A dedicated space for wardrobe changes, touch-ups, and relaxing between looks so you never feel rushed.</Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="text-center">
          <Eyebrow>Ready to see it in person?</Eyebrow>
          <Heading className="mx-auto max-w-3xl">Your private consultation includes a look at the studio.</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/70">If a studio session feels right for you, we&apos;ll walk you through everything during your consultation, including location details and what to expect on the day of your shoot.</p>
          <div className="mt-8">
            <Button href="/contact">Book Your Private Consultation</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
