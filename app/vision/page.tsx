// app/vision/page.tsx
import { createClient } from '@/lib/supabaseClient';
import VisionLigneCard from '@/app/ui/VisionCard';

export default async function VisionPage() {
    const supabase = await createClient();

    const { data: lignes, error } = await supabase
        .from('lignes')
        .select('*')
        .order('nom');

    if (error || !lignes) {
        return <p className="text-center text-red-500 mt-10">Erreur de chargement des lignes.</p>;
    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center text-white mb-8">Choisissez une ligne</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {lignes.map((ligne) => (
                    <VisionLigneCard
                        key={ligne.id}
                        id={ligne.id}
                        nom={ligne.nom}
                        couleur={ligne.couleur}
                        icon={ligne.icon}
                    />
                ))}
            </div>
        </div>
    );
}
