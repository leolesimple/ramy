// app/layout.tsx
import './globals.css';
import type {Metadata} from 'next';
import ClientLayoutWrapper from './ui/ClientLayoutWrapper';
import {ThemeProvider} from './context/ThemeProvider';

export const metadata: Metadata = {
    title: 'RAMY',
    description: 'Historique personnel des trains pris',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <body className="min-h-screen bg-stone-950 text-stone-200 font-sans antialiased flex flex-col dark:bg-stone-50 dark:text-stone-950">
        <ThemeProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
        </body>
        </html>
    );
}
