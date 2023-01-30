/*
  Warnings:

  - You are about to drop the column `positionId` on the `New_talent` table. All the data in the column will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PositionToTeam_member` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `positionn` to the `New_talent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Team_member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "New_talent" DROP CONSTRAINT "New_talent_positionId_fkey";

-- DropForeignKey
ALTER TABLE "_PositionToTeam_member" DROP CONSTRAINT "_PositionToTeam_member_A_fkey";

-- DropForeignKey
ALTER TABLE "_PositionToTeam_member" DROP CONSTRAINT "_PositionToTeam_member_B_fkey";

-- AlterTable
ALTER TABLE "New_talent" DROP COLUMN "positionId",
ADD COLUMN     "positionn" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team_member" ADD COLUMN     "position" TEXT NOT NULL;

-- DropTable
DROP TABLE "Position";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "_PositionToTeam_member";
