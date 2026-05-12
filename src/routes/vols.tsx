import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Plane, PlaneLanding, PlaneTakeoff, Globe2, Building2 } from "lucide-react";

export const Route = createFileRoute("/vols")({
  head: () => ({
    meta: [
      { title: "Vols — KIN Aéroport" },
      { name: "description", content: "Départs, arrivées, compagnies et destinations depuis Kinshasa-N'djili." },
    ],
  }),
  component: VolsLayout,
});

const tiles = [
  { to: "/vols/departs", icon: PlaneTakeoff, title: "Départs", desc: "Suivez en temps réel les vols au départ de N'djili." },
  { to: "/vols/arrivees", icon: PlaneLanding, title: "Arrivées", desc: "Tous les vols à destination de Kinshasa." },
  { to: "/destinations", icon: Globe2, title: "Destinations", desc: "Villes desservies en RDC, Afrique et au-delà." },
  { to: "/vols/compagnies", icon: Building2, title: "Compagnies", desc: "Plus de 20 compagnies opèrent à FIH." },
] as const;

const sample = [
  { type: "DEP", time: "06:45", flight: "8U 412", company: "Congo Airways", city: "Lubumbashi", status: "Embarquement" },
  { type: "ARR", time: "07:30", flight: "KQ 553", company: "Kenya Airways", city: "Nairobi", status: "Atterri" },
  { type: "DEP", time: "09:55", flight: "AF 879", company: "Air France", city: "Paris CDG", status: "Retardé 25 min" },
  { type: "ARR", time: "10:10", flight: "SN 358", company: "Brussels Airlines", city: "Bruxelles", status: "À l'heure" },
  { type: "DEP", time: "12:40", flight: "8U 220", company: "Congo Airways", city: "Goma", status: "À l'heure" },
  { type: "ARR", time: "16:40", flight: "EK 787", company: "Emirates", city: "Dubaï", status: "À l'heure" },
];

function VolsLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path !== "/vols") return <Outlet />;
  return (
    <main className="bg-secondary/30 min-h-screen">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-6">
          <span className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Aéroport de Kinshasa-N'djili (FIH)</span>
          <h1 className="text-5xl md:text-6xl font-extrabold mt-2">Tous les vols</h1>
          <p className="mt-4 text-primary-foreground/80 max-w-2xl">Consultez les départs et arrivées en temps réel, explorez nos destinations et nos compagnies partenaires.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 -mt-8 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((t) => (
            <Link key={t.to} to={t.to} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-card)] hover:border-accent/40 transition group">
              <t.icon className="h-8 w-8 text-accent" />
              <div className="mt-3 font-extrabold text-primary group-hover:text-accent">{t.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-6 py-4 bg-secondary/60 flex items-center justify-between">
            <h2 className="font-extrabold text-primary uppercase tracking-wider text-sm">Mouvements du jour</h2>
            <Link to="/vols/departs" className="text-xs font-bold text-accent">Voir tous les vols →</Link>
          </div>
          {sample.map((f, i) => (
            <div key={i} className="grid grid-cols-12 px-6 py-4 border-t border-border items-center hover:bg-secondary/30">
              <div className="col-span-2 flex items-center gap-2 text-xs font-bold uppercase">
                {f.type === "DEP" ? <PlaneTakeoff className="h-4 w-4 text-accent" /> : <PlaneLanding className="h-4 w-4 text-emerald-600" />}
                {f.type === "DEP" ? "Départ" : "Arrivée"}
              </div>
              <div className="col-span-2 font-bold text-primary text-lg">{f.time}</div>
              <div className="col-span-2 text-sm text-muted-foreground">{f.flight}</div>
              <div className="col-span-3 hidden md:block text-sm">{f.company}</div>
              <div className="col-span-3 md:col-span-2 font-semibold flex items-center gap-2"><Plane className="h-3.5 w-3.5 text-accent" />{f.city}</div>
              <div className="col-span-2 md:col-span-1 text-right text-xs font-bold text-primary">{f.status}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
