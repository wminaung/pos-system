// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import { MenuCreatePayload } from "@/typings/types";
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
  // const { name, price, description, menuCatIds, image_url, isRequired } =
  //   req.body as MenuCreatePayload;
  const locationId = Number(req.query.locationId as string);
  console.log(req.body, "reg");
  // if (!name || price < 0 || !description || !image_url)
  //   return res
  //     .status(404)
  //     .json({ error: "name,description,imageUrl & price are needed" });

  try {
    const joiResult = await schema.menu.payload.create.validateAsync(req.body);
    const { name, price, description, menuCatIds, image_url, isRequired } =
      joiResult as MenuCreatePayload;
    const newMenus = await prisma.menu.create({
      data: {
        name,
        price,
        description,
        image_url,
        menu_menu_category_location: {
          createMany: {
            data: menuCatIds.map((mcatId) => ({
              menu_category_id: mcatId,
              location_id: locationId,
              is_available: isRequired,
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
