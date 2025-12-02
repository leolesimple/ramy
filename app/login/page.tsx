'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { motion } from 'framer-motion';
import {LoginButton} from "@app/ui/LoginButton";

export default function LoginPage() {
    const router = useRouter();
    
    // Initialize Supabase client once with useMemo
    const supabase = useMemo(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ), []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Redirection si déjà connecté
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                router.replace('/menu');
            }
        };
        checkSession();
    }, [supabase, router]);

    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/menu');
        }
    }, [supabase, email, password, router]);

    return (
        <motion.form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 p-6 max-w-sm mx-auto mt-20 text-white dark:text-stone-950"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <motion.h1
                className="text-2xl font-bold text-center mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Connexion à RAMY
            </motion.h1>

            <input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-xl bg-stone-800 border-[1px] border-stone-700 focus:ring-2 focus:ring-blue-500 transition-all dark:bg-white dark:border-stone-950/20 dark:focus:ring-blue-500"
                required
            />

            <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-xl bg-stone-800 border-[1px] border-stone-700 focus:ring-2 focus:ring-blue-500 transition-all dark:bg-white dark:border-stone-950/20 dark:focus:ring-blue-500"
                required
            />

            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
            >
                <LoginButton>Se connecter</LoginButton>
            </motion.div>

            {error && (
                <motion.p
                    className="text-red-400 text-sm text-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {error}
                </motion.p>
            )}
        </motion.form>
    );
}
