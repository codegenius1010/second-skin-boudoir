-- CreateTable
CREATE TABLE "ConsentAuditTrail" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "intakeId" TEXT,
    "consentType" TEXT NOT NULL,
    "consentText" TEXT NOT NULL,
    "consentVersion" TEXT NOT NULL DEFAULT '1.0',
    "userConsented" BOOLEAN NOT NULL,
    "consentGivenAt" TIMESTAMP(3) NOT NULL,
    "submittedIpHash" TEXT,
    "userAgentSummary" TEXT,
    "digitalSignature" TEXT,
    "signatureMethod" TEXT,
    "esignProvider" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsentAuditTrail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConsentAuditTrail_sessionId_idx" ON "ConsentAuditTrail"("sessionId");

-- CreateIndex
CREATE INDEX "ConsentAuditTrail_intakeId_idx" ON "ConsentAuditTrail"("intakeId");

-- CreateIndex
CREATE INDEX "ConsentAuditTrail_consentType_idx" ON "ConsentAuditTrail"("consentType");

-- CreateIndex
CREATE INDEX "ConsentAuditTrail_consentGivenAt_idx" ON "ConsentAuditTrail"("consentGivenAt");

-- CreateIndex
CREATE INDEX "ConsentAuditTrail_userConsented_idx" ON "ConsentAuditTrail"("userConsented");

-- CreateIndex
CREATE UNIQUE INDEX "ConsentAuditTrail_sessionId_consentType_consentVersion_cons_key" ON "ConsentAuditTrail"("sessionId", "consentType", "consentVersion", "consentGivenAt");

-- AddForeignKey
ALTER TABLE "ConsentAuditTrail" ADD CONSTRAINT "ConsentAuditTrail_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "PhotographySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsentAuditTrail" ADD CONSTRAINT "ConsentAuditTrail_intakeId_fkey" FOREIGN KEY ("intakeId") REFERENCES "SessionIntake"("id") ON DELETE SET NULL ON UPDATE CASCADE;
