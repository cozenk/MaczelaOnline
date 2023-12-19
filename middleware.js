import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/pizza/:id",
    "/api/webhook",
    "/api/users",
    "/api/uploadthing",
  ],
  apiRoutes: [
    "/api/users/me",
    "/api/cart/me",
    "/api/users/:id",
    "/api/orders/my-recent",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
