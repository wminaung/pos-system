/*
  Warnings:

  - You are about to drop the column `locationId` on the `menu_menu_category_location` table. All the data in the column will be lost.
  - You are about to drop the column `menuId` on the `menu_menu_category_location` table. All the data in the column will be lost.
  - You are about to drop the column `menu_categoryId` on the `menu_menu_category_location` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `menu_menu_category_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_category_id` to the `menu_menu_category_location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_id` to the `menu_menu_category_location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_locationId_fkey";

-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_menuId_fkey";

-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_menu_categoryId_fkey";

-- AlterTable
ALTER TABLE "menu_menu_category_location" DROP COLUMN "locationId",
DROP COLUMN "menuId",
DROP COLUMN "menu_categoryId",
ADD COLUMN     "location_id" INTEGER NOT NULL,
ADD COLUMN     "menu_category_id" INTEGER NOT NULL,
ADD COLUMN     "menu_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_menu_category_id_fkey" FOREIGN KEY ("menu_category_id") REFERENCES "menu_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
