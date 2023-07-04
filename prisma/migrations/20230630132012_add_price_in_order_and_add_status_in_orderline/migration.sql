/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "menu_menu_category_location" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "status",
ADD COLUMN     "price" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "orderline" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';
