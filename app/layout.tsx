// app/layout.tsx
import './globals.css';
import type {Metadata} from 'next';
import BackHomeButton from "@app/ui/BackHomeButton";

export const metadata: Metadata = {
    title: 'RAMY',
    description: 'Historique personnel des trains pris',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <body className="min-h-screen bg-stone-950 text-stone-200 font-sans antialiased flex flex-col">
        <BackHomeButton />
        <main className="px-4 pt-8 pb-10 h-screen">{children}</main>
        </body>
        </html>
    );
}
