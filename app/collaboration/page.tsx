import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'
import { FAQAccordion } from '@/components/FAQAccordion'
import { CollaborationForm } from '@/components/CollaborationForm'

export const metadata: Metadata = {
  title: 'Limited Boudoir Collaboration Sessions in Destin & 30A | Second Skin Boudoir',
  description: 'Apply for a limited private boudoir collaboration session with Second Skin Boudoir in Destin, 30A, and the Florida Gulf Coast. Fully guided, tasteful, privacy-first sessions for selected participants.',
  keywords: 'boudoir collaboration, Destin boudoir, 30A boudoir, luxury boudoir photography, private boudoir sessions, Florida Gulf Coast'
}

export default function Page() {
  return (
    <main>
      {/* HERO SECTION */}
      <Hero 
        title="Limited Collaboration Sessions" 
        subtitle="Second Skin Boudoir is selecting a small number of women for private, fully guided boudoir portrait collaborations in Destin, 30A, and along the Florida Gulf Coast." 
        eyebrow="Collaboration" 
        primary="Apply for a Private Consultation" 
        primaryHref="#apply"
        secondary={{ label: "Learn How It Works", href: "#how-it-works" }}
        image="/images/second-skin-boudoir-luxury-brand-hero.jpg"
      />
      
      <Section>
        <div className="text-center mb-12">
          <p className="text-champagne text-lg">Complimentary collaboration experience valued at over $1,000 for selected applicants.</p>
          <p className="text-ivory/60 text-sm mt-2">Private. Guided. Tasteful. Application required.</p>
        </div>
      </Section>

      {/* OFFER OVERVIEW */}
      <Section id="how-it-works" className="bg-smoke">
        <div className="max-w-3xl">
          <Eyebrow>How This Works</Eyebrow>
          <Heading>A Premium Collaboration Opportunity</Heading>
          <div className="mt-8 space-y-6">
            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">Limited Availability</h3>
              <p className="text-champagne">Only a limited number of collaboration sessions are available. This opportunity is application-based and designed for women who are comfortable helping build the Second Skin Boudoir portfolio in a tasteful, privacy-first way.</p>
            </div>
            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">Application-Based Selection</h3>
              <p className="text-champagne">Because this collaboration experience is valued at over $1,000, applications are reviewed for fit, comfort level, image-use preferences, and availability. Selected participants must complete a private consultation before being accepted.</p>
            </div>
            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">What You Receive</h3>
              <p className="text-champagne">Selected participants receive a complimentary collaboration experience valued at over $1,000 in exchange for approved portfolio image use. Every session is private, tasteful, fully guided, and designed around comfort, consent, and confidence.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT'S INCLUDED */}
      <Section>
        <Eyebrow>Collaboration Experience</Eyebrow>
        <Heading>What's Included</Heading>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-[2rem] border border-ivory/10 bg-smoke p-8">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Complimentary collaboration experience valued at over $1,000</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Private consultation by Zoom, phone, or text first</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Comprehensive wardrobe guidance</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Fully guided boudoir portrait session</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Private image reveal appointment</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">10 edited digital images</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Personal-use rights to included edited images</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Option to purchase additional images or albums</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <p className="text-ivory">Privacy-first image review process</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-champagne/20 bg-champagne/5 p-6">
              <h4 className="text-lg font-semibold text-ivory mb-3">Your Image Rights</h4>
              <p className="text-champagne text-sm leading-relaxed mb-4">You receive personal-use rights to your 10 included edited images. You may save, print, and share them for personal use. Second Skin Boudoir retains copyright and may only use images according to your signed image-use release.</p>
            </div>

            <div className="rounded-[2rem] border border-champagne/20 bg-champagne/5 p-6">
              <h4 className="text-lg font-semibold text-ivory mb-3">Privacy-Focused Process</h4>
              <p className="text-champagne text-sm leading-relaxed mb-4">Your images are never shared outside the permissions you approve in writing. You choose which images may be used for portfolio, marketing, or social media—or keep them completely private.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT'S REQUIRED */}
      <Section className="bg-smoke">
        <Eyebrow>Selection & Requirements</Eyebrow>
        <Heading>What's Required to Participate</Heading>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-6">Application Requirements</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-champagne text-lg flex-shrink-0">•</span>
                <p className="text-champagne">Complete the collaboration application form</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-lg flex-shrink-0">•</span>
                <p className="text-champagne">Be 21 or older</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-lg flex-shrink-0">•</span>
                <p className="text-champagne">Complete a private consultation</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-lg flex-shrink-0">•</span>
                <p className="text-champagne">Sign a collaboration agreement and model release</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-lg flex-shrink-0">•</span>
                <p className="text-champagne">Be comfortable with approved portfolio image use</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-ivory mb-6">Booking Requirements</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-champagne text-lg flex-shrink-0">•</span>
                <p className="text-champagne">Reserve your date with a $99 refundable booking retainer</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-lg flex-shrink-0">•</span>
                <p className="text-champagne">Arrive prepared and on time for your session</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-lg flex-shrink-0">•</span>
                <p className="text-champagne">Complete your collaboration agreement and release before booking</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-champagne/20 bg-champagne/5 p-6 mt-8">
              <h4 className="font-semibold text-ivory mb-3">About the $99 Refundable Retainer</h4>
              <p className="text-champagne text-sm leading-relaxed mb-3">A $99 refundable booking retainer is required to reserve your date. This helps protect the limited collaboration calendar and reduce no-shows.</p>
              <p className="text-champagne text-sm leading-relaxed"><strong className="text-ivory">After your completed session</strong>, the retainer may either be refunded or applied as credit toward additional images, albums, or artwork.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-champagne/30 bg-champagne/10 p-8">
          <h3 className="text-lg font-semibold text-ivory mb-4">Cancellation & No-Show Policy</h3>
          <p className="text-champagne mb-4">The retainer is not an additional session fee. The collaboration experience itself is complimentary for selected applicants and valued at over $1,000. The retainer simply reserves your date and helps ensure selected applicants are serious about attending.</p>
          <p className="text-champagne"><strong className="text-ivory">Important:</strong> If you cancel late, reschedule outside the allowed window, or do not show up for your session, the $99 retainer may be forfeited. If you complete your scheduled collaboration session, it may either be refunded or applied as credit toward additional images, albums, or artwork.</p>
        </div>
      </Section>

      {/* PRIVACY & IMAGE USE OPTIONS */}
      <Section>
        <Eyebrow>Your Control & Privacy</Eyebrow>
        <Heading>Your Privacy Comes First</Heading>
        <p className="text-champagne text-lg mt-4 max-w-3xl mb-10">
          Because these sessions are designed to build the Second Skin Boudoir portfolio, selected clients must sign a collaboration agreement and model release. However, your comfort and privacy still matter. You may choose from the following image-use options:
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="rounded-[2rem] border border-champagne/20 bg-smoke p-8">
            <h3 className="text-lg font-semibold text-ivory mb-4">Full Portfolio Release</h3>
            <p className="text-champagne mb-6">Approved images may include face/body and may be used on the website, social media, ads, printed materials, and other Second Skin Boudoir marketing.</p>
            <div className="pt-4 border-t border-ivory/10">
              <p className="text-sm text-ivory/60">Maximum portfolio exposure for your images</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-champagne/20 bg-smoke p-8">
            <h3 className="text-lg font-semibold text-ivory mb-4">Anonymous Release</h3>
            <p className="text-champagne mb-6">Approved images may be used without showing your face or identifying features. This may include detail images, silhouettes, cropped images, or implied/anonymized portraits.</p>
            <div className="pt-4 border-t border-ivory/10">
              <p className="text-sm text-ivory/60">Privacy-protected portfolio use</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-champagne/20 bg-smoke p-8">
            <h3 className="text-lg font-semibold text-ivory mb-4">Private Review First</h3>
            <p className="text-champagne mb-6">No images are shared unless you approve them after seeing the finished gallery. Final image use will follow the signed release.</p>
            <div className="pt-4 border-t border-ivory/10">
              <p className="text-sm text-ivory/60">You approve every image before use</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-champagne/30 bg-champagne/10 p-8">
          <p className="text-ivory"><strong className="text-champagne">Remember:</strong> Your images are never shared outside the permissions you approve in writing. You have complete control over your privacy.</p>
        </div>
      </Section>

      {/* WHO THIS IS FOR */}
      <Section className="bg-smoke">
        <Eyebrow>Is This For You?</Eyebrow>
        <Heading>This May Be a Beautiful Fit If…</Heading>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="space-y-3 flex items-start gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <p className="text-champagne leading-relaxed">You have been curious about boudoir but want a private, guided experience</p>
            </div>
          </div>
          <div className="space-y-3 flex items-start gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <p className="text-champagne leading-relaxed">You want tasteful, editorial images that feel elegant rather than overly explicit</p>
            </div>
          </div>
          <div className="space-y-3 flex items-start gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <p className="text-champagne leading-relaxed">You are open to helping build the Second Skin Boudoir portfolio</p>
            </div>
          </div>
          <div className="space-y-3 flex items-start gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <p className="text-champagne leading-relaxed">You are comfortable with a consultation before booking</p>
            </div>
          </div>
          <div className="space-y-3 flex items-start gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <p className="text-champagne leading-relaxed">You are interested in self-love, bridal, birthday, anniversary, divorce/new chapter, or confidence imagery</p>
            </div>
          </div>
          <div className="space-y-3 flex items-start gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <p className="text-champagne leading-relaxed">You want direction with posing, wardrobe, expression, and comfort level</p>
            </div>
          </div>
          <div className="space-y-3 flex items-start gap-4">
            <span className="text-2xl">✓</span>
            <div>
              <p className="text-champagne leading-relaxed">You appreciate privacy, professionalism, and clear boundaries</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 5-STEP PROCESS */}
      <Section>
        <Eyebrow>Your Collaboration Journey</Eyebrow>
        <Heading>The 5-Step Process</Heading>
        <div className="mt-12 space-y-6 max-w-4xl">
          <div className="flex gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-champagne to-amber-300 text-charcoal font-bold text-lg">1</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ivory mb-2">Apply</h3>
              <p className="text-champagne">Submit the collaboration application and share what type of session you are interested in. Your application helps us understand your vision and comfort level.</p>
            </div>
          </div>
          <div className="flex gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-champagne to-amber-300 text-charcoal font-bold text-lg">2</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ivory mb-2">Private Consultation</h3>
              <p className="text-champagne">Choose Zoom, phone, or text first. We will talk through your vision, privacy preferences, wardrobe, comfort level, and whether the collaboration is a good fit for both of us.</p>
            </div>
          </div>
          <div className="flex gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-champagne to-amber-300 text-charcoal font-bold text-lg">3</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ivory mb-2">Reserve Your Date</h3>
              <p className="text-champagne">If selected, you will sign the collaboration agreement and place the $99 refundable booking retainer to reserve your date on our limited calendar.</p>
            </div>
          </div>
          <div className="flex gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-champagne to-amber-300 text-charcoal font-bold text-lg">4</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ivory mb-2">Enjoy the Session</h3>
              <p className="text-champagne">You will be guided through every pose, hand placement, expression, and transition. You do not need to know how to pose. Every step is directed by someone who knows exactly how to make you feel confident and beautiful.</p>
            </div>
          </div>
          <div className="flex gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-champagne to-amber-300 text-charcoal font-bold text-lg">5</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ivory mb-2">Review Your Images</h3>
              <p className="text-champagne">You will view your finished images privately, choose your 10 included edited images, and confirm which images may be used according to your release. After your completed session, your retainer may be refunded or applied as credit toward additional images, albums, or artwork.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* MALE PHOTOGRAPHER TRUST SECTION */}
      <Section className="bg-smoke">
        <Eyebrow>Trust & Safety</Eyebrow>
        <Heading>A Note on Comfort, Safety, and Trust</Heading>
        <p className="text-champagne text-lg mt-6 mb-10">
          Boudoir is personal, and feeling comfortable matters. Second Skin Boudoir is built around clear communication, consent, privacy, and professional boundaries.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-[2rem] border border-ivory/10 bg-white/5 p-8">
            <h3 className="text-lg font-semibold text-ivory mb-4">How We Ensure Your Safety</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-champagne">Private consultation first—you talk to me before any session is booked</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-champagne">You have complete control over what you wear and what we photograph</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-champagne">You can pause, modify, or stop any pose at any time</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-champagne">Physical adjustments are avoided unless you give clear permission</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne text-xl flex-shrink-0">✓</span>
                <div>
                  <p className="text-champagne">You are welcome to bring a trusted female friend for support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ivory/10 bg-white/5 p-8">
            <h3 className="text-lg font-semibold text-ivory mb-4">Your Professional Experience</h3>
            <p className="text-champagne mb-6">
              I am a male photographer specializing in creating safe, empowering experiences for women. I have guided hundreds of women through boudoir sessions and understand exactly how to make you feel:
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-champagne">•</span>
                <p className="text-champagne">Safe and protected</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne">•</span>
                <p className="text-champagne">Directed and confident</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne">•</span>
                <p className="text-champagne">Respected and heard</p>
              </div>
              <div className="flex gap-3">
                <span className="text-champagne">•</span>
                <p className="text-champagne">Beautiful in every frame</p>
              </div>
            </div>
            <p className="text-champagne text-sm mt-6 pt-6 border-t border-ivory/10">Every session is fully guided, professional, and privacy-first.</p>
          </div>
        </div>
      </Section>

      {/* CTA SECTION */}
      <Section className="bg-gradient-to-br from-champagne/10 to-amber-900/10 border-2 border-champagne/30">
        <div className="text-center">
          <Eyebrow>Ready to Apply?</Eyebrow>
          <Heading>Apply for a Private Consultation</Heading>
          <p className="text-champagne text-lg mt-6 mb-2">
            The first step is a private conversation—no commitment, no pressure.
          </p>
          <p className="text-ivory/60 mb-10">Tell us about yourself, your vision, and your comfort level.</p>
        </div>
      </Section>

      {/* FAQ SECTION */}
      <Section>
        <Eyebrow>Questions?</Eyebrow>
        <h2 className="text-4xl font-bold text-ivory mb-12">Collaboration FAQ</h2>
        <div className="max-w-3xl">
          <FAQAccordion items={[
            ['Is this really complimentary?', 'Yes. Selected collaboration clients receive a complimentary session experience valued at over $1,000. A $99 refundable booking retainer is required to reserve your date and reduce no-shows. After your completed session, the retainer may either be refunded or applied as credit toward additional images, albums, or artwork.'],
            ['How many images are included?', 'Selected collaboration clients receive 10 edited digital images with personal-use rights. You may save, print, and share these images for personal use. Additional images, albums, or artwork may be purchased separately if desired.'],
            ['Why is there a $99 retainer?', 'The $99 refundable booking retainer reserves your date and helps protect the limited collaboration calendar. It ensures selected applicants are serious about attending. If you complete your scheduled session, it may either be refunded or applied as credit toward additional images, albums, or artwork. If you cancel late or do not show up, the retainer may be forfeited.'],
            ['Do I have to share my images publicly?', 'Because this is a portfolio collaboration, approved image use is required. However, you have three options: Full Portfolio Release, Anonymous Release (no face/identifying features), or Private Review First. Final image use follows your signed release.'],
            ['Can my face stay private?', 'Yes, absolutely. If you choose the Anonymous Release option, approved images may be used without showing your face or identifying features. This may include cropped images, detail shots, silhouettes, or images where your face is not visible.'],
            ['Do I need to know how to pose?', 'No. Every pose, expression, hand placement, and transition is fully guided. You do not need any experience. I will direct you through every step, and by the end of your session you will feel confident and look amazing.'],
            ['What should I wear?', 'You will receive comprehensive wardrobe guidance before your session. Bodysuits, robes, oversized shirts, sweaters, bridal pieces, heels, jewelry, and sheets can all photograph beautifully. We will create multiple looks during your session.'],
            ['Can I bring a friend?', 'Yes, you may bring a trusted female friend for support as long as she is positive, respectful, and does not interfere with the session flow.'],
            ['What happens after I apply?', 'If your application looks like a fit, the next step is a private consultation by Zoom, phone, or text first. We will discuss your vision, privacy preferences, comfort level, and whether the collaboration is right for you.'],
            ['What if I want a fully private session?', 'A standard paid session may be a better fit if you do not want any images used for portfolio or marketing. This is still a fully guided, luxury boudoir experience. Contact us to discuss custom paid session options.'],
            ['How long is the session?', 'The collaboration session is approximately 1 hour. This includes setup, pose direction, multiple outfit changes, and guided transitions between looks.'],
            ['Are hair and makeup included?', 'No, hair and makeup are not included. You are welcome to have them done professionally before your session, or come as you are—we can create beautiful images either way.'],
          ]} />
        </div>
      </Section>

      {/* APPLICATION FORM */}
      <Section id="apply" className="bg-smoke">
        <div className="text-center mb-12">
          <Eyebrow>Apply Now</Eyebrow>
          <Heading>Collaboration Application</Heading>
          <p className="text-champagne text-lg mt-4">
            Let us learn about you, your vision, and your comfort level. No commitment—just a conversation.
          </p>
        </div>
        <CollaborationForm />
      </Section>
    </main>
  )
}

