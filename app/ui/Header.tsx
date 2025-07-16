'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type PageHeaderProps = {
    title: string;
    backHref?: string;
};

export default function PageHeader({ title, backHref }: PageHeaderProps) {
    return (
        <div className="relative mb-8 flex items-center justify-center px-4 pt-6">
            {backHref && (
                <Link
                    href={backHref}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white transition-colors"
                    aria-label="Retour"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </Link>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-center text-stone-100">
                {title}
            </h1>
        </div>
    );
}
