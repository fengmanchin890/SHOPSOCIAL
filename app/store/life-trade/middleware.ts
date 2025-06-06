import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const isAuthenticated = request.cookies.get('lifeTradeAuth')?.value === 'authenticated'
  
  // Get the pathname
  const { pathname } = request.nextUrl
  
  // If the user is not authenticated and trying to access the main page, redirect to auth
  if (!isAuthenticated && pathname === '/store/life-trade' && !pathname.includes('/auth')) {
    return NextResponse.redirect(new URL('/store/life-trade/auth', request.url))
  }
  
  // If the user is authenticated and trying to access the auth page, redirect to main page
  if (isAuthenticated && pathname.includes('/auth')) {
    return NextResponse.redirect(new URL('/store/life-trade', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/store/life-trade', '/store/life-trade/auth'],
}