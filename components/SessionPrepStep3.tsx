'use client'

import React, { useState } from 'react'

interface SessionPrepStep3Props {
  onComplete: (data: Record<string, unknown>) => void
  isLoading?: boolean
}

export default function SessionPrepStep3({ onComplete, isLoading }: SessionPrepStep3Props) {
  const [formData, setFormData] = useState({
    desiredFeelings: [] as string[],
    visualStyles: [] as string[],
    posingStyles: [] as string[],
    posingIntensity: '',
    coveragePreferences: [] as string[],
    coverageDecision: '',
    hardCoverageBoundaries: '',
    poseBoundaries: '',
    cameraAngleBoundaries: '',
    wardrobeAdjustmentBoundaries: '',
    areasToEmphasize: '',
    areasToPhotographDiscreetly: '',
    favoriteSong: '',
    favoriteArtists: '',
    musicGenres: [] as string[],
    playlistUrl: '',
    explicitLyricsAllowed: '',
    musicToAvoid: '',
    wardrobePlans: [] as string[],
    wardrobeGuidanceRequested: false,
    clothingSizes: '',
    favoriteColorsStyles: '',
    dislikedColorsStyles: '',
    mobilityPositioningNotes: '',
    supportPersonAttending: false,
    supportPersonName: '',
    instagramHandle: '',
    instagramTagPermission: '',
    collaboratorCreditPermission: '',
    additionalPrivateNotes: '',
    ongoingConsentAcknowledged: false,
    accurateInformationAcknowledged: false,
  })

  const [expandedSections, setExpandedSections] = useState({
    vision: true,
    coverage: false,
    music: false,
    wardrobe: false,
    posing: false,
    comfort: false,
    instagram: false,
    acknowledgments: false,
  })

  // Toggle multiple checkboxes
  const toggleCheckbox = (field: string, value: string) => {
    setFormData((prev) => {
      const arr = prev[field as keyof typeof prev] as string[]
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter((v) => v !== value) }
      } else {
        return { ...prev, [field]: [...arr, value] }
      }
    })
  }

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.ongoingConsentAcknowledged && formData.accurateInformationAcknowledged) {
      onComplete(formData)
    }
  }

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">
          Your Session Preferences
        </h1>
        <p className="text-lg text-smoke leading-relaxed">
          Share what matters most to you. Your answers help us create your perfect session.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section 1: Session Vision */}
        <Section
          title="Session Vision"
          expanded={expandedSections.vision}
          onToggle={() => toggleSection('vision')}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                How do you want to feel in your photos?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Confident',
                  'Feminine',
                  'Powerful',
                  'Romantic',
                  'Playful',
                  'Sensual',
                  'Bold',
                  'Reconnected',
                  'Celebratory',
                ].map((feeling) => (
                  <CheckboxOption
                    key={feeling}
                    label={feeling}
                    value={feeling.toLowerCase()}
                    checked={formData.desiredFeelings.includes(feeling.toLowerCase())}
                    onChange={() => toggleCheckbox('desiredFeelings', feeling.toLowerCase())}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                What visual aesthetic appeals to you?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Soft romantic', 'Elegant timeless', 'Bright natural', 'Moody cinematic', 'Bold sultry', 'Erotic'].map(
                  (style) => (
                    <CheckboxOption
                      key={style}
                      label={style}
                      value={style.toLowerCase()}
                      checked={formData.visualStyles.includes(style.toLowerCase())}
                      onChange={() => toggleCheckbox('visualStyles', style.toLowerCase())}
                    />
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                What posing style interests you?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  'Soft relaxed',
                  'Elegant feminine',
                  'Confident powerful',
                  'Editorial dramatic',
                  'Playful flirty',
                  'Sensual suggestive',
                ].map((pose) => (
                  <CheckboxOption
                    key={pose}
                    label={pose}
                    value={pose.toLowerCase()}
                    checked={formData.posingStyles.includes(pose.toLowerCase())}
                    onChange={() => toggleCheckbox('posingStyles', pose.toLowerCase())}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Coverage & Boundaries */}
        <Section
          title="Coverage & Boundaries"
          expanded={expandedSections.coverage}
          onToggle={() => toggleSection('coverage')}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                What coverage level appeals to you?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'fully covered', label: 'Fully Covered', description: 'Lingerie, robes, or bodysuit with complete coverage throughout the session' },
                  { value: 'implied nudity', label: 'Implied Nudity', description: 'Strategically draped sheets, fabric, or positioning that suggests nudity without explicit exposure' },
                  { value: 'artistic topless', label: 'Artistic Topless', description: 'Artistic chest coverage or angles that create tasteful, editorial-style images' },
                  { value: 'artistic fully nude', label: 'Artistic Fully Nude', description: 'Artistic positioning, angles, shadows, and composition that create tasteful, non-explicit nudity' },
                ].map(
                  (coverage) => (
                    <div key={coverage.value} className="flex items-start gap-3 p-3 bg-charcoal/2 rounded-lg hover:bg-charcoal/5 transition-colors">
                      <input
                        type="checkbox"
                        id={coverage.value}
                        checked={formData.coveragePreferences.includes(coverage.value)}
                        onChange={() => toggleCheckbox('coveragePreferences', coverage.value)}
                        className="mt-1 w-4 h-4 text-champagne cursor-pointer flex-shrink-0"
                      />
                      <label htmlFor={coverage.value} className="cursor-pointer flex-1">
                        <div className="font-medium text-charcoal text-sm">{coverage.label}</div>
                        <div className="text-xs text-smoke">{coverage.description}</div>
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            <TextAreaField
              label="Any hard boundaries we should respect?"
              placeholder="E.g., 'No exposure of...' or 'Never show...'"
              value={formData.hardCoverageBoundaries}
              onChange={(value) => handleChange('hardCoverageBoundaries', value)}
              maxLength={500}
            />

            <TextAreaField
              label="What areas would you like us to emphasize?"
              placeholder="E.g., 'Focus on my waist' or 'Highlight my back'"
              value={formData.areasToEmphasize}
              onChange={(value) => handleChange('areasToEmphasize', value)}
              maxLength={500}
            />
          </div>
        </Section>

        {/* Section 3: Music & Mood */}
        <Section title="Music & Mood" expanded={expandedSections.music} onToggle={() => toggleSection('music')}>
          <div className="space-y-4">
            <TextInputField
              label="Favorite song?"
              placeholder="E.g., 'Dream - Imagine Dragons'"
              value={formData.favoriteSong}
              onChange={(value) => handleChange('favoriteSong', value)}
            />

            <TextInputField
              label="Favorite artists?"
              placeholder="E.g., 'Beyoncé, The Weeknd, Billie Eilish'"
              value={formData.favoriteArtists}
              onChange={(value) => handleChange('favoriteArtists', value)}
            />

            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                Music genres you love
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['R&B', 'Hip-hop', 'Pop', 'Electronic', 'Indie', 'Alternative'].map((genre) => (
                  <CheckboxOption
                    key={genre}
                    label={genre}
                    value={genre.toLowerCase()}
                    checked={formData.musicGenres.includes(genre.toLowerCase())}
                    onChange={() => toggleCheckbox('musicGenres', genre.toLowerCase())}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Section 4: Wardrobe */}
        <Section
          title="Wardrobe & Styling"
          expanded={expandedSections.wardrobe}
          onToggle={() => toggleSection('wardrobe')}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                What will you bring?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Lingerie', 'Bodysuit', 'Robe', 'Heels', 'Jewelry', 'Personal item'].map((item) => (
                  <CheckboxOption
                    key={item}
                    label={item}
                    value={item.toLowerCase()}
                    checked={formData.wardrobePlans.includes(item.toLowerCase())}
                    onChange={() => toggleCheckbox('wardrobePlans', item.toLowerCase())}
                  />
                ))}
              </div>
            </div>

            {/* Wardrobe Guidance Guide */}
            <div className="bg-gradient-to-br from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-4 space-y-3">
              <h4 className="font-serif text-base text-charcoal font-semibold">Wardrobe Styling Guide</h4>
              
              <div className="space-y-2 text-sm text-charcoal">
                <div>
                  <p className="font-medium text-charcoal">Lingerie</p>
                  <p className="text-smoke text-xs">Beautiful for intimate, sensual poses with excellent movement and confidence</p>
                </div>
                
                <div>
                  <p className="font-medium text-charcoal">Bodysuit</p>
                  <p className="text-smoke text-xs">Great for structured, elegant poses with clean lines and defined shape</p>
                </div>
                
                <div>
                  <p className="font-medium text-charcoal">Robe or Sweater</p>
                  <p className="text-smoke text-xs">Perfect for soft, relaxed, cozy images with beautiful draping and movement</p>
                </div>
                
                <div>
                  <p className="font-medium text-charcoal">Oversized Shirt</p>
                  <p className="text-smoke text-xs">Relaxed, natural, and timeless for casual editorial looks</p>
                </div>
                
                <div>
                  <p className="font-medium text-charcoal">Heels</p>
                  <p className="text-smoke text-xs">Helpful for posture and leg shape - you don't need to walk in them</p>
                </div>
                
                <div>
                  <p className="font-medium text-charcoal">Jewelry & Accessories</p>
                  <p className="text-smoke text-xs">Veil, garters, rings, necklaces, or bracelets add personality and detail</p>
                </div>
                
                <div>
                  <p className="font-medium text-charcoal">Personal Items</p>
                  <p className="text-smoke text-xs">Anything that makes you feel confident - blanket, favorite sweater, etc.</p>
                </div>
              </div>

              <p className="text-xs text-smoke border-t border-smoke/20 pt-3">
                <strong>Tip:</strong> Bring 2-4 options. We'll help you choose what photographs beautifully and feels most comfortable.
              </p>
            </div>

            <div className="flex items-center gap-2 p-3 bg-charcoal/5 rounded-lg">
              <input
                type="checkbox"
                id="wardrobe-guidance"
                checked={formData.wardrobeGuidanceRequested}
                onChange={(e) => handleChange('wardrobeGuidanceRequested', e.target.checked)}
                className="w-4 h-4 text-champagne cursor-pointer"
              />
              <label htmlFor="wardrobe-guidance" className="flex-1 text-sm md:text-base text-charcoal cursor-pointer">
                I'd like styling guidance in advance
              </label>
            </div>
          </div>
        </Section>

        {/* Section 5: Posing & Guidance */}
        <Section
          title="Posing & Guidance"
          expanded={expandedSections.posing}
          onToggle={() => toggleSection('posing')}
        >
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-4 space-y-3">
              <h4 className="font-serif text-base text-charcoal font-semibold">Posing Philosophy</h4>
              <p className="text-sm text-charcoal leading-relaxed">
                Our approach focuses on three core principles: <strong>Lengthen</strong> (create graceful lines), <strong>Curve</strong> (add dimension and shape), and <strong>Soften</strong> (emphasize comfort and confidence).
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-base text-charcoal font-semibold">Seven Posing Foundations</h4>
              <div className="space-y-2 text-sm text-charcoal">
                <div className="flex gap-2">
                  <span className="text-champagne font-semibold">1.</span>
                  <div>
                    <p className="font-medium">Long Neck</p>
                    <p className="text-smoke text-xs">Lengthen your neck by gently dropping shoulders down and back</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-champagne font-semibold">2.</span>
                  <div>
                    <p className="font-medium">Soft Shoulders</p>
                    <p className="text-smoke text-xs">Relax shoulders away from ears for an elegant, confident appearance</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-champagne font-semibold">3.</span>
                  <div>
                    <p className="font-medium">Gentle Chin</p>
                    <p className="text-smoke text-xs">Slightly angle chin forward and down for the most flattering neck line</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-champagne font-semibold">4.</span>
                  <div>
                    <p className="font-medium">Relaxed Hands</p>
                    <p className="text-smoke text-xs">Keep hands graceful - touching hair, fabric, or gently curved</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-champagne font-semibold">5.</span>
                  <div>
                    <p className="font-medium">Hip Shift</p>
                    <p className="text-smoke text-xs">Shift weight to back leg for curves and a more dynamic pose</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-champagne font-semibold">6.</span>
                  <div>
                    <p className="font-medium">Pointed Toes</p>
                    <p className="text-smoke text-xs">Lengthen legs by pointing toes slightly - creates graceful lines</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-champagne font-semibold">7.</span>
                  <div>
                    <p className="font-medium">Breath & Movement</p>
                    <p className="text-smoke text-xs">Take deep breaths and relax - natural movement creates authentic beauty</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-base text-charcoal font-semibold">Pose Families We'll Explore</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-charcoal/2 rounded">
                  <p className="font-medium text-charcoal">Standing Poses</p>
                  <p className="text-xs text-smoke">Powerful, confident positions with great variety</p>
                </div>
                <div className="p-2 bg-charcoal/2 rounded">
                  <p className="font-medium text-charcoal">Seated Poses</p>
                  <p className="text-xs text-smoke">Intimate, comfortable, great for posture control</p>
                </div>
                <div className="p-2 bg-charcoal/2 rounded">
                  <p className="font-medium text-charcoal">Reclined Poses</p>
                  <p className="text-xs text-smoke">Relaxed, sensual, beautifully vulnerable</p>
                </div>
                <div className="p-2 bg-charcoal/2 rounded">
                  <p className="font-medium text-charcoal">Floor Poses</p>
                  <p className="text-xs text-smoke">Artistic, creative, with stunning draping possibilities</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-charcoal/5 rounded-lg">
              <input
                type="checkbox"
                id="posing-notes"
                className="mt-1 w-4 h-4 text-champagne cursor-pointer"
              />
              <label className="flex-1 text-sm md:text-base text-charcoal cursor-pointer">
                I'd like gentle guidance and have no prior posing experience
              </label>
            </div>

            <TextAreaField
              label="Any specific pose requests or concerns?"
              placeholder="E.g., 'I'd love to see poses that emphasize my waist' or 'I'm concerned about arm angles'"
              value={formData.poseBoundaries}
              onChange={(value) => handleChange('poseBoundaries', value)}
              maxLength={500}
            />
          </div>
        </Section>

        {/* Section 6: Comfort & Support */}
        <Section
          title="Comfort & Support"
          expanded={expandedSections.comfort}
          onToggle={() => toggleSection('comfort')}
        >
          <div className="space-y-4">
            <TextAreaField
              label="Any physical considerations we should know about?"
              placeholder="E.g., 'I have back pain, please avoid...' or 'Mobility considerations...'"
              value={formData.mobilityPositioningNotes}
              onChange={(value) => handleChange('mobilityPositioningNotes', value)}
              maxLength={500}
            />

            <div className="flex items-center gap-3 p-3 bg-charcoal/5 rounded-lg">
              <input
                type="checkbox"
                id="support"
                checked={formData.supportPersonAttending}
                onChange={(e) => handleChange('supportPersonAttending', e.target.checked)}
                className="w-5 h-5 text-champagne cursor-pointer"
              />
              <label htmlFor="support" className="flex-1 text-sm md:text-base text-charcoal cursor-pointer">
                I'd like a support person present during my session
              </label>
            </div>
          </div>
        </Section>

        {/* Section 7: Instagram & Sharing */}
        <Section
          title="Instagram & Sharing"
          expanded={expandedSections.instagram}
          onToggle={() => toggleSection('instagram')}
        >
          <div className="space-y-4">
            <TextInputField
              label="Your Instagram handle (optional)"
              placeholder="@yourinstagram"
              value={formData.instagramHandle}
              onChange={(value) => handleChange('instagramHandle', value)}
            />

            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                Can we tag you in our posts?
              </label>
              <div className="space-y-2">
                {[
                  { value: 'yes', label: 'Yes, tag me' },
                  { value: 'ask_me', label: 'Ask me first' },
                  { value: 'no', label: 'No, keep it private' },
                ].map((option) => (
                  <RadioOption
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    checked={formData.instagramTagPermission === option.value}
                    onChange={() => handleChange('instagramTagPermission', option.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Section 8: Acknowledgments */}
        <Section
          title="Final Confirmations"
          expanded={expandedSections.acknowledgments}
          onToggle={() => toggleSection('acknowledgments')}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-rose/5 border border-rose/20 rounded-lg">
              <input
                type="checkbox"
                id="consent"
                checked={formData.ongoingConsentAcknowledged}
                onChange={(e) => handleChange('ongoingConsentAcknowledged', e.target.checked)}
                className="mt-1 w-5 h-5 text-rose cursor-pointer"
              />
              <label htmlFor="consent" className="flex-1 text-sm md:text-base text-charcoal cursor-pointer">
                I understand this is an empowering experience where my comfort and consent come first
              </label>
            </div>

            <div className="flex items-start gap-3 p-4 bg-rose/5 border border-rose/20 rounded-lg">
              <input
                type="checkbox"
                id="accurate"
                checked={formData.accurateInformationAcknowledged}
                onChange={(e) => handleChange('accurateInformationAcknowledged', e.target.checked)}
                className="mt-1 w-5 h-5 text-rose cursor-pointer"
              />
              <label htmlFor="accurate" className="flex-1 text-sm md:text-base text-charcoal cursor-pointer">
                I confirm that the information I've provided is accurate and will help create my perfect session
              </label>
            </div>

            <TextAreaField
              label="Anything else you'd like us to know? (optional)"
              placeholder="Share any additional thoughts, questions, or context..."
              value={formData.additionalPrivateNotes}
              onChange={(value) => handleChange('additionalPrivateNotes', value)}
              maxLength={5000}
            />
          </div>
        </Section>

        {/* Submit button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={
              isLoading ||
              !formData.ongoingConsentAcknowledged ||
              !formData.accurateInformationAcknowledged
            }
            className={`w-full py-4 px-6 rounded-lg font-body font-semibold transition-all duration-300 ${
              !formData.ongoingConsentAcknowledged || !formData.accurateInformationAcknowledged
                ? 'bg-smoke/30 text-smoke/50 cursor-not-allowed'
                : isLoading
                  ? 'bg-smoke/50 cursor-not-allowed text-ivory'
                  : 'bg-gradient-to-r from-champagne to-rose text-ivory hover:shadow-glow hover:scale-105 active:scale-95'
            }`}
          >
            {isLoading ? 'Submitting Your Preferences...' : 'Submit & Complete Session Prep'}
          </button>
        </div>
      </form>

      {/* Form number indicator */}
      <p className="text-center text-smoke text-sm mt-8">Step 3 of 4</p>
    </div>
  )
}

/* Helper Components */

function Section({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border border-smoke/20 rounded-lg overflow-hidden bg-charcoal/2 hover:border-champagne/30 transition-colors">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-charcoal/5 transition-colors"
      >
        <h3 className="font-serif text-lg text-charcoal">{title}</h3>
        <span className={`text-champagne transition-transform ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {expanded && <div className="px-6 py-4 border-t border-smoke/20 space-y-4">{children}</div>}
    </div>
  )
}

function CheckboxOption({
  label,
  value,
  checked,
  onChange,
}: {
  label: string
  value: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-champagne cursor-pointer"
      />
      <label htmlFor={value} className="text-sm text-charcoal cursor-pointer">
        {label}
      </label>
    </div>
  )
}

function RadioOption({
  label,
  value,
  checked,
  onChange,
}: {
  label: string
  value: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center gap-3 p-2">
      <input
        type="radio"
        id={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-champagne cursor-pointer"
      />
      <label htmlFor={value} className="text-sm text-charcoal cursor-pointer flex-1">
        {label}
      </label>
    </div>
  )
}

function TextInputField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-smoke/30 rounded-lg bg-charcoal/2 text-charcoal placeholder-smoke/50 focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none transition-all"
      />
    </div>
  )
}

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  maxLength,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  maxLength?: number
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal mb-2">
        {label}
        {maxLength && <span className="text-smoke/50 ml-1">({value.length}/{maxLength})</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        className="w-full px-4 py-3 border border-smoke/30 rounded-lg bg-charcoal/2 text-charcoal placeholder-smoke/50 focus:border-champagne focus:ring-4 focus:ring-champagne/20 focus:outline-none transition-all resize-none"
      />
    </div>
  )
}
