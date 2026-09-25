import { Button } from './Button'

export function Hero({ eyebrow, title, subtitle, primary = 'Book Your Private Consultation', primaryHref = '/contact', secondary, image, trust }: { eyebrow?: string; title: string; subtitle: string; primary?: string; primaryHref?: string; secondary?: { label: string; href: string }; image?: string; trust?: { label: string; href: string } }) {
  return <section className="relative flex min-h-[86vh] items-center overflow-hidden px-5 pt-28 lg:px-8">
    <div className="absolute inset-0 luxury-gradient" />
    {image && <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${image})` }} />}
    <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-charcoal/20" />
    <div className="relative z-10 mx-auto max-w-7xl py-20">
      {eyebrow && <p className="mb-6 text-sm font-semibold uppercase tracking-[0.34em] text-champagne">{eyebrow}</p>}
      <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] text-ivory md:text-7xl lg:text-8xl">{title}</h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-ivory/78 md:text-xl">{subtitle}</p>
      {trust && <a href={trust.href} className="mt-6 inline-flex items-center gap-3 rounded-full border border-champagne/30 bg-charcoal/40 px-5 py-2.5 text-sm text-ivory/85 backdrop-blur-sm transition hover:border-champagne/60 hover:text-ivory">
        <span className="text-champagne tracking-tight">★★★★★</span>
        <span>{trust.label}</span>
      </a>}
      <div className="mt-9 flex flex-col gap-4 sm:flex-row"><Button href={primaryHref}>{primary}</Button>{secondary && <Button href={secondary.href} variant="secondary">{secondary.label}</Button>}</div>
      <p className="mt-6 text-sm uppercase tracking-[0.22em] text-ivory/45">Private. Guided. Tasteful. At your pace.</p>
    </div>
  </section>
}
