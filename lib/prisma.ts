import { PrismaClient } from '@prisma/client'
import path from 'path'

declare global {
  var prisma: PrismaClient | undefined
}

// Compute the database URL dynamically based on environment
function getDatabaseUrl() {
  // Use the DATABASE_URL from environment if available
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }

  // Fallback to SQLite for local development without DATABASE_URL
  const projectRoot = process.cwd()
  const dbPath = path.join(projectRoot, 'prisma', 'dev.db')
  return `file:${dbPath}?connection_limit=1`
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // Override the DATABASE_URL at runtime
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}
