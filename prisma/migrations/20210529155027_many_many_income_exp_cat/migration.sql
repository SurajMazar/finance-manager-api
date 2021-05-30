/*
  Warnings:

  - You are about to drop the column `cat_id` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `cat_id` on the `income` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `expense_ibfk_1`;

-- DropForeignKey
ALTER TABLE `income` DROP FOREIGN KEY `income_ibfk_1`;

-- AlterTable
ALTER TABLE `expense` DROP COLUMN `cat_id`;

-- AlterTable
ALTER TABLE `income` DROP COLUMN `cat_id`;

-- CreateTable
CREATE TABLE `_CategoryToIncome` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToIncome_AB_unique`(`A`, `B`),
    INDEX `_CategoryToIncome_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToExpense` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToExpense_AB_unique`(`A`, `B`),
    INDEX `_CategoryToExpense_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToIncome` ADD FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToIncome` ADD FOREIGN KEY (`B`) REFERENCES `Income`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToExpense` ADD FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToExpense` ADD FOREIGN KEY (`B`) REFERENCES `Expense`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
