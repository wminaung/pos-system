// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import colors from "colors";
import type { user as User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  if (method === "GET") {
    await handleGetRequest(req, res);
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
  console.log(
    colors.bold.bgGreen("<server session>\n"),
    session,
    colors.bold.bgGreen("\n</server session>")
  );

  if (!session || !session?.user || !session.user.email) {
    return res
      .status(404)
      .json({ message: "email not exists--> check middleware header" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    const newUserEmail = session.user.email;
    const newUserImage = session.user.image ?? "";
    const newUserName = session.user.name ?? "";

    const newCompany = await prisma.company.create({
      data: {
        name: "Default Company",
      },
    });

    const newUser = await prisma.user.create({
      data: {
        email: newUserEmail,
        name: newUserName,
        password: "",
        image: newUserImage,
        company_id: newCompany.id,
      },
    });

    const newLocation = await prisma.location.create({
      data: {
        name: "Default Location",
        address: "Default address",
        company_id: newCompany.id,
      },
    });

    const newMenusData = [
      {
        name: "shan-khout-swell",
        price: 300,
        image_url: "",
        description: "s-k-w desc",
      },
      {
        name: "mote-hin-khar",
        price: 500,
        image_url: "",
        description: "m-h-k desc",
      },
    ];
    const newMenus = await prisma.$transaction(
      newMenusData.map((menu) => prisma.menu.create({ data: menu }))
    );

    const menuLocationsData = [
      { location_id: newLocation.id, menu_id: newMenus[0].id },
      { location_id: newLocation.id, menu_id: newMenus[1].id },
    ];
    await prisma.$transaction(
      menuLocationsData.map((menuLocation) =>
        prisma.menu_location.create({ data: menuLocation })
      )
    );

    const newMenuCategoriesData = [{ name: "hot-dish" }, { name: "popular" }];
    const newMenuCategories = await prisma.$transaction(
      newMenuCategoriesData.map((menuCategory) =>
        prisma.menu_category.create({ data: menuCategory })
      )
    );

    const newMenuMenuCategoriesData = [
      { menu_category_id: newMenuCategories[0].id, menu_id: newMenus[0].id },
      { menu_category_id: newMenuCategories[1].id, menu_id: newMenus[1].id },
    ];
    await prisma.$transaction(
      newMenuMenuCategoriesData.map((menuMenuCategory) =>
        prisma.menu_menu_category.create({ data: menuMenuCategory })
      )
    );

    const newAddonCategoriesData = [
      { name: "Sizes", is_required: true },
      { name: "Topping", is_required: true },
    ];
    const newAddonCategories = await prisma.$transaction(
      newAddonCategoriesData.map((addonCategory) =>
        prisma.addon_category.create({ data: addonCategory })
      )
    );

    const newMenuAddonCategoriesData = [
      {
        addon_category_id: newAddonCategories[0].id,
        menu_id: newMenus[0].id,
      },
      {
        addon_category_id: newAddonCategories[1].id,
        menu_id: newMenus[1].id,
      },
    ];

    await prisma.$transaction(
      newMenuAddonCategoriesData.map((menuAddonCategory) =>
        prisma.menu_addon_category.create({ data: menuAddonCategory })
      )
    );

    const newAddonsData = [
      {
        name: "Large",
        price: 40,
        addon_category_id: newAddonCategories[0].id,
      },
      {
        name: "Normal",
        price: 40,
        addon_category_id: newAddonCategories[0].id,
      },
      {
        name: "Egg",
        price: 40,
        addon_category_id: newAddonCategories[1].id,
      },
      {
        name: "BuuTeeKyaw",
        price: 40,
        addon_category_id: newAddonCategories[1].id,
      },
    ];
    await prisma.$transaction(
      newAddonsData.map((addon) => prisma.addon.create({ data: addon }))
    );
    const data = await getData(newUser);
    return res.status(200).json(data);
  }

  const data = await getData(user);
  return res.status(200).json(data);
};

// TODO
const getData = async (user: User) => {
  const companyId = user.company_id;
  const locations = await prisma.location.findMany({
    where: {
      company_id: companyId,
    },
    orderBy: {
      id: "asc",
    },
  });
  const locationIds = locations.map((location) => location.id);
  const menusLocations = await prisma.menu_location.findMany({
    where: {
      location_id: {
        in: locationIds,
      },
    },
  });
  const menuIds = menusLocations.map((menuLocation) => menuLocation.menu_id);
  const menus = await prisma.menu.findMany({
    where: {
      id: {
        in: menuIds,
      },
    },
  });

  const menusMenuCategories = await prisma.menu_menu_category.findMany({
    where: {
      menu_id: {
        in: menuIds,
      },
    },
  });
  const menuCategories = await prisma.menu_category.findMany();
  const addonCategories = await prisma.addon_category.findMany();
  const addons = await prisma.addon.findMany();

  return {
    menus,
    menuCategories,
    addons,
    addonCategories,
    locations,
    menusLocations,
    menusMenuCategories,
    selectedLocationId: locations[0].id,
  };
};

// // TODO -
// const handlePostRequest = (
//   req: CustomNextApiRequest,
//   res: NextApiResponse<any>
// ) => {
//   res.status(200).json({ message: `${req.method} ok!!` });
// };

// // TODO -
// const handlePutRequest = (
//   req: CustomNextApiRequest,
//   res: NextApiResponse<any>
// ) => {
//   res.status(200).json({ message: `${req.method} ok!!` });
// };

// // TODO -
// const handleDeleteRequest = (
//   req: CustomNextApiRequest,
//   res: NextApiResponse<any>
// ) => {
//   res.status(200).json({ message: `${req.method} ok!!` });
// };
