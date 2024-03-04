// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Api } from "@/typings/Api";
import { MenuUpdatePayload, Payload } from "@/typings/types";
import { prisma } from "@/utils/db";
import { Menu } from "@prisma/client";

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
  const { name, price, description, asset_url } = req.body as Menu;

  try {
    const menuIdStr = req.query.id as string;
    const selectedMenuId = Number(menuIdStr);

    const updatedMenu = await prisma.menu.update({
      data: {
        name,
        price,
        description,
      },
      where: {
        id: selectedMenuId,
      },
    });

    return res.status(200).json(updatedMenu);
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
    // const archivedMenu = await prisma.menu.update({
    //   data: {
    //     is_archived: true,
    //   },
    //   where: {
    //     id: menuId,
    //   },
    // });
    const deletedMenu = await prisma.menu.delete({ where: { id: menuId } });
    return res.status(200).json(deletedMenu);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `archived error in ${req.url}`, error });
  }
};
