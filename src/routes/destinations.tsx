import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Plane } from "lucide-react";
import paris from "@/assets/dest-paris.jpg";
import brussels from "@/assets/dest-brussels.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import capetown from "@/assets/dest-capetown.jpg";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — KIN Aéroport" },
      { name: "description", content: "Toutes les destinations au départ de Kinshasa-N'djili." },
      { property: "og:title", content: "Destinations au départ de Kinshasa" },
      { property: "og:description", content: "Découvrez les villes desservies depuis N'djili." },
    ],
  }),
  component: Destinations,
});

const congo = [
  { name: "Lubumbashi", code: "FBM", desc: "Capitale du Katanga, cœur minier", airline: "Congo Airways", duration: "2h05" },
  { name: "Goma", code: "GOM", desc: "Au pied du volcan Nyiragongo", airline: "Congo Airways", duration: "2h25" },
  { name: "Kisangani", code: "FKI", desc: "Carrefour fluvial sur le Congo", airline: "Congo Airways", duration: "1h55" },
  { name: "Mbuji-Mayi", code: "MJM", desc: "Capitale du diamant", airline: "CAA", duration: "1h45" },
  { name: "Bukavu", code: "BKY", desc: "Sur les rives du lac Kivu", airline: "CAA", duration: "2h30" },
  { name: "Kindu", code: "KND", desc: "Sur le fleuve Congo, Maniema", airline: "Congo Airways", duration: "1h50" },
  { name: "Mbandaka", code: "MDK", desc: "Porte de l'Équateur", airline: "CAA", duration: "1h20" },
  { name: "Matadi", code: "MAT", desc: "Grand port du Congo central", airline: "Congo Airways", duration: "0h55" },
];

const dests = [
  { img: paris, name: "Paris", country: "France", desc: "Capitale lumineuse, art & gastronomie", airlines: ["Air France"], duration: "8h05" },
  { img: brussels, name: "Bruxelles", country: "Belgique", desc: "Cœur historique de l'Europe", airlines: ["Brussels Airlines"], duration: "8h20" },
  { img: dubai, name: "Dubaï", country: "Émirats", desc: "Métropole futuriste du Golfe", airlines: ["Emirates"], duration: "8h45" },
  { img: capetown, name: "Le Cap", country: "Afrique du Sud", desc: "Entre océan et montagne", airlines: ["South African Airways"], duration: "5h30" },
  { img: paris, name: "Addis-Abeba", country: "Éthiopie", desc: "Carrefour de l'Afrique de l'Est", airlines: ["Ethiopian Airlines"], duration: "4h15" },
  { img: brussels, name: "Nairobi", country: "Kenya", desc: "Hub économique régional", airlines: ["Kenya Airways"], duration: "3h30" },
  { img: dubai, name: "Istanbul", country: "Turquie", desc: "Pont entre l'Europe et l'Asie", airlines: ["Turkish Airlines"], duration: "8h55" },
  { img: capetown, name: "Johannesburg", country: "Afrique du Sud", desc: "Capitale économique sud-africaine", airlines: ["SAA"], duration: "4h10" },
];

function Destinations() {
  return (
    <main className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
      <Link to="/" className="text-sm text-accent font-bold inline-flex items-center gap-1 mb-6"><ArrowLeft className="h-4 w-4" /> Accueil</Link>
      <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">S'inspirer</span>
      <h1 className="text-5xl md:text-6xl font-extrabold text-primary mt-2">Destinations</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Voyagez depuis Kinshasa-N'djili vers les plus grandes villes d'Afrique, d'Europe et du Golfe.</p>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {dests.map((d) => (
          <article key={d.name} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-[var(--shadow-card)] transition">
            <div className="aspect-[3/4] overflow-hidden relative">
              <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                <p className="text-[11px] uppercase tracking-wider opacity-80 font-bold">{d.country}</p>
                <h2 className="text-2xl font-extrabold">{d.name}</h2>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground">{d.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-primary font-bold inline-flex items-center gap-1"><Plane className="h-3 w-3" />{d.duration}</span>
                <span className="text-muted-foreground">{d.airlines[0]}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-20">
        <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Réseau domestique</span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary mt-2">Vols intérieurs RDC</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">Depuis Kinshasa, rejoignez les principales villes de la République démocratique du Congo.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {congo.map((c) => (
            <div key={c.code} className="bg-card border border-border rounded-2xl p-5 hover:shadow-[var(--shadow-card)] hover:border-accent/40 transition">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-primary">{c.name}</h3>
                <span className="text-[10px] font-mono bg-secondary px-2 py-1 rounded">{c.code}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs border-t border-border pt-3">
                <span className="text-accent font-bold inline-flex items-center gap-1"><Plane className="h-3 w-3" />{c.duration}</span>
                <span className="text-muted-foreground">{c.airline}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
