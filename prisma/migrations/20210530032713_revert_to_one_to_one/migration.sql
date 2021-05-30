/*
  Warnings:

  - You are about to drop the `_categorytoincome` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_categorytoexpense` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cat_id` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cat_id` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytoincome` DROP FOREIGN KEY `_categorytoincome_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_categorytoincome` DROP FOREIGN KEY `_categorytoincome_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_categorytoexpense` DROP FOREIGN KEY `_categorytoexpense_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_categorytoexpense` DROP FOREIGN KEY `_categorytoexpense_ibfk_2`;

-- AlterTable
ALTER TABLE `expense` ADD COLUMN `cat_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `income` ADD COLUMN `cat_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_categorytoincome`;

-- DropTable
DROP TABLE `_categorytoexpense`;

-- AddForeignKey
ALTER TABLE `Expense` ADD FOREIGN KEY (`cat_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD FOREIGN KEY (`cat_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
