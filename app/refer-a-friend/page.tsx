import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { Card, Timeline } from '@/components/Cards'
import { Button } from '@/components/Button'

export const metadata: Metadata = {
  title: 'Refer a Friend | Second Skin Boudoir',
  description: 'Share the Second Skin Boudoir experience with friends. You both earn $250 in credits toward albums, prints, and digital images.'
}

const howItWorks = [
  { title: 'Share Her Contact', body: 'Tell us about your friend or send her our way. Let us know you made the referral.' },
  { title: 'She Books Her Session', body: 'Your friend schedules her boudoir experience. She enjoys the full journey from consultation through final selection.' },
  { title: 'She Completes Her Session', body: 'After her shoot and sales session, she receives her $250 credit toward her order.' },
  { title: 'You Receive Your Credit', body: 'You get $250 in credits toward your next purchase. Unlimited referrals mean unlimited credits.' },
]

const whatYouGet = [
  { title: '$250 Credit', body: 'Use your credit toward albums, folio boxes, digital image collections, or wall art from your session.' },
  { title: 'Works on Any Purchase', body: 'Whether your friend books an Essential session or a full Signature collection, the credit applies immediately.' },
  { title: 'Unlimited Referrals', body: 'There\'s no limit. Refer as many friends as you want and keep earning credits for life.' },
]

const faqs = [
  {
    question: 'Can I refer multiple people?',
    answer: 'Absolutely. You can refer as many friends as you want, and you\'ll earn $250 in credits for each one who completes her session.'
  },
  {
    question: 'When do I receive my credit?',
    answer: 'Your credit appears in your account after your friend completes her session and chooses her products. You can use it immediately on a future booking or additional prints.'
  },
  {
    question: 'Can I combine the referral credit with other offers?',
    answer: 'Yes. Your referral credit stacks with payment plans and other promotions.'
  },
  {
    question: 'What if my friend decides not to book?',
    answer: 'That\'s totally fine. The referral credit only applies after she completes a session. No pressure, no strings attached.'
  },
  {
    question: 'Can I refer someone who\'s already a client?',
    answer: 'If they\'ve already booked with us, the referral program applies to their next session. It\'s our way of saying thank you for spreading the love.'
  },
]

export default function Page() {
  return (
    <main>
      <Hero
        eyebrow="Referral Program"
        title="Share the Love"
        subtitle="You loved your experience. Help a friend feel empowered too—and both of you earn $250 in credits."
      />

      <Section>
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <Heading>Four simple steps.</Heading>
        </div>
        <div className="mt-12">
          <Timeline items={howItWorks} />
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>What you get</Eyebrow>
        <div className="grid gap-5 md:grid-cols-3">
          {whatYouGet.map((item) => (
            <Card key={item.title} title={item.title}>
              {item.body}
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-2xl">
          <Eyebrow>Ready to refer</Eyebrow>
          <Heading>It's easy to share the love.</Heading>
          <div className="prose-luxury text-lg mt-6 space-y-4">
            <p>Share Second Skin Boudoir with the women in your life. Tell them about your experience, send them this link, or forward their contact information to us directly.</p>
            <p>Make sure to let us know you made the referral so we can track everything properly and get your credit applied after she completes her session.</p>
          </div>
          <div className="mt-8 space-y-4">
            <Button href="/contact">Refer a Friend (Contact Us)</Button>
            <p className="text-sm text-ivory/60">
              Or email hello@secondskinboudoir.com with your friend's name and let us know you made the referral.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-smoke">
        <Eyebrow>Questions</Eyebrow>
        <Heading>Everything you need to know.</Heading>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-ivory/10 bg-charcoal p-6">
              <h3 className="font-serif text-lg text-ivory">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-ivory/68">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
