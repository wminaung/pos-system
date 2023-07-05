import { addon } from "@prisma/client";
import { prisma } from "@/utils/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  if (method === "POST") {
    const { name, price, addonCategoryId } = req.body as {
      name: string;
      price: number;
      addonCategoryId: number | null;
    };

    if (!name || typeof price !== "number" || price < 0) {
      return res
        .status(400)
        .json({ message: `name , Bad Request! invalid name` });
    }

    try {
      const newAddon = await prisma.addon.create({
        data: {
          name,
          price,
          addon_category_id: addonCategoryId,
        },
      });

      return res.status(200).json({ newAddon, message: "success create" });
    } catch (error) {
      return res.status(500).json({ message: "check query", error });
    }
    // post
  }

  return res.status(405).json({ message: `${method}method not found ` });
}
