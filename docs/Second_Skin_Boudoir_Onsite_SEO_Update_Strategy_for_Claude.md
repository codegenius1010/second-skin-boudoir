# Second Skin Boudoir Onsite SEO Update Strategy for Claude
Prepared for updating https://secondskinboudoir.com in VS Code with Claude assistance. This plan focuses on onsite SEO, local landing pages, internal linking, technical SEO, structured data, and page-level optimization.

## Executive Summary
The site already has a strong luxury boudoir brand direction, clear consultation CTA, local positioning, investment language, and trust-building content. The SEO opportunity is to make the site less like a small brochure and more like a structured local service authority for Destin, 30A, Santa Rosa Beach, bridal boudoir, pricing, portfolio, and what-to-wear searches.

## Claude Implementation Prompt
```text
You are helping update a Next.js App Router website for Second Skin Boudoir. Implement the onsite SEO strategy in this document. Preserve the luxury editorial brand aesthetic, conversion-focused copy, privacy-first positioning, and consultation CTA. Add or update routes, metadata, internal links, image alt text, schema markup, sitemap/robots, and redirects. Do not keyword-stuff. Each page should read naturally to a prospective boudoir client while clearly targeting the assigned primary keyword. After each change, ensure npm run build passes.
```

## Current Site Observations
- The current homepage uses a strong emotional H1: “Come Home to Your Body,” with local boudoir positioning in the hero copy.
- The site already includes Experience, Collaboration, Investment, FAQ, About, Contact, Destin, 30A, and Bridal pages.
- The Experience page has strong trust content explaining the consultation, guided posing, privacy, payment planning, and reveal process.
- The Investment page explains session fee plus products and states that artwork begins at $995.
- The Contact page clearly states products begin at $995, session fees are separate, and inquiries are private.
- The old /contact-us URL appears to return 404. Add redirects for any legacy paths such as /contact-us, /faqs, and /services.
- Local pages exist but should be expanded into richer 900-1,200 word SEO landing pages with unique local copy and FAQ sections.
- The Collaboration and For Models pages may attract free-session/modeling traffic. Keep them out of primary SEO navigation or consider noindex if they are not core revenue pages.

## Priority Keyword Map
| Page | Primary Keyword | Secondary Keywords |
|---|---|---|
| Homepage | luxury boudoir photography Destin 30A | boudoir photographer, boudoir photoshoot, Destin boudoir photographer, 30A boudoir photographer |
| Destin local page | destin boudoir photographer | destin boudoir photography, boudoir photography Destin FL, luxury boudoir Destin |
| 30A local page | 30a boudoir photographer | 30a boudoir photography, Santa Rosa Beach boudoir, Rosemary Beach boudoir |
| Santa Rosa Beach page | santa rosa beach boudoir photographer | santa rosa beach boudoir photography, boudoir near 30A |
| Bridal page | bridal boudoir photography | bridal boudoir photographer, bridal boudoir shoot, boudoir wedding gift |
| Pricing page | boudoir photography pricing | boudoir photography packages, boudoir session pricing, boudoir collections |
| Portfolio page | boudoir photography gallery | boudoir gallery, boudoir photos, boudoir portraits |
| What to wear guide | boudoir photography what to wear | boudoir shoot what to wear, boudoir outfit ideas, bridal boudoir outfits |

