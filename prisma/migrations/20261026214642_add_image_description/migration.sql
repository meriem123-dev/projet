-- AlterTable
ALTER TABLE `posts` ADD COLUMN `description` TEXT NULL DEFAULT '',
    ADD COLUMN `image` VARCHAR(191) NULL;
