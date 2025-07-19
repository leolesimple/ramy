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
        <div className="max-w-5xl mx-auto py-10 px-4">
            <VisionHeader ligne={ligne} prefixeLigne={prefixeLigne}/>

            <h2 className="text-xl font-semibold text-white mb-6">
                Voitures enregistrées – <span className="text-slate-300">{materiel.nom}</span>
            </h2>

            <div className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Rechercher un numéro de voiture"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-4 py-2 rounded bg-slate-800/20 text-slate-100 border border-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleAdd}
                    className="p-2 border border-slate-600 rounded bg-slate-800/20 hover:bg-slate-800 transition-colors text-white"
                    aria-label="Ajouter une voiture"
                >
                    <PlusIcon className="h-6 w-6"/>
                </button>
            </div>

            {filtered.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm text-white">
                        <thead>
                        <tr className="border-b border-slate-700">
                            <th className="py-2 pr-4">Numéro</th>
                            <th className="py-2 pr-4">Porte</th>
                            <th className="py-2">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map((v) => (
                            <tr key={v.id} className="border-b border-slate-800">
                                <td className="py-2 pr-4">{v.numero_voiture}</td>
                                <td className="py-2 pr-4">{v.code_porte || '—'}</td>
                                <td className="py-2 text-slate-400">
                                    {new Date(v.created_at).toLocaleString('fr-FR')}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-slate-400 text-center">Aucune voiture trouvée avec ce numéro.</p>
            )}
        </div>
    );
}
