'use client';

import {useTheme} from '../context/ThemeProvider';
import {SunIcon, MoonIcon} from '@heroicons/react/24/outline';

export default function ThemeToggle() {
    const {theme, toggleTheme} = useTheme();

    return null;
    /*return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-1 lg:bottom-5 right-7 lg:right-5 z-50 w-[58px] h-[58px] flex items-center justify-center rounded-full bg-white/15 dark:bg-gray-900/20 backdrop-blur-[5px] saturate-200 backdrop-contrast-125 border border-white/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-gray-900/30 transition will-change-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 dark:focus-visible:ring-white/30"
            aria-label="Changer le thème"
        >
            {theme === 'dark' ? <SunIcon className="w-6 h-6"/> : <MoonIcon className="w-6 h-6"/>}
        </button>
    );*/
}
