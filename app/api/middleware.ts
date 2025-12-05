
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get('adminToken'); 
  const url = req.nextUrl.clone();

  if (!isAdmin && !url.pathname.startsWith('/admin/login')) {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
