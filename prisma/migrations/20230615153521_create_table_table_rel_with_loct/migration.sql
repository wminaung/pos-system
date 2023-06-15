/*
  Warnings:

  - Made the column `address` on table `location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "location" ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "table" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "access_url" TEXT,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
