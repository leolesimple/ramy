'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
export default function NumVoiturePage() {
    const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams<{ id: string }>();

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

    return (
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
                required
            />

            <input
                type="text"
                placeholder="Code de porte (facultatif, ex : 1D)"
                value={codePorte}
                onChange={(e) => setCodePorte(e.target.value)}
                className="w-full p-2 rounded bg-stone-800 border border-stone-700"
            />

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
            >
                Valider
            </button>

            {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
    );
}
