'use client';

import {motion} from 'framer-motion';
import {HomeButton} from "@app/ui/HomeButton";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {createBrowserClient} from "@supabase/ssr";

export default function MenuPage() {
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                router.replace('/menu');
            }
        };
        checkSession();
    }, []);

    return (
        <div
            className="flex flex-col h-full items-center justify-center bg-stone-950 text-stone-200 font-sans antialiased px-4 text-center space-y-8 overflow-hidden dark:bg-stone-50 dark:text-stone-950">
            <motion.h2
                className="text-4xl font-bold max-w-md"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: 'easeOut'}}
                viewport={{ once: true }}
            >
                Bienvenue sur RAMY
            </motion.h2>

            <motion.p
                className="text-lg max-w-md"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2, duration: 0.6, ease: 'easeOut'}}
            >
                RAMY permet de répertorier les voitures de trains du réseau francilien que j&apos;ai pu prendre.
            </motion.p>

            <motion.div
                className="flex gap-4 w-full max-w-fit mx-auto"
                initial={{ opacity: 0, scale: 1.1 , y: 10 }}
                animate={{ opacity: 1, scale: 1 , y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            >
                <HomeButton href="/login">🚪 Entrer</HomeButton>
            </motion.div>

        </div>
    );
}
