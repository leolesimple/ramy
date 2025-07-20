'use client';

import { usePathname } from 'next/navigation';
import FloatingNavButtons from './FloatingNavButtons';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideOnRoutes = ['/', '/login'];
    const shouldShowButtons = !hideOnRoutes.includes(pathname);

    return (
        <>
            {shouldShowButtons && <FloatingNavButtons />}
            <main className="h-screen">{children}</main>
        </>
    );
}
