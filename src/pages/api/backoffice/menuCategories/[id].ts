// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
import { Payload } from "@/typings/types";
import { idsToDelete, idsToUpdate } from "@/utils";
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
  const { name, selectedLocations } = req.body as Payload.MenuCategory.Update;
  if (!name || !selectedLocations.length) {
    return res.status(404).json({ error: "name are needed" });
  }

  const menuCatIdStr = req.query.id as string;
  console.log("updated :", menuCatIdStr);
  const menuCatId = Number(menuCatIdStr);
  try {
    const updatedMenuCategory = await prisma.menu_category.update({
      data: {
        name,
      },

      where: {
        id: menuCatId,
      },
    });

    const existingLocation = await prisma.menu_menu_category_location.findMany({
      where: {
        menu_category_id: menuCatId,
      },
      select: {
        location_id: true,
      },
      distinct: ["location_id"],
    });
    const existingLocationIds = existingLocation.map(
      (item) => item.location_id
    );
    const selectedLocationIds = selectedLocations.map((item) => item.id);

    const toDeletedLocationIds = idsToDelete(
      existingLocationIds,
      selectedLocationIds
    );
    const toUpdatedLocationIds = idsToUpdate(
      existingLocationIds,
      selectedLocationIds
    );

    await prisma.menu_menu_category_location.deleteMany({
      where: {
        menu_category_id: menuCatId,
        location_id: {
          in: toDeletedLocationIds,
        },
      },
    });

    await prisma.menu_menu_category_location.createMany({
      data: toUpdatedLocationIds.map((locationId) => ({
        location_id: locationId,
        menu_id: null,
        menu_category_id: menuCatId,
      })),
    });

    console.log({ toDeletedLocationIds, toUpdatedLocationIds });
    return res
      .status(200)
      .json({ updatedMenuCategory, message: `${req.method} ok!!` });
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
  const locationId = Number(req.query.locationId as string);
  try {
    const archivedMenuCat = await prisma.menu_category.update({
      where: {
        id: menuCatId,
      },
      data: {
        is_archived: true,
      },
    });
    return res
      .status(200)
      .json({ archivedMenuCat, message: "archivedMenuCat successfully" });
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ message: "archivedMenuCat check query delete fail", error });
  }
};
