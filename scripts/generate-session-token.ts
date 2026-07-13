#!/usr/bin/env node

/**
 * Generate a new session prep token for a client
 * Usage: npx ts-node scripts/generate-session-token.ts --email client@example.com --name "Jane Doe"
 */

import { prisma } from '@/lib/prisma'
import { generateSecureToken, hashToken } from '@/lib/session-prep-utils'
import fs from 'fs'
import path from 'path'

async function main() {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2)
    const emailIdx = args.indexOf('--email')
    const nameIdx = args.indexOf('--name')
    const phoneIdx = args.indexOf('--phone')
    const typeIdx = args.indexOf('--type')
    const dateIdx = args.indexOf('--date')
    const locationIdx = args.indexOf('--location')

    if (emailIdx === -1 || nameIdx === -1) {
      console.error('Usage: npx ts-node scripts/generate-session-token.ts --email <email> --name "<full name>" [--phone <phone>] [--type <type>] [--date <YYYY-MM-DD>] [--location <location>]')
      console.error('\nExample:')
      console.error('  npx ts-node scripts/generate-session-token.ts --email jane@example.com --name "Jane Doe" --type "Boudoir" --date "2024-08-15"')
      process.exit(1)
    }

    const email = args[emailIdx + 1]
    const fullName = args[nameIdx + 1]
    const phone = phoneIdx !== -1 ? args[phoneIdx + 1] : undefined
    const sessionType = typeIdx !== -1 ? args[typeIdx + 1] : 'Boudoir'
    const sessionDate = dateIdx !== -1 ? new Date(args[dateIdx + 1]) : undefined
    const sessionLocation = locationIdx !== -1 ? args[locationIdx + 1] : 'Destin Studio'

    // Parse name
    const nameParts = fullName.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ')

    console.log('\n📝 Creating new session prep link...\n')
    console.log(`Email: ${email}`)
    console.log(`Name: ${firstName} ${lastName}`)
    if (phone) console.log(`Phone: ${phone}`)
    console.log(`Session Type: ${sessionType}`)
    if (sessionDate) console.log(`Session Date: ${sessionDate.toISOString().split('T')[0]}`)
    console.log(`Location: ${sessionLocation}`)

    // Check if client exists
    let client = await prisma.client.findUnique({
      where: { emailNormalized: email.toLowerCase().trim() },
    })

    if (!client) {
      console.log('\n➕ Creating new client...')
      client = await prisma.client.create({
        data: {
          firstName,
          lastName,
          emailNormalized: email.toLowerCase().trim(),
          phoneNormalized: phone ? phone.replace(/\D/g, '').slice(-10) : undefined,
        },
      })
      console.log(`✓ Client created: ${client.id}`)
    } else {
      console.log(`✓ Client found: ${client.id}`)
    }

    // Generate secure token
    const plainToken = generateSecureToken()
    const tokenHash = hashToken(plainToken)

    // Set expiration (30 days from now)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    console.log('\n🔐 Creating photography session...')

    // Create photography session
    const session = await prisma.photographySession.create({
      data: {
        clientId: client.id,
        sessionType,
        sessionDate: sessionDate || undefined,
        sessionLocation,
        agreementStatus: 'pending',
        securePrepTokenHash: tokenHash,
        securePrepTokenExpiresAt: expiresAt,
      },
    })

    console.log(`✓ Session created: ${session.id}`)

    // Generate link
    const link = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/session-prep/${plainToken}`

    console.log('\n✅ Session prep link generated!\n')
    console.log('📧 Share this link with the client:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(link)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`\n⏰ Token expires: ${expiresAt.toISOString().split('T')[0]}`)
    console.log(`📌 Session ID: ${session.id}`)
    console.log(`📌 Client ID: ${client.id}`)

    // Optionally save to file
    const outputPath = path.join(process.cwd(), `.session-tokens-${Date.now()}.txt`)
    fs.writeFileSync(
      outputPath,
      `Session Prep Link for ${firstName} ${lastName}
Email: ${email}
Generated: ${new Date().toISOString()}
Expires: ${expiresAt.toISOString()}

Link: ${link}

Session ID: ${session.id}
Client ID: ${client.id}

⚠️  Keep this file secure. The token should only be shared with the intended client.`
    )

    console.log(`\n💾 Saved to: ${outputPath}`)
    console.log()
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
