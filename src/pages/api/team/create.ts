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
  const { name, photo_url, position, position_fr } = req.body;

  try {
    const new_team_member = await prisma.team_member.create({
      data: {
        name: name,
        position: position,
        position_fr: position_fr,
        photo_url: photo_url,
      },
    });

    res.status(200).json({ message: "data" }); // this line is required in order to refresh the database successfully
  } catch (error) {
    console.log("failure");
  }
}
