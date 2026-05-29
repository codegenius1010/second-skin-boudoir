import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'
import { FAQAccordion } from '@/components/FAQAccordion'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Free Boudoir Portfolio Session | Second Skin Boudoir',
  description: 'Get professional boudoir photos for your portfolio at zero cost. Build your modeling portfolio with a professional, safe, and empowering experience in Destin.',
}

export default function PortfolioModels() {
  return (
    <main>
      <Hero 
        title="Build Your Boudoir Portfolio For Free" 
        subtitle="Get professional photos for your modeling portfolio—with zero session fee. We collaborate with aspiring and experienced models to grow our portfolio while you grow yours." 
        primary="Book Your Free Consultation" 
        image="/images/second-skin-boudoir-luxury-brand-hero.jpg"
      />
      
      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="📸 Professional Photos">
            Receive 10-18 edited digital images from your session. Professional quality, fully owned by you for portfolio use.
          </Card>
          <Card title="✨ Zero Cost">
            No session fee. No styling fee. You invest nothing but your time and get back images you can use everywhere.
          </Card>
          <Card title="🎯 Professional Direction">
            Every pose, expression, and angle is guided by an experienced photographer. You will feel confident and look amazing.
          </Card>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Why Models Choose Us</Eyebrow>
        <Heading>What You Get Out of This</Heading>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3 flex items-center gap-3">
              <span className="text-2xl">📱</span> Use Them Everywhere
            </h3>
            <p className="text-champagne">Instagram, portfolio websites, modeling agency submissions, TikTok—these are your photos to use however you want. You own them completely.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3 flex items-center gap-3">
              <span className="text-2xl">💪</span> Confidence Boost
            </h3>
            <p className="text-champagne">Boudoir is not just about looking beautiful—it is about *feeling* beautiful. Leave your session knowing what you are truly capable of.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3 flex items-center gap-3">
              <span className="text-2xl">🎬</span> Portfolio Builder
            </h3>
            <p className="text-champagne">Whether you are new to modeling or building your book, boudoir images show versatility, grace, and poise that agencies love.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ivory mb-3 flex items-center gap-3">
              <span className="text-2xl">🤝</span> Collaboration, Not Transaction
            </h3>
            <p className="text-champagne">This is partnership. You help us grow our portfolio. We help you grow yours. Win-win, pressure-free, on your terms.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <Eyebrow>Safety First</Eyebrow>
        <h2 className="text-4xl font-bold text-slate-700 mb-8">Your Comfort Matters Most</h2>
        <div className="mt-12 max-w-3xl">
          <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-3xl p-8 mb-8">
            <p className="text-charcoal text-lg leading-relaxed mb-6">
              I am a male photographer specializing in creating safe, empowering experiences for every model. Your comfort is not negotiable.
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
                  <p className="text-champagne">I have worked with hundreds of models in boudoir and know exactly how to make you feel safe, directed, and confident.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Your Session</Eyebrow>
        <Heading>What to Expect</Heading>
        <div className="mt-12 space-y-6 max-w-3xl">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">1</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">Consultation</h3>
              <p className="text-champagne">We chat about your vision, comfort level, style preferences, and any questions. This is where you get to know me and I get to know you.</p>
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
              <p className="text-champagne">1 hour of photography with guidance every step. Professional direction means you will feel confident and the images will show it.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-300 text-white font-bold">4</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ivory mb-2">Your Photos</h3>
              <p className="text-champagne">All 10-18 edited, professional images delivered digitally. Use them for portfolios, modeling submissions, social media—however you want.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <Eyebrow>Questions?</Eyebrow>
        <h2 className="text-4xl font-bold text-slate-700 mb-8">For Portfolio Models</h2>
        <div className="mt-12">
          <FAQAccordion items={[
            ['Is this really free?', 'Yes. Zero session fee, zero styling fee. You invest your time, we invest in creating beautiful images. We both benefit—you get portfolio photos, we get portfolio images. Win-win.'],
            ['Can I use the photos for social media?', 'Absolutely. You own the photos. Use them on Instagram, TikTok, your website, portfolio submissions, or anywhere else. We might ask to use a few for our website/social, but you choose what gets shared where.'],
            ['Will you credit me?', 'Of course. We will tag you, link to your accounts, and promote your work alongside ours. It is a collaboration—we want people to know who you are.'],
            ['What if I am nervous or have never modeled?', 'Perfect. That is who this is for. Every pose is guided step by step. I will direct your posture, expression, angles—everything. By minute five you will feel like a pro.'],
            ['What if I want to stay anonymous?', 'You can absolutely keep your identity private. You control which photos we share publicly and whether your name gets used. Some models love the anonymity.'],
            ['When are sessions available?', 'I am booking a limited number of free portfolio sessions through the end of the year. Each session represents hours of professional artistry, styling, and editing—completely at no cost to you. Spots fill fast. If you are serious about building your portfolio, reach out soon to reserve your session.'],
            ['What should I wear?', 'Whatever makes you feel confident and shows your personality. Lingerie, an oversized shirt, a favorite dress, jewelry, heels—we will create multiple looks. Once you book, you will get a detailed What to Wear guide with styling inspiration and photos.'],
            ['Do you work with complete beginners?', 'Yes. Whether you are new to modeling or building your portfolio, boudoir is a perfect starting point. You will leave with gorgeous images and tons of confidence.'],
            ['How do you ensure my safety?', 'Consultation first (so you know me), option to bring a friend, your full control over wardrobe/poses/what gets shot, and professional experience working with models. You are always in control.'],
          ]} />
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-rose-900/10 to-amber-900/10 border-2 border-rose-200">
        <div className="text-center mb-12">
          <Eyebrow>Ready?</Eyebrow>
          <Heading>Book Your Free Consultation</Heading>
          <p className="text-champagne text-lg mt-4 max-w-2xl mx-auto">
            Let us chat about your portfolio goals. No pressure, no commitment—just a conversation about how we can help each other grow.
          </p>
        </div>
        <ContactForm hidePricingCheckbox={true} />
      </Section>
    </main>
  )
}
