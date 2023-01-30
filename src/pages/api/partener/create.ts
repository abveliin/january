// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "../../../../lib/prisma";

type Data = {
  name: string;
  photo_url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  //res: NextApiResponse<Data>
) {
  const { name, logo_url } = req.body;

  try {
    const partener = await prisma.partener.create({
      data: {
        name: name,
        logo_url: logo_url,
      },
    });

    res.status(200).json({ message: "data" }); // this line is required in order to refresh the database successfully
  } catch (error) {
    console.log("failure");
  }
}
