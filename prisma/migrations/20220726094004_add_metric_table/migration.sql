-- CreateTable
CREATE TABLE "Metric" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "appVersion" TEXT,
    "appType" TEXT,
    "releaseStage" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "category" TEXT,
    "type" TEXT NOT NULL,
    "sdk" JSONB NOT NULL,
    "device" JSONB NOT NULL,
    "user" JSONB,
    "actions" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CLS" DOUBLE PRECISION,
    "FCP" DOUBLE PRECISION,
    "FID" DOUBLE PRECISION,
    "LCP" DOUBLE PRECISION,
    "TTFB" DOUBLE PRECISION,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Metric_apiKey_idx" ON "Metric"("apiKey");

-- CreateIndex
CREATE INDEX "Metric_createdAt_idx" ON "Metric" USING BRIN ("createdAt" timestamp_bloom_ops);
