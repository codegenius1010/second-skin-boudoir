import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'
import { GalleryGrid } from '@/components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Boudoir Photography Gallery | Privacy-First Portfolio',
  description: 'Browse our boudoir photography gallery. All images shared with client permission only. See examples of tasteful, private, luxury boudoir portraits.',
  openGraph: {
    title: 'Boudoir Photography Gallery',
    description: 'Luxury boudoir photography examples shared only with client permission.',
  },
}

export default function BoudoirPortfolio() {
  return (
    <main>
      <Hero
        eyebrow="Gallery"
        title="Boudoir Photography Portfolio"
        subtitle="A curated collection of tasteful, private boudoir portraits. Every image displayed has been shared with explicit client permission. Anonymous images protect privacy while showing our style."
      />

      <Section>
        <Eyebrow>Our Privacy Promise</Eyebrow>
        <Heading>Your Images, Your Choice, Your Control</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          We take privacy seriously. The images you see in our portfolio were shared by clients who chose to display them publicly, anonymously, or as approved details. No image is shared without written permission. Learn more about <a href="/experience" className="text-champagne hover:text-ivory transition-colors">the experience</a> and how we ensure your privacy throughout.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Public Portraits">
            Clients who approved full public sharing. These women wanted their boudoir experience celebrated.
          </Card>
          <Card title="Anonymous Images">
            Tasteful details and silhouettes with identifying features removed. Privacy maintained, artistry shown.
          </Card>
          <Card title="Fully Private">
            Many clients keep their images completely private. You won't see them here, but they're every bit as beautiful.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Portfolio Gallery</Eyebrow>
        <Heading>Boudoir Photography Examples</Heading>
        <p className="mt-5 max-w-2xl text-ivory/68">
          Scroll through to see soft portraits, editorial details, bridal inspirations, and the range of looks possible in a single session.
        </p>
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>What You'll Experience</Eyebrow>
            <Heading>Professional Direction Leads to Beautiful Results</Heading>
            <p className="mt-5 text-ivory/68">
              These images exist because every woman was guided through every pose, expression, and moment. There's no guessing, performing, or self-consciousness. Just you, the light, and a photographer who knows exactly how to make you look stunning.
            </p>
            <p className="mt-5 text-ivory/68">
              Whether you want soft and romantic, bold and confident, editorial and artistic, or intimately private — your session is designed around what feels right for you.
            </p>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Gallery Styles</h3>
            <ul className="space-y-4 text-ivory/70">
              <li className="flex gap-3">
                <span className="text-champagne font-semibold">•</span>
                <span>Soft window light and romantic portraits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne font-semibold">•</span>
                <span>Editorial and moody silhouettes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne font-semibold">•</span>
                <span>Bridal boudoir with veils and details</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne font-semibold">•</span>
                <span>Intimate details and anonymous portraits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne font-semibold">•</span>
                <span>Confidence and empowerment shots</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne font-semibold">•</span>
                <span>Artistic and high-fashion boudoir</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Why These Images Matter</Eyebrow>
        <Heading>More Than Pretty Pictures</Heading>
        <p className="mt-5 max-w-2xl text-ivory/68">
          Each image represents a woman who took a risk, showed up for herself, and discovered something powerful. These aren't edited fantasies — they're authentic, guided, professional portraits of real women who decided to see themselves differently.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
            <h3 className="text-lg font-semibold text-ivory mb-3">For First-Time Clients</h3>
            <p className="text-ivory/70">
              Browse the gallery to see what's possible. Notice the diversity of body types, ages, and styles. Every woman here was nervous too — and look at the results.
            </p>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
            <h3 className="text-lg font-semibold text-ivory mb-3">Style Inspiration</h3>
            <p className="text-ivory/70">
              Screenshot what resonates. Share with us during your consultation. Check out our <a href="/what-to-wear-boudoir-session" className="text-champagne hover:text-ivory transition-colors">wardrobe guide</a> for styling ideas, then we'll create a session that brings your vision to life while keeping you comfortable.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <Eyebrow>Ready to be photographed this way?</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Your Boudoir Session Awaits</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            Start with a free consultation to discuss your vision, style preferences, and which gallery images inspire you.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button href="/contact">Request Private Consultation</Button>
            <Button href="/experience" variant="secondary">See How It Works</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
