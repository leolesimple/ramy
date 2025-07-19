'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function BackHomeButton() {
    return (
        <motion.div
            className="fixed top-4 right-4 z-50"
            animate={{
                y: [0, -2, 0, 2, 0],
                rotate: [0, 0.6, 0, -0.6, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            <Link
                href="/menu"
                className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-full backdrop-blur-md transition-colors duration-200 shadow-lg"
                aria-label="Retour au menu"
            >
                <HomeIcon className="w-6 h-6" />
            </Link>
        </motion.div>
    );
}
