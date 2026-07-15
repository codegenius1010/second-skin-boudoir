import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createHash } from 'crypto'

/**
 * POST /api/admin/session-prep/consent-audit
 * Record a consent audit trail entry (append-only, immutable for legal compliance)
 * 
 * Body:
 * - sessionId: string (required)
 * - intakeId: string (optional)
 * - consentType: "photo_release" | "image_usage" | "data_collection" | "privacy_acknowledgment" | "agreement_acceptance"
 * - consentText: string (required - full text of what they consented to)
 * - consentVersion: string (default "1.0" - version of consent form)
 * - userConsented: boolean (did they agree?)
 * - submittedIpAddress: string (optional - raw IP, will be hashed)
 * - userAgentSummary: string (optional - browser info)
 * - digitalSignature: string (optional - base64 signature)
 * - signatureMethod: string (optional - "typed_name" | "drawn_signature" | "esign_provider")
 * - esignProvider: string (optional - "docusign" | "hellosign" | etc)
 */
export async function POST(request: NextRequest) {
  try {
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      sessionId,
      intakeId,
      consentType,
      consentText,
      consentVersion = '1.0',
      userConsented,
      submittedIpAddress,
      userAgentSummary,
      digitalSignature,
      signatureMethod,
      esignProvider,
    } = body

    // Validation
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      )
    }

    if (!consentType) {
      return NextResponse.json(
        { error: 'Missing consentType' },
        { status: 400 }
      )
    }

    if (!consentText || typeof consentText !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid consentText' },
        { status: 400 }
      )
    }

    if (typeof userConsented !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing or invalid userConsented' },
        { status: 400 }
      )
    }

    // Hash the IP address if provided (never store raw IP)
    let ipHash: string | null = null
    if (submittedIpAddress) {
      ipHash = createHash('sha256')
        .update(submittedIpAddress)
        .digest('hex')
    }

    // Verify session exists
    const session = await prisma.photographySession.findUnique({
      where: { id: sessionId },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Create the audit trail entry (append-only)
    const auditTrail = await prisma.consentAuditTrail.create({
      data: {
        sessionId,
        intakeId: intakeId || null,
        consentType,
        consentText,
        consentVersion,
        userConsented,
        consentGivenAt: new Date(),
        submittedIpHash: ipHash,
        userAgentSummary: userAgentSummary || null,
        digitalSignature: digitalSignature || null,
        signatureMethod: signatureMethod || null,
        esignProvider: esignProvider || null,
      },
      include: {
        session: {
          select: { id: true, client: { select: { firstName: true, lastName: true } } },
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Consent audit trail recorded (immutable)',
      data: {
        id: auditTrail.id,
        sessionId: auditTrail.sessionId,
        consentType: auditTrail.consentType,
        userConsented: auditTrail.userConsented,
        consentGivenAt: auditTrail.consentGivenAt.toISOString(),
        createdAt: auditTrail.createdAt.toISOString(),
      },
    })
  } catch (error) {
    console.error('Error recording consent audit trail:', error)
    return NextResponse.json(
      { error: 'Failed to record consent audit trail' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/admin/session-prep/consent-audit?sessionId=...&consentType=...
 * Retrieve consent audit trail for a session (read-only historical view)
 * 
 * Query params:
 * - sessionId: string (required)
 * - consentType: string (optional - filter by consent type)
 */
export async function GET(request: NextRequest) {
  try {
    const adminToken = request.headers.get('x-admin-token')
    if (!adminToken || adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')
    const consentType = searchParams.get('consentType')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      )
    }

    // Build filter
    const where: Record<string, unknown> = {
      sessionId,
    }

    if (consentType) {
      where.consentType = consentType
    }

    // Fetch all consent records for this session (ordered by date)
    // Include IP hash for audit trail analysis
    const auditTrailRecords = await prisma.consentAuditTrail.findMany({
      where,
      orderBy: { consentGivenAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      sessionId,
      totalRecords: auditTrailRecords.length,
      data: auditTrailRecords.map(record => ({
        id: record.id,
        consentType: record.consentType,
        consentVersion: record.consentVersion,
        userConsented: record.userConsented,
        consentGivenAt: record.consentGivenAt.toISOString(),
        submittedIpHash: record.submittedIpHash, // Hash only, never raw IP
        userAgentSummary: record.userAgentSummary,
        signatureMethod: record.signatureMethod,
        hasDigitalSignature: !!record.digitalSignature, // Boolean only, never return actual signature
        createdAt: record.createdAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error('Error retrieving consent audit trail:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve consent audit trail' },
      { status: 500 }
    )
  }
}
