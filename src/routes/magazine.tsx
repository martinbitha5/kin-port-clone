import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import cover from "@/assets/hero-fih-2.jpg";

const issues = [
  { num: "N°12 — Mai 2026", title: "Kin la Belle vue du ciel", desc: "Reportage exclusif sur la modernisation de N'djili et portrait des contrôleurs aériens." },
  { num: "N°11 — Février 2026", title: "Rumba sans frontières", desc: "Comment la diaspora congolaise transite par N'djili." },
  { num: "N°10 — Novembre 2025", title: "Cargo & corridor Atlantique", desc: "Le fret aérien congolais en pleine expansion." },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Magazine</Link>
          <h1 className="text-5xl font-extrabold mt-3">KIN Magazine</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Le magazine officiel de l'aéroport de Kinshasa-N'djili. Récits, reportages, art de vivre — disponible gratuitement à bord et dans les salons.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-6">
        {issues.map((i) => (
          <article key={i.num} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-card)] transition">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={cover} alt={i.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent">{i.num}</p>
              <h3 className="mt-1 font-extrabold text-primary text-lg">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent"><BookOpen className="h-4 w-4" /> Lire en ligne</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export const Route = createFileRoute("/magazine")({
  head: () => ({ meta: [{ title: "KIN Magazine — KIN Aéroport" }] }),
  component: Page,
});
