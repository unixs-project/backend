/*
  Warnings:

  - You are about to drop the `fluxostextos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `textos` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `fluxos` ADD COLUMN `html` TEXT NULL;

-- DropTable
DROP TABLE `fluxostextos`;

-- DropTable
DROP TABLE `textos`;
