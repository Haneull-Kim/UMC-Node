/*
  Warnings:

  - You are about to alter the column `created_at` on the `change_point` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `inquire` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `inquire` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `review` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `review` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `store` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `store` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `inactive_date` on the `user` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created_at` on the `user_mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updated_at` on the `user_mission` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `change_point` MODIFY `created_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `inquire` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `mission` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `store` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL,
    MODIFY `inactive_date` DATETIME NULL;

-- AlterTable
ALTER TABLE `user_mission` MODIFY `created_at` DATETIME NULL,
    MODIFY `updated_at` DATETIME NULL;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` VARCHAR(512) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
