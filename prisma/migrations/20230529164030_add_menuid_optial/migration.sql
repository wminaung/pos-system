-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_menu_id_fkey";

-- AlterTable
ALTER TABLE "menu_menu_category_location" ALTER COLUMN "menu_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
