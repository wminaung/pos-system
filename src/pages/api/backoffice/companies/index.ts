import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "PUT") {
    const { id, name } = req.body;
    const isValid = id && name;
    if (!isValid) return res.status(400).json("bad request");
    await prisma.company.update({ data: { name }, where: { id } });
    return res.status(200).json("ok");
  }
  res.send(405);
}
