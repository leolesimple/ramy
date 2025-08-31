import {ThemeProvider} from "@app/context/ThemeProvider";
import {ThemeColorMeta} from "@app/context/ThemeColorMeta";

export default function VisionLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans antialiased flex flex-col dark:bg-slate-200 dark:text-slate-950">
            <ThemeProvider>
                <ThemeColorMeta />
                {children}
            </ThemeProvider>
        </div>
    );
}
