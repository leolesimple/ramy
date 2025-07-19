import BackHomeButton from "@app/ui/BackHomeButton";

export default function VisionLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-950 text-stone-200 font-sans antialiased flex flex-col">
            <BackHomeButton />
            <main className="px-4 pt-8 pb-10 h-screen">{children}</main>
        </div>
    );
}
