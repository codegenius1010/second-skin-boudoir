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
        <div className="text-center mb-12">
          <blockquote className="text-2xl md:text-3xl font-light text-ivory italic max-w-2xl mx-auto leading-relaxed">
            "You do not need to become someone else. You only need to bring pieces that let you feel seen, safe, and beautiful."
          </blockquote>
        </div>

        <Eyebrow>The Simple Formula</Eyebrow>
        <Heading>What to Bring: Three Key Components</Heading>
        <p className="mt-5 max-w-3xl text-ivory/68 mb-12">
          Build your wardrobe around three things. Mix and match to create 4-6 looks total.
        </p>
        
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="rounded-2xl border border-champagne/30 bg-champagne/[.05] p-8">
            <h3 className="text-lg font-semibold text-champagne mb-3">1. Something Structured</h3>
            <p className="text-ivory/70">
              Bodysuit, corset, bra set, fitted dress, or high-waisted set. Gives shape and creates clean lines.
            </p>
          </div>
          <div className="rounded-2xl border border-champagne/30 bg-champagne/[.05] p-8">
            <h3 className="text-lg font-semibold text-champagne mb-3">2. Something Soft</h3>
            <p className="text-ivory/70">
              Robe, sweater, sheet, button-up shirt, or loose tee. Gives your hands something to do and helps you ease in.
            </p>
          </div>
          <div className="rounded-2xl border border-champagne/30 bg-champagne/[.05] p-8">
            <h3 className="text-lg font-semibold text-champagne mb-3">3. Something Personal</h3>
            <p className="text-ivory/70">
              Jewelry, heels, glasses, veil, garter, or meaningful accessory. Makes the session feel like yours.
            </p>
          </div>
        </div>

        <div className="bg-ivory/[.03] border border-ivory/10 rounded-2xl p-8">
          <p className="text-ivory/68">
            <span className="text-champagne font-semibold">Quick rule:</span> Bring 4–6 options if you can. We may only photograph 2–4 looks, but having options lets us match the wardrobe to the light, mood, and your comfort level once you arrive.
          </p>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>25 Outfit Ideas</Eyebrow>
        <Heading>A Complete Guide to What to Bring</Heading>
        <p className="mt-5 max-w-2xl text-ivory/68 mb-12">
          Here are 25 pieces and styling ideas. You don't need all of them — pick what resonates with your style.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Boots */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">01. Boots</h4>
            <p className="text-ivory/70 text-sm mb-3">Add attitude, movement, and edge. Work with lingerie, denim, oversized shirt, or dress.</p>
            <p className="text-champagne/70 text-xs">Styling: Choose boots easy to walk in. Knee-high, thigh-high, western, or sleek black photograph beautifully.</p>
          </div>

          {/* Bridal Whites */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">02. Bridal Whites</h4>
            <p className="text-ivory/70 text-sm mb-3">Lace, veil, robe, pearls, satin, or wedding shoes create clean, elegant bridal story.</p>
            <p className="text-champagne/70 text-xs">Styling: Bring veil if you have one. White bodysuits, sheer robes, garters give more variety.</p>
          </div>

          {/* Garter */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">03. Garter</h4>
            <p className="text-ivory/70 text-sm mb-3">Small detail that makes classic lingerie feel intentional and finished.</p>
            <p className="text-champagne/70 text-xs">Styling: Bring it with matching pieces if possible. Detail matters more than perfection.</p>
          </div>

          {/* Button-Up Shirt */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">04. Button-Up Shirt</h4>
            <p className="text-ivory/70 text-sm mb-3">One of the easiest pieces to relax into. Can be modest, soft, suggestive, or bold.</p>
            <p className="text-champagne/70 text-xs">Styling: White, black, linen, or silk. Avoid stiff fabric that wrinkles heavily.</p>
          </div>

          {/* Cocktail Dress */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">05. Cocktail Dress</h4>
            <p className="text-ivory/70 text-sm mb-3">Gives session sense of story. Great warm-up look before lingerie.</p>
            <p className="text-champagne/70 text-xs">Styling: Choose one with slit, open back, interesting neckline, or beautiful drape.</p>
          </div>

          {/* Corset */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">06. Corset</h4>
            <p className="text-ivory/70 text-sm mb-3">Creates structure, shape, and drama with elegant lines and sculpted look.</p>
            <p className="text-champagne/70 text-xs">Styling: Choose comfort over extreme tightness. You need to breathe and move naturally.</p>
          </div>

          {/* Crop Top */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">07. Crop Top</h4>
            <p className="text-ivory/70 text-sm mb-3">Casual, flirty, and less obvious than lingerie while showing shape.</p>
            <p className="text-champagne/70 text-xs">Styling: Try fitted, ribbed, off-shoulder, or loose. Pair with high-waisted bottoms.</p>
          </div>

          {/* Fishnets */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">08. Fishnets</h4>
            <p className="text-ivory/70 text-sm mb-3">Add texture and confidence. Great for moodier, bolder aesthetic.</p>
            <p className="text-champagne/70 text-xs">Styling: Pair with simple black lingerie, heels, or garter. Keep rest clean.</p>
          </div>

          {/* Garter Belt */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">09. Garter Belt</h4>
            <p className="text-ivory/70 text-sm mb-3">With stockings, gives polished, classic boudoir feel and lengthens legs.</p>
            <p className="text-champagne/70 text-xs">Styling: Practice clipping before session. Bring stockings that fit comfortably.</p>
          </div>

          {/* Heels */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">10. Heels</h4>
            <p className="text-ivory/70 text-sm mb-3">Lengthen leg, improve posture, and add polish. Don't need to wear whole time.</p>
            <p className="text-champagne/70 text-xs">Styling: Nude, black, metallic, or bridal heels are easy wins. Choose ones you can move in.</p>
          </div>

          {/* High-Neck Bra */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">11. High-Neck or Halter Bra</h4>
            <p className="text-ivory/70 text-sm mb-3">More coverage while still looking feminine and sensual.</p>
            <p className="text-champagne/70 text-xs">Styling: Look for lace, mesh, or interesting detail near collarbone.</p>
          </div>

          {/* High-Waisted Set */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">12. High-Waisted Set</h4>
            <p className="text-ivory/70 text-sm mb-3">Flattering, comfortable, timeless. Defines waist without feeling exposed.</p>
            <p className="text-champagne/70 text-xs">Styling: Black, ivory, nude, and jewel tones photograph well. Safe for most body types.</p>
          </div>

          {/* Jeans */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">13. Jeans</h4>
            <p className="text-ivory/70 text-sm mb-3">Bring relaxed, personal feel. Can be styled with tee or bra depending on comfort.</p>
            <p className="text-champagne/70 text-xs">Styling: Choose jeans that fit well. Avoid pairs that dig in or create uncomfortable lines.</p>
          </div>

          {/* Patterns */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">14. Patterns</h4>
            <p className="text-ivory/70 text-sm mb-3">Add personality but need careful selection. Use as accent, not whole story.</p>
            <p className="text-champagne/70 text-xs">Styling: Simple prints photograph better than busy ones. Pair with plain pieces.</p>
          </div>

          {/* Robes */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">15. Robes</h4>
            <p className="text-ivory/70 text-sm mb-3">Create softness and movement. Perfect for easing in and intimate moments.</p>
            <p className="text-champagne/70 text-xs">Styling: Silk, satin, lace, or velvet all work. Choose one that slips off shoulder easily.</p>
          </div>

          {/* Stockings */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">16. Stockings</h4>
            <p className="text-ivory/70 text-sm mb-3">With garters and heels, create dressed-up, classic, and intentional look.</p>
            <p className="text-champagne/70 text-xs">Styling: Avoid too tight. Size up if band squeezes. Seams photograph beautifully.</p>
          </div>

          {/* Off-Shoulder Sweater */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">17. Off-Shoulder Sweater</h4>
            <p className="text-ivory/70 text-sm mb-3">Comfortable, approachable, beautifully suggestive. Ideal for warm, cozy energy.</p>
            <p className="text-champagne/70 text-xs">Styling: Loose enough to pull off one shoulder. Neutral tones work best.</p>
          </div>

          {/* Teddy */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">18. One-Piece Teddy</h4>
            <p className="text-ivory/70 text-sm mb-3">One of strongest boudoir choices. Flatters many body types, creates clean lines.</p>
            <p className="text-champagne/70 text-xs">Styling: Bring at least one bodysuit. Lace, mesh, satin, or long-sleeve all work.</p>
          </div>

          {/* Sheer Layers */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">19. Sheer Layers</h4>
            <p className="text-ivory/70 text-sm mb-3">Photograph beautifully because they reveal shape while keeping softness.</p>
            <p className="text-champagne/70 text-xs">Styling: Sheer robes, mesh bodysuits, lace overlays all catch light beautifully.</p>
          </div>

          {/* Creative Concept */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">20. Creative Concept</h4>
            <p className="text-ivory/70 text-sm mb-3">Fun when still feels elevated. Keep it tasteful, not costume-heavy.</p>
            <p className="text-champagne/70 text-xs">Styling: Bring pieces and we'll edit together. Usually one or two subtle details work best.</p>
          </div>

          {/* T-Shirt */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">21. T-Shirt</h4>
            <p className="text-ivory/70 text-sm mb-3">Comfortable, casual, useful for transition. Intimate without feeling overly styled.</p>
            <p className="text-champagne/70 text-xs">Styling: White, black, oversized, or meaningful tee. Soft fabric photographs best.</p>
          </div>

          {/* White Sheet */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">22. White Sheet</h4>
            <p className="text-ivory/70 text-sm mb-3">Creates some of most elegant, intimate images. Minimal and beautiful.</p>
            <p className="text-champagne/70 text-xs">Styling: Can look bare while revealing very little. We'll style carefully around comfort.</p>
          </div>

          {/* Glasses */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">23. Glasses</h4>
            <p className="text-ivory/70 text-sm mb-3">Add personality and subtle character. Can feel intellectual or playful.</p>
            <p className="text-champagne/70 text-xs">Styling: Bring if part of your real style. Clean lenses beforehand.</p>
          </div>

          {/* Hair Up */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">24. Ponytail or Hair Up</h4>
            <p className="text-ivory/70 text-sm mb-3">Changes mood instantly. Shows neck, jawline, and shoulders for elegant look.</p>
            <p className="text-champagne/70 text-xs">Styling: Bring hair ties or clips. Loose pieces around face keep it soft.</p>
          </div>

          {/* Jewelry */}
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-6 hover:border-champagne/30 transition-colors">
            <h4 className="font-semibold text-champagne mb-2">25. Jewelry</h4>
            <p className="text-ivory/70 text-sm mb-3">Should enhance, not overpower. Few intentional pieces make outfit feel finished.</p>
            <p className="text-champagne/70 text-xs">Styling: Rings, necklaces, pearls, or sentimental pieces. Less is usually more.</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>How to Shop Without Overthinking It</Eyebrow>
            <Heading>Practical Shopping Guide</Heading>
            <ul className="mt-8 space-y-4 text-ivory/70">
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span><strong className="text-ivory">Start with fit</strong> — A $40 piece that fits beautifully will photograph better than a $300 piece that digs in.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span><strong className="text-ivory">Choose colors intentionally</strong> — Black, ivory, nude, champagne, deep red, emerald, navy, and soft blush are reliable.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span><strong className="text-ivory">Mix price points</strong> — Combine one investment piece with simple basics like robe, tee, shirt, sweater, or jeans.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span><strong className="text-ivory">Try it on before the session</strong> — Sit, stand, bend, and move. If you're fighting it at home, you'll fight it during photos.</span>
              </li>
              <li className="flex gap-4">
                <span className="text-champagne font-semibold flex-shrink-0">•</span>
                <span><strong className="text-ivory">Bring backups</strong> — Sometimes the piece you almost left at home becomes the best look of the session.</span>
              </li>
            </ul>
            <div className="mt-8 p-6 rounded-2xl border border-champagne/20 bg-champagne/[.05]">
              <p className="text-champagne font-semibold text-sm mb-2">Best Shopping Categories:</p>
              <p className="text-ivory/70 text-sm">Bodysuits • Robes • High-waisted sets • Corsets • Simple bra sets • Sheer layers • Bridal accessories</p>
            </div>
          </div>
          <div className="rounded-2xl border border-ivory/10 bg-ivory/[.03] p-8">
            <h3 className="text-lg font-semibold text-ivory mb-6">Packing Checklist</h3>
            <ul className="space-y-3 text-ivory/70 text-sm">
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>2–3 lingerie options or bodysuits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>1 soft layer: robe, sweater, button-up, or tee</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>1 pair of heels or boots</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>Neutral underwear and seamless options</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>Jewelry or sentimental accessories</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>Hair ties, clips, and touch-up makeup</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>Any bridal pieces: veil, garter, shoes, robe</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>Nude or black stockings if using garters</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>Water and a light snack</span>
              </li>
              <li className="flex gap-3">
                <span className="text-champagne">✓</span>
                <span>Anything you are unsure about — bring it anyway</span>
              </li>
            </ul>
            <p className="mt-6 text-ivory/68 text-sm italic border-t border-ivory/10 pt-6">
              "Do not stress about bringing too much. We will edit together. If something doesn't feel right, we will skip it. Your comfort matters more than any outfit."
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-ivory italic max-w-2xl mx-auto leading-relaxed mb-12">
            "You are allowed to see yourself this way. Not after the weight loss. Not after life slows down. Not after you suddenly feel fearless. Right now."
          </blockquote>
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
