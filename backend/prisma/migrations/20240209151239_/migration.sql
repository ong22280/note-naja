/*
  Warnings:

  - You are about to alter the column `name` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Category` MODIFY `name` ENUM('WORK', 'PERSONAL', 'OTHERS') NOT NULL;
