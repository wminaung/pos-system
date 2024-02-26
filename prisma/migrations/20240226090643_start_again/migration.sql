/*
  Warnings:

  - You are about to drop the `addon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `addon_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_addon_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menu_menu_category_location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orderline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addon" DROP CONSTRAINT "addon_addon_category_id_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_company_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_addon_category" DROP CONSTRAINT "menu_addon_category_addon_category_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_addon_category" DROP CONSTRAINT "menu_addon_category_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_location_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_menu_category_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_location_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_table_id_fkey";

-- DropForeignKey
ALTER TABLE "orderline" DROP CONSTRAINT "orderline_addon_id_fkey";

-- DropForeignKey
ALTER TABLE "orderline" DROP CONSTRAINT "orderline_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "orderline" DROP CONSTRAINT "orderline_order_id_fkey";

-- DropForeignKey
ALTER TABLE "table" DROP CONSTRAINT "table_location_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_company_id_fkey";

-- DropTable
DROP TABLE "addon";

-- DropTable
DROP TABLE "addon_category";

-- DropTable
DROP TABLE "company";

-- DropTable
DROP TABLE "location";

-- DropTable
DROP TABLE "menu";

-- DropTable
DROP TABLE "menu_addon_category";

-- DropTable
DROP TABLE "menu_category";

-- DropTable
DROP TABLE "menu_menu_category_location";

-- DropTable
DROP TABLE "order";

-- DropTable
DROP TABLE "orderline";

-- DropTable
DROP TABLE "table";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "company_id" INTEGER NOT NULL,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'admin',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "asset_url" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "is_archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MenuCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuMenuCategory" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER,
    "menuCategoryId" INTEGER,

    CONSTRAINT "MenuMenuCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tables" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "asset_url" TEXT,
    "location_id" INTEGER NOT NULL,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_email" ON "User"("email");

-- AddForeignKey
ALTER TABLE "MenuMenuCategory" ADD CONSTRAINT "MenuMenuCategory_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuMenuCategory" ADD CONSTRAINT "MenuMenuCategory_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
