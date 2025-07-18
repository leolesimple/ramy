'use client';

import Image from 'next/image';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';

type VisionHeaderProps = {
    ligne: {
        nom: string;
        icon: string;
    },
    prefixeLigne?: string
};

export function VisionHeader({ligne, prefixeLigne}: VisionHeaderProps) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <ArrowLeftIcon
                className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition-colors"
                onClick={() => window.history.back()}
            ></ArrowLeftIcon>
            <Image
                src={ligne.icon}
                alt={`Icône de la ligne ${ligne.nom}`}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
                priority
            />
            <h1 className="text-2xl font-bold text-white">
                {prefixeLigne ? `${prefixeLigne}` : ''}
            </h1>
        </div>
    );
}
