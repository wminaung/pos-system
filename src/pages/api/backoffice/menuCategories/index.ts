// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import { Payload } from "@/typings/types";
type Data = {
  name: string;
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
    res.status(405).json({ name: `${method} not allow!!` });
  }
}

// TODO -
const handleGetRequest = (req: NextApiRequest, res: NextApiResponse<any>) => {
  res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO - create Menu Category
const handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { name, selectedLocations } = req.body as Payload.MenuCategory.Create;
  const locationId = Number(req.query.locationId as string);
  console.log(req.body, "reg");
  if (!name || !selectedLocations.length)
    return res.status(404).json({ error: "name and locationids are needed" });

  try {
    const newMenuCat = await prisma.menu_category.create({
      data: {
        name,
        menu_menu_category_location: {
          createMany: {
            data: selectedLocations.map((selectedLocation) => ({
              location_id: selectedLocation.id,
              menu_id: null,
            })),
          },
        },
      },
    });

    return res.status(200).json({ message: `${req.method} ok!!`, newMenuCat });
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
