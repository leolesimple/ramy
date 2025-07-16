'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginPage() {
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Redirection si déjà connecté
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                router.replace('/lignes');
            }
        };
        checkSession();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/lignes');
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 p-6 max-w-sm mx-auto mt-20"
        >
            <h1 className="text-2xl font-bold text-center">Connexion à RAMY</h1>

            <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 border rounded"
                required
            />
            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded"
                required
            />

            <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Se connecter
            </button>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
    );
}
