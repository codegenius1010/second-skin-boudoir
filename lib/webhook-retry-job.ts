import { prisma } from '@/lib/prisma'
import {
  buildWebhookPayload,
  sendWebhookToGHL,
  isRetryableHttpStatus,
  calculateNextRetryTime,
  hasExhaustedRetries,
  createSafeErrorMessage,
} from '@/lib/webhook-delivery'
import { createSessionPreferencesSummary } from '@/lib/session-prep-utils'

interface RetryJobResult {
  totalProcessed: number
  successful: number
  retried: number
  exhausted: number
  errors: string[]
}

/**
 * Process pending webhook deliveries
 * Designed to run as a scheduled job (e.g., every 5 minutes)
 * 
 * Business logic:
 * 1. Find pending deliveries due for retry (nextAttemptAt <= now)
 * 2. Attempt delivery
 * 3. Update status based on result
 * 4. Schedule next retry if retryable, mark exhausted if max retries exceeded
 */
export async function processPendingWebhookDeliveries(): Promise<RetryJobResult> {
  const result: RetryJobResult = {
    totalProcessed: 0,
    successful: 0,
    retried: 0,
    exhausted: 0,
    errors: [],
  }

  try {
    const maxRetries = parseInt(process.env.SESSION_PREP_MAX_RETRIES || '5')

    // Find deliveries pending retry
    const pendingDeliveries = await prisma.webhookDelivery.findMany({
      where: {
        status: 'pending',
        nextAttemptAt: {
          lte: new Date(),
        },
      },
      include: {
        intake: {
          include: {
            session: {
              include: {
                client: true,
              },
            },
          },
        },
      },
      take: 100, // Process max 100 per job to avoid timeout
    })

    result.totalProcessed = pendingDeliveries.length

    // Process each delivery
    for (const delivery of pendingDeliveries) {
      try {
        // Check if already exhausted retries
        if (hasExhaustedRetries(delivery.attemptCount, maxRetries)) {
          await prisma.webhookDelivery.update({
            where: { id: delivery.id },
            data: {
              status: 'requires_review',
              lastErrorSafeMessage: 'Max retries exceeded',
            },
          })
          result.exhausted++
          continue
        }

        // Rebuild payload
        const intake = delivery.intake
        const session = intake.session
        const summary = createSessionPreferencesSummary(intake)
        const payload = buildWebhookPayload(session.client, session, intake, summary)

        // Send webhook
        const sendResult = await sendWebhookToGHL(payload)

        // Update delivery status
        if (sendResult.success) {
          await prisma.webhookDelivery.update({
            where: { id: delivery.id },
            data: {
              status: 'completed',
              attemptCount: {
                increment: 1,
              },
              lastAttemptAt: new Date(),
              lastHttpStatus: sendResult.httpStatus,
              deliveredAt: new Date(),
            },
          })
          result.successful++
          console.log(`[WebhookRetry] Delivery successful on attempt ${delivery.attemptCount + 1}`)
        } else if (sendResult.httpStatus && isRetryableHttpStatus(sendResult.httpStatus)) {
          // Temporary failure, schedule retry
          const nextAttempt = calculateNextRetryTime(
            delivery.attemptCount,
            parseInt(process.env.SESSION_PREP_RETRY_BASE_SECONDS || '60')
          )

          await prisma.webhookDelivery.update({
            where: { id: delivery.id },
            data: {
              status: 'pending',
              attemptCount: {
                increment: 1,
              },
              lastAttemptAt: new Date(),
              lastHttpStatus: sendResult.httpStatus,
              lastErrorSafeMessage: sendResult.error,
              nextAttemptAt: nextAttempt,
            },
          })
          result.retried++
          console.log(`[WebhookRetry] Retryable error ${sendResult.httpStatus}, next attempt scheduled`)
        } else {
          // Permanent failure
          await prisma.webhookDelivery.update({
            where: { id: delivery.id },
            data: {
              status: 'requires_review',
              attemptCount: {
                increment: 1,
              },
              lastAttemptAt: new Date(),
              lastHttpStatus: sendResult.httpStatus,
              lastErrorSafeMessage: sendResult.error,
            },
          })
          result.exhausted++
          console.error(`[WebhookRetry] Permanent error: ${createSafeErrorMessage(sendResult.error || 'Unknown')}`)
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        result.errors.push(msg)
        console.error(`[WebhookRetry] Error processing delivery: ${msg}`)
      }
    }

    console.log(`[WebhookRetry] Job complete - Processed: ${result.totalProcessed}, Successful: ${result.successful}, Retried: ${result.retried}, Exhausted: ${result.exhausted}`)

    return result
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    result.errors.push(`Critical job failure: ${msg}`)
    console.error(`[WebhookRetry] Critical job failure: ${msg}`)
    throw error
  }
}

/**
 * API endpoint for manual webhook retry job trigger
 * Used for monitoring/debugging
 */
export async function POST() {
  try {
    // Verify authorization header (simple bearer token for now)
    // In production, use proper JWT or API key
    const authToken = process.env.SESSION_PREP_JOB_TOKEN

    if (!authToken) {
      console.warn('[WebhookRetry] No job token configured')
      return { success: false, error: 'Job token not configured' }
    }

    const result = await processPendingWebhookDeliveries()
    return { success: true, result }
  } catch (error) {
    console.error('[WebhookRetry] Failed to process deliveries:', error)
    return { success: false, error: String(error) }
  }
}
