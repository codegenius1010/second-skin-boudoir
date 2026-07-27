import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Retrieve all surveys for admin dashboard
export async function GET(request: NextRequest) {
  try {
    const adminToken = request.headers.get('x-admin-token')

    // Verify admin token
    if (adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get query parameters for filtering
    const reviewStatus = request.nextUrl.searchParams.get('reviewStatus')
    const publishToWebsite = request.nextUrl.searchParams.get('publishToWebsite')
    const sortBy = request.nextUrl.searchParams.get('sortBy') || 'submittedAt'
    const sortOrder = request.nextUrl.searchParams.get('sortOrder') || 'desc'

    // Build filter object
    const where: any = {}
    if (reviewStatus) {
      where.reviewStatus = reviewStatus
    }
    if (publishToWebsite !== null) {
      where.publishToWebsite = publishToWebsite === 'true'
    }

    // Build sort object
    const orderBy: any = {}
    orderBy[sortBy] = sortOrder

    // Query surveys
    const surveys = await prisma.postShootSurvey.findMany({
      where,
      orderBy,
      include: {
        session: {
          select: {
            id: true,
            clientId: true,
            sessionDate: true,
            client: {
              select: {
                firstName: true,
                lastName: true,
                emailNormalized: true,
              },
            },
          },
        },
      },
    })

    // Get summary stats
    const stats = {
      total: surveys.length,
      pending: surveys.filter(s => s.reviewStatus === 'pending').length,
      approved: surveys.filter(s => s.reviewStatus === 'approved').length,
      rejected: surveys.filter(s => s.reviewStatus === 'rejected').length,
      published: surveys.filter(s => s.publishToWebsite).length,
      averageRating:
        surveys.length > 0
          ? (
              surveys.reduce((sum, s) => sum + s.overallRating, 0) /
              surveys.length
            ).toFixed(2)
          : 0,
    }

    return NextResponse.json(
      {
        surveys,
        stats,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error retrieving surveys:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve surveys' },
      { status: 500 }
    )
  }
}

// PATCH - Update survey (approve/reject/publish)
export async function PATCH(request: NextRequest) {
  try {
    const adminToken = request.headers.get('x-admin-token')

    // Verify admin token
    if (adminToken !== process.env.SESSION_PREP_ADMIN_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { surveyId, reviewStatus, publishToWebsite } = data

    if (!surveyId) {
      return NextResponse.json(
        { error: 'surveyId is required' },
        { status: 400 }
      )
    }

    // Build update object
    const updateData: any = {}
    if (reviewStatus) {
      if (!['pending', 'approved', 'rejected'].includes(reviewStatus)) {
        return NextResponse.json(
          { error: 'Invalid reviewStatus' },
          { status: 400 }
        )
      }
      updateData.reviewStatus = reviewStatus
    }
    if (publishToWebsite !== undefined) {
      updateData.publishToWebsite = publishToWebsite
    }

    // Update survey
    const survey = await prisma.postShootSurvey.update({
      where: { id: surveyId },
      data: updateData,
      include: {
        session: {
          select: {
            id: true,
            clientId: true,
            client: {
              select: {
                firstName: true,
                lastName: true,
                emailNormalized: true,
              },
            },
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Survey updated successfully',
        survey,
      },
      { status: 200 }
    )
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Survey not found' },
        { status: 404 }
      )
    }
    console.error('Error updating survey:', error)
    return NextResponse.json(
      { error: 'Failed to update survey' },
      { status: 500 }
    )
  }
}
