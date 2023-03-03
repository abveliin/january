/*
  Warnings:

  - You are about to drop the column `excerpt` on the `Realisation` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt_fr` on the `Realisation` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `Realisation` table. All the data in the column will be lost.
  - You are about to drop the column `tag_fr` on the `Realisation` table. All the data in the column will be lost.
  - Added the required column `category` to the `Realisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_fr` to the `Realisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Realisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_fr` to the `Realisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Realisation" DROP COLUMN "excerpt",
DROP COLUMN "excerpt_fr",
DROP COLUMN "tag",
DROP COLUMN "tag_fr",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "category_fr" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "description_fr" TEXT NOT NULL;
