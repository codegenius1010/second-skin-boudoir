# PHASE 10 IMPLEMENTATION PLAN
## Actionable Week-by-Week Execution Guide
**Start Date**: May 28, 2026  
**Tier 1 Duration**: Weeks 1-4  
**Status**: EXECUTION PHASE

---

## OVERVIEW: 12-MONTH IMPLEMENTATION ROADMAP

### Tier 1: Foundation (Weeks 1-4)
**Focus**: Authority signals + analytics infrastructure  
**Goal**: Establish baseline for future growth  
**Expected ROI**: Medium-term (Month 3+)

1. ✅ LocalBusiness schema implementation
2. ✅ Analytics infrastructure (GA4 + GSC)
3. ✅ Review collection system
4. ✅ Rank tracking tool setup
5. ✅ Search Console optimization

### Tier 2: Content Pillar (Weeks 5-12)
**Focus**: Content creation + video strategy  
**Goal**: Establish thought leadership  
**Expected ROI**: 60-90 days

1. Blog content strategy (12 posts planned)
2. YouTube channel + video schema
3. FAQPage schema implementation
4. Email marketing sequences

### Tier 3: Authority Building (Months 4-6)
**Focus**: Backlinks + partnerships  
**Goal**: Domain authority growth  
**Expected ROI**: 90-180 days

1. Guest post outreach (15 posts)
2. Partnership development (10-15 partnerships)
3. Geographic expansion (3 new pages)
4. Service variation pages (4 pages)

---

## TIER 1: WEEKS 1-4 IMPLEMENTATION PLAN

### WEEK 1: IMMEDIATE SETUP & VERIFICATION

#### Task 1.1: Google Search Console Setup
**Time**: 30 minutes  
**Steps**:
1. Go to search.google.com/search-console
2. Add property: secondskinboudoir.com
3. Verify ownership (Domain name verification recommended)
4. Submit sitemap: https://secondskinboudoir.com/sitemap.xml
5. Check Coverage report (should show 28 pages indexed)

**Expected Result**: All 28 pages indexed in GSC

**Verification**:
- [ ] Domain verified
- [ ] Sitemap submitted
- [ ] 28 pages showing in coverage
- [ ] No errors in status

#### Task 1.2: Google Analytics 4 Setup
**Time**: 45 minutes  
**Steps**:
1. Go to analytics.google.com
2. Create new GA4 property for secondskinboudoir.com
3. Get measurement ID (starts with G-)
4. Add GA4 tracking code to Next.js app

**Code to Add** (app/layout.tsx):
```typescript
import Script from 'next/script';

// In <head> section of Root Layout:
<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
/>
<Script
  id="google-analytics"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

**Verification**:
- [ ] GA4 tracking code installed
- [ ] Data flowing in GA4 (check Real-time report)
- [ ] Pages being tracked

#### Task 1.3: Create GA4 Conversion Events
**Time**: 1 hour  
**Steps**:

1. **Form Submission Event**
   - Event name: "form_submit"
   - Trigger: When form successfully submits
   - Value: Track by page location

2. **Calendly Click Event**
   - Event name: "calendly_click"
   - Trigger: When Calendly link clicked
   - Value: Track engagement

3. **Phone Click Event**
   - Event name: "phone_click"
   - Trigger: When phone number clicked
   - Value: Track by source

4. **Email Click Event**
   - Event name: "email_click"
   - Trigger: When email link clicked
   - Value: Track by page

**Implementation** (components/ContactForm.tsx - add to submit handler):
```typescript
const handleSuccess = () => {
  // Existing code...
  
  // GA4 Event
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'form_submit', {
      'form_location': window.location.pathname,
      'timestamp': new Date().toISOString(),
    });
  }
  
  // Rest of handler...
};
```

**Verification**:
- [ ] Events showing in GA4 Realtime
- [ ] Events trigger on form submission
- [ ] Events tracked by source

---

### WEEK 2: SCHEMA MARKUP EXPANSION

#### Task 2.1: Implement LocalBusiness Schema
**Time**: 1.5 hours  
**File**: app/layout.tsx (add to root schema section)

**Implementation**:
```typescript
// Add to existing schema markup in layout.tsx
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Second Skin Boudoir",
  "image": "https://secondskinboudoir.com/images/second-skin-boudoir-logo.png",
  "description": "Luxury boudoir photography studio in Destin, Florida",
  "telephone": "850-608-0844",
  "email": "hello@secondskinboudoir.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Destin",
    "addressRegion": "FL",
    "postalCode": "32541",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "30.3943",
    "longitude": "-86.4891"
  },
  "url": "https://secondskinboudoir.com",
  "priceRange": "$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "17:00"
  }
};
```

**Add to layout.tsx**:
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
/>
```

