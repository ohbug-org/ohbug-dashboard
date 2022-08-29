-- DropForeignKey
ALTER TABLE "EventUsersOnIssues" DROP CONSTRAINT "EventUsersOnIssues_eventUserId_fkey";

-- DropForeignKey
ALTER TABLE "EventUsersOnIssues" DROP CONSTRAINT "EventUsersOnIssues_issueId_fkey";

-- AddForeignKey
ALTER TABLE "EventUsersOnIssues" ADD CONSTRAINT "EventUsersOnIssues_eventUserId_fkey" FOREIGN KEY ("eventUserId") REFERENCES "EventUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventUsersOnIssues" ADD CONSTRAINT "EventUsersOnIssues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
