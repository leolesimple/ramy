import { Button } from '@app/ui/Button';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-950 text-stone-200 font-sans antialiased px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Bienvenue sur RAMY</h1>
            <p className="text-lg max-w-md">
                Suivez votre historique personnel des trains pris et découvrez les lignes disponibles.
            </p>

            <Button href="/login">
                Entrer
            </Button>
        </div>
    );
}
