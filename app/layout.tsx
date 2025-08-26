// app/layout.tsx
import './globals.css';
import type {Metadata} from 'next';
import ClientLayoutWrapper from './ui/ClientLayoutWrapper';
import {ThemeProvider} from './context/ThemeProvider';
import type { Viewport } from 'next'

export const metadata: Metadata = {
    title: 'RAMY',
    description: 'Votre journal personnel des trains',
    manifest: '/manifest.json',
};

export const viewport: Viewport = {
    themeColor: '#e7e5e4',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <link rel="apple-touch-icon" href="/ios/180.png" />
            <title>RAMY</title>
        </head>
        <body className="min-h-screen bg-stone-950 text-stone-200 font-sans antialiased flex flex-col dark:bg-stone-50 dark:text-stone-950">
        <ThemeProvider>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
        </body>
        </html>
    );
}
