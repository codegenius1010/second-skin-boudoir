import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Collaboration Sessions | Second Skin Boudoir',
  description: 'Free boudoir session in exchange for beautiful portfolio photos. Models, entrepreneurs, or any woman wanting professional photos. Complete creative control. No experience needed.'
}

export default function Page() {
  return (
    <main>
      <Hero 
        title="Collaborate with Second Skin Boudoir" 
        subtitle="Free boudoir session in exchange for beautiful portfolio photos. You control how your images are shared—publicly, anonymously, or privately." 
        eyebrow="Collaboration" 
        primary="Book Your Free Consultation" 
        image="/images/secondskinboudoir.jpg"
      />
      
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="✨ Full Experience">
            Professional styling guidance, fully guided posing, and a complete 1-hour session in a luxury setting. Completely private.
          </Card>
          <Card title="📸 Your Photos">
            10-18 edited digital images from your session. You own them completely and decide what happens with them.
          </Card>
          <Card title="🎯 Creative Control">
            Choose which images get shared publicly, anonymously, or kept completely private. 100% your choice, no pressure.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Why Women Choose This Path</Eyebrow>
        <Heading>What This Collaboration Means for You</Heading>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3 flex items-center gap-3">
              <span className="text-2xl">📸</span> Professional Photos You Own
            </h3>
            <p className="text-champagne">10-18 edited digital images completely yours. Use them for portfolios, agencies, social media, or keep them private. No restrictions. They are yours to do with as you wish.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3 flex items-center gap-3">
              <span className="text-2xl">💪</span> Feel Powerful
            </h3>
            <p className="text-champagne">This is not just about photos—it is about reconnecting with your confidence and seeing yourself the way I see you. Professional, empowered, and beautiful.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3 flex items-center gap-3">
              <span className="text-2xl">🤝</span> Your Voice Matters
            </h3>
            <p className="text-champagne">This is partnership. Every decision—what to wear, what to shoot, how to pose, what to keep private—is yours. I guide the art; you guide the experience.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3 flex items-center gap-3">
              <span className="text-2xl">🎨</span> Choice Is Yours
            </h3>
            <p className="text-champagne">Share publicly, stay anonymous, or keep them completely private. You decide which images go where. Zero pressure to share anything you are not comfortable with.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <Eyebrow>Safety & Comfort First</Eyebrow>
        <Heading>Your Trust Matters to Us</Heading>
        <div className="mt-12 max-w-3xl">
          <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-3xl p-8 mb-8">
            <p className="text-charcoal text-lg leading-relaxed mb-6">
              I am a male photographer specializing in creating safe, empowering experiences for every woman. Your comfort and safety are non-negotiable.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Private Consultation First</h4>
                  <p className="text-champagne">Before anything, we talk. Phone, Zoom, or text—your choice. You will get to know me and ask any questions you have.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Bring a Trusted Friend</h4>
                  <p className="text-champagne">You are welcome to bring anyone you trust to your session. They can be in the room the entire time.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">You Control Everything</h4>
                  <p className="text-champagne">Your outfit choices, what gets shot, what gets shown, how images are used—you have complete control. Pause anytime.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Proven Experience</h4>
                  <p className="text-champagne">I have worked with hundreds of women and know exactly how to make you feel safe, directed, and confident.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Your Collaboration</Eyebrow>
        <Heading>How This Works</Heading>
        <div className="mt-12 space-y-6 max-w-3xl">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">1</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">Consultation</h3>
              <p className="text-champagne">We chat about your vision, what you want to explore, comfort level, style preferences, and how you would like your photos shared. This is where you get to know me.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">2</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">What to Wear Guide</h3>
              <p className="text-champagne">You will receive styling inspiration, outfit suggestions, and examples to help you prepare. We will create multiple looks during your session.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">3</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">The Session</h3>
              <p className="text-champagne">1 hour of photography with professional direction every step. Every pose, expression, angle is guided. You will feel confident and the images will show it.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">4</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">Your Photos</h3>
              <p className="text-champagne">10-18 edited professional images delivered to you. Together we decide which get shared on my social, website, portfolio—or kept completely private.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <Eyebrow>Questions?</Eyebrow>
        <Heading>Everything About Collaboration</Heading>
        <div className="mt-12">
          <FAQAccordion items={[
            ['Is this really free?', 'Yes. Zero session fee, zero styling fee. You invest your time, we invest in creating beautiful images. You get professional photos you love and own completely. Win-win.'],
            ['What can I do with the photos?', 'They are completely yours. Use them on social media, your website, professional profiles, or keep them totally private. We might ask to use a few for our website/portfolio, but you choose what gets shared and where.'],
            ['Do I need to share my photos publicly?', 'Not at all. You control everything. Share publicly, stay anonymous, or keep them completely private. No pressure whatsoever. You decide.'],
            ['What if I am nervous about posing?', 'Perfect—most people are at first. Every pose is guided step by step. I will direct your posture, expression, angles—everything. By the end you will feel confident and look amazing.'],
            ['Can I stay completely private?', 'Absolutely. You can keep all your photos private, stay anonymous, or choose specific images to share. It is entirely your choice, and there is zero pressure.'],
            ['When are sessions available?', 'I am booking a limited number of collaboration sessions through the end of the year. Each free session is a significant investment of time and artistry, and spots fill quickly. If this resonates with you, reach out soon to secure your date.'],
            ['What should I wear?', 'Whatever makes you feel confident and like yourself. Lingerie, an oversized shirt, a favorite dress, jewelry, heels—we will create multiple looks. Once you book, you will get a detailed What to Wear guide with styling ideas and photos.'],
            ['Do I need any experience?', 'Not at all. Whether this is your first time in front of a camera or you have done it before, every pose is guided. You will leave with gorgeous images and real confidence.'],
            ['How do you keep me safe?', 'Private consultation first (so you know me), you can bring a trusted friend, you control everything—wardrobe, poses, what gets shot—and I have professional experience working with all kinds of women. Your comfort comes first.'],
          ]} />
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-rose-900/10 to-amber-900/10 border-2 border-rose-200">
        <div className="text-center mb-12">
          <Eyebrow>Ready?</Eyebrow>
          <Heading>Let us Create Something Beautiful Together</Heading>
          <p className="text-champagne text-lg mt-4 max-w-2xl mx-auto">
            Let us talk about your collaboration goals. No pressure, no commitment—just a conversation about how we can help each other grow.
          </p>
        </div>
        <ContactForm hidePricingCheckbox={true} />
      </Section>
    </main>
  )
}

