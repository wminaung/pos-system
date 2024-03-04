// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import colors from "colors";
import { prisma } from "@/utils/db";
import { Api } from "@/typings/Api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  if (method === "GET") {
    try {
      await handleGetRequest(req, res);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error, message: "something" });
    }
  } else {
    res.status(405).json({ name: `${method} not allow!!` });
  }
  /*
  else if (method === "POST") {
    handlePostRequest(req, res);
  } else if (method === "PUT") {
    handlePutRequest(req, res);
  } else if (method === "DELETE") {
    handleDeleteRequest(req, res);
  }
  */
}

// TODO -
const handleGetRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const session = await getSession({ req });
  if (!session || !session?.user || !session.user.email) {
    return res.status(404).json({ message: "session not exists" });
  }
  const loginUser = session.user;
  if (!loginUser.email) {
    return res.status(404).json({ message: "session not exists" });
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  console.log(
    colors.bold.bgGreen("<server session>\n"),
    (session?.user && session.user.email) || "",
    colors.bold.bgGreen("\n</server session>\n")
  );

  if (isUserExist && isUserExist.email) {
    const responseData: Api.Response.App.Get = await getData();

    return res.status(200).json({ ...responseData });
  }

  const user = await prisma.user.create({
    data: {
      email: loginUser.email,
      name: loginUser.image || "",
    },
  });

  const m1 = await prisma.menu.create({
    data: {
      name: "mote hin gar",
      price: 5000,
      description: "mote hin gar description",
    },
  });
  const m2 = await prisma.menu.create({
    data: {
      name: "chin baung kyaw",
      price: 8000,
      description: "chin baung kaaw description",
    },
  });

  const mc1 = await prisma.menuCategory.create({
    data: {
      name: "popular",
    },
  });
  const mc2 = await prisma.menuCategory.create({
    data: {
      name: "hot dish",
    },
  });
  const mc3 = await prisma.menuCategory.create({
    data: {
      name: "cold dish",
    },
  });

  await prisma.menuMenuCategory.createMany({
    data: [
      { menuId: m1.id, menuCategoryId: mc1.id },
      { menuId: m1.id, menuCategoryId: mc2.id },
      { menuId: m2.id, menuCategoryId: mc3.id },
    ],
  });

  await prisma.table.createMany({
    data: [
      { name: "Table 1", location_id: 1 },
      { name: "Table 2", location_id: 1 },
    ],
  });
  const responseData: Api.Response.App.Get = await getData();

  return res.status(200).json({ ...responseData });

  // if (!session || !session?.user || !session.user.email) {
  //   return res.status(404).json({ message: "session not exists" });
  // }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: session.user.email,
  //   },
  // });
  // if (!user) {
  //   const newUserEmail = session.user.email;
  //   const newUserImage = session.user.image || "";
  //   const newUserName = session.user.name || "";

  //   const newCompany = await prisma.company.create({
  //     data: {
  //       name: "Default Company",
  //     },
  //   });

  //   const newUser = await prisma.user.create({
  //     data: {
  //       email: newUserEmail,
  //       name: newUserName,
  //       password: "",
  //       image: newUserImage,
  //       company_id: newCompany.id,
  //     },
  //   });

  //   const newLocation = await prisma.location.create({
  //     data: {
  //       name: "Default Location",
  //       address: "Default address",
  //       company_id: newCompany.id,
  //     },
  //   });

  //   // create new table
  //   await prisma.table.create({
  //     data: {
  //       name: "table 1",
  //       asset_url: "",
  //       location_id: newLocation.id,
  //     },
  //   });

  //   const newMenusData: Prisma.menuCreateInput[] = [
  //     {
  //       name: "shan-khout-swell",
  //       price: 300,
  //       asset_url: "",
  //       description: "s-k-w desc",
  //     },
  //     {
  //       name: "mote-hin-khar",
  //       price: 500,
  //       asset_url: "",
  //       description: "m-h-k desc",
  //     },
  //   ];
  //   const newMenus = await prisma.$transaction(
  //     newMenusData.map((menu) => prisma.menu.create({ data: menu }))
  //   );

  //   const newMenuCategoriesData = [{ name: "hot-dish" }, { name: "popular" }];
  //   const newMenuCategories = await prisma.$transaction(
  //     newMenuCategoriesData.map((menuCategory) =>
  //       prisma.menu_category.create({ data: menuCategory })
  //     )
  //   );

  //   const newMenuMenuCategoryLocationsData = [
  //     {
  //       location_id: newLocation.id,
  //       menu_id: newMenus[0].id,
  //       menu_category_id: newMenuCategories[0].id,
  //     },
  //     {
  //       location_id: newLocation.id,
  //       menu_id: newMenus[1].id,
  //       menu_category_id: newMenuCategories[1].id,
  //     },
  //   ];

  //   const newMenuMenuCategoryLocations = await prisma.$transaction(
  //     newMenuMenuCategoryLocationsData.map((menuMenuCategoryLocation) =>
  //       prisma.menu_menu_category_location.create({
  //         data: menuMenuCategoryLocation,
  //       })
  //     )
  //   );

  //   const newAddonCategoriesData = [
  //     { name: "Sizes", is_required: true },
  //     { name: "Topping", is_required: true },
  //   ];
  //   const newAddonCategories = await prisma.$transaction(
  //     newAddonCategoriesData.map((addonCategory) =>
  //       prisma.addon_category.create({ data: addonCategory })
  //     )
  //   );

  //   const newMenuAddonCategoriesData = [
  //     {
  //       addon_category_id: newAddonCategories[0].id,
  //       menu_id: newMenus[0].id,
  //     },
  //     {
  //       addon_category_id: newAddonCategories[1].id,
  //       menu_id: newMenus[1].id,
  //     },
  //   ];

  //   await prisma.$transaction(
  //     newMenuAddonCategoriesData.map((menuAddonCategory) =>
  //       prisma.menu_addon_category.create({ data: menuAddonCategory })
  //     )
  //   );

  //   const newAddonsData = [
  //     {
  //       name: "Large",
  //       price: 40,
  //       addon_category_id: newAddonCategories[0].id,
  //     },
  //     {
  //       name: "Normal",
  //       price: 40,
  //       addon_category_id: newAddonCategories[0].id,
  //     },
  //     {
  //       name: "Egg",
  //       price: 40,
  //       addon_category_id: newAddonCategories[1].id,
  //     },
  //     {
  //       name: "BuuTeeKyaw",
  //       price: 40,
  //       addon_category_id: newAddonCategories[1].id,
  //     },
  //   ];
  //   await prisma.$transaction(
  //     newAddonsData.map((addon) => prisma.addon.create({ data: addon }))
  //   );
  //   const data = await getData(newUser, newLocation.id);
  //   return res.status(200).json(data);
  // }
  // const selectedLocationId = Number(req.query.locationId as string | undefined);
  // console.log(selectedLocationId, "selectedLocationId -> location=?");
  // const data = await getData(user, selectedLocationId);
  // return res.status(200).json(data);
};

const getData = async (): Promise<Api.Response.App.Get> => {
  const menus = await prisma.menu.findMany();
  const menuCategories = await prisma.menuCategory.findMany();
  const menusMenuCategories = await prisma.menuMenuCategory.findMany();
  const tables = await prisma.table.findMany();

  const responseData: Api.Response.App.Get = {
    menus,
    menuCategories,
    menusMenuCategories,
    tables,
  };
  return responseData;
};
