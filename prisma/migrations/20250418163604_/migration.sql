/*
  Warnings:

  - The `bytes` column on the `Image` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "frames" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "bytes",
ADD COLUMN     "bytes" TEXT[];
