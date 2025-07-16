'use client';

import Image from 'next/image';

type VisionHeaderProps = {
    ligne: {
        nom: string;
        icon: string;
    };
};

export function VisionHeader({ ligne }: VisionHeaderProps) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <Image
                src={ligne.icon}
                alt={`Icône de la ligne ${ligne.nom}`}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
                priority
            />
            <h1 className="text-2xl font-bold text-white">{ligne.nom}</h1>
        </div>
    );
}
