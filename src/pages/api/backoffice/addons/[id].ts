import { Payload } from "@/typings/types";
import { addon } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  const idString = req.query.id as string;
  const id = Number(idString);

  if (method === "DELETE") {
    try {
      const archivedAddon = await prisma.addon.update({
        where: {
          id: id,
        },
        data: {
          is_archived: true,
        },
      });

      return res.status(200).json({ archivedAddon, message: "success delete" });
    } catch (error) {
      return res.status(500).json({ message: "check query", error });
    }
    // post
  } else if (method === "PUT") {
    const { name, price, addonCategoryId } = req.body as Payload.Addon.Update;

    if (!name || price < 0) {
      return res.status(400).json({ message: "name and price are needed" });
    }

    try {
      const updatedAddon = await prisma.addon.update({
        where: {
          id,
        },
        data: {
          name,
          price,
          addon_category_id: addonCategoryId,
        },
      });

      return res.status(200).json({ updatedAddon, message: "success delete" });
    } catch (error) {
      return res.status(500).json({ message: "check query", error });
    }
  }

  return res.status(405).json({ message: `${method} method not found ` });
}
