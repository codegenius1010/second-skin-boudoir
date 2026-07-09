import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Professional Boudoir Model Shoots | $150 Per Session | Second Skin Boudoir',
  description: 'Earn $150 for a professional boudoir model shoot in Destin & 30A. No experience necessary. Build your portfolio while earning. Safe, professional, fully guided.',
  keywords: 'model shoots, paid modeling, boudoir photography, Destin models, 30A models, modeling opportunity'
}

export default function ModelShoots() {
  return (
    <main>
      {/* HERO SECTION */}
      <Hero 
        title="Paid Model Shoots - $150 Per Session" 
        subtitle="Second Skin Boudoir is booking a limited number of professional boudoir model shoots. Earn $150, build your portfolio, and work with an experienced photographer. No modeling experience required, but it's a bonus if you have it." 
        eyebrow="Model Opportunity" 
        primary="Apply for a Shoot" 
        primaryHref="#apply"
        image="/images/second-skin-boudoir-luxury-brand-hero.jpg"
      />
      
      <Section>
        <div className="text-center mb-12">
          <p className="text-champagne text-lg">Earn $150. Build your portfolio. Gain professional images for modeling, social media, and career growth.</p>
          <p className="text-ivory/60 text-sm mt-2">Professional Direction. Safe Environment. Your Images to Keep.</p>
        </div>
      </Section>

      {/* WHAT'S INCLUDED */}
      <Section className="bg-smoke">
        <div className="max-w-3xl">
          <Eyebrow>Model Shoot Details</Eyebrow>
          <Heading>What You Get for $150</Heading>
          <div className="mt-8 space-y-6">
            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">Professional Photography Session</h3>
              <p className="text-champagne">1 hour of professional boudoir photography with full direction and guidance every step of the way. You will feel confident and look amazing.</p>
            </div>
            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">10 Edited Digital Images</h3>
              <p className="text-champagne">Professional retouching and editing. All images are yours to use for your portfolio, social media, modeling agency submissions, and personal use.</p>
            </div>
            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">Pre-Session Consultation</h3>
              <p className="text-champagne">Phone, Zoom, or text consultation before your shoot. Discuss style, comfort level, outfit ideas, and get any questions answered.</p>
            </div>
            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">Styling Guidance</h3>
              <p className="text-champagne">Receive outfit and styling suggestions to help you prepare. We will create multiple looks during your session.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* WHY MODELS CHOOSE US */}
      <Section>
        <Eyebrow>Why Choose Second Skin Boudoir</Eyebrow>
        <Heading>What Makes This Different</Heading>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-[2rem] border border-ivory/10 bg-smoke p-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Every pose is guided, no awkward figuring-it-out moments</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Images fully edited and ready to use immediately</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Safe, private, professional environment</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Bring a trusted friend if you want, they're welcome in the studio</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">You own and control all images, use them however you want</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">No modeling experience required, we guide everything</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-champagne/20 bg-champagne/5 p-8">
            <h3 className="text-lg font-semibold text-champagne mb-6">Perfect For:</h3>
            <ul className="space-y-3 text-ivory/80">
              <li className="flex gap-3">
                <span>→</span>
                <span>Aspiring models building their first portfolio</span>
              </li>
              <li className="flex gap-3">
                <span>→</span>
                <span>Experienced models adding versatility to their book</span>
              </li>
              <li className="flex gap-3">
                <span>→</span>
                <span>Social media influencers wanting professional boudoir content</span>
              </li>
              <li className="flex gap-3">
                <span>→</span>
                <span>Anyone wanting professional photos + earning money</span>
              </li>
              <li className="flex gap-3">
                <span>→</span>
                <span>TikTok creators, Instagram models, OnlyFans creators</span>
              </li>
              <li className="flex gap-3">
                <span>→</span>
                <span>Models wanting portfolio images without the $300+ session fee</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* YOUR SESSION */}
      <Section className="bg-smoke">
        <Eyebrow>The Experience</Eyebrow>
        <Heading>How It Works</Heading>
        <div className="mt-12 space-y-6 max-w-3xl">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">1</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">Apply</h3>
              <p className="text-champagne">Fill out the application below. Tell us about yourself, your experience level, and what you're hoping to get from the shoot.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">2</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">Consultation</h3>
              <p className="text-champagne">We'll chat via phone, Zoom, or text. Discuss the shoot, your style, outfit ideas, and answer any questions you have.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">3</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">Your Shoot</h3>
              <p className="text-champagne">1 hour of professional photography with full direction. Multiple outfits, professional posing guidance, and a relaxed, confident experience.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">4</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">Payment</h3>
              <p className="text-champagne">After your session is complete, you receive $150. Simple, straightforward, no surprises.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">5</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">Your Images</h3>
              <p className="text-champagne">10 professionally edited images delivered within 1-2 weeks. Use them for portfolios, Instagram, modeling agency submissions, or anywhere else.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* WHO WE'RE LOOKING FOR */}
      <Section>
        <Eyebrow>Who We're Looking For</Eyebrow>
        <Heading>No Experience Required</Heading>
        <div className="mt-8 max-w-3xl">
          <p className="text-champagne text-lg mb-4">
            You don't need to be a professional model. You don't need experience. You don't need to know how to pose or what to do with your hands. That's what we're here for.
          </p>
          <p className="text-champagne text-lg mb-8">
            This is for any woman looking to earn $150 and get professional photos. A mom wanting confidence. Someone with a unique look. Anyone just looking to make a little extra money or have fun while earning it. You don't have to be a model at all to apply.
          </p>
          <div className="rounded-[2rem] border border-champagne/20 bg-champagne/5 p-8">
            <h3 className="text-lg font-semibold text-champagne mb-6">You're a great fit if:</h3>
            <ul className="space-y-3 text-ivory/80">
              <li>✓ You're comfortable being photographed in a professional boudoir setting</li>
              <li>✓ You want professional photos for your portfolio or social media</li>
              <li>✓ You're willing to be guided and directed (that's the whole point!)</li>
              <li>✓ You can follow simple posing instructions and have fun with it</li>
              <li>✓ You're looking to earn $150 and build your portfolio at the same time</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* SAFETY & COMFORT */}
      <Section className="bg-smoke">
        <Eyebrow>Safety First</Eyebrow>
        <Heading>Your Comfort & Privacy Matter</Heading>
        <div className="mt-12 max-w-3xl">
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-ivory mb-1">Private Consultation First</h4>
                <p className="text-champagne">Before we ever meet, we chat. You'll get to know me and ask any questions. Phone, Zoom, or text, whatever makes you comfortable.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-ivory mb-1">Bring a Friend</h4>
                <p className="text-champagne">You're welcome to bring anyone you trust to your session. They can be in the room the entire time. Your comfort is our priority.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-ivory mb-1">You Control Everything</h4>
                <p className="text-champagne">Your outfit choices, what gets shot, what gets shown, complete control. We pause anytime you need a break.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-2xl">✓</span>
              <div>
                <h4 className="font-semibold text-ivory mb-1">Professional Environment</h4>
                <p className="text-champagne">Private studio, professional photographer, established business. Safe, respectful, and fully professional.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* WHO YOU'LL WORK WITH */}
      <Section>
        <Eyebrow>Meet Your Photographer</Eyebrow>
        <Heading>You're In Good Hands</Heading>
        <div className="mt-8 max-w-3xl">
          <p className="text-champagne text-lg mb-6">
            These shoots are done by Matthew, Second Skin Boudoir's founder and photographer. He specializes in creating comfortable, professional experiences where you feel confident and supported. Your session will be fully guided, with direction every step of the way.
          </p>
          <p className="text-champagne text-lg">
            Learn more about who you'll be working with on the <a href="/about" className="text-champagne hover:text-ivory transition-colors font-semibold">about page</a>.
          </p>
        </div>
      </Section>

      {/* APPLICATION FORM */}
      <Section id="apply" className="bg-smoke">
        <div className="text-center mb-12">
          <Eyebrow>Ready to Apply?</Eyebrow>
          <Heading>Let's Chat</Heading>
          <p className="text-champagne text-lg mt-4">
            Tell us about yourself and what you're looking for. We'll get back to you within 1-2 business days.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <ContactForm hidePricingCheckbox={true} formType="model-shoot" />
        </div>
      </Section>

      {/* CTA SECTION */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Still Have Questions?</Eyebrow>
          <p className="text-ivory/70 text-lg">
            Call or text me directly at 850-608-0844 or email info@secondskinboudoir.com. I'm happy to chat about the shoot, answer questions, or discuss what you're hoping to achieve.
          </p>
        </div>
      </Section>
    </main>
  )
}
