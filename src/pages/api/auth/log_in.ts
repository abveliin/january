// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require("dotenv").config();

import type { NextApiRequest, NextApiResponse } from "next/types";
import { prisma } from "../../../../lib/prisma";

import { SignJWT } from "jose";
import { serialize } from "cookie";
import { nanoid } from "nanoid";
import { get_jwt_secret_key } from "@/lib/auth";

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

  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    const time_of_duration = 60 * 60 * 24 * 30;

    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("1m")
      .sign(new TextEncoder().encode(get_jwt_secret_key()));

    const serialized = serialize("abvelinJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      //sameSite: "strict",
      //maxAge: time_of_duration,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Success!     uhhhhhu" });
  } else {
    console.log("invalid credentials");
    res.status(401).json({ message: "Invalid credentials!" });
  }
}
