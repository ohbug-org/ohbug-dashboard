/*
  Warnings:

  - Added the required column `githubClientSecret` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "githubClientSecret" TEXT NOT NULL;
