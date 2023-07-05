import { orderByAacDesc } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  if (method === "GET") {
    const locationIdStr = req.query.locationId as string;

    const locationId = locationIdStr ? Number(locationIdStr) : null;
    if (!locationId) return res.send(400);

    // menus // menusCategories // addonCats // addon // loc

    const orderById = orderByAacDesc({ order: "asc" });

    const location = await prisma.location.findUnique({
      where: {
        id: locationId,
      },
      include: {
        menu_menu_category_location: orderById,
        company: true,
        table: orderById,
      },
    });

    const menus = await prisma.menu.findMany({
      where: {
        menu_menu_category_location: {
          some: {
            location_id: locationId,
          },
        },
        is_archived: false,
      },

      include: {
        menu_menu_category_location: orderById,
        menu_addon_category: orderById,
      },
      orderBy: {
        id: "asc",
      },
    });

    const menuCategories = await prisma.menu_category.findMany({
      where: {
        menu_menu_category_location: {
          some: {
            location_id: locationId,
          },
        },
        is_archived: false,
      },
      include: {
        menu_menu_category_location: orderById,
      },
      orderBy: {
        id: "asc",
      },
    });

    const menuIds = menus.map((menu) => menu.id);

    const addonCategories = await prisma.addon_category.findMany({
      where: {
        is_archived: false,
        menu_addon_category: {
          some: {
            menu_id: {
              in: menuIds,
            },
          },
        },
      },
      include: {
        addon: orderById,
        menu_addon_category: orderById,
      },
      orderBy: {
        id: "asc",
      },
    });

    const addonCatIds = addonCategories.map((addonCat) => addonCat.id);

    const addons = await prisma.addon.findMany({
      where: {
        is_archived: false,
        addon_category_id: {
          in: addonCatIds,
        },
      },
      include: {
        addon_category: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    const resObject = {
      menuCategories,
      menus,
      addonCategories,
      addons,
      location,
    };

    return res.json(resObject);
  }

  res.json({ message: "OKs" });
}
