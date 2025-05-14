/*
  Warnings:

  - The primary key for the `address_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `address_category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `alert_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `alert_category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `change_point` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `change_point` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `change_point` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `created_at` on the `change_point` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `food_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `food_category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `inquire` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `inquire` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `inquire` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `inquire_category_id` on the `inquire` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `created_at` on the `inquire` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `inquire` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `inquire_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `inquire_category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `mission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `created_at` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `option_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `option_category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `point` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `point` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `point` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `point` on the `point` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `created_at` on the `review` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `review` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_category_id` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `address_category_id` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `created_at` on the `store` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `store` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `store_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `store_category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `created_at` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `inactive_date` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `user_alert` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user_alert` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `user_alert` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `alert_category_id` on the `user_alert` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `user_food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user_food` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `user_food` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `food_category_id` on the `user_food` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `user_mission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user_mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `user_mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `mission_id` on the `user_mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `created_at` on the `user_mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `user_mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `user_option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user_option` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `user_id` on the `user_option` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `option_category_id` on the `user_option` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `change_point` DROP FOREIGN KEY `change_point_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `inquire` DROP FOREIGN KEY `inquire_inquire_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `inquire` DROP FOREIGN KEY `inquire_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `mission_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `point` DROP FOREIGN KEY `point_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `store_address_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `store_store_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_alert` DROP FOREIGN KEY `user_alert_alert_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_alert` DROP FOREIGN KEY `user_alert_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_food` DROP FOREIGN KEY `user_food_food_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_food` DROP FOREIGN KEY `user_food_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_mission` DROP FOREIGN KEY `user_mission_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_option` DROP FOREIGN KEY `user_option_option_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_option` DROP FOREIGN KEY `user_option_user_id_fkey`;

-- DropIndex
DROP INDEX `change_point_user_id_fkey` ON `change_point`;

-- DropIndex
DROP INDEX `inquire_inquire_category_id_fkey` ON `inquire`;

-- DropIndex
DROP INDEX `inquire_user_id_fkey` ON `inquire`;

-- DropIndex
DROP INDEX `mission_store_id_fkey` ON `mission`;

-- DropIndex
DROP INDEX `point_user_id_fkey` ON `point`;

-- DropIndex
DROP INDEX `review_store_id_fkey` ON `review`;

-- DropIndex
DROP INDEX `review_user_id_fkey` ON `review`;

-- DropIndex
DROP INDEX `store_address_category_id_fkey` ON `store`;

-- DropIndex
DROP INDEX `store_store_category_id_fkey` ON `store`;

-- DropIndex
DROP INDEX `user_alert_alert_category_id_fkey` ON `user_alert`;

-- DropIndex
DROP INDEX `user_alert_user_id_fkey` ON `user_alert`;

-- DropIndex
DROP INDEX `user_food_food_category_id_fkey` ON `user_food`;

-- DropIndex
DROP INDEX `user_food_user_id_fkey` ON `user_food`;

-- DropIndex
DROP INDEX `user_mission_mission_id_fkey` ON `user_mission`;

-- DropIndex
DROP INDEX `user_mission_user_id_fkey` ON `user_mission`;

-- DropIndex
DROP INDEX `user_option_option_category_id_fkey` ON `user_option`;

-- DropIndex
DROP INDEX `user_option_user_id_fkey` ON `user_option`;

-- AlterTable
ALTER TABLE `address_category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `alert_category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `change_point` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    MODIFY `created_at` DATETIME NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `food_category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `inquire` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    MODIFY `inquire_category_id` INTEGER NULL,
    MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `inquire_category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `mission` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `store_id` INTEGER NULL,
    MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `option_category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `point` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    MODIFY `point` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `review` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    MODIFY `store_id` INTEGER NULL,
    MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `store` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `store_category_id` INTEGER NULL,
    MODIFY `address_category_id` INTEGER NULL,
    MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `store_category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL,
    MODIFY `inactive_date` DATETIME NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_alert` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    MODIFY `alert_category_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_food` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    MODIFY `food_category_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_mission` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    MODIFY `mission_id` INTEGER NULL,
    MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_option` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NULL,
    MODIFY `option_category_id` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_store_category_id_fkey` FOREIGN KEY (`store_category_id`) REFERENCES `store_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_address_category_id_fkey` FOREIGN KEY (`address_category_id`) REFERENCES `address_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `change_point` ADD CONSTRAINT `change_point_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquire` ADD CONSTRAINT `inquire_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquire` ADD CONSTRAINT `inquire_inquire_category_id_fkey` FOREIGN KEY (`inquire_category_id`) REFERENCES `inquire_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `point_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_alert` ADD CONSTRAINT `user_alert_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_alert` ADD CONSTRAINT `user_alert_alert_category_id_fkey` FOREIGN KEY (`alert_category_id`) REFERENCES `alert_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_food` ADD CONSTRAINT `user_food_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_food` ADD CONSTRAINT `user_food_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_option` ADD CONSTRAINT `user_option_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_option` ADD CONSTRAINT `user_option_option_category_id_fkey` FOREIGN KEY (`option_category_id`) REFERENCES `option_category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
