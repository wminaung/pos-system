import type { NextApiRequest, NextApiResponse } from "next";

interface DeleteMenu {
  menuId: number;
  locationId: number;
  menuCategoryId: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "PUT") {
    const { menuId, locationId, menuCategoryId } = req.body as DeleteMenu;

    if (!menuId || !locationId || !menuCategoryId) {
      return res.status(400).json({ message: "bad request" });
    }

    try {
      const deleteRes = await prisma.menu_menu_category_location.deleteMany({
        where: {
          menu_id: menuId,
          location_id: locationId,
          menu_category_id: menuCategoryId,
        },
      });

      res.status(200).json({ deleteRes, message: "success" });
    } catch (error) {
      res.status(400).json({ error, message: "err at try catch" });
    }
  } else {
    res.json({ message: "OK" });
  }
}
