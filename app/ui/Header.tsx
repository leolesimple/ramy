'use client';

import {ArrowLeftCircleIcon} from '@heroicons/react/24/solid';
import Link from 'next/link';

type PageHeaderProps = {
    title: string;
    backHref?: string;
};
export default function PageHeader({ title, backHref }: PageHeaderProps) {
    return (
        <div className="mb-8 flex items-center justify-between px-4 pt-6">
            <div className="flex-1 flex justify-start">
                {backHref && (
                    <Link
                        href={backHref}
                        className="text-sky-600 hover:text-sky-400 transition-colors duration-200"
                        aria-label="Retour"
                    >
                        <ArrowLeftCircleIcon className="w-10 h-10" />
                    </Link>
                )}
            </div>
            <div className="flex-1 flex justify-center">
                <h1 className="text-xl sm:text-2xl font-bold text-center text-stone-100 dark:text-stone-900 tracking-tight
">
                    {title}
                </h1>
            </div>
            <div className="flex-1" />
        </div>
    );
}
