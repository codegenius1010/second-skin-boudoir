'use client'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '@/lib/site'

export function FAQAccordion({ items = faqs }: { items?: string[][] }) {
  const [open, setOpen] = useState<number | null>(0)
  return <div className="divide-y divide-ivory/10 rounded-[2rem] border border-ivory/10 bg-smoke">{items.map(([q, a], i) => <div key={q}>
    <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"><span className="font-serif text-xl text-ivory">{q}</span>{open === i ? <Minus className="text-champagne" /> : <Plus className="text-champagne" />}</button>
    {open === i && <p className="px-6 pb-6 text-sm leading-7 text-ivory/68">{a}</p>}
  </div>)}</div>
}
