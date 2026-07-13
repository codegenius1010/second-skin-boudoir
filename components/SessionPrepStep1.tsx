'use client'

import React, { useState } from 'react'

interface SessionPrepStep1Props {
  sessionId: string
  onComplete: (data: { firstName: string; lastName: string; email: string; phone: string }) => void
  isLoading?: boolean
}

export default function SessionPrepStep1({ sessionId, onComplete, isLoading }: SessionPrepStep1Props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  // Validate form on submit
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onComplete(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
          Let's Prepare Your Session
        </h1>
        <p className="text-lg text-smoke leading-relaxed">
          Your responses help us create an experience that's uniquely perfect for you.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {/* Two-column layout for names on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-charcoal mb-2">
              First Name *
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg font-body text-charcoal placeholder-smoke/50 transition-all ${
                errors.firstName
                  ? 'border-rose bg-rose/5 focus:border-rose focus:ring-rose/20'
                  : 'border-smoke/30 bg-charcoal/2 focus:border-champagne focus:ring-champagne/20'
              } focus:outline-none focus:ring-4`}
              placeholder="Your first name"
              disabled={isLoading}
            />
            {errors.firstName && <p className="text-rose text-sm mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-charcoal mb-2">
              Last Name *
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg font-body text-charcoal placeholder-smoke/50 transition-all ${
                errors.lastName
                  ? 'border-rose bg-rose/5 focus:border-rose focus:ring-rose/20'
                  : 'border-smoke/30 bg-charcoal/2 focus:border-champagne focus:ring-champagne/20'
              } focus:outline-none focus:ring-4`}
              placeholder="Your last name"
              disabled={isLoading}
            />
            {errors.lastName && <p className="text-rose text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg font-body text-charcoal placeholder-smoke/50 transition-all ${
              errors.email
                ? 'border-rose bg-rose/5 focus:border-rose focus:ring-rose/20'
                : 'border-smoke/30 bg-charcoal/2 focus:border-champagne focus:ring-champagne/20'
            } focus:outline-none focus:ring-4`}
            placeholder="your.email@example.com"
            disabled={isLoading}
          />
          {errors.email && <p className="text-rose text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg font-body text-charcoal placeholder-smoke/50 transition-all ${
              errors.phone
                ? 'border-rose bg-rose/5 focus:border-rose focus:ring-rose/20'
                : 'border-smoke/30 bg-charcoal/2 focus:border-champagne focus:ring-champagne/20'
            } focus:outline-none focus:ring-4`}
            placeholder="(555) 123-4567"
            disabled={isLoading}
          />
          {errors.phone && <p className="text-rose text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Trust section */}
        <div className="bg-gradient-to-r from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-6 md:p-8 my-8">
          <h3 className="font-serif text-lg text-charcoal mb-3">Your Privacy & Safety</h3>
          <ul className="space-y-2 text-sm md:text-base text-smoke leading-relaxed">
            <li className="flex items-start gap-3">
              <span className="text-champagne mt-1">✓</span>
              <span>Your information is encrypted and secure</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-champagne mt-1">✓</span>
              <span>We never share your responses without permission</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-champagne mt-1">✓</span>
              <span>Your session stays completely confidential</span>
            </li>
          </ul>
        </div>

        {/* Submit button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-lg font-body font-semibold text-ivory transition-all duration-300 ${
              isLoading
                ? 'bg-smoke/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-champagne to-rose hover:shadow-glow hover:scale-105 active:scale-95'
            }`}
          >
            {isLoading ? 'Processing...' : 'Continue to Agreement'}
          </button>
        </div>
      </form>

      {/* Form number indicator */}
      <p className="text-center text-smoke text-sm mt-8">Step 1 of 4</p>
    </div>
  )
}
