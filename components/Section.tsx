import { clsx } from 'clsx'
export function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) { return <section id={id} className={clsx('px-5 py-20 lg:px-8 lg:py-28', className)}><div className="mx-auto max-w-7xl">{children}</div></section> }
export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-champagne">{children}</p> }
export function Heading({ children, className = '' }: { children: React.ReactNode; className?: string }) { return <h2 className={clsx('font-serif text-4xl leading-tight text-ivory md:text-5xl', className)}>{children}</h2> }
