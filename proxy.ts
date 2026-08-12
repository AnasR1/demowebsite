import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const sessionId = req.cookies.get('sessionId');

  if (!sessionId) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const response = await fetch(`${process.env.BACKEND_INTERNAL_URL}/auth/me`, {
    headers: { cookie : `sessionId=${sessionId.value}` },
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};