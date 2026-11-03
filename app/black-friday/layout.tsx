import { Cormorant_Garamond, Playfair_Display, Inter } from 'next/font/google'

// Fonts are scoped to this route only (via CSS variables on this wrapper) so the
// rest of the site's typography is unaffected.
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-bf-serif' })
const serifItalic = Playfair_Display({ subsets: ['latin'], style: ['italic'], weight: ['500', '600'], variable: '--font-bf-serif-italic' })
const sans = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-bf-sans' })

export default function BlackFridayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${serif.variable} ${serifItalic.variable} ${sans.variable} font-bf-sans bg-bfBlack`}>
      {children}
    </div>
  )
}
