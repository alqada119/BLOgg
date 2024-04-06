import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes:["/","/api/getblog"]
}); 
// Added public routes accesible without auth

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};