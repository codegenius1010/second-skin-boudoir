-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "emailNormalized" TEXT NOT NULL,
    "phoneNormalized" TEXT,
    "instagramHandle" TEXT,
    "ghlContactId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhotographySession" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    "sessionDate" TIMESTAMP(3),
    "sessionLocation" TEXT,
    "ghlOpportunityId" TEXT,
    "agreementTemplateType" TEXT,
    "agreementStatus" TEXT NOT NULL DEFAULT 'not_sent',
    "agreementDocumentId" TEXT,
    "agreementCompletedAt" TIMESTAMP(3),
    "securePrepTokenHash" TEXT,
    "securePrepTokenExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PhotographySession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionIntake" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "schemaVersion" TEXT NOT NULL DEFAULT '1.0',
    "status" TEXT NOT NULL DEFAULT 'draft',
    "submittedAt" TIMESTAMP(3),
    "desiredFeelings" TEXT NOT NULL DEFAULT '[]',
    "visualStyles" TEXT NOT NULL DEFAULT '[]',
    "posingStyles" TEXT NOT NULL DEFAULT '[]',
    "posingIntensity" TEXT,
    "coveragePreferences" TEXT NOT NULL DEFAULT '[]',
    "coverageDecision" TEXT,
    "hardCoverageBoundaries" TEXT,
    "poseBoundaries" TEXT,
    "cameraAngleBoundaries" TEXT,
    "wardrobeAdjustmentBoundaries" TEXT,
    "areasToEmphasize" TEXT,
    "areasToPhotographDiscreetly" TEXT,
    "favoriteSong" TEXT,
    "favoriteArtists" TEXT,
    "musicGenres" TEXT NOT NULL DEFAULT '[]',
    "playlistUrl" TEXT,
    "explicitLyricsAllowed" TEXT,
    "musicToAvoid" TEXT,
    "wardrobePlans" TEXT NOT NULL DEFAULT '[]',
    "wardrobeGuidanceRequested" BOOLEAN NOT NULL DEFAULT false,
    "clothingSizes" TEXT,
    "favoriteColorsStyles" TEXT,
    "dislikedColorsStyles" TEXT,
    "mobilityPositioningNotes" TEXT,
    "supportPersonAttending" BOOLEAN NOT NULL DEFAULT false,
    "supportPersonName" TEXT,
    "instagramHandle" TEXT,
    "instagramTagPermission" TEXT,
    "collaboratorCreditPermission" TEXT,
    "additionalPrivateNotes" TEXT,
    "ongoingConsentAcknowledged" BOOLEAN NOT NULL DEFAULT false,
    "accurateInformationAcknowledged" BOOLEAN NOT NULL DEFAULT false,
    "submittedIpHash" TEXT,
    "userAgentSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SessionIntake_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookDelivery" (
    "id" TEXT NOT NULL,
    "intakeId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "destination" TEXT NOT NULL DEFAULT 'GHL_SESSION_PREP_WEBHOOK',
    "eventType" TEXT NOT NULL DEFAULT 'session_prep_submitted',
    "schemaVersion" TEXT NOT NULL DEFAULT '1.0',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "nextAttemptAt" TIMESTAMP(3),
    "lastAttemptAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "lastHttpStatus" INTEGER,
    "lastErrorCode" TEXT,
    "lastErrorSafeMessage" TEXT,
    "externalRequestId" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "payloadHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebhookDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_emailNormalized_key" ON "Client"("emailNormalized");

-- CreateIndex
CREATE UNIQUE INDEX "Client_phoneNormalized_key" ON "Client"("phoneNormalized");

-- CreateIndex
CREATE INDEX "Client_emailNormalized_idx" ON "Client"("emailNormalized");

-- CreateIndex
CREATE INDEX "Client_phoneNormalized_idx" ON "Client"("phoneNormalized");

-- CreateIndex
CREATE INDEX "Client_ghlContactId_idx" ON "Client"("ghlContactId");

-- CreateIndex
CREATE UNIQUE INDEX "PhotographySession_securePrepTokenHash_key" ON "PhotographySession"("securePrepTokenHash");

-- CreateIndex
CREATE INDEX "PhotographySession_clientId_idx" ON "PhotographySession"("clientId");

-- CreateIndex
CREATE INDEX "PhotographySession_ghlOpportunityId_idx" ON "PhotographySession"("ghlOpportunityId");

-- CreateIndex
CREATE INDEX "PhotographySession_securePrepTokenHash_idx" ON "PhotographySession"("securePrepTokenHash");

-- CreateIndex
CREATE INDEX "SessionIntake_sessionId_idx" ON "SessionIntake"("sessionId");

-- CreateIndex
CREATE INDEX "SessionIntake_status_idx" ON "SessionIntake"("status");

-- CreateIndex
CREATE INDEX "SessionIntake_submittedAt_idx" ON "SessionIntake"("submittedAt");

-- CreateIndex
CREATE UNIQUE INDEX "WebhookDelivery_idempotencyKey_key" ON "WebhookDelivery"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "WebhookDelivery_payloadHash_key" ON "WebhookDelivery"("payloadHash");

-- CreateIndex
CREATE INDEX "WebhookDelivery_intakeId_idx" ON "WebhookDelivery"("intakeId");

-- CreateIndex
CREATE INDEX "WebhookDelivery_sessionId_idx" ON "WebhookDelivery"("sessionId");

-- CreateIndex
CREATE INDEX "WebhookDelivery_status_idx" ON "WebhookDelivery"("status");

-- CreateIndex
CREATE INDEX "WebhookDelivery_nextAttemptAt_idx" ON "WebhookDelivery"("nextAttemptAt");

-- CreateIndex
CREATE INDEX "WebhookDelivery_idempotencyKey_idx" ON "WebhookDelivery"("idempotencyKey");

-- AddForeignKey
ALTER TABLE "PhotographySession" ADD CONSTRAINT "PhotographySession_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionIntake" ADD CONSTRAINT "SessionIntake_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "PhotographySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebhookDelivery" ADD CONSTRAINT "WebhookDelivery_intakeId_fkey" FOREIGN KEY ("intakeId") REFERENCES "SessionIntake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebhookDelivery" ADD CONSTRAINT "WebhookDelivery_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "PhotographySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
