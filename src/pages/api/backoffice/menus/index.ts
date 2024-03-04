// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import { Payload } from "@/typings/types";
import { schema } from "@/utils/schema";
import { Menu } from "@prisma/client";

//{ name, price, description, menuCatIds, image_url, isRequired }

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
    res.status(405).json({ name: `${method} not allow!!` });
  }
}

// TODO -
const handleGetRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const locationId = Number(req.query.locationId as string);

  try {
    const menus = await prisma.menu.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        menu_addon_category: true,
        menu_menu_category_location: {
          where: {
            location_id: locationId,
          },
        },
      },
      where: {
        is_archived: false,
      },
    });
    return res.status(200).json({ data: { menus } });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO - create Menu
const handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { name, price, description, asset_url, is_archived } = req.body as Menu;

  if (!name || !price || !description) {
    throw new Error("payload wrong!!!");
  }

  try {
    const newMenu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
      },
    });

    return res.status(200).json(newMenu);
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ message: "check prisma query", error });
  }
};

// TODO -
const handlePutRequest = (req: NextApiRequest, res: NextApiResponse<any>) => {
  res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO -
const handleDeleteRequest = (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  res.status(200).json({ message: `${req.method} ok!!` });
};
