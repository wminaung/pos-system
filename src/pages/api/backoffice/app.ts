// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import colors from "colors";
import type { Prisma, user } from "@prisma/client";

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
    req.query.location as string,

    (session?.user && session.user.email) || "",
    colors.bold.bgGreen("\n</server session>\n")
  );

  if (!session || !session?.user || !session.user.email) {
    return res.status(404).json({ message: "session not exists" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    const newUserEmail = session.user.email;
    const newUserImage = session.user.image || "";
    const newUserName = session.user.name || "";

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

    // create new table
    await prisma.table.create({
      data: {
        name: "table 1",
        asset_url: "",
        location_id: newLocation.id,
      },
    });

    const newMenusData: Prisma.menuCreateInput[] = [
      {
        name: "shan-khout-swell",
        price: 300,
        asset_url: "",
        description: "s-k-w desc",
      },
      {
        name: "mote-hin-khar",
        price: 500,
        asset_url: "",
        description: "m-h-k desc",
      },
    ];
    const newMenus = await prisma.$transaction(
      newMenusData.map((menu) => prisma.menu.create({ data: menu }))
    );

    const newMenuCategoriesData = [{ name: "hot-dish" }, { name: "popular" }];
    const newMenuCategories = await prisma.$transaction(
      newMenuCategoriesData.map((menuCategory) =>
        prisma.menu_category.create({ data: menuCategory })
      )
    );

    const newMenuMenuCategoryLocationsData = [
      {
        location_id: newLocation.id,
        menu_id: newMenus[0].id,
        menu_category_id: newMenuCategories[0].id,
      },
      {
        location_id: newLocation.id,
        menu_id: newMenus[1].id,
        menu_category_id: newMenuCategories[1].id,
      },
    ];

    const newMenuMenuCategoryLocations = await prisma.$transaction(
      newMenuMenuCategoryLocationsData.map((menuMenuCategoryLocation) =>
        prisma.menu_menu_category_location.create({
          data: menuMenuCategoryLocation,
        })
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
    const data = await getData(newUser, newLocation.id);
    return res.status(200).json(data);
  }
  const selectedLocationId = Number(req.query.location as string);
  console.log(selectedLocationId, "selectedLocationId -> location=?");
  const data = await getData(user, selectedLocationId);
  return res.status(200).json(data);
};

// TODO
const getData = async (user: user, selectedLocationId?: number) => {
  const companyId = user.company_id;

  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    include: {
      location: true,
    },
  });

  const locations = await prisma.location.findMany({
    where: {
      company_id: companyId,
      is_archived: false,
    },
    orderBy: {
      id: "asc",
    },
    include: {
      company: true,
      menu_menu_category_location: true,
    },
  });

  const menusMenuCategoriesLocations =
    await prisma.menu_menu_category_location.findMany({
      include: {
        menu: true,
        location: true,
        menu_category: true,
      },
      orderBy: {
        id: "asc",
      },
    });

  const menus = await prisma.menu.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      menu_addon_category: true,
      menu_menu_category_location: {
        where: {
          location_id: {
            in: locations.map((location) => location.id),
          },
        },
      },
    },
    where: {
      is_archived: false,
    },
  });

  const menuCategories = await prisma.menu_category.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      menu_menu_category_location: true,
    },
    where: {
      is_archived: false,
    },
  });
  const addons = await prisma.addon.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      addon_category: true,
    },
    where: {
      is_archived: false,
    },
  });

  const addonCategories = await prisma.addon_category.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      addon: true,
      menu_addon_category: true,
    },
    where: {
      is_archived: false,
    },
  });

  const tables = await prisma.table.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      location: true,
    },
    where: {
      is_archived: false,
    },
  });

  const menusAddonCategories = await prisma.menu_addon_category.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      addon_category: true,
    },
  });

  const orders = await prisma.order.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      location: true,
      orderline: true,
      table: true,
    },
  });

  const orderlines = await prisma.orderline.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      addon: true,
      menu: true,
      order: true,
    },
  });

  return {
    company,
    menus,
    menuCategories,
    addons,
    addonCategories,
    locations,
    menusMenuCategoriesLocations,
    tables,
    menusAddonCategories,
    selectedLocationId: selectedLocationId || locations[0].id,
    orderlines,
    orders,
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
