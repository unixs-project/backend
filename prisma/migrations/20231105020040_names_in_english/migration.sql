/*
  Warnings:

  - You are about to drop the `fluxos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fluxosfilhos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fluxosimagens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `imagens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fluxos` DROP FOREIGN KEY `fluxos_paiId_fkey`;

-- DropTable
DROP TABLE `fluxos`;

-- DropTable
DROP TABLE `fluxosfilhos`;

-- DropTable
DROP TABLE `fluxosimagens`;

-- DropTable
DROP TABLE `imagens`;

-- CreateTable
CREATE TABLE `flows` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NULL,
    `fatherId` INTEGER NULL,
    `html` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `childrenflows` (
    `fatherFlowId` INTEGER NOT NULL,
    `childFlowId` INTEGER NOT NULL,

    PRIMARY KEY (`fatherFlowId`, `childFlowId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(512) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagesflows` (
    `flowId` INTEGER NOT NULL,
    `imageId` INTEGER NOT NULL,

    PRIMARY KEY (`flowId`, `imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `flows` ADD CONSTRAINT `flows_fatherId_fkey` FOREIGN KEY (`fatherId`) REFERENCES `flows`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
