/*
  Warnings:

  - Added the required column `eventId` to the `AlertEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AlertEvent" ADD COLUMN     "eventId" INTEGER NOT NULL;
