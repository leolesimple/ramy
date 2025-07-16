// lib/supabase/middlewareClient.ts
import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export function createMiddlewareClient(req: NextRequest, res: NextResponse) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (key: string) => req.cookies.get(key)?.value,
                set: (key: string, value: string, options: CookieOptions) => {
                    res.cookies.set(key, value, options);
                },
                remove: (key: string, options: CookieOptions) => {
                    res.cookies.set(key, '', { ...options, maxAge: -1 });
                },
            },
        }
    );
}
