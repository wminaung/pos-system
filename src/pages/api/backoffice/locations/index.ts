// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/db";

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

// TODO - create location
const handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { name, address, companyId } = req.body;
  if (!name || !address || !companyId) {
    return res
      .status(404)
      .json({ message: "name ,companyIdand address are needed" });
  }

  try {
    const newLocation = await prisma.location.create({
      data: {
        name,
        address,
        company_id: companyId,
      },
    });

    return res.status(200).json({ newLocation, message: `${req.method} ok!!` });
  } catch (error) {
    console.log({ error });
    return res
      .status(200)
      .json({ message: ` check! location create prisma`, error });
  }
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
