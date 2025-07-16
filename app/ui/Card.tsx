'use client';

import Image from 'next/image';
import Link from 'next/link';
import {clsx} from "clsx";
import {ReactNode} from "react";

type LigneCardProps = {
    id: string;
    nom: string;
    couleur: string;
    icon: string;
};


type CardProps = {
    color: string;
    children?: ReactNode; // ← ici on accepte le contenu
};

export function LigneCard({ id, nom, couleur, icon }: LigneCardProps) {
    return (
        <Link
            href={`/ajout/${id}`}
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

export default function Card({ color, children }: CardProps) {
    return (
        <div
            className={clsx(
                'rounded-2xl p-4 text-white text-center font-bold flex flex-col items-center justify-center h-32 shadow-md transition-transform active:scale-95 border backdrop-blur-xl',
            )}
            style={{
                backgroundColor: color,
                boxShadow: `0 0 0.6rem 0.2rem ${color}`,
                borderColor: color,
            }}
        >
            {children}
        </div>
    );
}