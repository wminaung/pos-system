import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  if (method === "GET") {
    return res.send({ message: "hello api" });
  }

  res.json({ message: "OK" });
}
