-- AlterTable
ALTER TABLE "AlertEvent" ALTER COLUMN "eventId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "AlertEvent" ADD CONSTRAINT "AlertEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
