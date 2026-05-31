import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Transparent Boudoir Photography Pricing | Collections & Session Fees | Second Skin Boudoir',
  description: 'View all boudoir photography pricing: Essential ($300) and Signature ($549) sessions, Collections A-E ($995-$4,995), luxury albums, digital collections, and payment plans.',
  openGraph: {
    title: 'Transparent Boudoir Photography Pricing',
    description: 'Complete transparent pricing for luxury boudoir sessions and collections.',
  },
}

export default function BoudoirPricing() {
  return (
    <main>
      <Hero
        eyebrow="PRICING GUIDE"
        title="The Boudoir Investment"
        subtitle="A private, fully guided luxury boudoir experience designed to help you feel safe, seen, and stunning—then choose only the artwork you love."
      />

      <Section>
        <Eyebrow>HOW PRICING WORKS</Eyebrow>
        <Heading>Simple, transparent, and no pressure.</Heading>
        <p className="mt-6 max-w-3xl text-ivory/70">Your session fee reserves your date and covers the guided experience. Your images and artwork are selected separately after your private reveal, once you have seen your finished gallery.</p>
        
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-amber-300 text-charcoal font-bold text-lg">1</div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Reserve Your Session</h3>
            <p className="text-champagne text-sm">Choose Essential or Signature. Your session fee covers planning, wardrobe guidance, the private shoot, posing direction, and your reveal appointment.</p>
          </div>
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-amber-300 text-charcoal font-bold text-lg">2</div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Enjoy the Experience</h3>
            <p className="text-champagne text-sm">You are guided through every pose, hand placement, expression, and transition. You do not need to know what you are doing before you arrive.</p>
          </div>
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-champagne to-amber-300 text-charcoal font-bold text-lg">3</div>
            <h3 className="text-lg font-semibold text-ivory mb-3">Choose Your Artwork</h3>
            <p className="text-champagne text-sm">At your reveal, you select the collection you love most. Albums and matching digitals are purchased only after you see your images.</p>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border-l-4 border-champagne bg-charcoal/60 p-8">
          <p className="font-semibold text-champagne text-base uppercase tracking-wider">IMPORTANT</p>
          <p className="mt-3 text-ivory/70">Session fees do not include albums, digital images, or printed artwork. Collections begin at $995 and are selected after your reveal.</p>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>THE EXPERIENCE</Eyebrow>
        <Heading>Choose the session that fits how you want to arrive.</Heading>
        <p className="mt-6 max-w-3xl text-ivory/70">Both options are designed for first-time boudoir clients. You will receive clear direction, styling support, privacy-first handling, and a calm experience from start to finish.</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-champagne/80">SESSION FEE</p>
            <h3 className="mt-4 text-3xl font-bold text-ivory">Essential Session</h3>
            <p className="mt-2 text-4xl font-bold text-champagne">$300</p>
            <div className="mt-8 space-y-4">
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">•</span>
                <p className="text-ivory text-sm">Pre-session consultation</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">•</span>
                <p className="text-ivory text-sm">Wardrobe and styling guidance</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">•</span>
                <p className="text-ivory text-sm">Private boudoir session</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">•</span>
                <p className="text-ivory text-sm">Fully guided posing and direction</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">•</span>
                <p className="text-ivory text-sm">Private reveal and ordering appointment</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-champagne/30 bg-champagne/5 p-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-champagne">SESSION FEE</p>
            <h3 className="mt-4 text-3xl font-bold text-ivory">Signature Session</h3>
            <p className="mt-2 text-4xl font-bold text-champagne">$549</p>
            <div className="mt-8 space-y-4">
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">✓</span>
                <p className="text-ivory text-sm">Everything included in Essential</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">✓</span>
                <p className="text-ivory text-sm">Professional hair and makeup</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">✓</span>
                <p className="text-ivory text-sm">A polished, relaxed start to the day</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">✓</span>
                <p className="text-ivory text-sm">Ideal for first-time boudoir clients</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne flex-shrink-0">✓</span>
                <p className="text-ivory text-sm">Private reveal and ordering appointment</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center max-w-3xl mx-auto text-ivory/70">The Signature Session is recommended if you want to feel taken care of from the moment you arrive. Hair and makeup help set the tone and give you a natural transition into the camera experience.</p>
      </Section>

      <Section>
        <Eyebrow>COLLECTIONS</Eyebrow>
        <Heading>Choose what you love after you see your images.</Heading>
        <p className="mt-6 max-w-3xl text-ivory/70">Every collection is designed around a finished album experience. Matching digital files are included with Collections A-C, giving you both a tangible heirloom and private digital access to the same images.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {/* Collection A */}
          <div className="rounded-[2rem] border border-champagne/40 bg-charcoal/60 p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-champagne">COLLECTION A</p>
            <p className="mt-4 text-4xl font-bold text-champagne">$4,995</p>
            <div className="mt-6 space-y-3 text-ivory text-sm">
              <div>
                <p className="font-semibold text-champagne">Up to 50 images</p>
              </div>
              <div>
                <p>Luxury album</p>
              </div>
              <div>
                <p>Matching digitals</p>
              </div>
              <div>
                <p>Leather box</p>
              </div>
            </div>
          </div>

          {/* Collection B */}
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-ivory/60">COLLECTION B</p>
            <p className="mt-4 text-4xl font-bold text-champagne">$3,995</p>
            <div className="mt-6 space-y-3 text-ivory text-sm">
              <div>
                <p className="font-semibold text-champagne">31-40 images</p>
              </div>
              <div>
                <p>Luxury album</p>
              </div>
              <div>
                <p>Matching digitals</p>
              </div>
              <div>
                <p>Leather box</p>
              </div>
            </div>
          </div>

          {/* Collection C */}
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-ivory/60">COLLECTION C</p>
            <p className="mt-4 text-4xl font-bold text-champagne">$2,995</p>
            <div className="mt-6 space-y-3 text-ivory text-sm">
              <div>
                <p className="font-semibold text-champagne">21-30 images</p>
              </div>
              <div>
                <p>Luxury album</p>
              </div>
              <div>
                <p>Matching digitals</p>
              </div>
              <div>
                <p>Leather box</p>
              </div>
            </div>
          </div>

          {/* Collection D */}
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-ivory/60">COLLECTION D</p>
            <p className="mt-4 text-4xl font-bold text-champagne">$1,895</p>
            <div className="mt-6 space-y-3 text-ivory text-sm">
              <div>
                <p className="font-semibold text-champagne">18 images</p>
              </div>
              <div>
                <p>Linen album</p>
              </div>
              <div>
                <p>Album only</p>
              </div>
              <div>
                <p>Upgrade available</p>
              </div>
            </div>
          </div>

          {/* Collection E */}
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-ivory/60">COLLECTION E</p>
            <p className="mt-4 text-4xl font-bold text-champagne">$995</p>
            <div className="mt-6 space-y-3 text-ivory text-sm">
              <div>
                <p className="font-semibold text-champagne">10 images</p>
              </div>
              <div>
                <p>Linen album</p>
              </div>
              <div>
                <p>Album only</p>
              </div>
              <div>
                <p>Upgrade available</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>ALBUM COLLECTIONS</Eyebrow>
        <Heading>Signature artwork collections.</Heading>
        <p className="mt-6 max-w-3xl text-ivory/70">Collections A, B, and C include a luxury album, a matching leather box, and the matching album images as digital files.</p>

        <div className="mt-12 space-y-6 max-w-4xl">
          {/* Collection A Details */}
          <div className="rounded-[2rem] border-l-4 border-champagne bg-charcoal/60 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Eyebrow>COLLECTION A - THE HEIRLOOM</Eyebrow>
                <h3 className="mt-2 text-2xl font-bold text-ivory">8x12 or 10x14 Luxury Leather Album</h3>
                <div className="mt-4 space-y-2 text-champagne text-sm">
                  <p>Up to 50 images</p>
                  <p>Matching album images included as digitals</p>
                  <p>Matching leather box included</p>
                  <p>Complimentary future boudoir session fee when photographed within 12 months</p>
                  <p>Additional album images: $100 each</p>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-4xl font-bold text-champagne">$4,995</p>
              </div>
            </div>
          </div>

          {/* Collection B Details */}
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.32em] text-champagne/80">COLLECTION B - THE SIGNATURE</p>
                <h3 className="mt-2 text-2xl font-bold text-ivory">8x12 or 10x14 Luxury Album</h3>
                <div className="mt-4 space-y-2 text-champagne text-sm">
                  <p>31-40 images</p>
                  <p>Matching album images included as digitals</p>
                  <p>Matching leather box included</p>
                  <p>Additional album images: $100 each</p>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-4xl font-bold text-champagne">$3,995</p>
              </div>
            </div>
          </div>

          {/* Collection C Details */}
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.32em] text-champagne/80">COLLECTION C - THE CLASSIC</p>
                <h3 className="mt-2 text-2xl font-bold text-ivory">8x12 or 10x14 Luxury Album</h3>
                <div className="mt-4 space-y-2 text-champagne text-sm">
                  <p>21-30 images</p>
                  <p>Matching album images included as digitals</p>
                  <p>Matching leather box included</p>
                  <p>Additional album images: $100 each</p>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-4xl font-bold text-champagne">$2,995</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>ENTRY COLLECTIONS</Eyebrow>
        <Heading>A beautiful album experience at every level.</Heading>

        <div className="mt-12 space-y-6 max-w-4xl">
          {/* Collection D Details */}
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.32em] text-champagne/80">COLLECTION D - THE KEEPSAKE</p>
                <h3 className="mt-2 text-2xl font-bold text-ivory">8x12 Linen Album</h3>
                <div className="mt-4 space-y-2 text-champagne text-sm">
                  <p>18 images</p>
                  <p>Beautiful linen album finish</p>
                  <p>Additional album images: $120 each</p>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-4xl font-bold text-champagne">$1,895</p>
              </div>
            </div>
          </div>

          {/* Collection E Details */}
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.32em] text-champagne/80">COLLECTION E - THE PETITE</p>
                <h3 className="mt-2 text-2xl font-bold text-ivory">8x12 Linen Album</h3>
                <div className="mt-4 space-y-2 text-champagne text-sm">
                  <p>10 images</p>
                  <p>Perfect starter collection</p>
                  <p>Additional album images: $120 each</p>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-4xl font-bold text-champagne">$995</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-[2rem] border-l-4 border-champagne bg-charcoal/60 p-8">
            <Eyebrow>NOTES</Eyebrow>
            <p className="mt-3 text-ivory/70 text-sm">Album sizes, cover materials, and image counts are finalized at your reveal. Applicable sales tax is not included. Prices are subject to change until your session is booked.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>PAYMENT OPTIONS</Eyebrow>
        <Heading>Plan ahead. Feel relaxed. Choose confidently.</Heading>
        <p className="mt-6 max-w-3xl text-ivory/70">Many clients prefer to start a pre-session payment plan so their collection credit is already building before the shoot. This keeps the reveal appointment focused on choosing the images you love—not feeling rushed by the investment.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <h3 className="text-lg font-semibold text-ivory mb-3">Pre-session plans</h3>
            <p className="text-champagne text-sm">Build credit toward your future order before your shoot.</p>
          </div>
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <h3 className="text-lg font-semibold text-ivory mb-3">Choose after reveal</h3>
            <p className="text-champagne text-sm">You do not choose a collection until you see your images.</p>
          </div>
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <h3 className="text-lg font-semibold text-ivory mb-3">No pressure ordering</h3>
            <p className="text-champagne text-sm">Select only the images and products you truly love.</p>
          </div>
          <div className="rounded-[2rem] border border-ivory/10 bg-charcoal/40 p-8">
            <h3 className="text-lg font-semibold text-ivory mb-3">Private delivery</h3>
            <p className="text-champagne text-sm">Albums and digitals are handled discreetly and professionally.</p>
          </div>
        </div>

        <p className="mt-12 text-center text-lg text-champagne font-semibold">Most clients invest between $995 and $4,995 depending on the collection they choose.</p>
      </Section>
      <Section>
        <div className="text-center">
          <Heading>Ready to plan your session?</Heading>
          <p className="mt-6 max-w-2xl mx-auto text-ivory/70">Book your private consultation and we will walk through the best session option, wardrobe direction, and payment plan.</p>
          <div className="mt-8">
            <Button href="/contact">Book Your Private Consultation</Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
