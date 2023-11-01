/*
  Warnings:

  - You are about to drop the `Pessoa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fluxos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Pessoa` DROP FOREIGN KEY `Pessoa_teacherId_fkey`;

-- DropForeignKey
ALTER TABLE `fluxos` DROP FOREIGN KEY `fluxos_fk_fluxo_pai_fkey`;

-- DropTable
DROP TABLE `Pessoa`;

-- DropTable
DROP TABLE `fluxos`;
