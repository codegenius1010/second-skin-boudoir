import { Button } from './Button'

export function Hero({ eyebrow, title, subtitle, primary = 'Book Your Private Consultation', primaryHref = '/contact', secondary, image }: { eyebrow?: string; title: string; subtitle: string; primary?: string; primaryHref?: string; secondary?: { label: string; href: string }; image?: string }) {
  return <section className="relative flex min-h-[86vh] items-center overflow-hidden px-5 pt-28 lg:px-8">
    <div className="absolute inset-0 luxury-gradient" />
    {image && <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${image})` }} />}
    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/30" />
    <div className="relative z-10 mx-auto max-w-7xl py-20">
      {eyebrow && <p className="mb-6 text-sm font-semibold uppercase tracking-[0.34em] text-champagne">{eyebrow}</p>}
      <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] text-ivory md:text-7xl lg:text-8xl">{title}</h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-ivory/78 md:text-xl">{subtitle}</p>
      <div className="mt-9 flex flex-col gap-4 sm:flex-row"><Button href={primaryHref}>{primary}</Button>{secondary && <Button href={secondary.href} variant="secondary">{secondary.label}</Button>}</div>
      <p className="mt-6 text-sm uppercase tracking-[0.22em] text-ivory/45">Private. Guided. Tasteful. At your pace.</p>
    </div>
  </section>
}
