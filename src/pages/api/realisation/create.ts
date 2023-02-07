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
  const {
    tag_fr,
    tag,
    title_fr,
    title,
    excerpt_fr,
    excerpt,
    lasting_of_execution,
    photo_url,
  } = req.body;
  //const order: number = 0;
  try {
    await prisma.realisation.create({
      data: {
        tag_fr,
        tag,
        title_fr,
        title,
        excerpt_fr,
        excerpt,
        lasting_of_execution,
        photo_url,
        // order: order,
      },
    });
    res.status(200).json({ message: "data" }); // this line is required in order to refresh the database successfully
  } catch (error) {
    console.log("failure");
    console.log("console of request body", req.body);
  }
}
