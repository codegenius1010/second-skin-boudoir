-- AlterTable
ALTER TABLE "SessionIntake" ADD COLUMN     "agreementAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "agreementAcceptedAt" TIMESTAMP(3),
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;
