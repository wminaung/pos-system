// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
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
    res.status(405).json({ name: `${method} not allow!!` });
  }
}

// TODO -
const handleGetRequest = (req: NextApiRequest, res: NextApiResponse<any>) => {
  res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO - create Menu
const handlePostRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { name, price, description, location_ids, imageUrl } = req.body;

  console.log(req.body, "reg");
  if (!name || price < 0 || !description || !imageUrl)
    return res
      .status(404)
      .json({ error: "name,description,imageUrl & price are needed" });

  try {
    const newMenus = await prisma.menu.create({
      data: {
        name,
        price,
        description,
        image_url: imageUrl,
        menu_location: {
          createMany: {
            data: location_ids.map((location_id: number) => ({ location_id })),
          },
        },
      },
    });

    return res.status(200).json({ message: `${req.method} ok!!`, newMenus });
  } catch (error) {
    console.error({ error });
    return res.status(500).json({ message: "check prisma query", error });
  }
};

// TODO -
const handlePutRequest = (req: NextApiRequest, res: NextApiResponse<any>) => {
  res.status(200).json({ message: `${req.method} ok!!` });
};

// TODO -
const handleDeleteRequest = (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  res.status(200).json({ message: `${req.method} ok!!` });
};
