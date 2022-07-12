/*
  Warnings:

  - Changed the type of `conditionMatch` on the `Alert` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `filterMatch` on the `Alert` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "conditionMatch",
ADD COLUMN     "conditionMatch" TEXT NOT NULL,
DROP COLUMN "filterMatch",
ADD COLUMN     "filterMatch" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AlertMatch";
