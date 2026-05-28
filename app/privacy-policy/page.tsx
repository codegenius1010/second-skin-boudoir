import { Section } from '@/components/Section'

export const metadata = {
  title: 'Privacy Policy - Second Skin Boudoir',
  description: 'Privacy policy for Second Skin Boudoir luxury boudoir photography.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Section className="space-y-8 py-16">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl text-ivory md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-ivory/65">Last updated: May 2026</p>
        </div>

        <div className="max-w-3xl space-y-6 text-ivory/80">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Introduction</h2>
            <p>
              Second Skin Boudoir ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>Personal Information: When you submit a consultation request, we collect your name, email address, phone number, city, and other details you provide through our contact form.</li>
              <li>Communication Data: We collect information about your communication preferences and messages you send us.</li>
              <li>Session Information: Information related to your photography session, including session type, timeframe preferences, and any other details you share.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">How We Use Your Information</h2>
            <p>We use the information we collect in the following ways:</p>
            <ul className="list-inside list-disc space-y-2">
              <li>To process consultation requests and respond to your inquiries</li>
              <li>To contact you via phone, SMS, or email regarding your session</li>
              <li>To provide you with information about our services and products</li>
              <li>To improve and personalize your experience on our website</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Privacy of Your Images</h2>
            <p>
              Your privacy and confidentiality are paramount. We understand that your boudoir photos are intimate and personal. We agree to the following:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Your images will never be shared, published, or used for any purpose without your explicit written permission</li>
              <li>Your session and related information remain completely confidential</li>
              <li>We will not display your images on our website, social media, or any marketing materials without a signed release</li>
              <li>All information from your consultation is kept private</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Contact and Communication</h2>
            <p>
              By submitting the consultation form, you consent to be contacted via phone call, SMS text message, and email regarding your inquiry and photography session. Message and data rates may apply. You may opt out of SMS communications at any time by replying "STOP" to any message.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Security of Your Information</h2>
            <p>
              We implement appropriate technical and organizational measures designed to protect the security of any personal information we process. However, please be aware that no security measures are completely secure or impenetrable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Data Retention</h2>
            <p>
              We will retain your personal information for as long as necessary to provide our services, respond to your inquiries, and comply with legal obligations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. To exercise these rights, please contact us at {process.env.NEXT_PUBLIC_EMAIL || 'hello@secondskinboudoir.com'}.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 space-y-1 text-ivory/70">
              <p>Second Skin Boudoir</p>
              <p>Phone: 850-608-0844</p>
              <p>Email: hello@secondskinboudoir.com</p>
            </div>
          </section>
        </div>
      </Section>
    </main>
  )
}
