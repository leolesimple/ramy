'use client';

import Link from 'next/link';
import {clsx} from 'clsx';
import React from "react";

type ButtonProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export function Button({href, children, className}: ButtonProps) {
    return (
        <Link
            href={href}
            className={clsx(
                'inline-block mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-stone-200   rounded-xl backdrop-blur-md transition-all duration-600 font-medium dark:bg-stone-950/10 dark:text-stone-950  hover:dark:bg-stone-950/20',
                className
            )}
        >
            {children}
        </Link>
    );
}
