'use client'
import { useState } from 'react'

export function ContactForm({ hidePricingCheckbox = false }) {
  const [loading, setLoading] = useState(false)
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)
    
    // Convert FormData to JSON
    const json = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phone: data.get('phone'),
      city: data.get('city'),
      sessionType: data.get('sessionType'),
      nervousAbout: data.get('nervousAbout'),
      consultationPreference: data.get('consultationPreference'),
      timeframe: data.get('timeframe'),
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
  return <form onSubmit={submit} className="grid gap-4 rounded-[2rem] border border-ivory/10 bg-smoke p-6 shadow-glow md:p-8">
    <div className="grid gap-4 md:grid-cols-2"><input name="firstName" required placeholder="First name" className={input}/><input name="lastName" placeholder="Last name" className={input}/></div>
    <div className="grid gap-4 md:grid-cols-2"><input name="email" type="email" required placeholder="Email" className={input}/><input name="phone" placeholder="Phone" className={input}/></div>
    <div className="grid gap-4 md:grid-cols-2"><input name="city" placeholder="City" className={input}/><select name="sessionType" className={input} defaultValue=""><option value="" disabled>Session type</option><option>Self-love</option><option>Bridal</option><option>Anniversary gift</option><option>Birthday</option><option>Divorce / new chapter</option><option>Just because</option><option>Not sure yet</option></select></div>
    <textarea name="nervousAbout" placeholder="What are you most nervous about?" rows={4} className={input}/>
    <select name="consultationPreference" className={input} defaultValue=""><option value="" disabled>How would you prefer to consult?</option><option>Phone call</option><option>Zoom video call (recommended)</option><option>Text first, then call</option></select>
    <input name="timeframe" placeholder="Desired timeframe" className={input}/>
    <label className="flex gap-3 text-sm leading-6 text-ivory/65"><input required type="checkbox" className="mt-1"/> {hidePricingCheckbox ? <>I understand my inquiry is private and my images will never be shared without written permission. By submitting this form, I consent to be contacted via phone, SMS, and email regarding my inquiry. I have read and agree to the <a href="/privacy-policy" className="text-champagne hover:text-ivory transition">Privacy Policy</a> and <a href="/terms-of-service" className="text-champagne hover:text-ivory transition">Terms of Service</a>.</> : <>I understand products begin at $995 and session fees are separate. I understand my inquiry is private and my images will never be shared without written permission. By submitting this form, I consent to be contacted via phone, SMS, and email regarding my inquiry. I have read and agree to the <a href="/privacy-policy" className="text-champagne hover:text-ivory transition">Privacy Policy</a> and <a href="/terms-of-service" className="text-champagne hover:text-ivory transition">Terms of Service</a>.</>}</label>
    <button disabled={loading} className="rounded-full bg-champagne px-6 py-4 font-semibold text-charcoal transition hover:bg-ivory disabled:opacity-60">{loading ? 'Sending...' : 'Request My Consultation'}</button>
  </form>
}
