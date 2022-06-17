-- CreateTable
CREATE TABLE "Release" (
    "id" SERIAL NOT NULL,
    "appVersion" TEXT NOT NULL,
    "appType" TEXT,
    "sourceMaps" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Release_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
