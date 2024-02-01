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
