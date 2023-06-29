import { Payload } from "@/typings/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  if (method === "POST") {
    const { name, isRequired } = req.body as Payload.AddonCategory.Create;

    if (!name || typeof isRequired !== "boolean") {
      return res
        .status(400)
        .json({ message: `name , Bad Request! invalid name` });
    }

    try {
      const newAddonCat = await prisma.addon_category.create({
        data: {
          name,
          is_required: isRequired,
        },
      });

      return res.status(200).json({ newAddonCat, message: "success create" });
    } catch (error) {
      return res.status(500).json({ message: "check query", error });
    }
    // post
  }

  return res.status(405).json({ message: `${method}method not found ` });
}
