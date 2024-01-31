// export async function middleware(req) {
//   const requestForNextAuth = {
//     headers: {
//       cookie: req.headers.get("cookie"),
//     },
//   };
//   const session = await getSession({ req: requestForNextAuth });

//   const { pathname } = req.nextUrl;

//   const admin = session?.sessionData?.admin;
//   const adminRoute = ["/courses", "/assets", "/tools"];

//   if (!admin && adminRoute.includes(pathname)) {
//     return NextResponse.redirect(new URL("/404", req.url));
//   }

//   if (session === null) {
//     return NextResponse.redirect(new URL("/auth/signIn", req.url));
//   }
// }

export { default } from "next-auth/middleware";

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
