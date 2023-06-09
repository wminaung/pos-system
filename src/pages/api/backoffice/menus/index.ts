// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import { Payload } from "@/typings/types";
import { schema } from "@/utils/schema";

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
const handleGetRequest = (req: NextApiRequest, res: NextApiResponse<any>) => {
  res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO - create Menu
const handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const locationId = Number(req.query.locationId as string);
  console.log(req.body, "reg");

  try {
    const joiResult = await schema.menu.payload.create.validateAsync(req.body);
    const { name, price, description, addonCatIds, asset_url } =
      joiResult as Payload.Menu.Create;
    console.log("body", req.body);
    const newMenus = await prisma.menu.create({
      data: {
        name,
        price,
        description,
        asset_url,

        menu_addon_category: {
          createMany: {
            data: addonCatIds.map((addonCatId) => ({
              addon_category_id: addonCatId,
            })),
          },
        },
      },
    });

    return res
      .status(200)
      .json({ message: `${req.method} ok!!`, newMenus, joiResult });
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
