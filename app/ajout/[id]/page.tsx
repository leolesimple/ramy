import {notFound} from 'next/navigation';
import {createClient} from '@/lib/supabaseClient';
import PageHeader from '@/app/ui/Header';
import Card from '@/app/ui/Card';
import Image from 'next/image';
import {getLignePrefixe} from '@/lib/utils';

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page({params}: PageProps) {
    const {id: ligneId} = await params;
    const supabase = await createClient();
    
    // Auth check
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        return notFound();
    }
    
    // Fetch ligne and liaisons in parallel for better performance
    const [ligneResult, liaisonsResult] = await Promise.all([
        supabase
            .from('lignes')
            .select('id, nom, prefixe')
            .eq('id', ligneId)
            .single(),
        supabase
            .from('ligne_materiels')
            .select('materiel_id')
            .eq('ligne_id', ligneId)
    ]);
    
    if (ligneResult.error || !ligneResult.data) return notFound();
    if (liaisonsResult.error || !liaisonsResult.data) return notFound();
    
    const ligne = ligneResult.data;
    const materielIds = liaisonsResult.data.map((l) => l.materiel_id);
    
    // Fetch only needed columns from materiels
    const {data: materiels, error: matError} = await supabase
        .from('materiels')
        .select('id, nom, icon')
        .in('id', materielIds);
    if (matError || !materiels) return notFound();

    const prefixeLigne = getLignePrefixe(ligne);

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
