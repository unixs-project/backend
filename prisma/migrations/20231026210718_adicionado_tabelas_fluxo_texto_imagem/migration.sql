-- CreateTable
CREATE TABLE `fluxos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(250) NOT NULL,
    `fk_fluxo_pai` INTEGER NULL,

    UNIQUE INDEX `fluxos_fk_fluxo_pai_key`(`fk_fluxo_pai`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fluxosfilhos` (
    `id_fluxo_pai` INTEGER NOT NULL,
    `id_fluxo_filho` INTEGER NOT NULL,

    PRIMARY KEY (`id_fluxo_pai`, `id_fluxo_filho`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `textos` (
    `id` INTEGER NOT NULL,
    `html` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fluxostextos` (
    `id_fluxo` INTEGER NOT NULL,
    `id_texto` INTEGER NOT NULL,

    PRIMARY KEY (`id_fluxo`, `id_texto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagens` (
    `id` INTEGER NOT NULL,
    `localizacao` VARCHAR(512) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fluxosimagens` (
    `id_fluxo` INTEGER NOT NULL,
    `id_imagem` INTEGER NOT NULL,

    PRIMARY KEY (`id_fluxo`, `id_imagem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fluxos` ADD CONSTRAINT `fluxos_fk_fluxo_pai_fkey` FOREIGN KEY (`fk_fluxo_pai`) REFERENCES `fluxos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
