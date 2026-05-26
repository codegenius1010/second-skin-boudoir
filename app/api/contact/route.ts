import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      sessionType,
      nervousAbout,
      consultationPreference,
      timeframe,
    } = data

    const webhookUrl = process.env.GHL_WEBHOOK_URL

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'GoHighLevel webhook is not configured' },
        { status: 500 }
      )
    }

    // Send data to GoHighLevel webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        city,
        sessionType,
        nervousAbout,
        consultationPreference,
        timeframe,
      }),
    })

    if (!webhookResponse.ok) {
      console.error('GHL Webhook Error:', await webhookResponse.text())
      return NextResponse.json(
        { error: 'Failed to submit inquiry to GoHighLevel' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
