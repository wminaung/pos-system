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

// TODO -
const handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  return res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO - update Location
const handlePutRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const locationId = Number(req.query.id as string);
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(500).json({ message: "err: name : email !!!" });
  }

  try {
    const updatedLocation = await prisma.location.update({
      where: {
        id: locationId,
      },
      data: {
        name,
        address,
      },
    });

    return res
      .status(200)
      .json({ updatedLocation, message: `location update success!!` });
  } catch (error) {
    console.log({ error });
    return res
      .status(200)
      .json({ message: ` check! location update prisma`, error });
  }
};

// TODO - dlete location
const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const locationId = Number(req.query.id as string);

  try {
    const archivedLocation = await prisma.location.update({
      where: {
        id: locationId,
      },
      data: {
        is_archived: true,
      },
    });

    return res
      .status(200)
      .json({ archivedLocation, message: `${req.method} ok!!` });
  } catch (error) {
    console.log({ error });
    return res
      .status(200)
      .json({ message: ` check! location delete prisma`, error });
  }
};
