// app/vision/page.tsx
import {createClient} from '@/lib/supabaseClient';
import VisionLigneCard from '@/app/ui/VisionCard';
import PageHeader from "@app/ui/Header";

export default async function VisionPage() {
    const supabase = await createClient();

    // Fetch only needed columns instead of all columns
    const {data: lignes, error} = await supabase
        .from('lignes')
        .select('id, nom, couleur, icon')
        .order('nom');

    if (error || !lignes) {
        return <p className="text-center text-red-500 mt-10">Erreur de chargement des lignes.</p>;
    }

    return (
        <>
            <PageHeader title="Consulter l'historique" backHref="/menu"/>
            <div className="p-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {lignes.map((ligne) => (
                    <VisionLigneCard
                        key={ligne.id}
                        id={ligne.id}
                        nom={ligne.nom}
                        couleur={ligne.couleur}
                        icon={ligne.icon}/>
                ))}
            </div>
        </>
    );
}
