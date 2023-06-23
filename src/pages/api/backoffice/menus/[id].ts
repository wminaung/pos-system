// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MenuUpdatePayload, Payload } from "@/typings/types";
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
  const { name, price, description, asset_url, addonCatIds, isRequired } =
    req.body as Payload.Menu.Update;
  const menuIdStr = req.query.id as string;
  const locationId = Number(req.query.locationId as string);
  console.log("update :", menuIdStr);
  const menuId = Number(menuIdStr);
  console.log({ body: req.body });

  if (!locationId || !addonCatIds.length) {
    return res
      .status(400)
      .json({ message: "locationIds and menuCatIds are needed" });
  }

  try {
    await prisma.menu_menu_category_location.updateMany({
      where: {
        menu_id: menuId,
        location_id: locationId,
      },
      data: {
        is_available: isRequired ? true : false,
      },
    });

    if (name && price > -1 && description) {
      const dataToUpdate: any = {
        name,
        price,
        description,
      };
      if (asset_url) {
        dataToUpdate.asset_url = asset_url;
      }
      const updatedMenu = await prisma.menu.update({
        data: {
          ...dataToUpdate,

          menu_addon_category: {
            deleteMany: {},
            createMany: {
              data: addonCatIds.map((acid) => ({ addon_category_id: acid })),
            },
          },
        },
        where: {
          id: menuId,
        },
      });
    }

    return res.status(200).json({ message: `${req.method} ok!!` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "menu Update fail server error", error });
  }
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
    const archivedMenu = await prisma.menu.update({
      data: {
        is_archived: true,
      },
      where: {
        id: menuId,
      },
    });
    return res
      .status(200)
      .json({ archivedMenu, message: `${req.method} ok!!` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `archived error in ${req.url}`, error });
  }
};
