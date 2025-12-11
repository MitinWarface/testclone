import NextAuth from 'next-auth';
import { authOptions } from './lib/auth/auth';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export default withAuth(
  function middleware(request) {
    // You can also access the session data here
    // const session = request.nextauth?.token;
    // console.log('Session:', session);

    // Redirect to login page if user is not authenticated and trying to access protected routes
    if (!request.nextauth?.token && request.nextUrl.pathname.startsWith('/app')) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/app/:path*', '/auth/login', '/auth/register'],
};