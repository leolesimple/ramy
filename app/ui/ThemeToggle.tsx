'use client';

import { useTheme } from '../context/ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-3 right-4 z-50 w-[58px] h-[58px] flex items-center justify-center rounded-2xl bg-white/15 dark:bg-stone-900/20 backdrop-blur-[2px] saturate-200 backdrop-contrast-125 border border-white/20 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:bg-white/25 dark:hover:bg-stone-900/30 transition will-change-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 dark:focus-visible:ring-white/30"
            aria-label="Changer le thème"
        >
            {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
    );
}
