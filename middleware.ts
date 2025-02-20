import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAuth } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Public paths that don't need authentication
  const publicPaths = ['/login', '/register', '/api/auth']
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Check for token
  const token = request.cookies.get('token')
  if (!token) {
    console.log('No token found, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const verified = await verifyAuth(token.value)
    if (!verified) {
      console.log('Invalid token, redirecting to login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  } catch (error) {
    console.log('Auth error, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/exam/:path*']
} 