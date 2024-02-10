/*
  Warnings:

  - Added the required column `title` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Log` ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Note` ADD COLUMN `title` VARCHAR(191) NOT NULL;
