'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { PageProps } from 'next';
import PageHeader from "@app/ui/Header"; // ← 👈 voici l'import important

export default function NumVoiturePage({ params }: PageProps<{ id: string }>) {
    const [supabase, setSupabase] = useState<any>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [numeroVoiture, setNumeroVoiture] = useState('');
    const [codePorte, setCodePorte] = useState('');
    const [error, setError] = useState<string | null>(null);

    const idLigne = params.id;
    const idMateriel = searchParams.get('idMateriel');

    useEffect(() => {
        const client = createBrowserClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        setSupabase(client);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!supabase) return;

        if (!idMateriel) {
            setError("ID matériel manquant dans l'URL.");
            return;
        }

        if (!numeroVoiture.trim()) {
            setError("Le numéro de voiture est obligatoire.");
            return;
        }

        const { error } = await supabase.from('voitures').insert({
            id_ligne: idLigne,
            id_materiel: idMateriel,
            numero_voiture: numeroVoiture.trim(),
            code_porte: codePorte.trim() || null,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/vision');
        }
    };

    let prefixeLigne = "";
    useEffect(() => {
        const fetchLigne = async () => {
            if (!supabase) return;

            const { data: ligne, error } = await supabase
                .from('lignes')
                .select('*')
                .eq('id', idLigne)
                .single();

            if (error || !ligne) {
                setError("Erreur lors de la récupération de la ligne.");
                return;
            }

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
        };

        fetchLigne();
    }, [supabase, idLigne]);

    return (
        <>
            <PageHeader
            title={`Saisir la voiture`}
            backHref="/lignes"/>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mt-10 p-6 bg-stone-900 border border-stone-700 rounded-lg text-white space-y-4"
            >
                <h1 className="text-xl font-bold">Ajout d&#39;une voiture</h1>

                <input
                    type="text"
                    placeholder="Numéro de voiture"
                    value={numeroVoiture}
                    onChange={(e) => setNumeroVoiture(e.target.value)}
                    className="w-full p-2 rounded bg-stone-800 border border-stone-700"
                    required/>

                <input
                    type="text"
                    placeholder="Code de porte (facultatif, ex : 1D)"
                    value={codePorte}
                    onChange={(e) => setCodePorte(e.target.value)}
                    className="w-full p-2 rounded bg-stone-800 border border-stone-700"/>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                >
                    Valider
                </button>

                {error && <p className="text-red-400 text-sm">{error}</p>}
            </form>
        </>
    );
}
