import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import terminal from "@/assets/terminal.jpg";
import plane from "@/assets/plane.jpg";
import hero from "@/assets/hero-kinshasa.jpg";

export const Route = createFileRoute("/actualites")({
  head: () => ({
    meta: [
      { title: "Actualités — KIN Aéroport" },
      { name: "description", content: "Toute l'actualité de l'aéroport international de Kinshasa-N'djili." },
      { property: "og:title", content: "Actualités — KIN Aéroport" },
      { property: "og:description", content: "Communiqués, événements et nouveautés de N'djili." },
    ],
  }),
  component: News,
});

const news = [
  { img: terminal, tag: "Infrastructure", date: "10 mai 2026", title: "Nouveau hall d'embarquement au Terminal 1", excerpt: "Une zone modernisée de 4 200 m² ouvre ses portes pour fluidifier l'expérience passager." },
  { img: plane, tag: "Compagnies", date: "02 mai 2026", title: "Ethiopian Airlines augmente sa fréquence vers Addis-Abeba", excerpt: "Désormais deux vols quotidiens depuis N'djili." },
  { img: hero, tag: "Événement", date: "28 avril 2026", title: "Journée portes ouvertes — Découvrez les coulisses de l'aéroport", excerpt: "Visites guidées, ateliers et rencontres avec les équipes." },
  { img: terminal, tag: "Information", date: "20 avril 2026", title: "Programme de modernisation 2026", excerpt: "Calendrier des travaux et impacts sur le trafic." },
  { img: plane, tag: "Service", date: "12 avril 2026", title: "Nouveau service de notifications WhatsApp", excerpt: "Suivez en direct les vols de vos proches." },
  { img: hero, tag: "Magazine", date: "01 avril 2026", title: "KIN Magazine — Numéro de printemps disponible", excerpt: "Reportages, portraits et bons plans." },
];

function News() {
  return (
    <main className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
      <Link to="/" className="text-sm text-accent font-bold inline-flex items-center gap-1 mb-6"><ArrowLeft className="h-4 w-4" /> Accueil</Link>
      <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Newsroom</span>
      <h1 className="text-5xl md:text-6xl font-extrabold text-primary mt-2">Actualités</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Retrouvez toutes les informations, communiqués et événements de l'aéroport international de Kinshasa-N'djili.</p>

      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((n) => (
          <article key={n.title} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-[var(--shadow-card)] transition">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={n.img} alt={n.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
                <span className="text-accent">{n.tag}</span>
                <span className="text-muted-foreground inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{n.date}</span>
              </div>
              <h2 className="text-xl font-bold text-primary mt-2 leading-snug">{n.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">{n.excerpt}</p>
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent">
                Lire l'article <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
