'use client';

import {useEffect, useState} from 'react';
import {createBrowserClient} from '@supabase/ssr';
import {VisionHeader} from '@/app/ui/VisionHeader';
import {useParams, useRouter, useSearchParams} from 'next/navigation';
import {PlusIcon} from '@heroicons/react/24/solid';

type Ligne = {
    id: string;
    nom: string;
    icon: string;
    couleur: string;
};

type Materiel = {
    id: string;
    nom: string;
    icon: string;
};

type Voiture = {
    id: string;
    numero_voiture: string;
    code_porte: string | null;
    created_at: string;
};

export default function VisionTablePage() {
    const params = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const router = useRouter();

    const idMateriel = searchParams.get('idMateriel');

    const [supabase] = useState(() =>
        createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    );

    const [ligne, setLigne] = useState<Ligne | null>(null);
    const [materiel, setMateriel] = useState<Materiel | null>(null);
    const [voitures, setVoitures] = useState<Voiture[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const {data: ligneData} = await supabase
                .from('lignes')
                .select('*')
                .eq('id', params.id)
                .single();
            setLigne(ligneData);

            const {data: matData} = await supabase
                .from('materiels')
                .select('*')
                .eq('id', idMateriel)
                .single();
            setMateriel(matData);

            const {data: vData} = await supabase
                .from('voitures')
                .select('*')
                .eq('id_ligne', params.id)
                .eq('id_materiel', idMateriel)
                .order('created_at', {ascending: false});
            setVoitures(vData ?? []);
        };

        if (params.id && idMateriel) {
            fetchData();
        }
    }, [params.id, idMateriel]);

    if (!ligne || !materiel) return null;

    let prefixeLigne = "";
    if (ligne.nom) {
        const firstLetter = ligne.nom.charAt(0).toUpperCase();
        if (['A', 'B', 'C', 'D', 'E'].includes(firstLetter)) {
            prefixeLigne = `RER ${firstLetter}`;
        } else {
            prefixeLigne = `Transilien ${firstLetter}`;
        }
    } else {
        prefixeLigne = "";
    }


    const filtered = voitures.filter((v) =>
        v.numero_voiture.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = () => {
        router.push(`/ajout/${ligne.id}/numVoiture?idMateriel=${materiel.id}`);
    };

    return (
        <div className="w-full mx-auto py-10 px-5">
            <VisionHeader ligne={ligne} prefixeLigne={prefixeLigne} backHref={`/vision/${ligne.id}`}/>

            <h2 className="text-xl font-semibold text-white mb-6 dark:text-slate-700">
                <span className="text-slate-300 dark:text-slate-900">
                    {materiel.nom} enregistrés
                </span>
            </h2>

            <div className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Rechercher un numéro de voiture"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-xl bg-slate-800/20 text-slate-100 border border-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800/10 dark:text-slate-900 dark:border-slate-400 dark:placeholder:text-slate-500"
                />
                <button
                    onClick={handleAdd}
                    className="p-2 bg-slate-800/20 rounded-xl text-slate-100 border border-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800/10 dark:text-slate-900 dark:border-slate-400 dark:placeholder:text-slate-500"
                    aria-label="Ajouter une voiture"
                >
                    <PlusIcon className="h-6 w-6"/>
                </button>
            </div>

            {filtered.length > 0 ? (
                <div className="px-0 sm:px-2">
                    <div className="overflow-x-auto mx-auto max-w-full rounded-xl">
                        <table className="w-full table-auto text-left text-[15px] sm:text-sm text-slate-50 dark:text-slate-900">
                            <thead className="sticky top-0 z-10">
                            <tr className="border-b border-slate-800/50 dark:border-slate-300/50 bg-slate-900/30 dark:bg-white/10 backdrop-blur-md">
                                <th className="py-3.5 pl-4 pr-6 font-semibold tracking-wide text-slate-200 dark:text-slate-800">Numéro</th>
                                <th className="py-3.5 pr-6 font-semibold tracking-wide text-slate-200 dark:text-slate-800">Porte</th>
                                <th className="py-3.5 pr-4 font-semibold tracking-wide text-slate-300 dark:text-slate-700">Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filtered.map(v => (
                                <tr
                                    key={v.id}
                                    className="border-b border-slate-800/40 dark:border-slate-300/40 even:bg-slate-900/10 dark:even:bg-white/40 hover:bg-slate-800/30 dark:hover:bg-slate-300/40 transition-colors"
                                >
                                    <td className="py-3.5 pl-4 pr-6 text-lg font-semibold">{v.numero_voiture}</td>
                                    <td className="py-3.5 pr-6 text-md">{v.code_porte || '-'}</td>
                                    <td className="py-3.5 pr-4 text-[1rem] text-slate-400 dark:text-slate-950 whitespace-nowrap tabular-nums">
                                        {new Date(v.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}{" "}
                                        {new Date(v.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false })}

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            ) : (
                <p className="text-slate-400 text-center">Aucune voiture trouvée avec ce numéro.</p>
            )}
        </div>
    );
}
