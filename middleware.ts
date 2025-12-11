import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  // Get token from request
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Allow access to auth pages without authentication
  if (request.nextUrl.pathname.startsWith('/auth')) {
    // If user is already authenticated and tries to access auth pages, redirect to home
    if (token) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // If user is not authenticated and not on auth pages, redirect to login
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};