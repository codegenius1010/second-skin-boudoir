import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Button } from '@/components/Button'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'NYC Collaboration Sessions | August 2026 | Second Skin Boudoir',
  description: 'Limited complimentary boudoir collaboration sessions while Second Skin Boudoir is in Manhattan, August 10–15, 2026. Apply to be selected.',
  keywords: 'NYC boudoir, New York boudoir photography, collaboration, Manhattan boudoir, boudoir photography',
}

export default function NYCCollaborationPage() {
  return (
    <main>
      {/* HERO */}
      <Hero
        eyebrow="NEW YORK CITY"
        title="Limited Collaboration Sessions"
        subtitle="Second Skin Boudoir is coming to Manhattan August 10–15, 2026. Apply for a limited complimentary boudoir collaboration session."
        primary="Express Your Interest"
        primaryHref="#apply"
        secondary={{ label: 'Back to Opportunities', href: '/opportunities' }}
        image="/images/second-skin-boudoir-luxury-brand-hero.jpg"
      />

      {/* OVERVIEW */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Eyebrow>New York City Collaboration</Eyebrow>
          <Heading>A Luxury Boudoir Experience in Manhattan</Heading>

          <div className="mt-8 space-y-6 text-ivory/75">
            <p>
              Second Skin Boudoir is bringing luxury, tasteful boudoir photography to Manhattan for a limited
              engagement in August 2026. We are selecting a small number of women for complimentary collaboration
              sessions—a full luxury boudoir experience in exchange for approved portfolio image use.
            </p>

            <p>
              If you're interested in being part of this exclusive opportunity, please express your interest below.
              Selected participants will be contacted with availability details, consultation information, and next
              steps.
            </p>

            <p>
              This is a limited opportunity. Applications are reviewed for fit, comfort level, and availability. Every
              session begins with a private consultation to ensure it's the right experience for you.
            </p>
          </div>

          <div className="mt-10 rounded-[2rem] border border-champagne/20 bg-champagne/5 p-6">
            <p className="text-sm text-ivory/80">
              <strong className="text-champagne">What This Means:</strong> You will receive a complimentary boudoir
              session valued at over $1,000 in exchange for allowing specific, approved images to be used in the Second
              Skin Boudoir portfolio. Every detail of the session is private, tasteful, and designed around your
              comfort.
            </p>
          </div>
        </div>
      </Section>

      {/* WHAT'S INCLUDED */}
      <Section className="bg-smoke">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>Collaboration Experience</Eyebrow>
          <Heading>What's Included in Your Session</Heading>

          <div className="mt-12 space-y-6">
            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">Complimentary Session</h3>
              <p className="text-champagne">
                A complete boudoir photography experience valued at over $1,000, completely complimentary for selected
                applicants.
              </p>
            </div>

            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">Private Consultation First</h3>
              <p className="text-champagne">
                Before your session, you will have a private consultation to discuss your comfort level, style
                preferences, any concerns, and exactly what to expect.
              </p>
            </div>

            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">10 Professionally Edited Images</h3>
              <p className="text-champagne">
                You will receive 10 professionally edited, high-resolution digital images. You retain all rights to
                these images.
              </p>
            </div>

            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">Written Image Permissions</h3>
              <p className="text-champagne">
                Every image used in the Second Skin Boudoir portfolio will be agreed upon in writing by you in advance.
                No images are used without your explicit approval.
              </p>
            </div>

            <div className="border-l-2 border-champagne pl-6">
              <h3 className="text-xl font-semibold text-ivory mb-2">Fully Guided Experience</h3>
              <p className="text-champagne">
                Professional direction every step of the way. Wardrobe guidance, posing, expression, lighting—you are
                supported and guided throughout.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* LOCATION */}
      <Section className="bg-charcoal">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>Where Your Session Takes Place</Eyebrow>
          <Heading>A Luxury Manhattan Venue</Heading>

          <div className="mt-8 space-y-6">
            <div className="rounded-[2rem] border border-champagne/20 bg-champagne/5 p-8">
              <h3 className="text-2xl font-semibold text-ivory mb-3">The Hilton Club - New York</h3>
              <p className="text-ivory/75 mb-4">
                Your session will take place in a private, luxury suite at The Hilton Club - New York, a prestigious 
                four-star property in Manhattan. We've selected an elegant, upscale location that ensures your comfort, 
                privacy, and the highest standards of professionalism.
              </p>
              <p className="text-champagne text-sm">
                Boutique private suites • Professional lighting • Climate-controlled • Discretion guaranteed
              </p>
            </div>

            <p className="text-ivory/70">
              All sessions are private, confidential, and conducted in a completely professional environment. Your 
              comfort and privacy are paramount. When you're selected, we'll provide exact location details, parking 
              information, and any other logistical information you need.
            </p>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Eyebrow>Application Process</Eyebrow>
          <Heading>Three Simple Steps</Heading>

          <div className="mt-12 space-y-8">
            <div className="flex gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne text-sm font-bold text-charcoal flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ivory mb-2">Express Your Interest</h3>
                <p className="text-ivory/70">
                  Submit the form below with a bit about yourself, your comfort level, and why you're interested in
                  this opportunity.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne text-sm font-bold text-charcoal flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ivory mb-2">Selected Applicants Receive Details</h3>
                <p className="text-ivory/70">
                  If selected, we'll contact you with session details, availability times, consultation scheduling,
                  and next steps.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne text-sm font-bold text-charcoal flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ivory mb-2">Your Private Session</h3>
                <p className="text-ivory/70">
                  Have a consultation, complete your session, receive your edited images, and share approved photos
                  with Second Skin Boudoir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* APPLICATION FORM */}
      <Section id="apply" className="bg-smoke">
        <div className="max-w-2xl mx-auto">
          <Eyebrow>Express Your Interest</Eyebrow>
          <Heading>Apply for an NYC Collaboration Session</Heading>
          <p className="text-ivory/70 mt-4 mb-8">
            Let us know a bit about yourself. Applying doesn't commit you to anything—it's just the first step of a
            private conversation.
          </p>
          <ContactForm formType="nyc-collaboration" source="collaboration-nyc" hidePricingCheckbox={true} timeframePlaceholder="When are you hoping to do this? (e.g., August 10th-15th)" />
        </div>
      </Section>

      {/* MEET YOUR PHOTOGRAPHER */}
      <Section className="bg-smoke">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>Meet Your Photographer</Eyebrow>
          <Heading>You're In Good Hands</Heading>
          <div className="mt-8">
            <p className="text-champagne text-lg mb-6">
              Your NYC collaboration session will be led by Matthew, Second Skin Boudoir's founder and photographer. He specializes in creating comfortable, professional experiences where you feel confident and supported. Your entire session will be fully guided, with professional direction every step of the way.
            </p>
            <p className="text-champagne text-lg">
              Learn more about who you'll be working with on the <a href="/about" className="text-champagne hover:text-ivory transition-colors font-semibold">about page</a>.
            </p>
          </div>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <Heading className="mb-4">Exploring Other Opportunities?</Heading>
          <p className="text-ivory/75 mb-8">
            Second Skin Boudoir also offers collaboration sessions in Destin, paid model shoots, and private client
            boudoir experiences.
          </p>
          <Button href="/opportunities">View All Opportunities</Button>
        </div>
      </Section>
    </main>
  )
}
