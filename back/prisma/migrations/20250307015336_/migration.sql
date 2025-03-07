/*
  Warnings:

  - A unique constraint covering the columns `[fileName]` on the table `post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `post_fileName_key` ON `post`(`fileName`);
