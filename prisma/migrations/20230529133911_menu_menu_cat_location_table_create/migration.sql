/*
  Warnings:

  - You are about to drop the `menu_location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_menu_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu_location" DROP CONSTRAINT "menu_location_location_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_location" DROP CONSTRAINT "menu_location_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_menu_category" DROP CONSTRAINT "menu_menu_category_menu_category_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_menu_category" DROP CONSTRAINT "menu_menu_category_menu_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "company_id" DROP DEFAULT;

-- DropTable
DROP TABLE "menu_location";

-- DropTable
DROP TABLE "menu_menu_category";

-- CreateTable
CREATE TABLE "menu_menu_category_location" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "menu_categoryId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "menu_menu_category_location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_menu_categoryId_fkey" FOREIGN KEY ("menu_categoryId") REFERENCES "menu_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
