import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { auth } from '@clerk/nextjs/server';

import createMiddleware from "next-intl/middleware";
import { useAuth } from "@clerk/clerk-react";
  const isPublicRoute = createRouteMatcher([
    '/',
    '/docs(.*)',
    '/sign-in(.*)', 
    '/sign-up(.*)'
  ]);
  
  export default clerkMiddleware((auth, req) => {
    if (!isPublicRoute(req)) {
      if (!auth().userId) {
        return auth().redirectToSignIn();
      }
      auth().protect();
    }
  }, { debug: true });
  
  export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
