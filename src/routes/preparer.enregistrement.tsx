import { createFileRoute, Link } from "@tanstack/react-router";
import { Smartphone, Monitor, Users, Clock, CheckCircle2 } from "lucide-react";

const counters = [
  { airline: "Congo Airways", zone: "Hall A — Comptoirs 1 à 8", open: "3h avant le vol", close: "45 min avant" },
  { airline: "Air France", zone: "Hall C — Comptoirs 21 à 26", open: "3h avant le vol", close: "1h avant" },
  { airline: "Brussels Airlines", zone: "Hall C — Comptoirs 27 à 30", open: "3h avant le vol", close: "1h avant" },
  { airline: "Ethiopian Airlines", zone: "Hall B — Comptoirs 11 à 14", open: "3h avant le vol", close: "45 min avant" },
  { airline: "Kenya Airways", zone: "Hall B — Comptoirs 15 à 17", open: "3h avant le vol", close: "45 min avant" },
  { airline: "Turkish Airlines", zone: "Hall B — Comptoirs 18 à 20", open: "3h avant le vol", close: "1h avant" },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Préparer mon vol</Link>
          <h1 className="text-5xl font-extrabold mt-3">Enregistrement</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Trois moyens simples de vous enregistrer avant votre vol au départ de Kinshasa-N'djili.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          { icon: Smartphone, title: "En ligne / Mobile", desc: "Disponible 24h à 2h avant le vol via le site ou l'app de votre compagnie. Recevez votre carte d'embarquement par e-mail ou SMS." },
          { icon: Monitor, title: "Bornes libre-service", desc: "12 bornes installées dans le hall des départs. Imprimez votre carte d'embarquement et étiquettes bagages." },
          { icon: Users, title: "Comptoir d'enregistrement", desc: "Personnel dédié pour les passagers en groupe, familles, PMR, ou pour les vols sans enregistrement en ligne." },
        ].map((b) => (
          <div key={b.title} className="bg-card border border-border rounded-2xl p-8">
            <b.icon className="h-10 w-10 text-accent" />
            <h3 className="mt-4 font-extrabold text-xl text-primary">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-primary">Comptoirs par compagnie</h2>
          <div className="mt-8 bg-card rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-12 px-6 py-4 bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary">
              <div className="col-span-4">Compagnie</div>
              <div className="col-span-4">Zone</div>
              <div className="col-span-2">Ouverture</div>
              <div className="col-span-2">Fermeture</div>
            </div>
            {counters.map((c) => (
              <div key={c.airline} className="grid grid-cols-12 px-6 py-4 border-t border-border text-sm items-center">
                <div className="col-span-4 font-bold text-primary">{c.airline}</div>
                <div className="col-span-4 text-muted-foreground">{c.zone}</div>
                <div className="col-span-2 inline-flex items-center gap-1"><Clock className="h-3 w-3 text-accent" />{c.open}</div>
                <div className="col-span-2 text-accent font-semibold">{c.close}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-primary">Conseils pratiques</h2>
        <ul className="mt-6 space-y-3">
          {[
            "Présentez-vous à l'aéroport au moins 3h avant un vol international, 2h avant un vol domestique.",
            "Munissez-vous de votre passeport, visa, certificat de vaccination (fièvre jaune obligatoire) et carte d'embarquement.",
            "La taxe de sortie (Go Pass) doit être acquittée avant l'enregistrement : 50 USD international, 10 USD domestique.",
            "Étiquetez vos bagages avec votre nom et destination. Les bagages cabine sont limités à 7 kg.",
          ].map((t, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />{t}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/preparer/enregistrement")({
  head: () => ({ meta: [{ title: "Enregistrement — KIN Aéroport" }] }),
  component: Page,
});
