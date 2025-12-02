import { createClient } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import { VisionHeader } from '@/app/ui/VisionHeader';
import Link from 'next/link';
import Image from 'next/image';
import { getLignePrefixe } from '@/lib/utils';

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function VisionMaterielPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch ligne and liens in parallel for better performance
    const [ligneResult, liensResult] = await Promise.all([
        supabase
            .from('lignes')
            .select('id, nom, icon, prefixe')
            .eq('id', id)
            .single(),
        supabase
            .from('ligne_materiels')
            .select('materiel_id')
            .eq('ligne_id', id)
    ]);

    if (ligneResult.error || !ligneResult.data) notFound();
    if (liensResult.error || !liensResult.data) {
        console.error('Erreur récupération liens ligne/matériel', liensResult.error);
        notFound();
    }

    const ligne = ligneResult.data;
    const prefixeLigne = getLignePrefixe(ligne);
    const idsMateriels = liensResult.data.map((l) => l.materiel_id);

    // Fetch only needed columns from materiels
    const { data: materiels } = await supabase
        .from('materiels')
        .select('id, nom, icon')
        .in('id', idsMateriels);

    return (
        <div className="max-w-[1140px] w-full mx-auto py-10 px-4">
            <VisionHeader ligne={ligne} prefixeLigne={prefixeLigne} backHref={"/vision"} />
            <h2 className="text-xl font-semibold text-white mb-6 dark:text-slate-900">
                Choisissez un matériel
            </h2>
            {materiels && materiels.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {materiels.map((mat) => (
                        <Link
                            key={mat.id}
                            href={`/vision/${id}/table?idMateriel=${mat.id}`}
                            className="group relative"
                        >
                            <div className="w-full rounded-2xl p-4 text-white text-center font-bold flex flex-col items-center justify-center h-36 border-white/10 bg-white/5 backdrop-blur-xl transition-transform active:scale-95 dark:bg-slate-800/20 dark:text-slate-200 dark:border-slate-400">
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
                <p className="text-center text-slate-400 dark:text-slate-500 mt-10">
                    Aucun matériel trouvé pour cette ligne.
                </p>
            )}
        </div>
    );
}
