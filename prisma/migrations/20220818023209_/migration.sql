/*
  Warnings:

  - You are about to drop the column `actions` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `actions` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the column `actions` on the `PageView` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `PageView` table. All the data in the column will be lost.
  - You are about to drop the column `actions` on the `UserView` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `UserView` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "actions",
DROP COLUMN "metadata";

-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "actions",
DROP COLUMN "metadata";

-- AlterTable
ALTER TABLE "PageView" DROP COLUMN "actions",
DROP COLUMN "metadata";

-- AlterTable
ALTER TABLE "UserView" DROP COLUMN "actions",
DROP COLUMN "metadata";
