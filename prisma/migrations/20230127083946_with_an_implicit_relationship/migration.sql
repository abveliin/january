/*
  Warnings:

  - You are about to drop the `PositionTeam_member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PositionTeam_member" DROP CONSTRAINT "PositionTeam_member_positionId_fkey";

-- DropForeignKey
ALTER TABLE "PositionTeam_member" DROP CONSTRAINT "PositionTeam_member_team_memberId_fkey";

-- DropTable
DROP TABLE "PositionTeam_member";

-- CreateTable
CREATE TABLE "_PositionToTeam_member" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PositionToTeam_member_AB_unique" ON "_PositionToTeam_member"("A", "B");

-- CreateIndex
CREATE INDEX "_PositionToTeam_member_B_index" ON "_PositionToTeam_member"("B");

-- AddForeignKey
ALTER TABLE "_PositionToTeam_member" ADD CONSTRAINT "_PositionToTeam_member_A_fkey" FOREIGN KEY ("A") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionToTeam_member" ADD CONSTRAINT "_PositionToTeam_member_B_fkey" FOREIGN KEY ("B") REFERENCES "Team_member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
