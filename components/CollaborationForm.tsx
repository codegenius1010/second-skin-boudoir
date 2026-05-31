'use client'
import { useState } from 'react'

export function CollaborationForm() {
  const [loading, setLoading] = useState(false)
  const [checkboxErrors, setCheckboxErrors] = useState<string[]>([])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setCheckboxErrors([])
    
    const form = e.currentTarget
    const data = new FormData(form)
    
    // Check required checkboxes
    const errors: string[] = []
    if (!data.get('ageConfirm')) errors.push('ageConfirm')
    if (!data.get('retainerConfirm')) errors.push('retainerConfirm')
    if (!data.get('releaseConfirm')) errors.push('releaseConfirm')
    if (!data.get('cancellationConfirm')) errors.push('cancellationConfirm')
    if (!data.get('applicationConfirm')) errors.push('applicationConfirm')
    
    if (errors.length > 0) {
      setCheckboxErrors(errors)
      setLoading(false)
      return
    }

    // Convert FormData to JSON
    const json = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phone: data.get('phone'),
      city: data.get('city'),
      instagramHandle: data.get('instagramHandle'),
      ageConfirm: data.get('ageConfirm'),
      consultationPreference: data.get('consultationPreference'),
      sessionInterest: data.get('sessionInterest'),
      previousBoudoir: data.get('previousBoudoir'),
      imageUseComfort: data.get('imageUseComfort'),
      retainerComfort: data.get('retainerComfort'),
      nervousAbout: data.get('nervousAbout'),
      whyConsider: data.get('whyConsider'),
      retainerConfirm: data.get('retainerConfirm'),
      releaseConfirm: data.get('releaseConfirm'),
      cancellationConfirm: data.get('cancellationConfirm'),
      applicationConfirm: data.get('applicationConfirm'),
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      })
      
      if (response.ok) {
        window.location.href = '/thank-you'
      } else {
        setLoading(false)
        alert('Something went wrong. Please call or text 850-608-0844.')
      }
    } catch (error) {
      setLoading(false)
      alert('Something went wrong. Please call or text 850-608-0844.')
    }
  }

  const input = 'w-full rounded-2xl border border-ivory/10 bg-charcoal px-4 py-3 text-ivory placeholder:text-ivory/35 outline-none focus:border-champagne'
  const checkboxError = 'border-rose-500/50 bg-rose-900/10'

  return <>
    <div className="mb-6 rounded-2xl border border-champagne/20 bg-champagne/5 p-4">
      <p className="text-sm text-ivory/80">
        <strong className="text-champagne">Privacy guaranteed:</strong> Your application is completely private. We'll contact you only if you've shared those details.
      </p>
    </div>

    <form onSubmit={submit} className="grid gap-4 rounded-[2rem] border border-ivory/10 bg-smoke p-6 shadow-glow md:p-8">
      {/* BASIC INFO */}
      <div className="pb-4 border-b border-ivory/10">
        <h3 className="text-sm font-semibold text-champagne uppercase tracking-wide mb-4">About You</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="firstName" required placeholder="First name *" className={input}/>
          <input name="lastName" required placeholder="Last name *" className={input}/>
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <input name="email" type="email" required placeholder="Email *" className={input}/>
          <input name="phone" required placeholder="Phone or text number *" className={input}/>
        </div>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <input name="city" required placeholder="City or area *" className={input}/>
          <input name="instagramHandle" placeholder="Instagram handle (optional)" className={input}/>
        </div>
      </div>

      {/* CONSULTATION PREFERENCE */}
      <div className="py-4 border-b border-ivory/10">
        <h3 className="text-sm font-semibold text-champagne uppercase tracking-wide mb-4">Consultation</h3>
        <select name="consultationPreference" required className={input} defaultValue="">
          <option value="" disabled>How would you prefer to talk? *</option>
          <option>Zoom video call (recommended)</option>
          <option>Phone call</option>
          <option>Text first, then call</option>
        </select>
      </div>

      {/* SESSION INTEREST */}
      <div className="py-4 border-b border-ivory/10">
        <h3 className="text-sm font-semibold text-champagne uppercase tracking-wide mb-4">Your Session</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <select name="sessionInterest" required className={input} defaultValue="">
            <option value="" disabled>What type of session interests you? *</option>
            <option>Self-love & confidence</option>
            <option>Bridal or wedding gift</option>
            <option>Anniversary gift</option>
            <option>Birthday celebration</option>
            <option>New chapter (divorce, healing)</option>
            <option>Just because I deserve it</option>
            <option>Not sure yet</option>
          </select>
          <select name="previousBoudoir" required className={input} defaultValue="">
            <option value="" disabled>Have you done boudoir before? *</option>
            <option>No, this is my first time</option>
            <option>Yes, once</option>
            <option>Yes, multiple times</option>
          </select>
        </div>
      </div>

      {/* IMAGE USE & COMFORT */}
      <div className="py-4 border-b border-ivory/10">
        <h3 className="text-sm font-semibold text-champagne uppercase tracking-wide mb-4">Privacy & Comfort</h3>
        <select name="imageUseComfort" required className={input} defaultValue="">
          <option value="" disabled>Which image-use option interests you most? *</option>
          <option>Full portfolio release (my face/body okay)</option>
          <option>Anonymous/detail-only release (no face)</option>
          <option>I want to discuss privacy first</option>
        </select>
        <div className="mt-4">
          <select name="retainerComfort" required className={input} defaultValue="">
            <option value="" disabled>Are you comfortable with a $99 refundable booking retainer? *</option>
            <option>Yes, I'm comfortable with this</option>
            <option>I have questions about this</option>
          </select>
        </div>
      </div>

      {/* CONCERNS & MOTIVATION */}
      <div className="py-4 border-b border-ivory/10">
        <h3 className="text-sm font-semibold text-champagne uppercase tracking-wide mb-4">Questions & Concerns</h3>
        <textarea 
          name="nervousAbout" 
          placeholder="What are you most nervous or uncertain about? (We'll address your concerns)" 
          rows={3} 
          className={input}
        />
        <textarea 
          name="whyConsider" 
          placeholder="Why would you like to be considered for this collaboration? What draws you to this opportunity?" 
          required
          rows={4} 
          className={`${input} mt-4`}
        />
      </div>

      {/* CONFIRMATIONS */}
      <div className="py-4 space-y-4 border-b border-ivory/10">
        <h3 className="text-sm font-semibold text-champagne uppercase tracking-wide mb-4">Important Confirmations</h3>

        <label className={`flex gap-3 text-sm leading-6 text-ivory/65 p-3 rounded-xl border transition cursor-pointer ${
          checkboxErrors.includes('ageConfirm') ? checkboxError : 'border-ivory/10 hover:border-ivory/20'
        }`}>
          <input 
            required 
            type="checkbox" 
            name="ageConfirm"
            className="mt-1"
          />
          I confirm I am 21 or older *
        </label>

        <label className={`flex gap-3 text-sm leading-6 text-ivory/65 p-3 rounded-xl border transition cursor-pointer ${
          checkboxErrors.includes('applicationConfirm') ? checkboxError : 'border-ivory/10 hover:border-ivory/20'
        }`}>
          <input 
            required 
            type="checkbox" 
            name="applicationConfirm"
            className="mt-1"
          />
          I understand this is application-based and not everyone will be selected *
        </label>

        <label className={`flex gap-3 text-sm leading-6 text-ivory/65 p-3 rounded-xl border transition cursor-pointer ${
          checkboxErrors.includes('releaseConfirm') ? checkboxError : 'border-ivory/10 hover:border-ivory/20'
        }`}>
          <input 
            required 
            type="checkbox" 
            name="releaseConfirm"
            className="mt-1"
          />
          I understand images are used only according to a signed release that I approve *
        </label>

        <label className={`flex gap-3 text-sm leading-6 text-ivory/65 p-3 rounded-xl border transition cursor-pointer ${
          checkboxErrors.includes('retainerConfirm') ? checkboxError : 'border-ivory/10 hover:border-ivory/20'
        }`}>
          <input 
            required 
            type="checkbox" 
            name="retainerConfirm"
            className="mt-1"
          />
          I understand the $99 retainer is refundable after my completed session or usable as credit toward additional images, albums, or artwork *
        </label>

        <label className={`flex gap-3 text-sm leading-6 text-ivory/65 p-3 rounded-xl border transition cursor-pointer ${
          checkboxErrors.includes('cancellationConfirm') ? checkboxError : 'border-ivory/10 hover:border-ivory/20'
        }`}>
          <input 
            required 
            type="checkbox" 
            name="cancellationConfirm"
            className="mt-1"
          />
          I understand the retainer may be forfeited for late cancellation or no-show *
        </label>
      </div>

      {/* FINAL CONFIRMATION & SUBMIT */}
      <label className="flex gap-3 text-sm leading-6 text-ivory/65">
        <input required type="checkbox" className="mt-1 flex-shrink-0"/> 
        <span>I have read and agree to the <a href="/privacy-policy" className="text-champagne hover:text-ivory transition whitespace-nowrap">Privacy Policy</a> and <a href="/terms-of-service" className="text-champagne hover:text-ivory transition whitespace-nowrap">Terms of Service</a>. By submitting this form, I consent to be contacted via phone, SMS, and email regarding my collaboration application *</span>
      </label>

      <button 
        disabled={loading} 
        className="rounded-full bg-champagne px-6 py-4 font-semibold text-charcoal transition hover:bg-ivory disabled:opacity-60 mt-4"
      >
        {loading ? 'Submitting your application...' : 'Apply for a Private Consultation'}
      </button>

      <p className="text-xs text-ivory/50 text-center">
        After submitting, we will review your application and contact you within 1-2 business days.
      </p>
    </form>
  </>
}
