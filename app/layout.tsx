import type { Metadata } from 'next'
import Script from 'next/script'
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
      <Script
        id="meta-pixel-base"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1901362650548822');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1901362650548822&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
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
