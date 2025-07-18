import { createClient } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import { VisionHeader } from '@/app/ui/VisionHeader';
import Link from 'next/link';
import Image from 'next/image';

export default function VisionMaterielPage({ params }: any) {
    return <AsyncVisionPage params={params} />;
}

async function AsyncVisionPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();

    const { data: ligne } = await supabase
        .from('lignes')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!ligne) notFound();

    const { data: liens, error } = await supabase
        .from('ligne_materiels')
        .select('materiel_id')
        .eq('ligne_id', params.id);

    if (!liens || error) {
        console.error('Erreur récupération liens ligne/matériel', error);
        notFound();
    }

    const idsMateriels = liens.map((l) => l.materiel_id);

    const { data: materiels } = await supabase
        .from('materiels')
        .select('*')
        .in('id', idsMateriels);

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <VisionHeader ligne={ligne} />
            <h2 className="text-xl font-semibold text-white mb-6">Choisissez un matériel</h2>
            {materiels && materiels.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {materiels.map((mat) => (
                        <Link
                            key={mat.id}
                            href={`/vision/${params.id}/table?idMateriel=${mat.id}`}
                            className="group relative"
                        >
                            <div className="rounded-2xl p-4 text-white text-center font-bold flex flex-col items-center justify-center h-36 border border-white/10 bg-white/5 backdrop-blur-xl transition-transform active:scale-95">
                                <Image
                                    src={mat.icon}
                                    alt={mat.nom}
                                    width={56}
                                    height={56}
                                    className="w-30 h-30 object-contain mx-auto mb-2 group-hover:scale-110 transition-transform duration-200"
                                />
                                <span className="sr-only">{mat.nom}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-stone-400">Aucun matériel trouvé pour cette ligne.</p>
            )}
        </div>
    );
}
