import { Section } from '@/components/Section'

export const metadata = {
  title: 'Terms of Service - Second Skin Boudoir',
  description: 'Terms of service for Second Skin Boudoir luxury boudoir photography.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Section className="space-y-8 py-16">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl text-ivory md:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-ivory/65">Last updated: May 2026</p>
        </div>

        <div className="max-w-3xl space-y-6 text-ivory/80">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and Second Skin Boudoir ("Company," "we," "us," or "our") concerning your access to and use of our website and services. By accessing our website and submitting a consultation request, you acknowledge that you have read, understood, and agree to be bound by all the provisions of these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Description of Services</h2>
            <p>
              Second Skin Boudoir provides luxury boudoir photography services to clients in the Destin, 30A, Santa Rosa Beach, Fort Walton Beach, Panama City Beach, and surrounding Florida Gulf Coast areas. Our services include photography sessions, consultation services, and digital image delivery.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Pricing and Fees</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>Product packages begin at $995 and are separate from session fees</li>
              <li>Session fees are quoted during your consultation and depend on various factors including session type, duration, and location</li>
              <li>All pricing is subject to change with notice</li>
              <li>Payment terms will be discussed during your consultation</li>
              <li>A deposit may be required to secure your session date</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Consultation and Booking</h2>
            <ul className="list-inside list-disc space-y-2">
              <li>By submitting a consultation request, you consent to be contacted via phone, SMS, or email</li>
              <li>All consultations are confidential</li>
              <li>Booking a session requires signing a photography agreement and release form</li>
              <li>Cancellation and rescheduling policies will be provided upon booking</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Image Usage and Copyright</h2>
            <p>
              Second Skin Boudoir retains all copyrights to the photographs taken during your session. You understand and agree that:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Your images will not be used for any purpose without your explicit written permission</li>
              <li>Images will not be published on social media, websites, or marketing materials without a signed release</li>
              <li>You have the right to use your images for personal, non-commercial purposes</li>
              <li>Any commercial use of your images requires written approval</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Confidentiality</h2>
            <p>
              Your privacy and confidentiality are of utmost importance. We maintain strict confidentiality regarding:
            </p>
            <ul className="list-inside list-disc space-y-2">
              <li>Your session and consultation information</li>
              <li>Your images and photography files</li>
              <li>Your personal and contact information</li>
              <li>All aspects of your experience with our company</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Second Skin Boudoir and its owners, employees, and agents will not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or services, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided on an "as-is" and "as available" basis. We make no warranties, expressed or implied, regarding the website or services, including implied warranties of merchantability or fitness for a particular purpose.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Second Skin Boudoir and its owners, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorney's fees) arising from or related to your use of the website or services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Your continued use of our website and services following the posting of revised Terms means that you accept and agree to the changes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ivory">Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
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
