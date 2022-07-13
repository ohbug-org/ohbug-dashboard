/*
  Warnings:

  - Added the required column `issueId` to the `AlertEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlertEvent" ADD COLUMN     "issueId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AlertEvent" ADD CONSTRAINT "AlertEvent_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
