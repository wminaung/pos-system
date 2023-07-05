import { OrderlineItem } from "@/typings/types";
import { OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "@/utils/db";
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
    const payload = req.body as { orderlineItems: OrderlineItem[] };
    const orderlineItems = payload.orderlineItems;
    console.log("orderlineItems", orderlineItems);

    const totalPrice = orderlineItems.reduce((prev, curr) => {
      const quantity = curr.quantity;
      const menuPrice = curr.menu.price;
      const addonsPrice =
        curr.addons && curr.addons.length
          ? curr.addons.reduce((pr, cr) => pr + cr.price, 0)
          : 0;
      const currPrice = (menuPrice + addonsPrice) * quantity;
      return prev + currPrice;
    }, 0);
    console.log(totalPrice);

    const data: Prisma.Enumerable<Prisma.orderlineCreateManyOrderInput> = [];
    orderlineItems.forEach((orderlineItem) => {
      if (orderlineItem.addons && orderlineItem.addons.length) {
        const addons = orderlineItem.addons;
        addons.forEach((addon) => {
          data.push({
            orderlineItem_id: orderlineItem.id,
            menu_id: orderlineItem.menu.id,
            addon_id: addon.id,
            quantity: orderlineItem.quantity,
            status: "PENDING",
          });
        });
      } else {
        data.push({
          orderlineItem_id: orderlineItem.id,
          menu_id: orderlineItem.menu.id,
          addon_id: null,
          quantity: orderlineItem.quantity,
          status: "PENDING",
        });
      }
    });
    console.log("Data,", data);

    // { menu_id, addon_id, quantity, status: "PENDING" ,orderlineItem_id}
    try {
      const newOrder = await prisma.order.create({
        data: {
          isPaid: false,
          location_id: locationId,
          table_id: tableId,
          price: totalPrice,
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
