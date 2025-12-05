// app/layout.tsx
import './globals.css';
import type {Metadata} from 'next';
import ClientLayoutWrapper from './ui/ClientLayoutWrapper';
import {ThemeProvider} from './context/ThemeProvider';
import { ThemeColorMeta } from "./context/ThemeColorMeta";
//import type { Viewport } from 'next'

export const metadata: Metadata = {
    title: {
        template: '%s | RAMY',
        default: 'RAMY', // a default is required when creating a template
    },
    description: 'Votre journal personnel des trains',
    manifest: '/manifest.json',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <link rel="apple-touch-icon" href="/ios/180.png" />
        </head>
        <body className="min-h-screen bg-slate-950 text-slate-200 font-sans antialiased flex flex-col transition-colors duration-500">
        <ThemeProvider>
            <ThemeColorMeta />
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ThemeProvider>
        </body>
        </html>
    );
}
