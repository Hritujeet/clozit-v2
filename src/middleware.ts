import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', req.headers.get('access-control-request-headers') || 'Content-Type, Authorization, admin')
  res.headers.set('Access-Control-Max-Age', '86400')

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: res.headers })
  }

  // Only enforce on protected path(s)
  if (req.nextUrl.pathname.startsWith('/api/dashboard/v1')) {
    const adminHeader = req.headers.get('admin')
    if (adminHeader !== process.env.ADMIN) {
      // include CORS headers in the error
      return new Response(JSON.stringify({ error: 'Unauthorized access' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...Object.fromEntries(res.headers) },
      })
    }
  }

  return res
}

export const config = { matcher: '/api/:path*' }