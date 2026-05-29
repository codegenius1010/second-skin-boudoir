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
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/logo.png`,
    description: 'Luxury boudoir photography in Destin, 30A, Santa Rosa Beach, and the Florida Gulf Coast. Private, guided, fully-photographed sessions.',
    telephone: site.phone,
    email: site.email,
    areaServed: site.areas.map(area => ({ '@type': 'City', name: area, addressRegion: 'FL', addressCountry: 'US' })),
    priceRange: '$$$',
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'PhotographyService',
    name: site.name,
    image: `${site.url}/images/logo.png`,
    description: 'Luxury boudoir photography services',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Destin',
      addressRegion: 'FL',
      postalCode: '32541',
      addressCountry: 'US',
    },
    areaServed: site.areas,
    telephone: site.phone,
    email: site.email,
    url: site.url,
    priceRange: '$$$',
    serviceType: ['Boudoir Photography', 'Portrait Photography', 'Bridal Photography'],
  }

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
