import { z } from 'zod'

// Valid string choices for various fields
const DESIRED_FEELINGS = [
  'confident',
  'feminine',
  'powerful',
  'romantic',
  'playful',
  'sensual',
  'bold',
  'reconnected',
  'celebratory',
  'other',
] as const

const VISUAL_STYLES = [
  'soft_romantic',
  'elegant_timeless',
  'bright_natural',
  'moody_cinematic',
  'editorial_fashion',
  'erotic',
  'sensual',
] as const

const POSING_STYLES = [
  'elegant_feminine',
  'confident_powerful',
  'editorial_dramatic',
  'playful_flirty',
  'sensual_suggestive',
  'erotic',
  'bold_provocative',
  'combination',
  'guidance',
] as const

const POSING_INTENSITY = [
  'classic',
  'sensual',
  'bold',
  'erotic_editorial',
  'open_to_discussing',
  'unsure',
] as const

const COVERAGE_OPTIONS = [
  'fully_covered',
  'robe_sweater',
  'bodysuit_lingerie',
  'sheer_covered',
  'implied_nudity',
  'artistic_topless',
  'artistic_nude',
  'undecided',
] as const

const COVERAGE_DECISION = [
  'prefer_stay_within',
  'open_less_coverage',
  'open_how_feel',
  'undecided',
  'no_nudity',
] as const

const WARDROBE_ITEMS = [
  'lingerie',
  'bodysuit',
  'robe',
  'shirt',
  'sweater',
  'dress',
  'bridal',
  'heels',
  'jewelry',
  'personal_item',
  'sheets',
  'unsure',
] as const

const MUSIC_EXPLICIT = ['yes', 'no', 'either'] as const

const TAGGING_PERMISSION = ['yes', 'ask_me', 'no'] as const

const IMAGE_USE_ELECTION = ['no_public_sharing', 'anonymous_detail', 'full_model_release'] as const

// Session Intake Validation Schema
export const SessionIntakeSchema = z.object({
  // Client contact info (from form submission)
  clientFirstName: z.string().max(100).optional(),
  clientLastName: z.string().max(100).optional(),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().max(20).optional(),

  // Session Vision
  desiredFeelings: z.array(z.enum(DESIRED_FEELINGS)).optional().default([]),
  visualStyles: z.array(z.enum(VISUAL_STYLES)).optional().default([]),
  posingStyles: z.array(z.enum(POSING_STYLES)).optional().default([]),
  posingIntensity: z.enum(POSING_INTENSITY).optional(),

  // Coverage & Wardrobe
  coveragePreferences: z.array(z.enum(COVERAGE_OPTIONS)).optional().default([]),
  coverageDecision: z.enum(COVERAGE_DECISION).optional(),
  hardCoverageBoundaries: z.string().max(2000).optional(),
  poseBoundaries: z.string().max(2000).optional(),
  cameraAngleBoundaries: z.string().max(2000).optional(),
  wardrobeAdjustmentBoundaries: z.string().max(2000).optional(),

  areasToEmphasize: z.string().max(500).optional(),
  areasToPhotographDiscreetly: z.string().max(500).optional(),

  // Music preferences
  favoriteSong: z.string().max(200).optional(),
  favoriteArtists: z.string().max(500).optional(),
  musicGenres: z.array(z.string()).optional().default([]),
  playlistUrl: z.string().url().optional().or(z.literal('')),
  explicitLyricsAllowed: z.enum(MUSIC_EXPLICIT).optional(),
  musicToAvoid: z.string().max(500).optional(),

  // Wardrobe planning
  wardrobePlans: z.array(z.enum(WARDROBE_ITEMS)).optional().default([]),
  wardrobeGuidanceRequested: z.boolean().optional().default(false),
  clothingSizes: z.string().max(100).optional(),
  favoriteColorsStyles: z.string().max(500).optional(),
  dislikedColorsStyles: z.string().max(500).optional(),

  // Comfort & Support
  mobilityPositioningNotes: z.string().max(2000).optional(),
  supportPersonAttending: z.boolean().optional().default(false),
  supportPersonName: z.string().max(200).optional(),

  // Instagram & Tagging
  instagramHandle: z.string().max(30).optional(),
  instagramTagPermission: z.enum(TAGGING_PERMISSION).optional(),
  collaboratorCreditPermission: z.enum(TAGGING_PERMISSION).optional(),

  // Additional notes
  additionalPrivateNotes: z.string().max(5000).optional(),
  additionalImageComments: z.string().max(500).optional(),

  // Image use preferences
  imageUseElection: z.enum(IMAGE_USE_ELECTION),

  // Acknowledgments (required)
  ongoingConsentAcknowledged: z.boolean(),
  accurateInformationAcknowledged: z.boolean(),
})

export type SessionIntakeData = z.infer<typeof SessionIntakeSchema>

// API Request Schema - includes session context
export const SessionPrepIntakeRequestSchema = z.object({
  sessionId: z.string().cuid(),
  intake: SessionIntakeSchema,
})

export type SessionPrepIntakeRequest = z.infer<typeof SessionPrepIntakeRequestSchema>

// Webhook Delivery Payload Schema
export const WebhookPayloadSchema = z.object({
  event: z.literal('session_prep_submitted'),
  schemaVersion: z.string(),
  eventId: z.string().uuid(),
  occurredAt: z.string().datetime(),
  source: z.literal('secondskinboudoir.com'),
  client: z.object({
    localId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    instagramHandle: z.string().optional(),
  }),
  session: z.object({
    localId: z.string(),
    sessionType: z.string(),
    sessionDate: z.string().optional(),
    sessionLocation: z.string().optional(),
  }),
  intake: z.object({
    localId: z.string(),
    submittedAt: z.string().datetime(),
    desiredFeelings: z.array(z.string()).optional(),
    visualStyles: z.array(z.string()).optional(),
    posingStyles: z.array(z.string()).optional(),
    posingIntensity: z.string().optional(),
    coveragePreferences: z.array(z.string()).optional(),
    coverageDecision: z.string().optional(),
    hardCoverageBoundaries: z.string().optional(),
    poseBoundaries: z.string().optional(),
    cameraAngleBoundaries: z.string().optional(),
    wardrobeAdjustmentBoundaries: z.string().optional(),
    areasToEmphasize: z.string().optional(),
    areasToPhotographDiscreetly: z.string().optional(),
    favoriteSong: z.string().optional(),
    favoriteArtists: z.string().optional(),
    musicGenres: z.array(z.string()).optional(),
    explicitLyricsAllowed: z.string().optional(),
    musicToAvoid: z.string().optional(),
    playlistUrl: z.string().optional(),
    wardrobePlans: z.array(z.string()).optional(),
    wardrobeGuidanceRequested: z.boolean().optional(),
    mobilityPositioningNotes: z.string().optional(),
    supportPersonAttending: z.boolean().optional(),
    instagramTagPermission: z.string().optional(),
    collaboratorCreditPermission: z.string().optional(),
    sessionPreferencesSummary: z.string().optional(),
  }),
  completion: z.object({
    questionnaireComplete: z.boolean(),
    ongoingConsentAcknowledged: z.boolean(),
    accurateInformationAcknowledged: z.boolean(),
  }),
  verification: z.object({
    sharedSecret: z.string().optional(),
  }).optional(),
})

export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>
