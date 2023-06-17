-- AlterTable
ALTER TABLE "addon" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "addon_category" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "company" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "location" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "menu_category" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "table" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;
