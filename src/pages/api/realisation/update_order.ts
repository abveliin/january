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
  const items = req.body;

  try {
    items.forEach(async (item, index) => {
      const id: string = item.id;
      const order: number = index;

      await prisma.realisation.update({
        where: { id: String(id) },
        data: {
          order: order,
        },
      });
      console.log(id);
    });
    res.status(200).json({ message: "data" }); // this line is required in order to refresh the database successfully
    console.log("we succed to update database");
  } catch (error) {
    console.log("failure");
    console.log("console of request body", req.body);
  }
}
