'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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
                        className="text-stone-400 hover:text-white transition-colors"
                        aria-label="Retour"
                    >
                        <ArrowLeftIcon className="w-6 h-6" />
                    </Link>
                )}
            </div>
            <div className="flex-1 flex justify-center">
                <h1 className="text-xl sm:text-2xl font-bold text-center text-stone-100">
                    {title}
                </h1>
            </div>
            <div className="flex-1" />
        </div>
    );
}
