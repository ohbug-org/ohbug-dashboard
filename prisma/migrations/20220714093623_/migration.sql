-- AlterTable
ALTER TABLE "AlertEvent" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- CreateIndex
CREATE INDEX "AlertEvent_createdAt_idx" ON "AlertEvent" USING BRIN ("createdAt" date_bloom_ops);

-- CreateIndex
CREATE INDEX "Event_apiKey_idx" ON "Event"("apiKey");

-- CreateIndex
CREATE INDEX "Event_createdAt_idx" ON "Event" USING BRIN ("createdAt" date_bloom_ops);

-- CreateIndex
CREATE INDEX "Issue_apiKey_idx" ON "Issue"("apiKey");
