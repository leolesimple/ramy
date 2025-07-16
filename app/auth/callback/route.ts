import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const cookieStore = await cookies(); // ✅ Ne pas utiliser await ici

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                },
                set(name, value, options) {
                    cookieStore.set({
                        name,
                        value,
                        ...options,
                        maxAge: 60 * 60 * 24 * 90, // 90 jours
                    });
                },
                remove(name) {
                    cookieStore.delete(name);
                },
            },
        }
    );

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL('/lignes', request.url));
}
