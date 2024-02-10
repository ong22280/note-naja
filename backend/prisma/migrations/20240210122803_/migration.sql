/*
  Warnings:

  - Added the required column `category` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Log` ADD COLUMN `category` ENUM('WORK', 'PERSONAL', 'OTHERS') NOT NULL;

-- CreateTable
CREATE TABLE `_LogToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_LogToTag_AB_unique`(`A`, `B`),
    INDEX `_LogToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LogToTag` ADD CONSTRAINT `_LogToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Log`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LogToTag` ADD CONSTRAINT `_LogToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
