// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fileUpload } from "@/utils/fileUpload";
import type { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "express";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  name: string;
};

type CustomNextApiRequest = NextApiRequest &
  Request & {
    files: any[];
  };

type CustomNextApiResponse = NextApiResponse & Response;

export default function handler(
  req: CustomNextApiRequest,
  res: CustomNextApiResponse
) {
  const method = req.method;

  if (method === "GET") {
    // handleGetRequest(req, res);
    res.status(200).json({ name: `${method} Ok!!` });
  } else if (method === "POST") {
    handlePostRequest(req, res);
  } else {
    res.status(405).json({ name: `${method} not allow!!` });
  }
}

// TODO - handle image upload
const handlePostRequest = (
  req: CustomNextApiRequest,
  res: CustomNextApiResponse
) => {
  try {
    fileUpload(req, res, async (error: any) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "error in file upload in fileUpload()", error });
      }
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      return res.send({ assetUrl });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "error in file upload in catch()", err });
  }
};

// TODO - ...
// const handleGetRequest = (
//   req: CustomNextApiRequest,
//   res: CustomNextApiResponse
// ) => {};
