import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/admin/session-prep/submissions
 * Fetch all session prep submissions with optional filtering
 * Query params:
 * - status: draft | submitted (filter)
 * - clientEmail: string (search)
 * - clientName: string (search by firstName or lastName)
 * - sessionType: string (filter)
 * - page: number (pagination, default: 1)
 * - limit: number (results per page, default: 20)
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const clientEmail = searchParams.get('clientEmail')
    const clientName = searchParams.get('clientName')
    const sessionType = searchParams.get('sessionType')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build where clause
    const where: Record<string, unknown> = {}

    if (status) {
      where.intakes = {
        some: {
          status,
        },
      }
    }

    // Build client filter - handle name and email searches
    if (clientName && clientEmail) {
      // Both filters: email AND (firstName OR lastName)
      where.client = {
        AND: [
          {
            emailNormalized: {
              contains: clientEmail.toLowerCase(),
              mode: 'insensitive',
            },
          },
          {
            OR: [
              {
                firstName: {
                  contains: clientName,
                  mode: 'insensitive',
                },
              },
              {
                lastName: {
                  contains: clientName,
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
      }
    } else if (clientEmail) {
      // Email only
      where.client = {
        emailNormalized: {
          contains: clientEmail.toLowerCase(),
          mode: 'insensitive',
        },
      }
    } else if (clientName) {
      // Name only: firstName OR lastName
      where.client = {
        OR: [
          {
            firstName: {
              contains: clientName,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: clientName,
              mode: 'insensitive',
            },
          },
        ],
      }
    }

    if (sessionType) {
      where.sessionType = sessionType
    }

    // Fetch sessions with intakes and webhook deliveries
    const [sessions, total] = await Promise.all([
      prisma.photographySession.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              emailNormalized: true,
              phoneNormalized: true,
            },
          },
          intakes: {
            select: {
              id: true,
              status: true,
              submittedAt: true,
            },
            orderBy: { submittedAt: 'desc' },
            take: 1,
          },
          webhookDeliveries: {
            select: {
              id: true,
              status: true,
              attemptCount: true,
              lastAttemptAt: true,
              lastErrorSafeMessage: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.photographySession.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json(
      {
        success: true,
        data: sessions.map((session) => ({
          id: session.id,
          sessionType: session.sessionType,
          sessionDate: session.sessionDate?.toISOString(),
          sessionLocation: session.sessionLocation,
          client: session.client,
          intake: session.intakes[0] || null,
          webhook: session.webhookDeliveries[0] || null,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Admin] Submissions fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
