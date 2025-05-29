// app/middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Set CORS headers
  const response = NextResponse.next();
  const allowedOrigin = process.env.NODE_ENV === 'development' ? BYTE_CART_DEV_URL : BYTE_CART_PRODUCTION_URL;
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (request.method === 'OPTIONS') {
    return NextResponse.json(null, { headers: response.headers });
  }

  return response;
}

// Apply middleware to all API routes
export const config = {
  matcher: '/api/:path',
};