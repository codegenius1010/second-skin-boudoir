import Link from 'next/link'
import { site } from '@/lib/site'
import { Button } from './Button'

export function Footer() {
  return <footer className="border-t border-ivory/10 bg-smoke">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-5 lg:px-8">
      <div className="md:col-span-2">
        <h2 className="font-serif text-3xl text-ivory">{site.name}</h2>
        <p className="mt-4 max-w-xl text-ivory/65">Luxury boudoir photography for women across Destin, 30A, Santa Rosa Beach, Fort Walton Beach, Panama City Beach, and the Florida Gulf Coast.</p>
        <div className="mt-7"><Button href="/contact">Book a Private Consultation</Button></div>
      </div>
      <div><h3 className="text-sm uppercase tracking-[0.25em] text-champagne">Explore</h3><div className="mt-4 flex flex-col gap-3 text-ivory/70"><Link href="/experience">Experience</Link><Link href="/investment">Investment</Link><Link href="/faq">FAQ</Link></div></div>
      <div><h3 className="text-sm uppercase tracking-[0.25em] text-champagne">Local</h3><div className="mt-4 flex flex-col gap-3 text-ivory/70"><Link href="/destin-boudoir-photographer">Destin Boudoir</Link><Link href="/30a-boudoir-photographer">30A Boudoir</Link><Link href="/bridal-boudoir">Bridal Boudoir</Link><Link href="/contact">Contact</Link></div><p className="mt-5 text-ivory/60">Call/text: {site.phone}<br />{site.email}</p></div>
      <div><h3 className="text-sm uppercase tracking-[0.25em] text-champagne">More</h3><div className="mt-4 flex flex-col gap-3 text-ivory/70"><Link href="/collaboration">Collaboration</Link><Link href="/portfolio-models">For Models</Link><Link href="/refer-a-friend">Refer a Friend</Link><Link href="/about">About</Link></div></div>
    </div>
    <div className="border-t border-ivory/10 px-5 py-6 text-center text-sm text-ivory/45">© 2026 Second Skin Boudoir. All rights reserved.</div>
  </footer>
}
