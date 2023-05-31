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
  const { name } = req.body;
  const menuCatIdStr = req.query.id as string;
  console.log("delete :", menuCatIdStr);
  const menuCatId = Number(menuCatIdStr);
  try {
    const updatedMenu = await prisma.menu_category.update({
      data: {
        name,
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

  try {
    const deletedMenuCat = await prisma.menu_category.delete({
      where: { id: menuCatId },
    });
    return res
      .status(200)
      .json({ deletedMenuCat, message: "deleted successfully" });
  } catch (error) {
    console.log({ error });
  }
};
