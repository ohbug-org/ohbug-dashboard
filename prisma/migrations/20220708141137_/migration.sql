/*
  Warnings:

  - Added the required column `filters` to the `Alert` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AlertMatch" AS ENUM ('all', 'every');

-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "conditionMatch" "AlertMatch" NOT NULL DEFAULT 'all',
ADD COLUMN     "filterMatch" "AlertMatch" NOT NULL DEFAULT 'all',
ADD COLUMN     "filters" JSONB NOT NULL;
