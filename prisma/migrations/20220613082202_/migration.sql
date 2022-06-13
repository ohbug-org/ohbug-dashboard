/*
  Warnings:

  - You are about to drop the `UsersOnIssues` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersOnIssues" DROP CONSTRAINT "UsersOnIssues_issueId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnIssues" DROP CONSTRAINT "UsersOnIssues_userId_fkey";

-- DropTable
DROP TABLE "UsersOnIssues";

-- CreateTable
CREATE TABLE "EventUsersOnIssues" (
    "issueId" TEXT NOT NULL,
    "eventUserId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventUsersOnIssues_pkey" PRIMARY KEY ("issueId","eventUserId")
);

-- AddForeignKey
ALTER TABLE "EventUsersOnIssues" ADD CONSTRAINT "EventUsersOnIssues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUsersOnIssues" ADD CONSTRAINT "EventUsersOnIssues_eventUserId_fkey" FOREIGN KEY ("eventUserId") REFERENCES "EventUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
