import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';


export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/landing-page', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/landing-page', '/login', '/other-protected-routes'],
};
