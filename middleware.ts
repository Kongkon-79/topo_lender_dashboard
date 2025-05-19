import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("token data", token?.role);

  // Not authenticated
    // if (!token) {
    //   return NextResponse.redirect(new URL("/sign-in", req.url));
    // }

  //   Not Lender
  if (token?.role !== "LENDER") {
    return NextResponse.redirect(new URL("/sign-in", req.url)); // or /unauthorized
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard"],
};
