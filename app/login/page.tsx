'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {createBrowserClient} from '@supabase/ssr';
import Image from "next/image";
import {motion} from 'framer-motion';
import {LoginButton} from "@app/ui/LoginButton";
import Label from "@app/ui/Label";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

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
            <div className="container flex flex-col place-items-center h-screen lg:flex-row lg:justify-between lg:px-20 mx-auto">
                <div className="flex justify-center items-center relative h-1/2 max-w-200 w-full">
                    <div className="relative h-9/10 w-9/10 rounded-4xl overflow-hidden">
                        <Image
                            src="/login/ramy_hero.png"
                            alt=""
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="flex lg:place-items-center h-1/2 max-w-200 w-full">
                    <motion.form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-2 sm:gap-2 max-w-xl p-sm-6 w-9/10 mx-auto text-white"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, ease: 'easeOut'}}
                    >
                        {/*Retour à l'accueil*/}
                        <Link href="/" className="text-sm text-blue-400 hover:underline">← Retour à l'accueil</Link>
                        <motion.h1
                            className="text-2xl font-bold text-center mb-2"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2, duration: 0.5}}
                        >
                            Se connecter à RAMY
                        </motion.h1>

                        <div className="flex flex-col">
                            <Label htmlFor="email">Adresse email</Label>
                            <input
                                type="email"
                                id="email"
                                placeholder="gisele.michu@email.net"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 rounded-xl bg-slate-800/80 border-[1px] border-slate-200/10 focus:ring-2 focus:ring-blue-500 transition-all"
                                required/>
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="password">Mot de Passe</Label>
                            <input
                                type="password"
                                id="password"
                                placeholder="supersecretpassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 rounded-xl bg-slate-800/80 border-[1px] border-slate-200/10 focus:ring-2 focus:ring-blue-500 transition-all"
                                required/>
                            <div className="text-sm text-right mt-1">
                                <Link href="/login/lost/" className="text-blue-400 hover:underline" aria-disabled={true}
                                >Mot de passe oublié ?</Link>
                            </div>
                        </div>
                        <motion.div
                            initial={{opacity: 0, scale: 1.05}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: 0.5, duration: 0.4, ease: 'easeOut'}}
                        >
                            <LoginButton>Connexion</LoginButton>
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
