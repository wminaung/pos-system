import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { menuCategoryId, menuId, locationId } = req.body;
    const isValid = menuCategoryId && menuId && locationId;
    if (!isValid) return res.status(400).json("something wrong");
    await prisma.menu_menu_category_location.create({
      data: {
        menu_id: Number(menuId),
        menu_category_id: Number(menuCategoryId),
        location_id: Number(locationId),
      },
    });
    return res.status(200).json({ message: "created successfully" });
  }
  return res.status(405).json("invalid method");
}
