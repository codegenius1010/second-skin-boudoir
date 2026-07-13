import crypto from 'crypto'

/**
 * Normalize email: lowercase and trim
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

/**
 * Normalize phone: remove all non-digits, keep only numbers
 */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 ? `+1${digits.slice(-10)}` : digits
}

/**
 * Hash a token using SHA-256 for secure storage
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

/**
 * Compare a plain token against a hash using constant-time comparison
 * Prevents timing attacks
 */
export function verifyToken(plainToken: string, storedHash: string): boolean {
  const tokenHash = hashToken(plainToken)
  return crypto.timingSafeEqual(Buffer.from(tokenHash), Buffer.from(storedHash))
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Hash an IP address for privacy (never store raw IPs)
 */
export function hashIpAddress(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex')
}

/**
 * Extract user agent summary (browser/OS) without full details
 */
export function extractUserAgentSummary(userAgent: string): string {
  // Simple extraction: just identify browser type
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Other'
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Validate URL (especially for playlist links)
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate playlist URL (Spotify, Apple Music, YouTube Music)
 */
export function isValidPlaylistUrl(url: string): boolean {
  if (!url) return true // optional field
  if (!isValidUrl(url)) return false

  const allowedDomains = [
    'spotify.com',
    'apple.com',
    'music.apple.com',
    'music.youtube.com',
    'youtube.com',
    'youtu.be',
  ]

  try {
    const parsedUrl = new URL(url)
    return allowedDomains.some(domain => parsedUrl.hostname?.includes(domain))
  } catch {
    return false
  }
}

/**
 * Generate idempotency key for webhook retries
 * Should be same across all retry attempts of the same intake
 */
export function generateIdempotencyKey(): string {
  return crypto.randomUUID()
}

/**
 * Generate hash of a payload for deduplication
 */
export function hashPayload(payload: Record<string, unknown>): string {
  const jsonString = JSON.stringify(payload)
  return crypto.createHash('sha256').update(jsonString).digest('hex')
}

/**
 * Validate text field length
 */
export function validateTextLength(text: string, maxLength: number): boolean {
  return text.length <= maxLength
}

/**
 * Sanitize text by removing potentially harmful characters
 * Note: Does not replace HTML/XML tags, only removes control characters
 */
export function sanitizeText(text: string): string {
  // Remove null bytes and other control characters
  return text.replace(/[\x00-\x1F\x7F]/g, '')
}

/**
 * Create a summary of session preferences from intake data
 * Used for GHL webhook and admin display
 */
export function createSessionPreferencesSummary(intake: {
  desiredFeelings?: string[] | null
  visualStyles?: string[] | null
  posingStyles?: string[] | null
  posingIntensity?: string | null
  coveragePreferences?: string[] | null
  hardCoverageBoundaries?: string | null
  areasToEmphasize?: string | null
  areasToPhotographDiscreetly?: string | null
  favoriteSong?: string | null
  favoriteArtists?: string | null
  musicGenres?: string[] | null
  explicitLyricsAllowed?: string | null
  wardrobePlans?: string[] | null
  supportPersonAttending?: boolean | null
  instagramHandle?: string | null
  instagramTagPermission?: string | null
}): string {
  const parts: string[] = []

  if (intake.desiredFeelings?.length) {
    parts.push(`Mood: ${intake.desiredFeelings.join(', ')}`)
  }

  if (intake.posingStyles?.length) {
    parts.push(`Posing: ${intake.posingStyles.join(', ')}`)
  }

  if (intake.coveragePreferences?.length) {
    parts.push(`Coverage: ${intake.coveragePreferences.join(', ')}`)
  }

  if (intake.hardCoverageBoundaries) {
    parts.push(`Hard boundaries: ${intake.hardCoverageBoundaries}`)
  }

  if (intake.areasToEmphasize) {
    parts.push(`Emphasize: ${intake.areasToEmphasize}`)
  }

  if (intake.areasToPhotographDiscreetly) {
    parts.push(`Photograph discreetly: ${intake.areasToPhotographDiscreetly}`)
  }

  if (intake.favoriteSong) {
    parts.push(`Favorite song: ${intake.favoriteSong}`)
  }

  if (intake.favoriteArtists || intake.musicGenres?.length) {
    const musicParts: string[] = []
    if (intake.favoriteArtists) musicParts.push(intake.favoriteArtists)
    if (intake.musicGenres?.length) musicParts.push(intake.musicGenres.join(', '))
    parts.push(`Music: ${musicParts.join('; ')}`)
  }

  if (intake.wardrobePlans?.length) {
    parts.push(`Wardrobe: ${intake.wardrobePlans.join(', ')}`)
  }

  if (intake.supportPersonAttending) {
    parts.push(`Support person: Yes`)
  }

  if (intake.instagramHandle) {
    const tagPerm = intake.instagramTagPermission === 'ask_me' ? ' - ask before each tag' : ''
    parts.push(`Instagram: ${intake.instagramHandle}${tagPerm}`)
  }

  return parts.join(' | ')
}
