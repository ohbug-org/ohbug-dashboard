-- DropIndex
DROP INDEX "Issue_apiKey_idx";

-- CreateIndex
CREATE INDEX "Issue_apiKey_metadata_idx" ON "Issue"("apiKey", "metadata");
