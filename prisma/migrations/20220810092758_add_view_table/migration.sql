/*
  Warnings:

  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Setting";

-- CreateTable
CREATE TABLE "PageView" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,
    "appVersion" TEXT,
    "appType" TEXT,
    "releaseStage" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "category" TEXT,
    "type" TEXT NOT NULL,
    "sdk" JSONB NOT NULL,
    "device" JSONB NOT NULL,
    "path" TEXT NOT NULL,
    "user" JSONB,
    "actions" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserView" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,
    "appVersion" TEXT,
    "appType" TEXT,
    "releaseStage" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "category" TEXT,
    "type" TEXT NOT NULL,
    "sdk" JSONB NOT NULL,
    "device" JSONB NOT NULL,
    "path" TEXT NOT NULL,
    "user" JSONB,
    "actions" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageView_apiKey_idx" ON "PageView"("apiKey");

-- CreateIndex
CREATE INDEX "PageView_createdAt_idx" ON "PageView" USING BRIN ("createdAt" timestamp_bloom_ops);

-- CreateIndex
CREATE INDEX "UserView_apiKey_idx" ON "UserView"("apiKey");

-- CreateIndex
CREATE INDEX "UserView_createdAt_idx" ON "UserView" USING BRIN ("createdAt" timestamp_bloom_ops);
