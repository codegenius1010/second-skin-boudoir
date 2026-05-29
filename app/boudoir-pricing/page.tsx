import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Boudoir Photography Pricing & Packages | Second Skin Boudoir',
  description: 'Transparent boudoir photography pricing: session fees $300-$549, luxury collections starting at $995, payment plans, and flexible options for luxury boudoir in Destin and 30A.',
  openGraph: {
    title: 'Boudoir Photography Pricing',
    description: 'Clear, flexible pricing for luxury boudoir photography sessions and collections.',
  },
}

export default function BoudoirPricing() {
  return (
    <main>
      <Hero
        eyebrow="Pricing & Packages"
        title="Transparent Boudoir Photography Pricing"
        subtitle="Simple, flexible pricing so you know exactly what to expect. Session fees cover the experience. Collections are chosen after you fall in love with your images."
      />

      <Section>
        <Eyebrow>How Pricing Works</Eyebrow>
        <Heading>Session Fee + Products = Complete Transparency</Heading>
        <p className="mt-5 max-w-3xl text-ivory/70">
          Your session fee reserves your date, includes all guidance, photography, and consultation. Learn more about <a href="/experience" className="text-champagne hover:text-ivory transition-colors">the full experience</a>. Products like albums, folio boxes, and digital collections are selected after your private reveal. You only purchase what you absolutely love.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card title="Essential Session — $300">
            Private consultation, wardrobe guidance, professional 1-hour session with fully guided posing, private image reveal, and collection selection. Perfect for first-time boudoir clients and those who want the full experience without added styling.
          </Card>
          <Card title="Signature Session — $549">
            Everything in Essential plus professional hair and makeup application. Ideal for brides, special occasions, editorial looks, or clients who want to relax into the full experience from the moment they arrive.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Product Collections</Eyebrow>
        <Heading>Luxury Collections Begin at $995</Heading>
        <p className="mt-5 max-w-2xl text-ivory/68">
          Most clients invest between $995 and $4,995 depending on the images and artwork they choose. Your final investment is completely your decision based on what resonates with you.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Luxury Albums">
            Premium printed albums handcrafted as heirloom keepsakes. Includes 10-18 fully retouched professional images in a custom design.
          </Card>
          <Card title="Folio Boxes">
            Elegant presentation boxes with your favorite prints, perfect for gifting or personal display. Mix and match images as you wish.
          </Card>
          <Card title="Digital Collections">
            Full-resolution digital files for your personal gallery, social sharing, or future printing. Yours to keep and share privately or publicly.
          </Card>
        </div>
        <p className="mt-8 text-ivory/65">
          All images are retouched professionally. You receive your complete reveal within 3-4 weeks of your session, then take time to decide what artwork feels right for you.
        </p>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Most Clients Invest</Eyebrow>
            <Heading>Between $1,500 and $3,500 Total</Heading>
            <p className="mt-5 text-ivory/68">
              This includes a session fee ($300–$549) plus one or two collection packages. However, clients choose what they purchase after reveal, so investment varies widely.
            </p>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Pricing Breakdown Example</h3>
            <ul className="space-y-3 text-ivory/70">
              <li className="flex justify-between">
                <span>Signature Session with hair & makeup</span>
                <span className="text-champagne font-semibold">$549</span>
              </li>
              <li className="border-t border-ivory/10 pt-3 flex justify-between">
                <span>Luxury Album (10 images)</span>
                <span className="text-champagne font-semibold">$1,295</span>
              </li>
              <li className="flex justify-between">
                <span>Digital Collection</span>
                <span className="text-champagne font-semibold">$495</span>
              </li>
              <li className="border-t border-ivory/10 pt-3 flex justify-between font-semibold">
                <span>Total Example</span>
                <span className="text-champagne">$2,339</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Payment Options</Eyebrow>
        <Heading>Interest-Free Payment Plans Available</Heading>
        <p className="mt-5 max-w-2xl text-ivory/68">
          We offer flexible payment plans so you can spread your investment over time without financial stress. You can build credit before your session or pay for your collections after your reveal.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="Pre-Session Plans">Save toward your session with interest-free monthly payments. Choose your own amount and timeline.</Card>
          <Card title="Post-Reveal Plans">Select your collections after viewing your images, then pay monthly with no interest or hidden fees.</Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Ready to invest in yourself?</Eyebrow>
        <Heading>Book Your Private Consultation</Heading>
        <p className="mx-auto mt-5 max-w-xl text-ivory/68">
          Start with a free, no-pressure consultation to discuss your vision, investment options, and payment plans. Browse our <a href="/boudoir-portfolio" className="text-champagne hover:text-ivory transition-colors">portfolio</a> for inspiration and check out <a href="/what-to-wear-boudoir-session" className="text-champagne hover:text-ivory transition-colors">what to wear</a> ideas.
        </p>
        <div className="mt-8">
          <Button href="/contact">Request Private Consultation</Button>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Common Questions</Eyebrow>
        <Heading>Pricing FAQ</Heading>
        <div className="mt-12 grid gap-8 max-w-3xl">
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">What if I don't like my images?</h3>
            <p className="text-ivory/70">
              We stand behind our work. If you are unhappy with your images or did not have an amazing experience, we offer a full refund. This has never happened — you will likely struggle choosing between favorites.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Can I purchase just digital files?</h3>
            <p className="text-ivory/70">
              Absolutely. Digital collections are available separately and don't require purchasing printed products. You have complete control over what you invest in.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Are there package deals?</h3>
            <p className="text-ivory/70">
              Our pricing is straightforward with no hidden fees. We recommend discussing your vision during consultation so we can suggest collections that match what you're looking for.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">What about retouching and editing?</h3>
            <p className="text-ivory/70">
              Professional retouching is included in all packages. Skin smoothing, blemish removal, and wardrobe adjustments are standard. Extensive retouching or body sculpting is not our approach — we keep you authentically you.
            </p>
          </div>
        </div>
      </Section>
    </main>
  )
}
