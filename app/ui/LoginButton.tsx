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
            tabIndex={0}
            className={clsx(
                'inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-slate-200   rounded-xl backdrop-blur-md transition-all duration-600 font-medium dark:bg-slate-950/10 dark:text-slate-950  hover:dark:bg-slate-950/20',
                className
            )}
        >
            {children}
        </button>
    );
}
