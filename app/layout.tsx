import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Second Skin Boudoir | Luxury Boudoir Photography in Destin & 30A', template: '%s | Second Skin Boudoir' },
  description: 'Luxury boudoir photography in Destin, 30A, Santa Rosa Beach, Miramar Beach, Fort Walton Beach, Panama City Beach, and the Florida Gulf Coast.',
  openGraph: { title: 'Second Skin Boudoir', description: 'Private, guided, luxury boudoir photography across Destin and 30A.', url: site.url, siteName: 'Second Skin Boudoir', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = { '@context': 'https://schema.org', '@type': 'PhotographyBusiness', name: site.name, url: site.url, telephone: site.phone, email: site.email, address: { '@type': 'PostalAddress', addressLocality: 'Destin', addressRegion: 'FL', addressCountry: 'US' }, areaServed: site.areas, priceRange: '$$$' }
  return <html lang="en"><body className="font-sans antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><Header />{children}<Footer /></body></html>
}
