/*
  Warnings:

  - You are about to drop the column `image_url` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the column `access_url` on the `table` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "menu" DROP COLUMN "image_url",
ADD COLUMN     "asset_url" TEXT;

-- AlterTable
ALTER TABLE "table" DROP COLUMN "access_url",
ADD COLUMN     "asset_url" TEXT;
