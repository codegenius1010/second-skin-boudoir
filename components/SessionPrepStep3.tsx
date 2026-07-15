'use client'

import React, { useState } from 'react'

interface SessionPrepStep3Props {
  onComplete: (data: Record<string, unknown>) => void
  isLoading?: boolean
}

/**
 * DEBUGGING GUIDE:
 * If you see a validation error when submitting this form:
 * 1. Open your browser's Developer Tools (F12 or Cmd+Option+I)
 * 2. Click the "Console" tab
 * 3. Look for messages starting with "[SessionPrep]" - these contain detailed error info
 * 4. The Console will show:
 *    - "API Response Error" with specific field validation failures
 *    - "Submitted Data" showing exactly what was sent
 *    - "Full Response" with complete error details
 * 
 * Share the console output with support for fastest resolution.
 */

// Helper to convert label text to schema format (e.g. "Soft romantic" → "soft_romantic")
const labelToValue = (label: string): string => {
  return label.toLowerCase().replace(/\s+/g, '_')
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
    additionalImageComments: '',
    imageUseElection: '',
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
    imagePrivacy: false,
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
    if (formData.ongoingConsentAcknowledged && formData.accurateInformationAcknowledged && formData.imageUseElection) {
      // Filter out empty strings and empty arrays from formData before submitting
      const cleanedData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (typeof value === 'string') {
          // Only include non-empty strings
          if (value.trim() !== '') {
            acc[key] = value
          }
        } else if (Array.isArray(value)) {
          // Only include non-empty arrays
          if (value.length > 0) {
            acc[key] = value
          }
        } else {
          // Include all other types (booleans, etc.)
          acc[key] = value
        }
        return acc
      }, {} as Record<string, unknown>)
      
      onComplete(cleanedData)
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
        <p className="text-lg text-charcoal/70 leading-relaxed">
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
                {['Soft romantic', 'Elegant timeless', 'Bright natural', 'Moody cinematic', 'Editorial fashion', 'Erotic', 'Sensual'].map(
                  (style) => (
                    <CheckboxOption
                      key={style}
                      label={style}
                      value={labelToValue(style)}
                      checked={formData.visualStyles.includes(labelToValue(style))}
                      onChange={() => toggleCheckbox('visualStyles', labelToValue(style))}
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
                  'Elegant feminine',
                  'Confident powerful',
                  'Editorial dramatic',
                  'Playful flirty',
                  'Sensual suggestive',
                  'Erotic',
                  'Bold provocative',
                  'Combination',
                  'Guidance',
                ].map((pose) => (
                  <CheckboxOption
                    key={pose}
                    label={pose}
                    value={labelToValue(pose)}
                    checked={formData.posingStyles.includes(labelToValue(pose))}
                    onChange={() => toggleCheckbox('posingStyles', labelToValue(pose))}
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
                  { value: 'fully_covered', label: 'Fully Covered', description: 'Lingerie, robes, or bodysuit with complete coverage throughout the session' },
                  { value: 'robe_sweater', label: 'Robe or Sweater', description: 'Comfortable robe or sweater for easy coverage transitions' },
                  { value: 'bodysuit_lingerie', label: 'Bodysuit or Lingerie', description: 'Fitted bodysuit or lingerie for flattering silhouette shots' },
                  { value: 'sheer_covered', label: 'Sheer Covered', description: 'Sheer fabrics or overlays that suggest while still covering' },
                  { value: 'implied_nudity', label: 'Implied Nudity', description: 'Strategically draped sheets, fabric, or positioning that suggests nudity without explicit exposure' },
                  { value: 'artistic_topless', label: 'Artistic Topless', description: 'Artistic chest coverage or angles that create tasteful, editorial-style images' },
                  { value: 'artistic_nude', label: 'Artistic Fully Nude', description: 'Artistic positioning, angles, shadows, and composition that create tasteful, non-explicit nudity' },
                  { value: 'undecided', label: 'Undecided', description: 'Not sure yet - we can discuss options during the session' },
                ].map(
                  (coverage) => (
                    <div key={coverage.value} className="flex items-start gap-3 p-3 bg-charcoal/2 rounded-lg hover:bg-charcoal/5 transition-colors">
                      <input
                        type="checkbox"
                        id={coverage.value}
                        checked={formData.coveragePreferences.includes(coverage.value)}
                        onChange={() => toggleCheckbox('coveragePreferences', coverage.value)}
                        className="mt-1 w-4 h-4 text-charcoal/70 cursor-pointer flex-shrink-0"
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
            {/* Wardrobe Options Reference */}
            <div className="bg-gradient-to-br from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-4 space-y-3">
              <h4 className="font-serif text-base text-charcoal font-semibold">What to Bring Guide</h4>
              
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

            {/* Styling Guide - Download Button */}
            <div className="bg-gradient-to-br from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-4">
              <a
                href="https://1drv.ms/b/c/ee65977ff6f3a4db/IQBk-cga6Qn9T6mODsItWU6_ATNGRPiIdk7yo2CVCyBa32k?e=tzagIz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-champagne to-rose text-charcoal font-semibold rounded-lg hover:shadow-glow hover:scale-105 transition-all"
              >
                ⬇️ Download the Styling Guide
              </a>
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
                  <span className="text-charcoal/70 font-semibold">1.</span>
                  <div>
                    <p className="font-medium">Long Neck</p>
                    <p className="text-smoke text-xs">Lengthen your neck by gently dropping shoulders down and back</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-charcoal/70 font-semibold">2.</span>
                  <div>
                    <p className="font-medium">Soft Shoulders</p>
                    <p className="text-smoke text-xs">Relax shoulders away from ears for an elegant, confident appearance</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-charcoal/70 font-semibold">3.</span>
                  <div>
                    <p className="font-medium">Gentle Chin</p>
                    <p className="text-smoke text-xs">Slightly angle chin forward and down for the most flattering neck line</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-charcoal/70 font-semibold">4.</span>
                  <div>
                    <p className="font-medium">Relaxed Hands</p>
                    <p className="text-smoke text-xs">Keep hands graceful - touching hair, fabric, or gently curved</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-charcoal/70 font-semibold">5.</span>
                  <div>
                    <p className="font-medium">Hip Shift</p>
                    <p className="text-smoke text-xs">Shift weight to back leg for curves and a more dynamic pose</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-charcoal/70 font-semibold">6.</span>
                  <div>
                    <p className="font-medium">Pointed Toes</p>
                    <p className="text-smoke text-xs">Lengthen legs by pointing toes slightly - creates graceful lines</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-charcoal/70 font-semibold">7.</span>
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

            <div className="bg-gradient-to-br from-charcoal/5 to-espresso/5 border border-smoke/20 rounded-lg p-4">
              <a
                href="https://1drv.ms/b/c/ee65977ff6f3a4db/IQB8a_1O56ofSZseuZf5Oec-AX6VM7SJbsm-59kYvNok0b4?e=JKKkYb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-champagne to-rose text-charcoal font-semibold rounded-lg hover:shadow-glow hover:scale-105 transition-all"
              >
                ⬇️ Download the Posing Guide
              </a>
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

        {/* Section 8: Image Privacy & Use */}
        <Section
          title="Image Privacy & Use"
          expanded={expandedSections.imagePrivacy}
          onToggle={() => toggleSection('imagePrivacy')}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                How would you like your images used?
              </label>
              <p className="text-xs text-smoke mb-3">
                Choose how comfortable you are with us sharing your session images.
              </p>
              <div className="space-y-2 mb-4">
                {[
                  { value: 'no_public_sharing', label: 'No Public Sharing (Private Collection)', description: 'Images are for my personal use only and will not be shared publicly' },
                  { value: 'anonymous_detail', label: 'Anonymous/Detail Sharing', description: 'Images may be shared without my name, face cropped, or detailed shots only' },
                  { value: 'full_model_release', label: 'Full Model Release', description: 'Images may be shared in portfolio, social media, and advertising with my name/tag' },
                ].map((option) => (
                  <div key={option.value} className="flex items-start gap-3 p-3 border border-smoke/20 rounded-lg hover:border-champagne/30 transition-colors">
                    <input
                      type="radio"
                      id={option.value}
                      name="imageUseElection"
                      value={option.value}
                      checked={formData.imageUseElection === option.value}
                      onChange={(e) => handleChange('imageUseElection', e.target.value)}
                      className="mt-1 w-4 h-4 text-charcoal/70 cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor={option.value} className="cursor-pointer flex-1">
                      <div className="font-medium text-charcoal text-sm">{option.label}</div>
                      <div className="text-xs text-smoke">{option.description}</div>
                    </label>
                  </div>
                ))}
              </div>
              
              <TextAreaField
                label="Additional comments about your image preferences (optional)"
                placeholder="E.g., 'Please avoid sharing full-body shots' or 'I'm open to anything creative'"
                value={formData.additionalImageComments || ''}
                onChange={(value) => handleChange('additionalImageComments', value)}
                maxLength={500}
              />
            </div>
          </div>
        </Section>

        {/* Section 9: Acknowledgments */}
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
              !formData.accurateInformationAcknowledged ||
              !formData.imageUseElection
            }
            className={`w-full py-4 px-6 rounded-lg font-body font-semibold transition-all duration-300 ${
              !formData.ongoingConsentAcknowledged || !formData.accurateInformationAcknowledged || !formData.imageUseElection
                ? 'bg-smoke/30 text-smoke/50 cursor-not-allowed'
                : isLoading
                  ? 'bg-smoke/50 cursor-not-allowed text-charcoal'
                  : 'bg-gradient-to-r from-champagne to-rose text-charcoal hover:shadow-glow hover:scale-105 active:scale-95'
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
        <span className={`text-charcoal/70 transition-transform ${expanded ? 'rotate-180' : ''}`}>
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
        className="w-4 h-4 text-charcoal/70 cursor-pointer"
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
        className="w-4 h-4 text-charcoal/70 cursor-pointer"
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
      <label className="block text-sm font-medium text-charcoal/70 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-champagne/50 rounded-lg bg-charcoal/40 text-charcoal placeholder-white focus:border-champagne focus:ring-4 focus:ring-champagne/30 focus:outline-none transition-all"
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
      <label className="block text-sm font-medium text-charcoal/70 mb-2">
        {label}
        {maxLength && <span className="text-charcoal/70/60 ml-1">({value.length}/{maxLength})</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        className="w-full px-4 py-3 border border-champagne/50 rounded-lg bg-charcoal/40 text-charcoal placeholder-white focus:border-champagne focus:ring-4 focus:ring-champagne/30 focus:outline-none transition-all resize-none"
      />
    </div>
  )
}
