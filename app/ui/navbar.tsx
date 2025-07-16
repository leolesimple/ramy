'use client';

import Link from 'next/link';

export function Navbar() {
    return (
        <header
            className="fixed top-0 inset-x-0 z-50 h-16 bg-black text-white flex items-center justify-between px-4 shadow-md">
            <Link href="/" className="text-lg font-bold tracking-wide">
                RAMY
            </Link>
            <nav className="text-sm space-x-4">
                <Link href="/lignes" className="hover:underline">
                    Lignes
                </Link>
                <Link href="/ajout" className="hover:underline">
                    Ajout
                </Link>
                <Link href="/vision" className="hover:underline">
                    Vision
                </Link>
            </nav>
        </header>
    );
}
