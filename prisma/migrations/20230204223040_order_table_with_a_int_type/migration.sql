/*
  Warnings:

  - Changed the type of `order` on the `Realisation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Realisation" DROP COLUMN "order",
ADD COLUMN     "order" INTEGER NOT NULL;
