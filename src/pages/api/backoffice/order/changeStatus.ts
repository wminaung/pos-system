import { OrderStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";

export interface ChangeStatusPayload {
  orderlineItemId: string;
  menuId: number;
  orderId: number;
  status: OrderStatus;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "PUT") {
    const { menuId, orderId, orderlineItemId, status } =
      req.body as ChangeStatusPayload;

    const isValid = menuId && orderId && orderlineItemId && status;

    if (!isValid)
      return res.status(400).json({ message: "is not valid payload" });

    try {
      const updatedOrderline = await prisma.orderline.updateMany({
        data: {
          status: status,
        },
        where: {
          menu_id: menuId,
          order_id: orderId,
          orderlineItem_id: orderlineItemId,
        },
      });
      return res.status(200).json({ updatedOrderline, message: "updated OK" });
    } catch (error) {
      return res.status(500).json({ error, message: "server ERROR" });
    }
  }

  return res.status(405).json({ message: `invalid ${req.method} method` });
}
