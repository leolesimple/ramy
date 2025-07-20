'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    HomeIcon,
    PowerIcon,
} from '@heroicons/react/24/outline';

const buttons = [
    {
        href: '/menu',
        icon: HomeIcon,
        label: 'Accueil menu',
        top: 'top-4',
        right: 'right-4',
        style: 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 dark:bg-stone-950/10 dark:text-stone-950 dark:border-stone-950/20', // vitre blanche
    },
    {
        href: '/logout',
        icon: PowerIcon,
        label: 'Se déconnecter',
        top: 'top-20',
        right: 'right-4',
        style: 'bg-red-500/10 hover:bg-red-500/20 text-red-200 border border-red-500/30 dark:bg-red-500/10 dark:text-red-200 dark:text-red-500 dark:border-red-950/20', // vitre rouge
    },
];

export default function FloatingNavButtons() {
    return (
        <>
            {buttons.map(({ href, icon: Icon, label, top, right, style }, index) => (
                <motion.div
                    key={href}
                    className={`fixed ${top} ${right} z-50`}
                    animate={{
                        y: [0, -2, 0, 2, 0],
                        rotate: [0, 0.6, 0, -0.6, 0],
                    }}
                    transition={{
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <Link
                        href={href}
                        className={`flex items-center justify-center w-12 h-12 ${style} rounded-full backdrop-blur-md transition-colors duration-200 shadow-lg`}
                        aria-label={label}
                    >
                        <Icon className="w-6 h-6" />
                    </Link>
                </motion.div>
            ))}
        </>
    );
}
