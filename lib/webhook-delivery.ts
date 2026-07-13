import { createHash } from 'crypto'
import type { WebhookDelivery, SessionIntake } from '@prisma/client'

export interface WebhookDeliveryResult {
  success: boolean
  httpStatus?: number
  error?: string
  externalRequestId?: string
}

/**
 * Build the webhook payload to send to GHL
 * Only includes fields required by the GHL workflow
 * Excludes sensitive/unnecessary information
 */
export function buildWebhookPayload(
  client: { id: string; firstName: string; lastName: string; emailNormalized: string; phoneNormalized?: string | null; instagramHandle?: string | null },
  session: { id: string; sessionType: string; sessionDate?: Date | null; sessionLocation?: string | null },
  intake: SessionIntake,
  summary: string
): Record<string, unknown> {
  return {
    event: 'session_prep_submitted',
    schemaVersion: process.env.SESSION_PREP_WEBHOOK_SCHEMA_VERSION || '1.0',
    eventId: createHash('sha256').update(intake.id).digest('hex').substring(0, 8),
    occurredAt: new Date().toISOString(),
    source: 'secondskinboudoir.com',
    client: {
      localId: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.emailNormalized,
      phone: client.phoneNormalized || undefined,
      instagramHandle: client.instagramHandle || undefined,
    },
    session: {
      localId: session.id,
      sessionType: session.sessionType,
      sessionDate: session.sessionDate?.toISOString().split('T')[0] || undefined,
      sessionLocation: session.sessionLocation || undefined,
    },
    intake: {
      localId: intake.id,
      submittedAt: intake.submittedAt?.toISOString(),
      desiredFeelings: intake.desiredFeelings.length > 0 ? intake.desiredFeelings : undefined,
      visualStyles: intake.visualStyles.length > 0 ? intake.visualStyles : undefined,
      posingStyles: intake.posingStyles.length > 0 ? intake.posingStyles : undefined,
      posingIntensity: intake.posingIntensity || undefined,
      coveragePreferences: intake.coveragePreferences.length > 0 ? intake.coveragePreferences : undefined,
      coverageDecision: intake.coverageDecision || undefined,
      hardCoverageBoundaries: intake.hardCoverageBoundaries || undefined,
      poseBoundaries: intake.poseBoundaries || undefined,
      cameraAngleBoundaries: intake.cameraAngleBoundaries || undefined,
      wardrobeAdjustmentBoundaries: intake.wardrobeAdjustmentBoundaries || undefined,
      areasToEmphasize: intake.areasToEmphasize || undefined,
      areasToPhotographDiscreetly: intake.areasToPhotographDiscreetly || undefined,
      favoriteSong: intake.favoriteSong || undefined,
      favoriteArtists: intake.favoriteArtists || undefined,
      musicGenres: intake.musicGenres.length > 0 ? intake.musicGenres : undefined,
      explicitLyricsAllowed: intake.explicitLyricsAllowed || undefined,
      musicToAvoid: intake.musicToAvoid || undefined,
      playlistUrl: intake.playlistUrl || undefined,
      wardrobePlans: intake.wardrobePlans.length > 0 ? intake.wardrobePlans : undefined,
      wardrobeGuidanceRequested: intake.wardrobeGuidanceRequested || undefined,
      mobilityPositioningNotes: intake.mobilityPositioningNotes || undefined,
      supportPersonAttending: intake.supportPersonAttending || undefined,
      instagramTagPermission: intake.instagramTagPermission || undefined,
      collaboratorCreditPermission: intake.collaboratorCreditPermission || undefined,
      sessionPreferencesSummary: summary,
    },
    completion: {
      questionnaireComplete: true,
      ongoingConsentAcknowledged: intake.ongoingConsentAcknowledged,
      accurateInformationAcknowledged: intake.accurateInformationAcknowledged,
    },
  }
}

/**
 * Send webhook to GHL with proper error handling
 */
export async function sendWebhookToGHL(payload: Record<string, unknown>): Promise<WebhookDeliveryResult> {
  const webhookUrl = process.env.GHL_SESSION_PREP_WEBHOOK_URL
  const webhookEnabled = process.env.GHL_SESSION_PREP_WEBHOOK_ENABLED !== 'false'

  if (!webhookEnabled) {
    return {
      success: false,
      error: 'Session prep webhooks are disabled',
    }
  }

  if (!webhookUrl) {
    const msg = 'GHL_SESSION_PREP_WEBHOOK_URL is not configured'
    console.error('[Webhook] Configuration error:', msg)
    return {
      success: false,
      error: msg,
    }
  }

  const timeout = parseInt(process.env.SESSION_PREP_WEBHOOK_TIMEOUT_MS || '10000')

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'SecondSkinBoudoir/1.0',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const isSuccess = response.ok || (response.status >= 200 && response.status < 300)

    if (!isSuccess) {
      let errorText = ''
      try {
        errorText = await response.text()
      } catch {
        errorText = `HTTP ${response.status}`
      }

      return {
        success: false,
        httpStatus: response.status,
        error: `GHL webhook returned ${response.status}`,
      }
    }

    return {
      success: true,
      httpStatus: response.status,
    }
  } catch (error) {
    let errorMsg = 'Unknown error'
    if (error instanceof Error) {
      errorMsg = error.name === 'AbortError' ? `Timeout after ${timeout}ms` : error.message
    }

    return {
      success: false,
      error: errorMsg,
    }
  }
}

/**
 * Determine if an HTTP status code is retryable
 */
export function isRetryableHttpStatus(status: number): boolean {
  // Retry on temporary errors
  // 429: Too Many Requests
  // 5xx: Server errors
  return status === 429 || status >= 500
}

/**
 * Calculate next retry time with exponential backoff + jitter
 */
export function calculateNextRetryTime(attemptCount: number, baseSeconds: number = 60): Date {
  // Exponential backoff: baseSeconds * 2^attempt + jitter
  const exponentialSeconds = baseSeconds * Math.pow(2, attemptCount)
  const jitterMs = Math.random() * 5000 // ±5 seconds of jitter
  const delayMs = exponentialSeconds * 1000 + jitterMs

  return new Date(Date.now() + delayMs)
}

/**
 * Generate a hash of the payload for idempotency
 */
export function hashPayload(payload: Record<string, unknown>): string {
  const json = JSON.stringify(payload)
  return createHash('sha256').update(json).digest('hex')
}

/**
 * Determine if a delivery has exceeded max retries
 */
export function hasExhaustedRetries(attemptCount: number, maxRetries: number = 5): boolean {
  return attemptCount >= maxRetries
}

/**
 * Create a safe error message for logging (redacts sensitive info)
 */
export function createSafeErrorMessage(error: string): string {
  // Redact webhook URL if it appears in the error
  return error.replace(/https:\/\/[^\/]+\/hooks\/[^\s]+/g, '[REDACTED_WEBHOOK_URL]')
}

/**
 * Get the last retry attempt date or null if never attempted
 */
export function getLastRetryAttemptDate(delivery: WebhookDelivery): Date | null {
  return delivery.lastAttemptAt
}
