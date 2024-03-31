// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import { Payload } from "@/typings/types";
import { idsToDelete, idsToUpdate } from "@/utils";
import { MenuCategory } from "@prisma/client";
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
  const { name, id, is_archived } = req.body as MenuCategory;

  try {
    const menucatIdStr = req.query.id as string;
    const selectedMenuCategoryId = Number(menucatIdStr);

    const updatedMenuCategory = await prisma.menuCategory.update({
      data: {
        name,
      },
      where: {
        id: selectedMenuCategoryId,
      },
    });

    return res.status(200).json(updatedMenuCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "menu Update fail server error", error });
  }
};

// TODO - delete menu category
const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const menucatIdStr = req.query.id as string;
  console.log("delete :", menucatIdStr);
  const menucatId = Number(menucatIdStr);

  try {
    // const archivedMenu = await prisma.menu.update({
    //   data: {
    //     is_archived: true,
    //   },
    //   where: {
    //     id: menuId,
    //   },
    // });
    const deletedMenuCategory = await prisma.menuCategory.delete({
      where: { id: menucatId },
    });
    return res.status(200).json(deletedMenuCategory);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `archived error in ${req.url}`, error });
  }
};
