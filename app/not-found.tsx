// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-stone-950 dark:bg-white">
            <div className="flex flex-col items-center justify-center gap-6 px-8 py-10 rounded-2xl
        bg-stone-900/20 dark:bg-white/15
        backdrop-blur-[2px] saturate-200 backdrop-contrast-125
        border border-white/10 dark:border-white/20
        shadow-[0_8px_24px_rgba(0,0,0,0.12)]
        hover:bg-stone-900/30 dark:hover:bg-white/25
        transition will-change-transform active:scale-95
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-white/30 dark:focus-visible:ring-white/50">
                <h1 className="text-7xl font-bold tracking-tight text-white dark:text-stone-900">404</h1>
                <p className="text-lg text-stone-300 dark:text-stone-700">Cette page est introuvable.</p>
                <Link
                    href="/"
                    className="px-5 py-2.5 rounded-xl font-medium
            bg-stone-800/30 dark:bg-white/30
            border border-white/10 dark:border-white/20
            backdrop-blur-md transition
            hover:bg-stone-800/50 dark:hover:bg-white/50
            text-white dark:text-stone-900"
                >
                    Retour à l’accueil
                </Link>
            </div>
        </div>
    );
}
