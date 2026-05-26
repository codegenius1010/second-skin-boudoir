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

    const apiKey = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID
    const pipelineId = process.env.GHL_PIPELINE_ID
    const stageId = process.env.GHL_STAGE_ID

    if (!apiKey || !locationId || !pipelineId || !stageId) {
      return NextResponse.json(
        { error: 'GoHighLevel configuration is missing' },
        { status: 500 }
      )
    }

    // Create contact in GoHighLevel
    const contactResponse = await fetch(
      `https://rest.gohighlevel.com/v1/contacts/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          locationId,
          customField: {
            city,
            sessionType,
            nervousAbout,
            consultationPreference,
            timeframe,
          },
        }),
      }
    )

    if (!contactResponse.ok) {
      console.error('GHL Contact Error:', await contactResponse.text())
      return NextResponse.json(
        { error: 'Failed to create contact in GoHighLevel' },
        { status: 500 }
      )
    }

    const contact = await contactResponse.json()
    const contactId = contact.contact?.id

    // Create opportunity (lead) for the contact
    if (contactId) {
      await fetch(
        `https://rest.gohighlevel.com/v1/opportunities/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contactId,
            locationId,
            pipelineId,
            stageId,
            title: `${firstName} ${lastName} - ${sessionType || 'Session Inquiry'}`,
          }),
        }
      )
    }

    return NextResponse.json({ success: true, contactId })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
