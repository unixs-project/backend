/*
  Warnings:

  - Added the required column `outro_filho` to the `fluxos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fluxos` ADD COLUMN `outro_filho` INTEGER NOT NULL;
