import { Button } from '@app/ui/Button';

export default function MenuPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-stone-950 text-stone-200 font-sans antialiased px-4 text-center space-y-8 overflow-hidden">
            <h2 className="text-4xl font-bold max-w-md">Choisissez une action à effectuer :</h2>
            <div className="flex gap-4 w-full max-w-fit mx-auto">
                <Button href="/lignes">
                    Ajout
                </Button>
                <Button href="/vision">
                    Vision
                </Button>
            </div>
        </div>
    );
}