-- Add reviewStatus field to SessionIntake
ALTER TABLE "SessionIntake" ADD COLUMN "reviewStatus" TEXT NOT NULL DEFAULT 'needs_review';
