import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const { pathname } = req.nextUrl;
    const admin = token?.isAdmin;
    const adminRoute = ["/courses", "/assets", "/tools"];
    if (!admin && adminRoute.includes(pathname)) {
      return NextResponse.redirect(new URL("/404", req.url));
    }
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signIn", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/courses",
    "/profiles",
    "/users",
    "/assets",
    "/tools",
    "/calendar",
  ],
};
