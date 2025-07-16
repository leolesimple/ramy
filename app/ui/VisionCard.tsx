'use client';

import Image from 'next/image';
import Link from 'next/link';

type VisionLigneCardProps = {
    id: string;
    nom: string;
    couleur: string;
    icon: string;
};

export default function VisionLigneCard({ id, nom, couleur, icon }: VisionLigneCardProps) {
    return (
        <Link
            href={`/vision/${id}`}
            className="rounded-2xl p-4 text-white text-center font-bold flex flex-col items-center justify-center h-36 transition-transform active:scale-95 border"
            style={{
                backgroundColor: `${couleur}22`,
                border: `1px solid ${couleur}40`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: `
                    inset 0 0 0.5px ${couleur}40,
                    0 12px 32px -8px ${couleur}30
                `,
            }}
        >
            <Image
                src={icon}
                alt={`Icône de la ligne ${nom}`}
                width={64}
                height={64}
                className="mb-2"
                priority
            />
            <span className="sr-only">{nom}</span>
        </Link>
    );
}
