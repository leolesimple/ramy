import Link from "next/link";

export default function MenuPage() {
    /*
    Two buttons:
    Choose beetween "Ajout" (/lignes) and "Vision" (/vision) with <Link> components.
    */
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-950 text-stone-200 font-sans antialiased px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Menu RAMY</h1>
            <p className="text-lg max-w-md mb-8">
                Choisissez une action à effectuer :
            </p>
            <div className="flex flex-col gap-4">
                <Link href="/lignes" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Ajout
                </Link>
                <Link href="/vision" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Vision
                </Link>
            </div>
        </div>
    );
}