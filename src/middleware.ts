// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;

//   if (!token && request.nextUrl.pathname.startsWith("/protected")) {
//       console.log(request, "request");
//       return NextResponse.redirect(new URL("/login", request.url));
//       }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/protected/:path*"],
// };
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';

// const admin = require('firebase-admin');

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     }),
//   });
// }

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/protected')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if (token) {
  //   try {
  //     await admin.auth().verifyIdToken(token);
  //     return NextResponse.next();
  //   } catch (error) {
  //     console.error('Token verification failed:', error);
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected'],
};
