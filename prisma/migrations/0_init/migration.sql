-- CreateTable
CREATE TABLE "addon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "required" BOOLEAN DEFAULT true,
    "addon_category_id" INTEGER,
    "price" INTEGER NOT NULL,

    CONSTRAINT "addon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addon_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "addon_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image_url" TEXT,
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_addon_category" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "addon_category_id" INTEGER NOT NULL,

    CONSTRAINT "menu_addon_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "menu_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_location" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "is_available" BOOLEAN DEFAULT true,

    CONSTRAINT "menu_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_menu_category" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "menu_category_id" INTEGER NOT NULL,

    CONSTRAINT "menu_menu_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "company_id" INTEGER NOT NULL DEFAULT 3
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_email" ON "user"("email");

-- AddForeignKey
ALTER TABLE "addon" ADD CONSTRAINT "addon_addon_category_id_fkey" FOREIGN KEY ("addon_category_id") REFERENCES "addon_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_addon_category" ADD CONSTRAINT "menu_addon_category_addon_category_id_fkey" FOREIGN KEY ("addon_category_id") REFERENCES "addon_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_addon_category" ADD CONSTRAINT "menu_addon_category_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_location" ADD CONSTRAINT "menu_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_location" ADD CONSTRAINT "menu_location_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_menu_category" ADD CONSTRAINT "menu_menu_category_menu_category_id_fkey" FOREIGN KEY ("menu_category_id") REFERENCES "menu_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_menu_category" ADD CONSTRAINT "menu_menu_category_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

