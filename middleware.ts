import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// 👇 FORCE NODE.JS RUNTIME - This fixes the MIDDLEWARE_INVOCATION_FAILED error
export const runtime = 'nodejs';

const protectedRoute = createRouteMatcher(['/dashboard(.*)']);
const publicRoute = createRouteMatcher(['/', '/features', '/subjects', '/pricing', '/contact']);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the route is protected and the user is not signed in, redirect them to sign-in
  if (protectedRoute(req) && !userId) {
    return redirectToSignIn();
  }

  // Public routes don't require authentication
  return;
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.[\\w]+$).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};