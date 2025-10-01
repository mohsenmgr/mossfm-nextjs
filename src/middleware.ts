import { NextResponse } from 'next/server';

import { withAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;

        // ✅ Replace with your actual email
        const allowedEmail = process.env.ADMIN_EMAIL;

        if (token?.email !== allowedEmail) {
            return NextResponse.redirect(new URL('/amin', req.url)); // send them home (or /login)
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token // must be logged in
        }
    }
);

export const config = {
    matcher: ['/amin/:path*'] // protect /admin and subroutes
};
