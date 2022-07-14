-- DropIndex
DROP INDEX "AlertEvent_createdAt_idx";

-- DropIndex
DROP INDEX "Event_createdAt_idx";

-- AlterTable
ALTER TABLE "AlertEvent" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP;

-- CreateIndex
CREATE INDEX "AlertEvent_createdAt_idx" ON "AlertEvent" USING BRIN ("createdAt" timestamp_bloom_ops);

-- CreateIndex
CREATE INDEX "Event_createdAt_idx" ON "Event" USING BRIN ("createdAt" timestamp_bloom_ops);
