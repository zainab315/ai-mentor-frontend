// middleware.ts - Temporary (Clerk removed for debugging)
export const runtime = 'nodejs';

export function middleware() {
  // Allow all requests - no authentication
  return;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/',
  ],
};