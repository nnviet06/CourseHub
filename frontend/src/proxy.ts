import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ['/dashboard']
const authRoutes = ['/login', '/signup']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuth = authRoutes.some(route => pathname.startsWith(route))

  if (isAuth && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

