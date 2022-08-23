/*
  Warnings:

  - You are about to drop the column `path` on the `PageView` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `UserView` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PageView" DROP COLUMN "path";

-- AlterTable
ALTER TABLE "UserView" DROP COLUMN "path";
