import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoute = createRouteMatcher(['/dashboard(.*)']);
const publicRoute = createRouteMatcher(['/','/features','/subjects','/pricing','contact']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the route is protected and the user is not signed in, redirect them to sign-in
  if (protectedRoute(req) && !userId) {
    return redirectToSignIn();
  }

  // Public routes (like `/meeting`) don't require authentication
  return;
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};