import {notFound} from 'next/navigation';
import {createClient} from '@/lib/supabaseClient';
import PageHeader from '@/app/ui/Header';
import Card from '@/app/ui/Card';
import Image from 'next/image';
import ThemeToggle from "@app/ui/ThemeToggle";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page({params}: PageProps) {
    const {id} = await params;
    const supabase = await createClient();
    // Auth check
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        return notFound();
    }
    const ligneId = id;
    // Récupère la ligne
    const {data: ligne, error: ligneError} = await supabase
        .from('lignes')
        .select('*')
        .eq('id', ligneId)
        .single();
    if (ligneError || !ligne) return notFound();
    // Récupère les matériels liés à la ligne
    const {data: liaisons, error: liaisonError} = await supabase
        .from('ligne_materiels')
        .select('materiel_id')
        .eq('ligne_id', ligneId);
    if (liaisonError || !liaisons) return notFound();
    const materielIds = liaisons.map((l) => l.materiel_id);
    const {data: materiels, error: matError} = await supabase
        .from('materiels')
        .select('*')
        .in('id', materielIds);
    if (matError || !materiels) return notFound();

    let prefixeLigne = "";
    if (ligne.prefixe) {
        prefixeLigne = ligne.prefixe;
    } else if (ligne.nom) {
        const firstLetter = ligne.nom.charAt(0).toUpperCase();
        if (['A', 'B', 'C', 'D', 'E'].includes(firstLetter)) {
            prefixeLigne = `RER ${firstLetter}`;
        } else {
            prefixeLigne = `Transilien ${firstLetter}`;
        }
    }

    return (
        <main className="px-4 mx-auto">
            <PageHeader
                title={`Ajouter un train | ${prefixeLigne}`}
                backHref="/lignes"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1140px] mx-auto pb-8">
                {materiels.map((mat) => (
                    <a
                        key={mat.id}
                        href={`/ajout/${ligne.id}/numVoiture?idMateriel=${mat.id}`}
                        className="group relative"
                    >
                        <Card color="rgba(255, 255, 255, 0.06)">
                            <Image
                                src={mat.icon}
                                alt={mat.nom}
                                width={120}
                                height={120}
                                className="w-30 h-30 object-contain mx-auto mb-2 group-hover:scale-110 transition-transform duration-200"
                            />
                            <span className="sr-only">{mat.nom}</span>
                        </Card>
                    </a>
                ))}
            </div>
        </main>
    );
}
