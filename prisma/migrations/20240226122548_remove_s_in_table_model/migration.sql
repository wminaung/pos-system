/*
  Warnings:

  - You are about to drop the `Tables` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tables";

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "asset_url" TEXT,
    "location_id" INTEGER NOT NULL,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);
