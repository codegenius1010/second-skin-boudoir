# Second Skin Boudoir Website

A luxury, conversion-focused boudoir photography website built with Next.js App Router, TypeScript, and Tailwind CSS.

## Latest Updates

- **Consent Audit Trail**: Immutable append-only logging of all client consents for GDPR compliance
- **Admin Features**: Review status management, delete submissions, copy session links
- **Fixed Deployment**: Separated database migrations from build step for Vercel compatibility

## Pages

- Home
- Experience
- Investment
- Portfolio
- About
- FAQ
- Contact
- Thank You
- Destin Boudoir Photographer
- 30A Boudoir Photographer
- Bridal Boudoir

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build check

```bash
npm run build
```

## Contact form

The contact form is set up for Formspree. Create a Formspree form and add the endpoint to `.env.local`:

```bash
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

If no endpoint is configured, the form will still redirect to `/thank-you` for design testing.

## Vercel deployment

1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New → Project**.
3. Import the GitHub repo.
4. Framework preset should auto-detect as **Next.js**.
5. Add environment variables from `.env.example` as needed.
6. Click **Deploy**.

## Domain setup

In Vercel, go to **Project → Settings → Domains** and add:

- `secondskinboudoir.com`
- `www.secondskinboudoir.com`

Then update DNS at your domain registrar using Vercel's displayed records.
