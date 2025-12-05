// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from './lib/supabase/middlewareClient';

export async function proxy(req: NextRequest) {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient(req, res);
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const publicPaths = ['/', '/login', '/auth/callback'];
    const pathname = req.nextUrl.pathname;

    if (!session && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return res;
}

export const config = {
    matcher: ['/((?!_next|.*\\..*|favicon.ico).*)'],
};
