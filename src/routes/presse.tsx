import { createFileRoute, Link } from "@tanstack/react-router";
import { Newspaper, Download, Camera } from "lucide-react";

const releases = [
  { date: "12 mai 2026", title: "N'djili franchit le cap des 1,8 million de passagers en 2025", excerpt: "Hausse de 14% du trafic, portée par les liaisons régionales et le retour des vols long-courriers." },
  { date: "28 avril 2026", title: "Mise en service du nouveau hall d'embarquement T1", excerpt: "8 portes additionnelles, salons rénovés, doublement de la capacité contrôle de sûreté." },
  { date: "10 mars 2026", title: "Partenariat RVA × Aviation Stack pour la donnée vols temps réel", excerpt: "Un nouveau portail public diffuse l'information vols à la seconde." },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Presse</Link>
          <h1 className="text-5xl font-extrabold mt-3">Espace presse</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Communiqués, dossiers de presse, photothèque et contact direction de la communication.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-primary inline-flex items-center gap-3"><Newspaper className="h-7 w-7 text-accent" />Communiqués récents</h2>
        <div className="mt-8 grid gap-4">
          {releases.map((r) => (
            <article key={r.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-card)] transition">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">{r.date}</p>
              <h3 className="mt-1 font-extrabold text-primary text-xl">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-7">
            <Download className="h-9 w-9 text-accent" />
            <h3 className="mt-3 font-extrabold text-primary text-xl">Kit presse</h3>
            <p className="mt-2 text-sm text-muted-foreground">Logos, charte graphique, fiche d'identité de l'aéroport, chiffres clés 2025.</p>
            <p className="mt-3 text-sm font-bold text-primary">presse@kin-aeroport.cd</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-7">
            <Camera className="h-9 w-9 text-accent" />
            <h3 className="mt-3 font-extrabold text-primary text-xl">Photothèque</h3>
            <p className="mt-2 text-sm text-muted-foreground">Visuels haute définition de N'djili, terminaux, tour de contrôle. Sur demande, usage éditorial uniquement.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/presse")({
  head: () => ({ meta: [{ title: "Presse — KIN Aéroport" }] }),
  component: Page,
});