**Verification**:
- [ ] Schema shows in Google Structured Data Testing Tool
- [ ] No errors in schema validation
- [ ] Business info correctly displayed

#### Task 2.2: Set Up Review Schema Structure
**Time**: 1 hour  
**Note**: Reviews will be collected and added as they come in

**Preparation** (create placeholder):
```typescript
// In lib/site.ts - add reviews array
export const reviews = [
  // Reviews will be added here as they're collected
  // Format:
  // {
  //   author: "Client Name",
  //   rating: 5,
  //   text: "Review text here",
  //   date: "2024-06-15"
  // }
];

// Function to generate aggregate rating schema
export function getAggregateRatingSchema(reviews: Review[]) {
  if (reviews.length === 0) return null;
  
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "Second Skin Boudoir"
    },
    "ratingValue": avgRating,
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": reviews.length.toString()
  };
}
```

**Verification**:
- [ ] Function created and tested
- [ ] Ready to add reviews

---

### WEEK 3: GOOGLE BUSINESS PROFILE OPTIMIZATION

#### Task 3.1: Complete Google Business Profile
**Time**: 2 hours  
**Steps**:

1. Go to google.com/business
2. Create/Claim business profile for Second Skin Boudoir
3. Fill in complete information:
   - ✅ Business name: Second Skin Boudoir
   - ✅ Phone: 850-608-0844
   - ✅ Website: secondskinboudoir.com
   - ✅ Address: (add actual studio address)
   - ✅ Hours: Mon-Sat 9 AM - 5 PM
   - ✅ Description: Luxury boudoir photography in Destin and 30A

4. Add 10+ business photos:
   - Logo (1)
   - Studio interior (2-3)
   - Portfolio samples (3-4)
   - Team photo (1)
   - Service examples (2-3)

5. Add business category: "Photography Studio"

6. Add service areas:
   - Destin, FL
   - 30A, FL
   - Santa Rosa Beach, FL
   - Fort Walton Beach, FL
   - Panama City Beach, FL

**Verification**:
- [ ] Profile complete
- [ ] 10+ photos uploaded
- [ ] Service areas listed
- [ ] Business hours correct
- [ ] Profile appears in Google Maps

#### Task 3.2: Set Up Review Collection Process
**Time**: 1.5 hours  
**Goal**: Get first 20-30 reviews within 3 months

**Setup**:
1. Create "Leave a Review" link template:
   - Google: google.com/maps/place/[business-ID]
   - Yelp: yelp.com/biz/second-skin-boudoir-destin
   - WeddingWire: weddingwire.com

2. Create follow-up email sequence:
   ```
   Email 1 (24 hours post-session): Delivery timeline
   Email 2 (3 days post-session): "Share Your Experience"
     - Link to Google Review
     - Link to Yelp
     - Link to WeddingWire
   Email 3 (1 week post-session): Referral offer
   ```

3. Create in-studio signage:
   - QR code to Google review
   - "Leave a review" card

**Verification**:
- [ ] Review links created
- [ ] Email sequences drafted
- [ ] Process documented

---

### WEEK 4: RANK TRACKING & ANALYTICS DASHBOARD

#### Task 4.1: Set Up Rank Tracking Tool
**Time**: 1 hour  
**Recommended Tools**: SEMrush (free tier), Ahrefs (free tier), or Moz

