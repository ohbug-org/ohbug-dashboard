-- AlterTable
ALTER TABLE "EventUser" ALTER COLUMN "metadata" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "EventUser_ipAddress_uuid_email_name_metadata_idx" ON "EventUser"("ipAddress", "uuid", "email", "name", "metadata");
