/*
  Warnings:

  - You are about to drop the column `positionn` on the `New_talent` table. All the data in the column will be lost.
  - Added the required column `excerpt_fr` to the `Realisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag_fr` to the `Realisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_fr` to the `Realisation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position_fr` to the `Team_member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "New_talent" DROP COLUMN "positionn";

-- AlterTable
ALTER TABLE "Realisation" ADD COLUMN     "excerpt_fr" TEXT NOT NULL,
ADD COLUMN     "tag_fr" TEXT NOT NULL,
ADD COLUMN     "title_fr" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team_member" ADD COLUMN     "position_fr" TEXT NOT NULL;
