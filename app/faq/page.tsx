import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Section, Eyebrow, Heading } from '@/components/Section'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Button } from '@/components/Button'
export const metadata: Metadata = { title: 'Boudoir FAQ', description: 'Answers to common boudoir questions about posing, wardrobe, privacy, pricing, locations, hair and makeup, and payment plans.' }
export default function Page(){return <main><Hero eyebrow="FAQ" title="Everything You Are Wondering Is Normal" subtitle="Most women have questions before they book. Here are the answers that help make the experience feel safer, clearer, and easier to say yes to."/><Section><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div><Eyebrow>Questions</Eyebrow><Heading>Still nervous? Start here.</Heading><p className="mt-5 text-ivory/65">A private consultation is also available if you would rather talk through your questions directly.</p><div className="mt-7"><Button href="/contact">Send a Private Message</Button></div></div><FAQAccordion/></div></Section></main>}
