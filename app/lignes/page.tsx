import {createClient} from '@/lib/supabaseClient';
import {LigneCard} from '@app/ui/Card';
import PageHeader from '@app/ui/Header';

export default async function Lignes() {
    const supabase = await createClient();

    const {data: lignes, error} = await supabase
        .from('lignes')
        .select('id, nom, couleur, icon')
        .order('nom', {ascending: true});

    if (error) return <p className="text-red-500">Erreur : {error.message}</p>;

    return (
        <>
            <PageHeader title="Ajouter un train" backHref="/menu" />
            <div className="p-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {lignes?.map((ligne) => (
                    <LigneCard
                        key={ligne.id}
                        id={ligne.id}
                        nom={ligne.nom}
                        couleur={ligne.couleur}
                        icon={ligne.icon}
                    />
                ))}
            </div>
        </>
    );
}
