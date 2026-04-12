-- CreateTable
CREATE TABLE "LeadCapture" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "source" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deliveryStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "deliveryAttemptedAt" TIMESTAMP(3),
    "deliveryError" TEXT,
    "crmStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "crmAttemptedAt" TIMESTAMP(3),
    "crmError" TEXT,
    CONSTRAINT "LeadCapture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupportRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "issueType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "source" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "notificationAttemptedAt" TIMESTAMP(3),
    "notificationError" TEXT,
    "crmStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "crmAttemptedAt" TIMESTAMP(3),
    "crmError" TEXT,
    CONSTRAINT "SupportRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadCapture_email_createdAt_idx" ON "LeadCapture"("email", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "LeadCapture_interest_createdAt_idx" ON "LeadCapture"("interest", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "SupportRequest_email_createdAt_idx" ON "SupportRequest"("email", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "SupportRequest_issueType_createdAt_idx" ON "SupportRequest"("issueType", "createdAt" DESC);
