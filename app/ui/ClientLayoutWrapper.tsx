'use client';

import { usePathname } from 'next/navigation';
import FloatingNavButtons from './FloatingNavButtons';
import ThemeToggle from "@app/ui/ThemeToggle";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideOnRoutes = ['/', '/login'];
    const shouldShowButtons = !hideOnRoutes.includes(pathname);

    return (
        <>
            {shouldShowButtons && <FloatingNavButtons />}
            {shouldShowButtons && <ThemeToggle />}
            <main className="h-screen">{children}</main>
        </>
    );
}
