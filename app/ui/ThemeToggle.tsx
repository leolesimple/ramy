'use client';

import { useTheme } from '../context/ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-full p-3 backdrop-blur-md transition-colors duration-200 shadow-lg dark:bg-stone-500/20 dark:text-stone-950 dark:border-stone-700/20"
            aria-label="Changer le thème"
        >
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
    );
}
