#!/usr/bin/env node

/**
 * Safely run Prisma migrations
 * This script attempts to run migrations but doesn't fail the build if the database is unreachable
 * Used during CI/CD deployments where the build environment may not have DB access
 */

const { execSync } = require('child_process')

async function runMigrations() {
  try {
    console.log('[Migration] Starting Prisma migrations...')
    execSync('npx prisma migrate deploy --skip-generate', { stdio: 'inherit' })
    console.log('[Migration] ✅ Migrations completed successfully')
    process.exit(0)
  } catch (error) {
    if (error.message && error.message.includes('Can\'t reach database')) {
      console.warn('[Migration] ⚠️  Database not reachable during build. This is normal in CI/CD environments.')
      console.warn('[Migration] Migrations will need to be run after deployment when DB is accessible.')
      console.warn('[Migration] To run migrations manually: npm run migrate')
      process.exit(0) // Don't fail the build
    } else {
      console.error('[Migration] ❌ Migration failed:', error.message)
      process.exit(1)
    }
  }
}

runMigrations()
