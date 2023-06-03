// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
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

// TODO - update menu category
const handlePutRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { name } = req.body as {
    name: string;
  };

  if (!name) {
    return res.status(404).json({ error: "name are needed" });
  }

  const menuCatIdStr = req.query.id as string;
  console.log("updated :", menuCatIdStr);
  const menuCatId = Number(menuCatIdStr);
  try {
    const updatedMenu = await prisma.menu_category.update({
      data: {
        name,

        // menu_menu_category_location: {
        //   deleteMany: {
        //     menu_id: {
        //       not: null,
        //     },
        //   },
        //   createMany: {
        //     // data: [{ location_id, is_available }],
        //     // data: locationIds.map((id) => ({ location_id: id })),
        //   },
        // },
      },
      where: {
        id: menuCatId,
      },
    });

    return res.status(200).json({ updatedMenu, message: `${req.method} ok!!` });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: " check query update fail", error });
  }
};

// TODO - delete menu category
const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const menuCatIdStr = req.query.id as string;
  console.log("delete :", menuCatIdStr);
  const menuCatId = Number(menuCatIdStr);
  const locationId = Number(req.query.locationId as string);
  try {
    const deletMenu = await prisma.menu_menu_category_location.deleteMany({
      where: {
        menu_category_id: menuCatId,
        menu_id: null,
        location_id: locationId,
      },
    });

    const deletedMenuCat = await prisma.menu_category.delete({
      where: { id: menuCatId },
    });
    return res
      .status(200)
      .json({ deletedMenuCat, deletMenu, message: "deleted successfully" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: " check query delete fail", error });
  }
};