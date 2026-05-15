import { createFileRoute, Link } from "@tanstack/react-router";

function Legal({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › {eyebrow}</Link>
          <h1 className="text-4xl font-extrabold mt-3">{title}</h1>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-6 py-12 prose prose-sm max-w-none text-muted-foreground space-y-4">
        {children}
      </article>
    </main>
  );
}

function Page() {
  return (
    <Legal title="Mentions légales" eyebrow="Mentions légales">
      <h2 className="text-xl font-extrabold text-primary">Éditeur</h2>
      <p>Régie des Voies Aériennes (RVA) — Aéroport International de Kinshasa-N'djili (FIH), Boulevard Lumumba, Commune de N'djili, Kinshasa, République Démocratique du Congo.</p>
      <h2 className="text-xl font-extrabold text-primary">Directeur de la publication</h2>
      <p>Le Directeur Général de la RVA.</p>
      <h2 className="text-xl font-extrabold text-primary">Hébergement</h2>
      <p>Cloudflare, Inc. — services Workers (réseau mondial).</p>
      <h2 className="text-xl font-extrabold text-primary">Contact</h2>
      <p>info@kin-aeroport.cd — +243 81 000 0000</p>
      <h2 className="text-xl font-extrabold text-primary">Propriété intellectuelle</h2>
      <p>L'ensemble des contenus (textes, images, logos) est protégé. Toute reproduction sans autorisation écrite préalable est interdite.</p>
    </Legal>
  );
}

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({ meta: [{ title: "Mentions légales — KIN Aéroport" }] }),
  component: Page,
});
