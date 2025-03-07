/*
  Warnings:

  - You are about to drop the column `mensagem` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `mensagem`,
    ADD COLUMN `message` VARCHAR(191) NULL;
