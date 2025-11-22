'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {createBrowserClient} from '@supabase/ssr';
import Image from "next/image";
import {motion} from 'framer-motion';
import {LoginButton} from "@app/ui/LoginButton";

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
            const {data} = await supabase.auth.getSession();
            if (data.session) {
                router.replace('/menu');
            }
        };
        checkSession();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/menu');
        }
    };

    return (
        <>
            <div className="container flex flex-col place-items-center h-screen">
                <div className="flex justify-center items-center relative h-1/2 max-w-200 w-full">
                    <div className="relative h-9/10 w-9/10 rounded-4xl overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1581262208435-41726149a759?q=80&w=3562&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="flex justify-center h-1/2 max-w-200 w-full">
                    <motion.form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-4 max-w-xl p-sm-6 w-9/10 mx-auto mt-20 text-white dark:text-slate-950"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, ease: 'easeOut'}}
                    >
                        <motion.h1
                            className="text-2xl font-bold text-center mb-2"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2, duration: 0.5}}
                        >
                            Se connecter
                        </motion.h1>

                        <input
                            type="email"
                            placeholder="Adresse email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded-xl bg-slate-800/80 border-[1px] border-slate-200/10 focus:ring-2 focus:ring-blue-500 transition-all dark:bg-white dark:border-slate-950/20 dark:focus:ring-blue-500"
                            required/>

                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded-xl bg-slate-800 border-[1px] border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:bg-white dark:border-slate-950/20 dark:focus:ring-blue-500"
                            required/>

                        <motion.div
                            initial={{opacity: 0, scale: 1.05}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: 0.5, duration: 0.4, ease: 'easeOut'}}
                        >
                            <LoginButton>Se connecter</LoginButton>
                        </motion.div>

                        {error && (
                            <motion.p
                                className="text-red-400 text-sm text-center mt-2"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.form>
                </div>
            </div>

        </>
    );
}
