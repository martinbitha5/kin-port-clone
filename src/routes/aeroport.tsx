import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, ShoppingBag, Coffee, ArrowRight, MapPin } from "lucide-react";
import terminalImg from "@/assets/hero-fih-1.jpg";

const terminals = [
  { name: "Terminal 1 (T1)", desc: "Vols internationaux long-courriers — Air France, Brussels Airlines, Turkish Airlines, Emirates, Royal Air Maroc.", halls: "Halls A & C — comptoirs 1 à 30" },
  { name: "Terminal 2 (T2)", desc: "Vols régionaux et domestiques — Congo Airways, Ethiopian Airlines, Kenya Airways, ASKY.", halls: "Hall B — comptoirs 11 à 20" },
];

const blocks = [
  { icon: ShoppingBag, title: "Boutiques & restaurants", to: "/aeroport/boutiques", desc: "Duty Free, Mama Colonel, restauration rapide et locale." },
  { icon: Coffee, title: "Services passagers", to: "/aeroport/services", desc: "Salons VIP, WiFi, change, SIM locales, salle de prière." },
  { icon: Building2, title: "Actualités N'djili", to: "/actualites", desc: "Travaux, nouveautés et information aux passagers." },
] as const;

function Page() {
  return (
    <main className="bg-background">
      <section className="relative h-[420px] overflow-hidden">
        <img src={terminalImg} alt="Terminal de N'djili" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-12 text-primary-foreground">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › À l'aéroport</Link>
          <h1 className="text-5xl font-extrabold mt-3">Plans & terminaux</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">Deux terminaux, une expérience fluide. Découvrez l'organisation de l'aéroport de N'djili.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-6">
        {terminals.map((t) => (
          <div key={t.name} className="bg-card border border-border rounded-2xl p-7">
            <MapPin className="h-8 w-8 text-accent" />
            <h3 className="mt-3 font-extrabold text-2xl text-primary">{t.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-accent font-bold">{t.halls}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
          {blocks.map((b) => (
            <Link key={b.title} to={b.to} className="bg-card border border-border rounded-2xl p-7 hover:shadow-[var(--shadow-card)] transition group">
              <b.icon className="h-8 w-8 text-accent" />
              <h4 className="mt-3 font-bold text-primary group-hover:text-accent">{b.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-accent">Découvrir <ArrowRight className="h-3 w-3" /></span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/aeroport")({
  head: () => ({ meta: [{ title: "Plans & terminaux — KIN Aéroport" }] }),
  component: Page,
});
