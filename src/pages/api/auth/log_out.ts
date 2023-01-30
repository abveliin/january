// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next/types";

import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  //res: NextApiResponse<Data>
) {
  const { cookies } = req;

  const jwt = cookies.abvelinJWT;

  if (!jwt) {
    console.log("your are already not logged in");
    return res.json({ message: "your are already not logged in" });
  } else {
    const serialized = serialize("abvelinJWT", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({ message: "Success! to log out" });
    console.log("bye bye");
  }
}
