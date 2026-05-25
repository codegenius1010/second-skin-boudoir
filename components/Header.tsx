'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { nav, site } from '@/lib/site'
import { Button } from './Button'

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ivory/10 bg-charcoal/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center h-10">
          <Image src="/images/logo.png" alt="Second Skin Boudoir" width={120} height={40} className="h-full w-auto" priority />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => <Link key={item.href} href={item.href} className="text-sm text-ivory/75 hover:text-champagne">{item.label}</Link>)}
          <Button href="/contact" className="py-2.5">Book Now</Button>
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="border-t border-ivory/10 bg-charcoal px-5 py-6 lg:hidden">
        <div className="flex flex-col gap-5">
          {nav.map((item) => <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className="text-ivory/80">{item.label}</Link>)}
          <Button href="/contact">Book Your Consultation</Button>
        </div>
      </div>}
    </header>
  )
}
