// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "../../../../lib/prisma";

type Data = {
  name_fr: string;
  name_en: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  //res: NextApiResponse<Data>
) {
  const { name_fr, name_en } = req.body;

  try {
    await prisma.position.create({
      data: {
        name_fr: name_fr,
        name_en: name_en,
      },
    });
    res.status(200).json({ message: "data" }); // this line is required in order to refresh the database successfully
  } catch (error) {
    console.log("failure");
  }
}
