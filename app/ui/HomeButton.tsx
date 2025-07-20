'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

type ButtonProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export function HomeButton({ href, children, className }: ButtonProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        >
            <Link
                href={href}
                className={clsx(
                    'relative inline-block mt-6 px-6 py-3 bg-white/10 text-stone-200 border border-white/20 rounded-xl backdrop-blur-md transition-colors duration-200 font-medium hover:bg-white/20 dark:bg-stone-950 dark:text-stone-50 dark:border-white/20 hover:dark:bg-stone-900',
                    className
                )}
            >
                {/* Glow border animée */}
                <motion.span
                    className="absolute inset-0 rounded-xl border-2 border-white/30 pointer-events-none dark:border-stone-50/30"
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                        boxShadow: [
                            '0 0 6px 1px rgba(255,255,255,0.2)',
                            '0 0 12px 2px rgba(255,255,255,0.4)',
                            '0 0 6px 1px rgba(255,255,255,0.2)',
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <span className="relative z-10">{children}</span>
            </Link>
        </motion.div>
    );
}
