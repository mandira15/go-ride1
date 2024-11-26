import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Protect driver routes
    if (path.startsWith('/driver') && token?.userType !== 'driver') {
      return NextResponse.redirect(new URL('/signin', req.url))
    }

    // Protect passenger routes
    if (path.startsWith('/passenger') && token?.userType !== 'passenger') {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ['/driver/:path*', '/passenger/:path*']
}