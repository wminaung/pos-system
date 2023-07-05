// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteQrCode } from "@/utils/fileUpload";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "GET") {
    handleGetRequest(req, res);
  } else if (method === "POST") {
    handlePostRequest(req, res);
  } else if (method === "PUT") {
    handlePutRequest(req, res);
  } else if (method === "DELETE") {
    await deleteQrCode();
    return res.status(200).json({ message: `${req.method} ok!!` });
  } else {
    res.status(405).json({ message: `${method} not allow!!` });
  }
}

// TODO -
const handleGetRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const menusData = [
    { name: "menu232", price: 30, image_url: "", description: "sdf" },
    { name: "menu232", price: 30, image_url: "", description: "sdf" },
  ];

  // const newMenus = await prisma.$transaction(
  //   menusData.map((menu) => prisma.menu.create({ data: menu }))
  // );

  // console.log(newMenus, "nnnnnnnnnnnnnnnnnnnnnnnnnn");
  return res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO -
const handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  return res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO -
const handlePutRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  return res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO -
const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  return res.status(200).json({ message: `${req.method} ok!!` });
};
