/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Note` DROP FOREIGN KEY `Note_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Note` ADD COLUMN `category` ENUM('WORK', 'PERSONAL', 'OTHERS') NOT NULL;

-- DropTable
DROP TABLE `Category`;
