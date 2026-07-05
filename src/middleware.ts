// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Protected routes
  const protectedPaths = ['/admin/dashboard', '/admin/orders', '/admin/menu'];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    // Check for admin session
    const adminSession = request.cookies.get('admin_session');
    
    if (!adminSession) {
      // Redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Rate limiting headers
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};