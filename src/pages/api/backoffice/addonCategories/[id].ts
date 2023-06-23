import { Payload } from "@/typings/types";

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
      const archivedAddonCat = await prisma.addon_category.update({
        where: {
          id: id,
        },
        data: {
          is_archived: true,
        },
      });
      return res
        .status(200)
        .json({ archivedAddonCat, message: "success delete" });
    } catch (error) {
      return res.status(500).json({ message: "check query", error });
    }
  } else if (method === "PUT") {
    const { name } = req.body as Payload.AddonCategory.Update;

    if (!name) {
      return res.status(400).json({ message: "name is needed" });
    }

    try {
      const updatedAddonCategory = await prisma.addon_category.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      return res
        .status(200)
        .json({ updatedAddonCategory, message: "success delete" });
    } catch (error) {
      return res.status(500).json({ message: "check query", error });
    }
  }

  return res.status(405).json({ message: `${method} method not found ` });
}
