'use client';

import Image from 'next/image';
import {ArrowLeftCircleIcon, ArrowLeftIcon} from '@heroicons/react/24/solid';
import Link from "next/link";

type VisionHeaderProps = {
    ligne: {
        nom: string;
        icon: string;
    },
    prefixeLigne?: string,
    backHref?: string,
};

export function VisionHeader({ligne, prefixeLigne, backHref}: VisionHeaderProps) {
    return (
        <div className="flex items-center gap-4 mb-8">
            {backHref && (
                <Link
                    href={backHref}
                    className="text-sky-600 hover:text-sky-400 transition-colors duration-200"
                    aria-label="Retour"
                >
                    <ArrowLeftCircleIcon className="w-10 h-10" />
                </Link>
            )}
            <Image
                src={ligne.icon}
                alt={`Icône de la ligne ${ligne.nom}`}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
                priority
            />
            <h1 className="text-2xl font-bold text-white dark:text-slate-900">
                {prefixeLigne ? `${prefixeLigne}` : ''}
            </h1>
        </div>
    );
}
