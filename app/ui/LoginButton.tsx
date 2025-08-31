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
                'inline-block mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-stone-200   rounded-xl backdrop-blur-md transition-all duration-600 font-medium dark:bg-stone-950/10 dark:text-stone-950  hover:dark:bg-stone-950/20',
                className
            )}
        >
            {children}
        </button>
    );
}
