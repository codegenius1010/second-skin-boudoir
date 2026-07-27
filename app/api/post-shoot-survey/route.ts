import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const {
      sessionId,
      overallRating,
      overallReview,
      favoritePart,
      comfortConfidenceRating,
      improvementSuggestions,
      wouldRecommend,
      recommendationNotes,
    } = data

    // Validate required fields
    if (!sessionId || !overallRating) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId and overallRating' },
        { status: 400 }
      )
    }

    // Validate rating is 1-5
    if (overallRating < 1 || overallRating > 5) {
      return NextResponse.json(
        { error: 'overallRating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if session exists
    const session = await prisma.photographySession.findUnique({
      where: { id: sessionId },
      select: { id: true, clientId: true, agreementStatus: true },
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Photography session not found' },
        { status: 404 }
      )
    }

    // Check if survey already exists for this session
    const existingSurvey = await prisma.postShootSurvey.findUnique({
      where: { sessionId },
    })

    if (existingSurvey) {
      return NextResponse.json(
        { error: 'Survey already submitted for this session' },
        { status: 400 }
      )
    }

    // Create the survey
    const survey = await prisma.postShootSurvey.create({
      data: {
        sessionId,
        overallRating,
        overallReview: overallReview || null,
        favoritePart: favoritePart || null,
        comfortConfidenceRating: comfortConfidenceRating || null,
        improvementSuggestions: improvementSuggestions || null,
        wouldRecommend: wouldRecommend !== undefined ? wouldRecommend : null,
        recommendationNotes: recommendationNotes || null,
        reviewStatus: 'pending',
        publishToWebsite: false,
      },
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
        message: 'Survey submitted successfully',
        survey,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting survey:', error)
    return NextResponse.json(
      { error: 'Failed to submit survey' },
      { status: 500 }
    )
  }
}

// GET - Retrieve survey by session ID (for survey view page)
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId query parameter is required' },
        { status: 400 }
      )
    }

    const survey = await prisma.postShootSurvey.findUnique({
      where: { sessionId },
      include: {
        session: {
          select: {
            id: true,
            clientId: true,
            client: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    })

    if (!survey) {
      return NextResponse.json(
        { error: 'Survey not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ survey }, { status: 200 })
  } catch (error) {
    console.error('Error retrieving survey:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve survey' },
      { status: 500 }
    )
  }
}
