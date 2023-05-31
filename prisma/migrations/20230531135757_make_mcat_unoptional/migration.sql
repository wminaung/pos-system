/*
  Warnings:

  - Made the column `menu_category_id` on table `menu_menu_category_location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "menu_menu_category_location" ALTER COLUMN "menu_category_id" SET NOT NULL;
