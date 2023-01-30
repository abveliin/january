// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "../../../../lib/prisma";

type Data = {
  first_name: string;
  second_name: string;
  title: string;
  photo_url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  //res: NextApiResponse<Data>
) {
  const { first_name, second_name, title, photo_url } = req.body;

  try {
    await prisma.post.create({
      data: {
        first_name: first_name,
        second_name: second_name,
        title: title,
        photo_url: photo_url,
      },
    });
    res.status(200).json({ message: "data" }); // this line is required in order to refresh the database successfully
  } catch (error) {
    console.log("failure");
  }
}
