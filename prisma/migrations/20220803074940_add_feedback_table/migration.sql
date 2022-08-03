-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "appVersion" TEXT,
    "appType" TEXT,
    "releaseStage" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "category" TEXT,
    "type" TEXT NOT NULL,
    "sdk" JSONB NOT NULL,
    "detail" JSONB NOT NULL,
    "device" JSONB NOT NULL,
    "user" JSONB,
    "actions" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Feedback_apiKey_idx" ON "Feedback"("apiKey");

-- CreateIndex
CREATE INDEX "Feedback_createdAt_idx" ON "Feedback" USING BRIN ("createdAt" timestamp_bloom_ops);
