/*
  Warnings:

  - You are about to drop the column `required` on the `addon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "addon" DROP COLUMN "required";

-- AlterTable
ALTER TABLE "addon_category" ADD COLUMN     "is_required" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "image" TEXT;
