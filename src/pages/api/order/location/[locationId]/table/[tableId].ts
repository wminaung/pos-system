import { OrderlineItem } from "@/typings/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  const query = req.query as {
    [key: string]: string;
  };
  const locationId = Number(query.locationId);
  const tableId = Number(query.tableId);

  if (!locationId || !tableId) {
    return res.status(400).json({ message: " query !!" });
  }

  if (method === "POST") {
    const payload = req.body as { orderlines: OrderlineItem[] };
    const orderlines = payload.orderlines;
    const orderlineData = orderlines.map((orderline) => {
      const menuId = orderline.menu.id;
      const addonIds = orderline.addons?.map((addon) => addon.id);
      return {
        menuId,
        addonIds,
      };
    });
    console.log(orderlineData);
    const data: { menu_id: number; addon_id: number | null }[] = [];
    orderlineData.forEach((orderline) => {
      const menu_id = orderline.menuId;
      if (orderline.addonIds && orderline.addonIds.length) {
        const addonIds = orderline.addonIds;

        addonIds.forEach((addonId) => {
          data.push({ menu_id, addon_id: addonId });
        });
      } else {
        data.push({ menu_id, addon_id: null });
      }
    });
    console.log(data);

    try {
      const newOrder = await prisma.order.create({
        data: {
          isPaid: false,
          location_id: locationId,
          table_id: tableId,
          status: "PENDING",
          orderline: {
            createMany: {
              data: data,
            },
          },
        },
      });
      return res.status(200).json({ newOrder });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  return res.json({ message: "OK" });
}
