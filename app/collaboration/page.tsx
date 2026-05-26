import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'
import { FAQAccordion } from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: 'Model Collaboration | Second Skin Boudoir',
  description: 'Join us for a free boudoir session in exchange for portfolio photos. No experience needed. Complete creative control over how your photos are shared.'
}

export default function Page() {
  return (
    <main>
      <Hero
        eyebrow="Collaboration"
        title="Build with Us"
        subtitle="Free boudoir session in exchange for portfolio photos. You control how we share your images."
      />
      
      <Section>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <Eyebrow>What we're looking for</Eyebrow>
            <Heading>Models ready to create something beautiful together.</Heading>
          </div>
          <div className="prose-luxury text-lg">
            <p>I'm currently building my portfolio with carefully curated boudoir sessions, and I'm looking for models who are ready to explore their confidence on camera.</p>
            <p>This is a collaboration. You'll receive a complete, private boudoir experience with professional styling and direction. In return, I'll use select photos for my portfolio, website, and Instagram (with full control over what gets shared).</p>
            <p>You receive a complimentary session. No costs, no hidden fees, no pressure to buy prints or products.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>What you get</Eyebrow>
        <div className="grid gap-5 md:grid-cols-3">
          <Card title="Full Experience">Wardrobe styling, professional posing guidance, and a guided 1-hour session in a luxury setting. Completely private.</Card>
          <Card title="Your Photos">10-18 edited digital images from your session. You own them. You decide what happens with them.</Card>
          <Card title="Creative Control">Choose which images can be shared publicly, kept anonymous, or kept completely private. 100% your choice.</Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <Heading>Simple, transparent, collaborative.</Heading>
          </div>
          <div className="prose-luxury text-lg">
            <p><strong>Step 1:</strong> Reach out and tell me a bit about yourself. What are you looking to explore or celebrate?</p>
            <p><strong>Step 2:</strong> We'll have a consultation call where we talk through everything. What to wear, what to expect, how you want your photos shared (or not shared).</p>
            <p><strong>Step 3:</strong> Your session. We'll spend 1 hour creating beautiful, artistic images. You'll be guided through every pose and I'll direct everything for maximum flattery and comfort.</p>
            <p><strong>Step 4:</strong> Your photos. You receive 10-18 edited digital images. Together we'll decide which images can be featured on my social media, website, and portfolio.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-rose-50 to-amber-50 py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-serif text-rose-900 mb-6">Your Privacy Matters</h2>
          <p className="text-lg text-gray-700 mb-4">
            You have complete control over how your images are shared. Here are your options:
          </p>
          <ul className="space-y-3 text-base text-gray-600">
            <li><strong>Public:</strong> Your name and full photos shared on social media and website</li>
            <li><strong>Anonymous:</strong> Your photos shared publicly, but without identifying information</li>
            <li><strong>Private:</strong> Your photos kept completely private, used only for my portfolio references</li>
          </ul>
          <p className="text-base text-gray-600 mt-6">
            Nothing is ever shared without your explicit permission. You decide, session by session, which photos get shared and how.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <Eyebrow>Who we're looking for</Eyebrow>
          <Heading>Any woman ready to feel powerful.</Heading>
          <div className="prose-luxury text-lg mt-6 space-y-4">
            <p>There's no "type." Boudoir is for every body, every age, every confidence level.</p>
            <p>You could be:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>A mom wanting to reclaim your confidence</li>
              <li>Someone exploring a new version of yourself</li>
              <li>A woman ready to see yourself the way others see you</li>
              <li>Anyone curious about boudoir but nervous about trying it</li>
              <li>Someone who wants beautiful art without the price tag</li>
            </ul>
            <p className="mt-4">If you're interested in a free, judgment-free boudoir experience and you're open to letting us create portfolio images together, let's talk.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="max-w-3xl mx-auto text-center">
          <Heading>Ready to create together?</Heading>
          <p className="text-lg text-gray-700 mt-4 mb-8">
            Send me a message on Instagram (@secondskinboudoir), or fill out the form below. Let's explore what's possible.
          </p>
          <Button href="/contact">Get in Touch</Button>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <Eyebrow>Questions?</Eyebrow>
          <Heading>Everything you need to know about collaboration.</Heading>
          <div className="mt-8">
            <FAQAccordion items={[
              ['Is this really free?', 'Yes. You don\'t pay for the session or styling. The only thing we\'re asking for in return is permission to use select photos for portfolio, website, and social media purposes. You have full control over what gets shared.'],
              ['What if I\'m nervous or inexperienced?', 'Perfect. That\'s exactly who this is for. Every pose is guided step by step. I\'ll direct everything from your posture to your expression. By the end of your session, you\'ll feel like a supermodel. The first five minutes might feel awkward, but then it becomes second nature.'],
              ['Will you use all my photos?', 'You\'ll receive 10-18 edited digital images from your session, and together we\'ll decide which ones get featured on my social media, website, and portfolio. Every image you receive is a keeper.'],
              ['Can I stay anonymous?', 'Absolutely. You can choose to have your photos shared anonymously or kept completely private. Many models love seeing themselves represented without being identified. It\'s entirely your choice.'],
              ['When are sessions available?', 'I\'m scheduling portfolio collaboration sessions now through the end of the year. Once we connect, we\'ll find a time that works for both of us. Sessions are 1 hour of photography, plus additional time for styling and preparation.'],
              ['What should I wear?', 'Whatever makes you feel confident. Lingerie, an oversized shirt, your favorite dress, jewelry, heels. We\'ll style you for different looks throughout the session. I\'ll guide you on what works best for each set.'],
            ]}/>
          </div>
        </div>
      </Section>
    </main>
  )
}
