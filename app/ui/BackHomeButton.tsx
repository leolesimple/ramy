'use client';

import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function BackHomeButton() {
    return (
            <Link
                href="/menu"
                className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-full backdrop-blur-md transition-colors duration-200 shadow-lg"
                aria-label="Retour au menu"
            >
                <HomeIcon className="w-6 h-6" />
                <span className="sr-only">Retour au menu</span>
            </Link>
    );
}
