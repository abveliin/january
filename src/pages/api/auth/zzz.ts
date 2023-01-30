// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require("dotenv").config();

import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "../../../../lib/prisma";

import { Secret, sign } from "jsonwebtoken";
import { serialize } from "cookie";

const secret = process.env.ABVELIN_KEY as Secret;
type Data = {
  username: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  //res: NextApiResponse<Data>
) {
  const { username, password } = req.body;

  if (username === "abvelin" && password === "f j ") {
    const time_of_duration = 60 * 60 * 24 * 30;
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + time_of_duration,
        username: username,
      },
      secret
    );
    console.log("the token is here 😂", token);
    const serialized = serialize("abvelinJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: time_of_duration,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Success!     uhhhhhu" });
  } else {
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
