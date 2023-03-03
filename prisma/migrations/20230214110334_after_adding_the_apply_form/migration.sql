/*
  Warnings:

  - You are about to drop the `New_talent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "New_talent";

-- CreateTable
CREATE TABLE "Apply_for_job" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "cv_url" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apply_for_job_pkey" PRIMARY KEY ("id")
);