## Page-Level Specs
| URL | H1 | Title Tag | Meta Description | Implementation Notes |
|---|---|---|---|---|
| / | Luxury Boudoir Photography in Destin & 30A | Second Skin Boudoir / Luxury Boudoir Photography in Destin & 30A | Luxury boudoir photography in Destin, 30A, and the Florida Gulf Coast. Private, fully guided sessions designed to help you feel confident, beautiful, and seen. | Keep current emotional hero, but add keyword-supporting section links to Destin, 30A, pricing, bridal, portfolio, and what-to-wear. |
| /destin-boudoir-photographer | Destin Boudoir Photographer | Destin Boudoir Photographer / Luxury Boudoir Photography | Private luxury boudoir photography in Destin, Florida. Fully guided posing, wardrobe support, privacy-first sessions, and elegant album collections. | Expand to 900-1,200 words with Destin-specific copy, session locations, hotel/Airbnb options, FAQ, and internal links. |
| /30a-boudoir-photographer | 30A Boudoir Photographer | 30A Boudoir Photographer / Santa Rosa Beach Boudoir | Luxury boudoir photography near 30A, Santa Rosa Beach, Seaside, Rosemary Beach, and Miramar Beach. Private, tasteful, fully guided sessions. | Mention Santa Rosa Beach, Seaside, WaterColor, Grayton Beach, Blue Mountain Beach, Alys Beach, Rosemary Beach, Inlet Beach, Miramar Beach. |
| /santa-rosa-beach-boudoir-photographer | Santa Rosa Beach Boudoir Photographer | Santa Rosa Beach Boudoir Photographer / Second Skin Boudoir | Private boudoir photography in Santa Rosa Beach and 30A with guided posing, wardrobe support, privacy-first handling, and luxury album options. | New page. Differentiate from 30A page with Santa Rosa-specific location language. |
| /bridal-boudoir | Bridal Boudoir Photography in Destin & 30A | Bridal Boudoir Photography in Destin & 30A / Second Skin Boudoir | Elegant bridal boudoir photography for brides in Destin and 30A. Create a private, intimate wedding gift and a confidence-building experience for yourself. | Keep route or create /bridal-boudoir-destin-30a as canonical. Add wedding timeline, album gifting, veil/outfit ideas, FAQ. |
| /boudoir-pricing | Boudoir Photography Pricing | Boudoir Photography Pricing / Second Skin Boudoir | View Second Skin Boudoir session fees, album collections, digital options, and payment plan details for luxury boudoir sessions in Destin and 30A. | Create SEO-friendly pricing route. 301 /investment to this route or canonicalize clearly. |
| /boudoir-portfolio | Boudoir Photography Gallery | Boudoir Portfolio / Second Skin Boudoir | View tasteful, privacy-first boudoir photography examples including anonymous portraits, bridal boudoir, soft romantic images, and editorial details. | Create stronger portfolio route. Use privacy-safe gallery and optimized filenames/alt text. |
| /what-to-wear-boudoir-session | What to Wear to a Boudoir Session | What to Wear to a Boudoir Session / Second Skin Boudoir | Boudoir outfit ideas for first-time clients, bridal boudoir, robes, bodysuits, sheets, heels, jeans, sweaters, and privacy-friendly wardrobe planning. | Publish SEO version of the guide with CTA to book consultation/download full prep guide. |

## Technical SEO Tasks
- Add generateMetadata or metadata exports for every route with unique title, description, canonical URL, Open Graph title/description, and image.
- Add metadataBase to the root layout so canonical and social URLs resolve correctly.
- Add app/sitemap.ts listing all indexable pages.
- Add app/robots.ts allowing normal crawling and pointing to the sitemap.
- Add 301 redirects in next.config.js for /contact-us -> /contact, /faqs -> /faq, /services -> /experience, and /investment -> /boudoir-pricing if the pricing route becomes canonical.
- Add JSON-LD schema: Organization/Sitewide, LocalBusiness/PhotographyService on home and local pages, FAQPage where FAQs appear, BreadcrumbList on all non-home pages.
- Use Next/Image or optimized images. Rename files descriptively, compress to WebP/AVIF, set sizes, and add contextual alt text.
- Ensure exactly one H1 per page. Use H2/H3 headings in logical order.
- Add internal links from every page to consultation, pricing, experience, FAQ, and relevant location pages.
- Run npm run build and check rendered HTML for metadata, schema, canonical, and headings.

## Internal Linking Rules
- Homepage should link to Destin, 30A, Bridal, Pricing, Experience, Portfolio, and What to Wear pages.
- Every local page should link to Pricing, Experience, FAQ, Portfolio, and Contact.
- Every blog/guide page should link to one money page and one trust page: e.g., What to Wear -> Experience + Contact.
- Use descriptive anchor text: “Destin boudoir photographer,” “boudoir pricing and collections,” “what to wear to a boudoir session,” “private consultation.”
- Avoid repeating the same exact anchor text excessively.

## Image SEO Rules
- Use filenames such as destin-boudoir-photography-silhouette.webp, 30a-bridal-boudoir-detail.webp, second-skin-boudoir-luxury-album.webp.
- Alt text should describe the image and context. Example: “Tasteful anonymous boudoir portrait for a privacy-first Destin boudoir session.”
- Do not stuff alt text with repeated keywords.
- Prefer anonymous/detail images for SEO pages where privacy is important.
- Add width/height or use Next/Image to prevent layout shift.

## Suggested New/Expanded Content Pages
- /santa-rosa-beach-boudoir-photographer
- /fort-walton-beach-boudoir-photographer
- /panama-city-beach-boudoir-photographer
- /miramar-beach-boudoir-photographer
- /boudoir-pricing
- /boudoir-portfolio
- /what-to-wear-boudoir-session
- /boudoir-after-divorce
- /birthday-boudoir-session
- /anniversary-boudoir-session

## Acceptance Criteria
- All target pages have unique metadata, one H1, clear local/service keyword targeting, and consultation CTA.
- Sitemap and robots routes exist and include all indexable pages.
- Legacy URLs redirect and no important internal links point to 404s.
- Schema validates in Google Rich Results Test with no critical errors.
- All important images have descriptive filenames and alt text.
- npm run build passes.
- Google Search Console sitemap submission is ready after deployment.

## Reference Sources
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google title links guidance: https://developers.google.com/search/docs/appearance/title-link
- Google snippets/meta descriptions guidance: https://developers.google.com/search/docs/appearance/snippet
- Google LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Image SEO best practices: https://developers.google.com/search/docs/appearance/google-images