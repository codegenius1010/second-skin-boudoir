import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'About Second Skin Boudoir | Meet Your Photographer',
  description: 'Meet Matthew, a privacy-first luxury boudoir photographer in Destin and 30A. Learn about the philosophy behind safe, guided, fully-directed sessions for women.',
}

export default function Page() {
  return (
    <main>
      <Hero
        eyebrow="About"
        title="Meet Matthew"
        subtitle="I'm a calm, respectful, privacy-first boudoir photographer creating luxury experiences for women across the Gulf Coast."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <Eyebrow>Why Second Skin exists</Eyebrow>
            <Heading>A private space to feel confident, beautiful, sensual, and fully yourself.</Heading>
          </div>
          <div className="prose-luxury text-lg">
            <p>I created Second Skin Boudoir to give women a guided, respectful, luxury experience where they can feel safe being seen.</p>
            <p>My approach is calm, professional, privacy-first, and highly directed. Every session is built around communication, consent, flattering light, natural posing, and emotional safety.</p>
            <p>Boudoir can feel vulnerable, especially the first time. That's why every session begins with a conversation and every pose is guided step by step.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-rose-50 to-amber-50 py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <blockquote className="text-3xl lg:text-4xl font-serif text-rose-900 mb-8 leading-relaxed">
            Second Skin Boudoir is where your confidence slips on like a second skin. Natural, powerful, completely you. No pretending, no performing. Just art, attitude, and a version of you that feels like coming home to your own body.
          </blockquote>
          <p className="text-lg text-gray-700 mb-6">
            This is not just about photos. It's about a moment where the way you feel inside finally matches what you see on the outside.
          </p>
          <p className="text-base text-gray-600">
            I believe every body is a work of art and every person deserves to feel at home in their own skin. Second Skin Boudoir exists to honor that moment when you stop hiding and start owning your story.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <Eyebrow>My philosophy</Eyebrow>
            <Heading>Calm, guided, deeply respectful.</Heading>
          </div>
          <div className="prose-luxury text-lg">
            <p>My entire approach is built on one core belief: every woman deserves to feel powerful, beautiful, and safe.</p>
            <p>Before your session, we'll have a consultation so you know exactly what to expect. Learn more about <a href="/experience" className="text-champagne hover:text-ivory transition-colors">our fully guided experience</a>. During your session, every pose is guided step by step. You don't need any modeling experience. I'll direct everything from your posture to your expression to your fingertips.</p>
            <p>The goal is simple: to create images that feel like the way someone who adores you sees you, through a flattering, romantic, and deeply respectful lens. See our <a href="/boudoir-portfolio" className="text-champagne hover:text-ivory transition-colors">portfolio gallery</a> for examples.</p>
            <p>Nothing is shared publicly without your written permission. Your privacy, your comfort, and your experience matter most.</p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <Eyebrow>About me</Eyebrow>
          <Heading>Why I do this work.</Heading>
          <div className="prose-luxury text-lg mt-6 space-y-4">
            <p>I became a boudoir photographer because I noticed something that changed how I see women: the disconnect between how women see themselves and how the world actually sees them.</p>
            <p>I watch women walk into my studio convinced they're not beautiful enough, not confident enough, not the "type" for boudoir. Then they see their photos. And I watch their entire relationship with their body change in real time.</p>
            <p>That moment when a woman recognizes her own power for the first time, that's what drives me. That's why I've built everything around creating an experience where you feel completely safe being seen. Where every detail, every pose, every moment is designed to help you step into a version of yourself you might have forgotten existed.</p>
            <p>This work isn't about creating perfect photos. It's about creating a moment where you finally believe what everyone else already knows: that you're worthy of celebration, exactly as you are right now.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-rose-50 to-amber-50 py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-serif text-rose-900 mb-6">You don't need permission. You need to say yes to yourself.</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>Most women book their session feeling nervous. They worry they'll feel awkward. They tell themselves they'll do it "someday."</p>
            <p>Then almost every single one says the same thing: "I wish I would have done this sooner."</p>
            <p><strong>You don't need to lose weight first.</strong> Your body is not a problem to solve before you deserve to see yourself this way.</p>
            <p><strong>You don't need to feel more confident.</strong> Confidence doesn't come from thinking you're ready. It comes from deciding you're worth it anyway.</p>
            <p><strong>You don't need to figure it out first.</strong> That's my job. You just need to show up and let yourself be celebrated.</p>
            <p className="pt-4">The women who end up booking aren't fearless. They're the ones who decided they were worth the investment in themselves. They're the ones who stopped waiting for the perfect moment and created it instead.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <div className="max-w-2xl">
          <Eyebrow>Every client starts here</Eyebrow>
          <Heading>A private consultation, no pressure.</Heading>
          <div className="prose-luxury text-lg mt-6 space-y-4">
            <p>My website is brand-first and privacy-focused. But once you inquire, trust matters more than mystery.</p>
            <p>That's why I personally speak with every client before booking. We'll talk through your vision, what makes you nervous, wardrobe ideas, privacy, pricing, and what to expect step by step. You'll get to meet me, ask questions, and decide if this feels right for you.</p>
            <p>You can choose a phone call, Zoom video call, or text first. Most clients prefer Zoom because it lets us meet face-to-face, which builds confidence.</p>
            <p><strong>This consultation is free, private, and pressure-free.</strong> You do not need to have everything figured out. The goal is simply to see if the experience feels right for you.</p>
          </div>
          <div className="mt-8">
            <Button href="/contact">Request Private Consultation</Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <Eyebrow>Loved your experience?</Eyebrow>
          <Heading>Share the love with your friends.</Heading>
          <p className="prose-luxury text-lg mt-6 mb-8">
            If your boudoir experience with me was transformative, help a friend discover that same empowerment. Our referral program rewards you both with $250 in credits toward future purchases.
          </p>
          <Button href="/refer-a-friend">Learn About Our Referral Program</Button>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Core values</Eyebrow>
        <div className="grid gap-5 md:grid-cols-4">
          <Card title="Privacy">Images are never shared without permission.</Card>
          <Card title="Respect">Clear communication and consent guide the experience.</Card>
          <Card title="Taste">Sensual, elegant, editorial, never cheap.</Card>
          <Card title="Direction">You are guided through every detail.</Card>
        </div>
        <div className="mt-10">
          <Button href="/contact">Request Private Consultation</Button>
        </div>
      </Section>
    </main>
  )
}
