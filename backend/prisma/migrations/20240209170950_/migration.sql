/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Note` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Note_categoryId_fkey` ON `Note`;

-- AlterTable
ALTER TABLE `Note` DROP COLUMN `categoryId`;
