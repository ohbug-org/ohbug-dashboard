-- CreateEnum
CREATE TYPE "AlertLevel" AS ENUM ('serious', 'warning', 'default');

-- CreateTable
CREATE TABLE "Event" (
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
    "actions" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

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
    "CLS" DOUBLE PRECISION,
    "FCP" DOUBLE PRECISION,
    "FID" DOUBLE PRECISION,
    "LCP" DOUBLE PRECISION,
    "TTFB" DOUBLE PRECISION,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

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
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

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
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

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
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventUser" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "uuid" TEXT,
    "email" TEXT,
    "name" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventUsersOnIssues" (
    "issueId" TEXT NOT NULL,
    "eventUserId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventUsersOnIssues_pkey" PRIMARY KEY ("issueId","eventUserId")
);

-- CreateTable
CREATE TABLE "EventUsersOnProjects" (
    "eventUserId" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventUsersOnProjects_pkey" PRIMARY KEY ("eventUserId","apiKey")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Release" (
    "id" SERIAL NOT NULL,
    "appVersion" TEXT NOT NULL,
    "appType" TEXT,
    "sourceMaps" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,
    "apiKey" TEXT NOT NULL,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "releaseStage" TEXT NOT NULL DEFAULT 'production',
    "level" "AlertLevel" NOT NULL,
    "interval" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "actions" JSONB NOT NULL,
    "conditions" JSONB NOT NULL,
    "filters" JSONB NOT NULL,
    "conditionMatch" TEXT NOT NULL,
    "filterMatch" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recentlyAt" TIMESTAMP(3),
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertEvent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alertId" INTEGER NOT NULL,
    "eventId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,

    CONSTRAINT "AlertEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT,
    "expiresAt" INTEGER,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "scope" TEXT,
    "refreshToken" TEXT,
    "sessionState" TEXT,
    "idToken" TEXT,
    "tokenType" TEXT,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnProjects" (
    "userId" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnProjects_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "Event_apiKey_idx" ON "Event"("apiKey");

-- CreateIndex
CREATE INDEX "Event_createdAt_idx" ON "Event" USING BRIN ("createdAt" timestamp_bloom_ops);

-- CreateIndex
CREATE INDEX "Metric_apiKey_idx" ON "Metric"("apiKey");

-- CreateIndex
CREATE INDEX "Metric_createdAt_idx" ON "Metric" USING BRIN ("createdAt" timestamp_bloom_ops);

-- CreateIndex
CREATE INDEX "Feedback_apiKey_idx" ON "Feedback"("apiKey");

-- CreateIndex
CREATE INDEX "Feedback_createdAt_idx" ON "Feedback" USING BRIN ("createdAt" timestamp_bloom_ops);

-- CreateIndex
CREATE INDEX "PageView_apiKey_idx" ON "PageView"("apiKey");

-- CreateIndex
CREATE INDEX "PageView_createdAt_idx" ON "PageView" USING BRIN ("createdAt" timestamp_bloom_ops);

-- CreateIndex
CREATE INDEX "UserView_apiKey_idx" ON "UserView"("apiKey");

-- CreateIndex
CREATE INDEX "UserView_createdAt_idx" ON "UserView" USING BRIN ("createdAt" timestamp_bloom_ops);

-- CreateIndex
CREATE INDEX "Issue_apiKey_metadata_idx" ON "Issue"("apiKey", "metadata");

-- CreateIndex
CREATE UNIQUE INDEX "Project_apiKey_key" ON "Project"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE INDEX "AlertEvent_createdAt_idx" ON "AlertEvent" USING BRIN ("createdAt" timestamp_bloom_ops);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "EventUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "EventUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "EventUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageView" ADD CONSTRAINT "PageView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "EventUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserView" ADD CONSTRAINT "UserView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "EventUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUsersOnIssues" ADD CONSTRAINT "EventUsersOnIssues_eventUserId_fkey" FOREIGN KEY ("eventUserId") REFERENCES "EventUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUsersOnIssues" ADD CONSTRAINT "EventUsersOnIssues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUsersOnProjects" ADD CONSTRAINT "EventUsersOnProjects_eventUserId_fkey" FOREIGN KEY ("eventUserId") REFERENCES "EventUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUsersOnProjects" ADD CONSTRAINT "EventUsersOnProjects_apiKey_fkey" FOREIGN KEY ("apiKey") REFERENCES "Project"("apiKey") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertEvent" ADD CONSTRAINT "AlertEvent_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "Alert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertEvent" ADD CONSTRAINT "AlertEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertEvent" ADD CONSTRAINT "AlertEvent_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnProjects" ADD CONSTRAINT "UsersOnProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnProjects" ADD CONSTRAINT "UsersOnProjects_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
