import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify_auth } from "./lib/auth";
//import { Secret, verify } from "jsonwebtoken";

const secret = process.env.ABVELIN_KEY;

export default async function middleware(request: NextRequest) {
  const { cookies } = request;
  const abvelinJWT = cookies.get("abvelinJWT")?.value;

  const verified_token =
    abvelinJWT &&
    (await verify_auth(abvelinJWT).catch((error) => {
      console.log(error);
    }));

  if (request.nextUrl.pathname.startsWith("/log_in") && !verified_token) {
    return;
  }

  if (request.url.includes("/log_in") && verified_token) {
    return NextResponse.redirect(new URL("/manage", request.url));
  }

  if (!verified_token) {
    return NextResponse.redirect(new URL("/log_in", request.url));
  }
}

export const config = {
  matcher: ["/manage/:path*", "/log_in"],
};
