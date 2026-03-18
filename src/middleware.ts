import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, SESSION_COOKIE } from '@/lib/auth';

const PROTECTED = [
  '/admin/dashboard',
  '/admin/blog',
  '/admin/galeri',
  '/admin/basin',
  '/admin/mesajlar',
  '/admin/menu',
  '/admin/sosyal',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsAuth = PROTECTED.some((p) => pathname.startsWith(p));
  const isLoginPage = pathname === '/admin';

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuth = token ? await verifyToken(token) : false;

  if (needsAuth && !isAuth) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  if (isLoginPage && isAuth) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
