/*
  Warnings:

  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `_LogToTag` DROP FOREIGN KEY `_LogToTag_B_fkey`;

-- DropForeignKey
ALTER TABLE `_NoteToTag` DROP FOREIGN KEY `_NoteToTag_B_fkey`;

-- AlterTable
ALTER TABLE `Tag` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `_LogToTag` MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_NoteToTag` MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `_NoteToTag` ADD CONSTRAINT `_NoteToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LogToTag` ADD CONSTRAINT `_LogToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
