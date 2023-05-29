// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/utils/db";

import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  if (method === "GET") {
    handleGetRequest(req, res);
  } else if (method === "POST") {
    handlePostRequest(req, res);
  } else if (method === "PUT") {
    handlePutRequest(req, res);
  } else if (method === "DELETE") {
    handleDeleteRequest(req, res);
  } else {
    res.status(405).json({ message: `${method} not allow!!` });
  }
}

// TODO -
const handleGetRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  return res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO -
const handlePostRequest = (req: NextApiRequest, res: NextApiResponse<any>) => {
  return res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO - update menu
const handlePutRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const {
    name,
    price,
    description,
    imageUrl,
    menuCategoryIds = [],
    locationIds = [],
    addonCategoryIds = [],
  } = req.body;
  const menuIdStr = req.query.id as string;
  console.log("update :", menuIdStr);
  const menuId = Number(menuIdStr);

  const updatedMenu = await prisma.menu.update({
    data: {
      description,
      image_url: imageUrl,
      name,
      price,

      menu_location: {
        deleteMany: {},
        createMany: {
          data: locationIds.map((location_id: number) => ({
            location_id,
          })),
        },
      },
      menu_addon_category: {
        deleteMany: {},
        createMany: {
          data: addonCategoryIds.map((addon_category_id: number) => ({
            addon_category_id,
          })),
        },
      },
      menu_menu_category: {
        deleteMany: {},
        createMany: {
          data: menuCategoryIds.map((menu_category_id: number) => ({
            menu_category_id,
          })),
        },
      },
    },
    where: {
      id: menuId,
    },
  });

  return res.status(200).json({ updatedMenu, message: `${req.method} ok!!` });
};

// TODO - delete menu
const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const menuIdStr = req.query.id as string;
  console.log("delete :", menuIdStr);
  const menuId = Number(menuIdStr);

  try {
    await prisma.menu_location.deleteMany({
      where: {
        menu_id: menuId,
      },
    });

    await prisma.menu_addon_category.deleteMany({
      where: {
        menu_id: menuId,
      },
    });
    await prisma.menu_menu_category.deleteMany({
      where: {
        menu_id: menuId,
      },
    });
    const deletedMenu = await prisma.menu.delete({
      where: {
        id: menuId,
      },
    });

    return res.status(200).json({ message: `${req.method} ok!!`, deletedMenu });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `${req.method} ok!!`, error });
  }
};
