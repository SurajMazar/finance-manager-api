/*
  Warnings:

  - Added the required column `userId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `expense` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `income` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expense` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
