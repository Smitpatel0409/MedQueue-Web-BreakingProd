import { NextRequest, NextResponse } from 'next/server';

// // Define public routes that don't need auth
// const publicRoutes = ['/', '/login', '/register'];

// // Define paths that are always allowed (e.g. static files)
// const alwaysAllowedPaths = [
//   '/favicon.ico',
//   '/robots.txt',
//   '/sitemap.xml',
//   '/_next',
//   '/images',
//   '/public',
// ];

// function pathStartsWith(path: string, prefixes: string[]) {
//   return prefixes.some((prefix) => path === prefix || path.startsWith(prefix + '/'));
// }

// function isPublicRoute(path: string) {
//   return publicRoutes.includes(path);
// }

export function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;
  // const token = request.cookies.get('auth-token')?.value;

  // // Allow static/internal/public files
  // if (pathStartsWith(path, alwaysAllowedPaths)) {
  //   return NextResponse.next();
  // }

  // // If logged in and accessing public route → redirect to dashboard
  // if (isPublicRoute(path) && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  // // If not logged in and accessing a protected route → redirect to login
  // if (!isPublicRoute(path) && !token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
