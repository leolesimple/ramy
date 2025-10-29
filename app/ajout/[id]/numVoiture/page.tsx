'use client';

import {useParams, useRouter, useSearchParams} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {createBrowserClient} from '@supabase/ssr';
import PageHeader from "@app/ui/Header";
import ThemeToggle from "@app/ui/ThemeToggle";

type Materiel = {
    id: string;
    nom: string;
};

type Ligne = {
    id: string;
    nom?: string;
    prefixe?: string;
};

export default function NumVoiturePage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const idLigne = params?.id ?? '';
    const idMateriel = searchParams.get('idMateriel') ?? '';

    const [supabase, setSupabase] = useState<any>(null);
    const [numeroVoiture, setNumeroVoiture] = useState('');
    const [mission, setMission] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [confirmation, setConfirmation] = useState(false);
    const [materiel, setMateriel] = useState<Materiel | null>(null);
    const [ligne, setLigne] = useState<Ligne | null>(null);

    useEffect(() => {
        const client = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        setSupabase(client);
    }, []);

    useEffect(() => {
        if (!supabase) return;
        if (!idMateriel || !idLigne) {
            setError("ID matériel ou ligne manquant.");
            setLoading(false);
            return;
        }

        async function fetchData() {
            try {
                const {data: matData, error: errMat} = await supabase
                    .from('materiels')
                    .select('id, nom')
                    .eq('id', idMateriel)
                    .single();

                if (errMat) throw errMat;
                setMateriel(matData);

                const {data: ligData, error: errLig} = await supabase
                    .from('lignes')
                    .select('id, nom')
                    .eq('id', idLigne)
                    .single();

                if (errLig) throw errLig;
                setLigne(ligData);

                setLoading(false);
            } catch (e: any) {
                setError(e.message ?? 'Erreur chargement données');
                setLoading(false);
            }
        }

        fetchData().then(() => {
            // Reset form fields after fetching data
            setNumeroVoiture('');
            setMission('');
        });
    }, [supabase, idMateriel, idLigne]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) return;
        setError(null);

        if (!numeroVoiture.trim()) {
            setError("Le numéro de voiture est obligatoire.");
            return;
        }

        try {
            const {error: insertError} = await supabase.from('voitures').insert({
                id_ligne: idLigne,
                id_materiel: idMateriel,
                numero_voiture: numeroVoiture.trim(),
                mission: mission.trim() || null,
            });

            if (insertError) throw insertError;

            setConfirmation(true);
        } catch (e: any) {
            setError(e.message ?? 'Erreur insertion');
        }
    };

    const handleDelete = async () => {
        if (!supabase) return;

        try {
            const {error: delError} = await supabase
                .from('voitures')
                .delete()
                .match({
                    id_ligne: idLigne,
                    id_materiel: idMateriel,
                    numero_voiture: numeroVoiture.trim(),
                });

            if (delError) throw delError;

            router.push('/ajout/' + idLigne + '?idMateriel=' + idMateriel);
        } catch (e: any) {
            setError(e.message ?? 'Erreur suppression');
        }
    };

    //fetch ligne.nom from idLigne
    // and set lignePrefixe based on the ligne.nom (nom beetween A and E = RER, else = Transilien)

    const ligneNom = ligne?.nom || '';

    let lignePrefixe;
    if (ligneNom.startsWith('A') || ligneNom.startsWith('B') || ligneNom.startsWith('C') || ligneNom.startsWith('D') || ligneNom.startsWith('E')) {
        lignePrefixe = 'RER ' + ligneNom;
    } else {
        lignePrefixe = 'Transilien ' + ligneNom;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-stone-200 bg-stone-950">
                Chargement...
            </div>
        );
    }

    if (confirmation) {
        return (
            <>
                <PageHeader title="Voiture ajoutée !" backHref={`/ajout/${idLigne}?idMateriel=${idMateriel}`}/>
                <div
                    className="max-w-md mx-auto mt-10 p-6 text-white dark:text-stone-950 backdrop-blur-md space-y-1">
                    <p><strong>Ligne :</strong> {lignePrefixe ?? ligne?.nom ?? 'N/A'}</p>
                    <p><strong>Matériel :</strong> {materiel?.nom ?? 'N/A'}</p>
                    <p><strong>Numéro de voiture :</strong> {numeroVoiture}</p>

                    <button
                        onClick={() => router.push(`/vision/${idLigne}/table?idMateriel=${idMateriel}`)}
                        className="mt-6 w-full py-2 px-4 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 text-blue-100 transition-colors duration-400 font-medium dark:bg-blue-300/40 dark:text-blue-900 dark:hover:bg-blue-400/40"
                    >
                        Voir l&#39;historique
                    </button>

                    <button
                        onClick={handleDelete}
                        className="mt-2 w-full py-2 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-100 transition-colors duration-400 font-medium dark:bg-red-300/40 dark:text-red-900 dark:hover:bg-red-400/40"
                    >
                        Supprimer
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <PageHeader title="Ajouter un train" backHref={`/ajout/${idLigne}?idMateriel=${idMateriel}`}/>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mt-10 p-6 text-white dark:text-stone-950 backdrop-blur-md space-y-4"
            >
                <div className="mb-4">
                    <label
                        htmlFor="numero-voiture"
                        className="block mb-1 font-medium text-stone-400 dark:text-stone-800"
                    >
                        Numéro de voiture
                    </label>
                    <input
                        id="numero-voiture"
                        type="text"
                        placeholder="3519, 01H, 040K"
                        value={numeroVoiture}
                        onChange={(e) => setNumeroVoiture(e.target.value)}
                        className="w-full p-2 rounded-xl bg-stone-800 border-[1px] border-stone-700 focus:ring-2 focus:ring-blue-500 transition-all dark:bg-white dark:border-stone-950/20 dark:focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="mission"
                        className="block mb-1 font-medium text-stone-400 dark:text-stone-800"
                    >
                        Mission (optionnel)
                    </label>
                    <input
                        id="mission"
                        type="text"
                        placeholder="1D, d3"
                        value={mission}
                        onChange={(e) => setMission(e.target.value)}
                        className="w-full p-2 rounded-xl bg-stone-800 border-[1px] border-stone-700 focus:ring-2 focus:ring-blue-500 transition-all dark:bg-white dark:border-stone-950/20 dark:focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-200 backdrop-blur-md transition-colors duration-300 dark:bg-green-400/30 dark:text-green-800"
                >
                    Valider
                </button>

                {error && <p className="text-red-400 text-sm">Erreur :  {error}</p>}
            </form>
        </>
    );
}
