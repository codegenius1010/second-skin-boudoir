import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Bridal Boudoir Photography in Destin & 30A | Wedding Gifts',
  description: 'Elegant bridal boudoir photography for wedding gifts and pre-wedding confidence. Veils, robes, lingerie, and timeless intimate bridal portraits in Destin and 30A.',
  openGraph: {
    title: 'Bridal Boudoir Photography',
    description: 'Luxurious, romantic bridal boudoir sessions in Destin and 30A.',
  },
}

export default function BridalBoudoirPhotographer() {
  return (
    <main>
      <Hero
        eyebrow="Bridal Boudoir"
        title="A Wedding Gift He'll Love — And You'll Never Forget"
        subtitle="Bridal boudoir is often booked as a gift, but the experience becomes something deeper: a chance to pause, reconnect with your body, and create artwork that feels intimate, elegant, and timeless."
      />

      <Section>
        <Eyebrow>Why Bridal Boudoir</Eyebrow>
        <Heading>A Powerful Tradition Before the Big Day</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          Wedding season is chaos: planning details, managing families, handling stress, and losing yourself in the logistics. Bridal boudoir is your moment to pause. It's a way to celebrate your body, feel powerful before the big day, create a meaningful gift for your partner, and invest in art that will mean something forever.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Romantic Artistry">
            Elegant, timeless bridal imagery. Veils, lingerie, robes, and intimate details that feel sophisticated and intimate, not exposed or uncomfortable.
          </Card>
          <Card title="Personal Empowerment">
            Take time for yourself. Reconnect with your body. Feel stunning and confident in a session designed entirely around you.
          </Card>
          <Card title="Perfect Gift">
            A meaningful, private gift for your partner. Something romantic, personal, and completely your own. Beautifully presented and packaged.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>The Bridal Experience</Eyebrow>
        <Heading>Elegant, Fully Guided, and Completely Private</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68">
          Your bridal boudoir session is not about modeling. You will be guided through every pose, expression, wardrobe change, and moment of the experience. We handle the artistry, lighting, posing direction, and styling so you can simply be present, feel beautiful, and create memories. Learn more about <a href="/experience" className="text-champagne hover:text-ivory transition-colors">our fully guided experience</a>.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="Consultation">
            Free, private conversation about your vision, fears, comfort level, and goals. We answer every question and help you feel completely ready.
          </Card>
          <Card title="Wardrobe Guidance">
            Detailed guide with bridal boudoir styling ideas: veils, robes, lingerie, jewelry, oversized shirts, heels, flowers, and personalized pieces. Everything tailored to your vision.
          </Card>
          <Card title="Professional Session">
            1–3 hours of fully guided photography with professional hair and makeup (optional but highly recommended for bridal). Wardrobe changes, complete posing direction, romantic lighting, and editorial details.
          </Card>
          <Card title="Private Reveal">
            Your images revealed privately in 3–4 weeks, fully retouched professionally. Time to choose collections. Beautifully packaged options for gifting to your partner.
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Bridal Wardrobe Ideas</Eyebrow>
            <Heading>Style Your Perfect Bridal Look</Heading>
            <p className="mt-5 text-ivory/68">
              Bridal boudoir wardrobe should feel authentically you — whether that's romantic and lacy, playful and sensual, elegant and covered, or anything in between. Check out our <a href="/what-to-wear-boudoir-session" className="text-champagne hover:text-ivory transition-colors">complete wardrobe guide</a> for more styling inspiration, or browse our <a href="/boudoir-portfolio" className="text-champagne hover:text-ivory transition-colors">bridal portfolio</a> examples.
            </p>
            <ul className="mt-8 space-y-3 text-ivory/70">
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Bridal lingerie or wedding day intimates</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Silk robes in ivory, champagne, or blush</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Tulle, veils, or bridal headpieces</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Oversized white shirt (your partner's or yours)</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Bridal jewelry or heirloom pieces</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Heels or barefoot in luxe bedding</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold">•</span>
                <span>Personalized pieces with initials or wedding date</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Bridal Investment</h3>
            <div className="space-y-4 text-ivory/70 text-sm">
              <div>
                <p className="font-semibold text-ivory mb-1">Signature Session with Styling</p>
                <p>$549 — Includes professional hair & makeup, wardrobe guidance, 1–3 hour fully guided session, and private reveal.</p>
              </div>
              <div className="border-t border-ivory/10 pt-4">
                <p className="font-semibold text-ivory mb-1">Bridal Collections</p>
                <p>Luxury albums, folio boxes, and digital files start at $995. Gift-ready packaging available for presentation to partner.</p>
              </div>
              <div className="border-t border-ivory/10 pt-4">
                <p className="font-semibold text-ivory mb-1">Payment Plans</p>
                <p>Interest-free options available. Build credit before your session or pay after your reveal. Learn more about <a href="/boudoir-pricing" className="text-champagne hover:text-ivory transition-colors">our pricing options</a>.</p>
              </div>
              <div className="border-t border-ivory/10 pt-4">
                <p className="font-semibold text-ivory mb-1">Timeline</p>
                <p>Schedule 4–8 weeks before wedding to allow time for reveal, retouching, design, and delivery if gifting.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Perfect For</Eyebrow>
        <Heading>Bridal Boudoir Options</Heading>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Pre-Wedding Confidence</h3>
            <p className="text-ivory/70">
              Book your bridal session weeks before your wedding. Take time to reconnect with your body, feel powerful, and celebrate yourself before saying "I do." The images become personal artwork for your honeymoon or kept private forever.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Wedding Gift for Your Partner</h3>
            <p className="text-ivory/70">
              A meaningful, intimate, private gift. Beautiful album, digital collection, or folio box beautifully packaged. Something romantic that celebrates your relationship and your body.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Bachelorette Activity</h3>
            <p className="text-ivory/70">
              Fun, empowering, and entirely your moment. A story to tell, confidence to carry into marriage, and beautiful imagery you'll treasure for decades.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Destination Wedding Sessions</h3>
            <p className="text-ivory/70">
              Visiting Destin or 30A for your wedding weekend? Add bridal boudoir to the celebration. Romantic imagery in a beautiful Gulf Coast location.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Bridal Boudoir Checklist</h3>
            <div className="space-y-3 text-ivory/70 text-sm">
              <div className="flex gap-2">
                <span className="text-champagne">✓</span>
                <span>Schedule consultation 6–8 weeks before wedding</span>
              </div>
              <div className="flex gap-2">
                <span className="text-champagne">✓</span>
                <span>Choose session date (allow 3–4 weeks before wedding for reveal)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-champagne">✓</span>
                <span>Plan wardrobe with guidance</span>
              </div>
              <div className="flex gap-2">
                <span className="text-champagne">✓</span>
                <span>Optional: Book hair & makeup (highly recommended)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-champagne">✓</span>
                <span>Session day: Come relaxed, feel beautiful</span>
              </div>
              <div className="flex gap-2">
                <span className="text-champagne">✓</span>
                <span>3–4 weeks: Private reveal and collection selection</span>
              </div>
              <div className="flex gap-2">
                <span className="text-champagne">✓</span>
                <span>Beautiful packaging for gifting (if applicable)</span>
              </div>
            </div>
          </div>
          <div>
            <Eyebrow>Why Bridal Matters</Eyebrow>
            <Heading>More Than Just Photos</Heading>
            <p className="mt-5 text-ivory/68">
              Bridal boudoir is about creating a moment entirely for you before your life changes. It's empowerment, confidence, artistry, and legacy. These images say: "I was beautiful, I was celebrated, I was seen." Years from now, you'll look at these photographs and remember how powerful you felt.
            </p>
            <p className="mt-5 text-ivory/68">
              For your partner, it's a meaningful gift that says: "This is for you. This is intimate. This is us." Something private, romantic, and entirely personal to your relationship.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="text-center">
          <Eyebrow>Ready for Your Bridal Moment?</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Let's Plan Your Bridal Session</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            Schedule a free consultation to discuss your bridal vision, timeline, wardrobe ideas, and all your questions.
          </p>
          <div className="mt-8 space-y-4">
            <Button href="/contact">Request Bridal Consultation</Button>
            <p className="text-ivory/60">
              Call or text <span className="text-champagne font-semibold">850-608-0844</span>
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <Eyebrow>Learn More</Eyebrow>
          <Heading className="mx-auto max-w-2xl">Explore the Boudoir Experience</Heading>
          <p className="mx-auto mt-5 max-w-xl text-ivory/68">
            From styling tips to portfolio inspiration, we've created resources to help you feel confident about your bridal boudoir journey.
          </p>
          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <Button href="/experience">The Experience</Button>
            <Button href="/what-to-wear-boudoir-session" variant="secondary">What to Wear</Button>
            <Button href="/boudoir-portfolio" variant="secondary">View Portfolio</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
