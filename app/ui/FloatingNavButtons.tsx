'use client';

import Link from 'next/link';
import {HomeIcon, PowerIcon, PlusIcon, EyeIcon} from '@heroicons/react/24/outline';

const buttons = [
    {
        href: '/menu',
        icon: HomeIcon,
        label: 'Retour au menu',
        style: 'hover:bg-white/20 text-stone-200 dark:text-stone-950',
    },
    {
        href: '/lignes',
        icon: PlusIcon,
        label: 'Ajout rapide d’un train',
        style: 'hover:bg-white/20 text-stone-200 dark:text-stone-950',
    },
    {
        href: '/vision',
        icon: EyeIcon,
        label: 'Ajout rapide d’un train',
        style: 'hover:bg-white/20 text-stone-200 dark:text-stone-950',
    },
    {
        href: '/logout',
        icon: PowerIcon,
        label: 'Se déconnecter',
        style: 'bg-red-500/20 dark:bg-red-200/20 hover:bg-red-500/30 text-red-700 dark:text-red-900 hover:text-red-400 dark:hover:text-red-950',
    },
];

export default function FloatingNavButtons() {
    return (
        <>
            <div
                className={`flex flex-row gap-2 fixed bottom-3 left-4 z-50 p-1 rounded-2xl bg-white/15 dark:bg-stone-900/20 backdrop-blur-md saturate-200 backdrop-contrast-125 border border-white/20 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition will-change-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 dark:focus-visible:ring-white/30`}>
                {buttons.map(({href, icon: Icon, label, style}, index) => (
                    <Link
                        key={index}
                        href={href}
                        className={`flex items-center justify-center w-12 h-12 ${style} rounded-[12px] transition-colors duration-200`}
                        aria-label={label}
                    >
                        <Icon className="w-6 h-6"/>
                    </Link>
                ))}
            </div>
        </>
    );
}
