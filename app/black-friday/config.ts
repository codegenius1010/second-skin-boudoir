// Centralized promotional configuration for the /black-friday campaign.
// Update values here to change copy, discount, dates, or to end the promotion —
// do not hardcode these values in individual components.

export const blackFridayPromo = {
  // Master switch — set to false to immediately show the expired-offer state site-wide.
  active: true,

  // Tracked in the lead form payload and GoHighLevel so this campaign's leads are identifiable.
  promoId: 'early_black_friday_2026',

  eyebrow: 'Second Skin Boudoir',
  headline: 'Your Moment. Your Confidence. Your Story.',
  offerName: 'Early Black Friday',
  discountPercent: 50,
  packageScope: 'All Boudoir Packages',
  supportingCopy: 'An unforgettable luxury boudoir photography experience, created to celebrate you.',

  // ISO date strings. Leave endDate as null until a firm end date is confirmed —
  // the page will not display a date that hasn't been set.
  startDate: '2026-11-02',
  endDate: null as string | null,

  // Add the finalized official terms (deposit, exclusions, eligibility, booking requirements)
  // here once confirmed. Left null intentionally — do not invent these details.
  terms: null as string | null,

  bookingUrl: '/book-consultation',
  privacyPolicyUrl: '/privacy-policy',
} as const

export function isPromoActive(promo: { active: boolean; endDate: string | null } = blackFridayPromo) {
  if (!promo.active) return false
  if (promo.endDate && new Date() > new Date(promo.endDate)) return false
  return true
}

export function offerHeadline(promo: { discountPercent: number; packageScope: string } = blackFridayPromo) {
  return `${promo.discountPercent}% Off ${promo.packageScope}`
}
