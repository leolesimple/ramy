'use client';

import {clsx} from 'clsx';

type LoginButtonProps = {
    children: React.ReactNode;
    className?: string;
    type?: 'submit' | 'button';
    disabled?: boolean;
};

export function LoginButton({
                                children,
                                className,
                                type = 'submit',
                                disabled = false,
                            }: LoginButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={clsx(
                'inline-block mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/20 rounded-xl backdrop-blur-md transition-all duration-200 font-medium',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
        >
            {children}
        </button>
    );
}
