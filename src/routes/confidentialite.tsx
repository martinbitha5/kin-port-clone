import { createFileRoute, Link } from "@tanstack/react-router";

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Confidentialité</Link>
          <h1 className="text-4xl font-extrabold mt-3">Politique de confidentialité</h1>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-6 py-12 space-y-4 text-muted-foreground">
        <p>La RVA s'engage à protéger les données personnelles des utilisateurs du site kin-aeroport.cd, conformément à la loi n°20/017 relative aux télécommunications et aux principes de protection des données.</p>
        <h2 className="text-xl font-extrabold text-primary">Données collectées</h2>
        <p>Les données que vous nous communiquez via les formulaires (nom, email, numéro de vol) sont utilisées uniquement pour traiter votre demande.</p>
        <h2 className="text-xl font-extrabold text-primary">Conservation</h2>
        <p>Les données sont conservées 3 ans maximum après votre dernière interaction avec nos services.</p>
        <h2 className="text-xl font-extrabold text-primary">Vos droits</h2>
        <p>Vous disposez d'un droit d'accès, de rectification et de suppression : privacy@kin-aeroport.cd</p>
      </article>
    </main>
  );
}

export const Route = createFileRoute("/confidentialite")({
  head: () => ({ meta: [{ title: "Confidentialité — KIN Aéroport" }] }),
  component: Page,
});
