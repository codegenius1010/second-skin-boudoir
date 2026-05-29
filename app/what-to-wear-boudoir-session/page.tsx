import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'What to Wear to a Boudoir Session | Style Guide & Ideas',
  description: 'Boudoir outfit ideas and what to wear: lingerie, robes, bodysuits, sheets, heels, jewelry, and wardrobe planning for your first boudoir session.',
  openGraph: {
    title: 'What to Wear to a Boudoir Session',
    description: 'Get outfit ideas and styling tips for your boudoir photography session.',
  },
}

export default function WhatToWear() {
  return (
    <main>
      <Hero
        eyebrow="Wardrobe Guide"
        title="What to Wear to Your Boudoir Session"
        subtitle="The short answer: whatever makes you feel like yourself. The long answer: we'll help you choose pieces that flatter, empower, and feel comfortable."
      />

      <Section>
        <Eyebrow>The Philosophy</Eyebrow>
        <Heading>Confidence First, Outfit Second</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          Your wardrobe should feel authentic to you. If lingerie doesn't feel natural, wear a favorite shirt. If you love bold boudoir, go all in. If you prefer implied and covered, we'll create that elegantly. This session is about you feeling good — not about fitting someone else's idea of "boudoir." Learn more about <a href="/experience" className="text-champagne hover:text-ivory transition-colors">how we guide your posing</a> and help you feel comfortable.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Bring 3-4 Looks">
            Mix lingerie, robes, casual pieces, and anything in between. You'll change outfits during your session to keep things fresh and give you variety in your final collection.
          </Card>
          <Card title="Comfort Matters">
            If something makes you self-conscious or uncomfortable, don't bring it. Confidence shows in the images — uncomfortable fabric doesn't.
          </Card>
          <Card title="We'll Guide You">
            During your consultation, we'll send a detailed wardrobe guide with suggestions, styling tips, and inspiration photos tailored to your style.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Outfit Ideas</Eyebrow>
        <Heading>Popular Wardrobe Choices</Heading>
        <p className="mt-5 max-w-2xl text-ivory/68">
          Here are some tried-and-true pieces that work beautifully. Mix and match whatever feels like you.
        </p>

        <div className="mt-12 grid gap-8">
          <div>
            <h3 className="text-xl font-semibold text-champagne mb-4">Lingerie & Intimates</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Bodysuits & Teddies</h4>
                <p className="text-ivory/70 text-sm">
                  One-piece styles that offer coverage while being sensual and flattering. Pair with heels or leave barefoot.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Bralette & High-Waisted</h4>
                <p className="text-ivory/70 text-sm">
                  Soft, comfortable sets that don't feel restrictive. You can layer over or wear alone depending on comfort level.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Lace & Delicate Details</h4>
                <p className="text-ivory/70 text-sm">
                  Textured pieces photograph beautifully. Look for interesting patterns and soft lace for editorial details.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Boy Shorts & Underthings</h4>
                <p className="text-ivory/70 text-sm">
                  Comfort-focused pieces that look great and don't require perfection. Perfect for casual boudoir looks.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-champagne mb-4">Robes & Wraps</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Silk Robes</h4>
                <p className="text-ivory/70 text-sm">
                  Luxurious and photograph beautifully. The movement and drape create romantic, editorial looks instantly.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Bridal Robes & Wraps</h4>
                <p className="text-ivory/70 text-sm">
                  Perfect for bridal sessions or anyone wanting elegant, luxe coverage with stunning detail.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Kimonos & Jackets</h4>
                <p className="text-ivory/70 text-sm">
                  Great layering pieces that transition looks. Can be worn open, tied, or draped for multiple styles.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Cardigans & Oversized Shirts</h4>
                <p className="text-ivory/70 text-sm">
                  Cozy, comfortable, and surprisingly boudoir-friendly. Great for soft, intimate, at-home looks.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-champagne mb-4">Casual & Unexpected Pieces</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">White Undershirts</h4>
                <p className="text-ivory/70 text-sm">
                  Crisp, simple, and incredibly sensual. Roll sleeves, tie at the waist, or wear oversized for editorial looks.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Fitted Jeans</h4>
                <p className="text-ivory/70 text-sm">
                  Your favorite pair with nothing underneath or paired with a bralette. Casual boudoir is powerful.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Sweaters & Knits</h4>
                <p className="text-ivory/70 text-sm">
                  Cozy and tactile. Wear oversized with nothing underneath or styled casually for warm, intimate images.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Sheets & Fabric</h4>
                <p className="text-ivory/70 text-sm">
                  Wrap yourself in luxury bedding for soft, romantic, intimate images. Simple but stunning.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-champagne mb-4">Accessories That Elevate</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Heels & Footwear</h4>
                <p className="text-ivory/70 text-sm">
                  Heels photograph beautifully and make you feel powerful. Bring flats or barefoot options too.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Jewelry</h4>
                <p className="text-ivory/70 text-sm">
                  Rings, necklaces, and bracelets add detail and elegance. Keep it simple or go bold — your choice.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Veils & Headpieces</h4>
                <p className="text-ivory/70 text-sm">
                  For bridal or romantic looks. Creates stunning movement and editorial detail in images.
                </p>
              </div>
              <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6">
                <h4 className="font-semibold text-ivory mb-2">Clutches & Props</h4>
                <p className="text-ivory/70 text-sm">
                  Optional accessories that add personality and give your hands something to do during posing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Pro Tips</Eyebrow>
            <Heading>Wardrobe Styling Advice</Heading>
            <ul className="mt-8 space-y-4 text-ivory/70">
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span>Bring pieces that fit well right now. Don't wait for a different size.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span>Mix textures: lace, silk, cotton, leather. Variety shows in the final collection.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span>Nudes and neutrals photograph beautifully and feel timeless.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span>Don't overthink it. We'll guide poses and styling to make everything look amazing.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span>Bring a robe or cardigan for between outfit changes and comfort. See more styling ideas in our <a href="/boudoir-portfolio" className="text-champagne hover:text-ivory transition-colors">portfolio</a>.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Wardrobe Checklist</h3>
            <div className="space-y-3 text-ivory/70 text-sm">
              <label className="flex gap-3">
                <input type="checkbox" className="rounded" disabled />
                <span>1-2 lingerie or intimates pieces</span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" className="rounded" disabled />
                <span>1 robe or wrap</span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" className="rounded" disabled />
                <span>1 casual piece (shirt, sweater, jeans)</span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" className="rounded" disabled />
                <span>Heels (plus backup flats)</span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" className="rounded" disabled />
                <span>Jewelry or accessories</span>
              </label>
              <label className="flex gap-3">
                <input type="checkbox" className="rounded" disabled />
                <span>Robe or cover-up for comfort</span>
              </label>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="text-center">
          <Eyebrow>Ready to get styled?</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Let's Plan Your Wardrobe</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            Start with a consultation. We'll discuss your style, show you inspiration, and send you a personalized wardrobe guide for your session.
          </p>
          <div className="mt-8">
            <Button href="/contact">Book Your Consultation</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
