import { clsx } from 'clsx'

export function Card({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return <div className={clsx('rounded-[2rem] border border-ivory/10 bg-ivory/[0.035] p-7 shadow-glow', className)}><h3 className="font-serif text-2xl text-ivory">{title}</h3><div className="mt-4 text-sm leading-7 text-ivory/68">{children}</div></div>
}

export function Timeline({ items }: { items: { title: string; body: string }[] }) {
  return <div className="grid gap-5 md:grid-cols-5">{items.map((item, i) => <div key={item.title} className="rounded-3xl border border-ivory/10 bg-smoke p-6"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-champagne text-sm font-bold text-charcoal">{i + 1}</div><h3 className="font-serif text-xl text-ivory">{item.title}</h3><p className="mt-3 text-sm leading-7 text-ivory/65">{item.body}</p></div>)}</div>
}