**30 Target Keywords to Track**:
```
TIER 1 (High Priority - Month 1-3):
1. "boudoir photography destin"
2. "30a boudoir photographer"
3. "destin boudoir photographer"
4. "luxury boudoir photography florida"
5. "what to wear boudoir session"
6. "boudoir pricing"
7. "bridal boudoir photography"
8. "fort walton beach boudoir"
9. "santa rosa beach boudoir"
10. "panama city beach boudoir"

TIER 2 (Medium Priority - Month 3-6):
11. "boudoir photography near me"
12. "luxury boudoir"
13. "bridal boudoir"
14. "boudoir photo session"
15. "destin photographer"
16. "boudoir outfit ideas"
17. "what to wear to boudoir"
18. "boudoir experience"
19. "investment boudoir"
20. "destin photographer luxury"

TIER 3 (Long-tail - Month 6-12):
21-30. Various long-tail variations
```

**Setup Steps**:
1. Create SEMrush/Ahrefs account
2. Add secondskinboudoir.com as tracked domain
3. Add 30 target keywords
4. Set daily/weekly tracking
5. Create alerts for ranking changes

**Verification**:
- [ ] All 30 keywords added
- [ ] Daily tracking active
- [ ] Reports configured

#### Task 4.2: Create Analytics Dashboard
**Time**: 2 hours  
**Tools**: Google Sheets or Looker Studio

**Dashboard Metrics** (Track Weekly):
```
ORGANIC SEARCH:
- Organic traffic (vs. baseline)
- Form submissions (count + source)
- Average session duration
- Bounce rate by page

TOP PAGES:
- Homepage
- /experience
- /investment
- /contact
- Top blog post

CONVERSIONS:
- Form submissions per week
- Calendly clicks
- Phone clicks
- Email clicks

SEARCH CONSOLE:
- Impressions (total + top keywords)
- Click-through rate (CTR)
- Average position (1-100)
- Coverage status
```

**Setup** (Google Sheets Template):
```
Create three sheets:
1. Weekly Summary
   - Date
   - Organic traffic
   - Form submissions
   - Calendly clicks
   - Notes

2. Keyword Rankings
   - Keyword
   - Current position
   - Previous position
   - Target
   - Status (↑ improved, ↓ dropped, = stable)

3. Top Pages
   - Page URL
   - Traffic
   - Users
   - Avg. Duration
   - Bounce rate
```

**Verification**:
- [ ] Dashboard created
- [ ] Data flowing in
- [ ] Reports automated (if possible)
- [ ] Weekly review scheduled

---

## TIER 1 COMPLETION CHECKLIST

**Week 1: Setup & Verification**
- [ ] Google Search Console verified and sitemap submitted
- [ ] Google Analytics 4 installed and tracking
- [ ] 4 conversion events created
- [ ] Data flowing in GA4 real-time

**Week 2: Schema Expansion**
- [ ] LocalBusiness schema added to layout
- [ ] Schema validates without errors
- [ ] Review collection structure created

**Week 3: Google Business**
- [ ] Google Business Profile complete
- [ ] 10+ business photos uploaded
- [ ] Service areas listed
- [ ] Review collection process set up

**Week 4: Tracking & Dashboards**
- [ ] Rank tracking tool active for 30 keywords
- [ ] Analytics dashboard created
- [ ] Weekly review scheduled
- [ ] Baseline metrics recorded

**All Tier 1 Tasks**: ✅ Expected completion: End of Week 4

---

## TIER 1 EXPECTED OUTCOMES

### Immediate (Week 4)
- ✅ Complete analytics visibility
- ✅ Baseline metrics established
- ✅ 28 pages confirmed indexed in GSC
- ✅ Review collection process active

### Short-term (Weeks 4-8)
- ✅ First reviews appearing (3-5 expected)
- ✅ Organic traffic baseline established
- ✅ Form submissions tracked
- ✅ Keyword rankings visible

### Medium-term (Weeks 8-12)
- ✅ 10-15 reviews collected
- ✅ Organic traffic increase measurable (+15-25%)
- ✅ First Page 1 keyword ranking (likely "30A boudoir")
- ✅ Form submissions increasing (+5-15%)

