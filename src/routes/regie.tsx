import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Users, Target, Award } from "lucide-react";

const figures = [
  { value: "1.8M", label: "Passagers / an" },
  { value: "25+", label: "Compagnies aériennes" },
  { value: "18", label: "Destinations directes" },
  { value: "1.200", label: "Employés sur site" },
];

const missions = [
  { icon: Target, title: "Notre mission", text: "Offrir une expérience aéroportuaire moderne, sûre et fluide à tous les passagers transitant par Kinshasa-N'djili." },
  { icon: Building2, title: "Gouvernance", text: "Régie des Voies Aériennes (RVA), établissement public sous la tutelle du Ministère des Transports de la RDC." },
  { icon: Users, title: "Notre équipe", text: "1.200 collaborateurs — opérations, sûreté, maintenance, commercial — qui font vivre N'djili 24h/24, 365 jours par an." },
  { icon: Award, title: "Engagements", text: "Modernisation continue, certification IATA, programme environnemental et inclusion des PMR." },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Régie de l'aéroport</Link>
          <h1 className="text-5xl font-extrabold mt-3">La régie de N'djili</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">L'aéroport international de Kinshasa-N'djili (FIH) est géré par la Régie des Voies Aériennes (RVA), au service du désenclavement de la RDC.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {figures.map((f) => (
          <div key={f.label} className="bg-card border border-border rounded-2xl p-7 text-center">
            <div className="text-5xl font-extrabold text-accent">{f.value}</div>
            <div className="mt-2 text-sm font-bold text-primary uppercase tracking-wider">{f.label}</div>
          </div>
        ))}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-6">
          {missions.map((m) => (
            <div key={m.title} className="bg-card border border-border rounded-2xl p-7">
              <m.icon className="h-9 w-9 text-accent" />
              <h3 className="mt-3 font-extrabold text-primary text-xl">{m.title}</h3>
              <p className="mt-2 text-muted-foreground">{m.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/regie")({
  head: () => ({ meta: [{ title: "Régie de l'aéroport — KIN Aéroport" }] }),
  component: Page,
});
