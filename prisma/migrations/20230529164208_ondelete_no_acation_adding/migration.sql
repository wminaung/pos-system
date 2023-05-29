-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_location_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_menu_category_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_menu_category_location" DROP CONSTRAINT "menu_menu_category_location_menu_id_fkey";

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_menu_category_id_fkey" FOREIGN KEY ("menu_category_id") REFERENCES "menu_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_menu_category_location" ADD CONSTRAINT "menu_menu_category_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
