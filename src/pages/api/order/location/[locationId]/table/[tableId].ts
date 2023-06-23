import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log({ param: req.query });
  const { locationId, tableId } = req.query as {
    [key: string]: string;
  };
  res.json({ message: "OK" });
}
