-- CreateTable
CREATE TABLE "PostShootSurvey" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "favoritePart" TEXT,
    "comfortConfidenceRating" INTEGER,
    "improvementSuggestions" TEXT,
    "wouldRecommend" BOOLEAN,
    "recommendationNotes" TEXT,
    "reviewStatus" TEXT NOT NULL DEFAULT 'pending',
    "publishToWebsite" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostShootSurvey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostShootSurvey_sessionId_key" ON "PostShootSurvey"("sessionId");

-- CreateIndex
CREATE INDEX "PostShootSurvey_sessionId_idx" ON "PostShootSurvey"("sessionId");

-- CreateIndex
CREATE INDEX "PostShootSurvey_reviewStatus_idx" ON "PostShootSurvey"("reviewStatus");

-- CreateIndex
CREATE INDEX "PostShootSurvey_publishToWebsite_idx" ON "PostShootSurvey"("publishToWebsite");

-- CreateIndex
CREATE INDEX "PostShootSurvey_submittedAt_idx" ON "PostShootSurvey"("submittedAt");

-- AddForeignKey
ALTER TABLE "PostShootSurvey" ADD CONSTRAINT "PostShootSurvey_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "PhotographySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