---

## TIER 2: WEEKS 5-12 PREPARATION

### Blog Strategy (Start Planning Week 5)
**Timeline**: Post 1 in Week 6

**Blog Post 1: "Boudoir Photography Myths: Debunked"**
- Target keywords: "boudoir myths", "nervousness", "body image"
- Word count: 1200-1500 words
- Internal links: 3-5 (to experience, portfolio, investment)
- Expected ranking: 2-3 keywords on page 1 (Month 3-6)

**Blog Post 2: "Complete Guide to Preparing for Your Session"**
- Target keywords: "prepare for boudoir", "what to bring", "tips"
- Word count: 1500-1800 words
- Internal links: Link to /what-to-wear-boudoir-session
- Link to: experience, contact
- Expected ranking: 3-5 keywords

**Blog Post 3: "Investment in Yourself: Why Boudoir is Worth It"**
- Target keywords: "boudoir investment", "ROI", "self-care"
- Word count: 1200-1400 words
- Internal links: investment, experience
- Expected ranking: 2-3 keywords

**Publish Schedule**:
- Post 1: End of Week 6 (early June)
- Post 2: Week 8 (mid June)
- Post 3: Week 10 (late June)

### Video Strategy (Start Planning Week 6)
**Goal**: Create 4 videos with schema markup

**Video 1: "Portfolio Walkthrough" (5 minutes)**
- Showcase gallery collection
- Publish to YouTube
- Add VideoObject schema

**Video 2: "What to Expect" (4 minutes)**
- Process overview
- Build confidence
- Add VideoObject schema

**Video 3: "Client Testimonials" (7 minutes)**
- Real client feedback
- Build social proof
- Add VideoObject schema

**Video 4: "Styling Tips" (6 minutes)**
- Wardrobe advice
- Educational content
- Add VideoObject schema

**Timeline**: 
- Planning: Week 6-7
- Production: Week 8-9
- Publishing: Week 10-11

---

## NEXT DOCUMENT: TIER 2 DETAILED GUIDE

Ready to create detailed guides for:
- Blog content strategy (complete outlines for all 12 posts)
- Video production guide
- Email marketing sequences
- FAQPage schema implementation

---

## WEEK-BY-WEEK MILESTONE TRACKING

**Week 1 Milestone**: ✅ Analytics infrastructure complete
**Week 2 Milestone**: ✅ LocalBusiness schema + review structure
**Week 3 Milestone**: ✅ Google Business Profile optimized + reviews system active
**Week 4 Milestone**: ✅ Rank tracking + dashboards ready

**Month 2 Milestone**: Blog posts 1-2 published, videos in production
**Month 3 Milestone**: Blog posts complete, videos published, first rankings appearing
**Quarter 2 Milestone**: 15-20 reviews, visible organic growth, content library established

---

## RESOURCE REQUIREMENTS (Tier 1)

| Task | Time | Cost | Responsibility |
|------|------|------|---|
| GSC + GA4 Setup | 1.5 hrs | $0 | Developer |
| Conversion Events | 1 hr | $0 | Developer |
| LocalBusiness Schema | 1.5 hrs | $0 | Developer |
| Google Business Profile | 2 hrs | $0 | Marketing/Owner |
| Review Collection Setup | 1.5 hrs | $0 | Marketing |
| Rank Tracking | 1 hr | $10-50/mo (free tier available) | Marketing/SEO |
| Dashboard Creation | 2 hrs | $0 | Analytics/Marketing |
| **TOTAL TIER 1** | **10 hours** | **$10-50/month** | **Shared** |

---

## SUCCESS METRICS (End of Tier 1 - Week 4)

✅ All setup complete  
✅ Data flowing into all systems  
✅ Baseline metrics recorded  
✅ Review collection active  
✅ Ready for Tier 2 content launch

---

**Tier 1 Implementation Plan: READY FOR EXECUTION**

Next: Confirm these tasks with team, assign ownership, and begin Week 1 execution.
