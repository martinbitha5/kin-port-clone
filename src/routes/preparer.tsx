import { createFileRoute, Link } from "@tanstack/react-router";
import { Luggage, FileCheck, ShieldCheck, Users, ArrowRight, AlertTriangle } from "lucide-react";

const cards = [
  { icon: FileCheck, title: "Enregistrement", to: "/preparer/enregistrement", desc: "En ligne, en borne ou au comptoir — comptoirs par compagnie." },
  { icon: ShieldCheck, title: "Sécurité & douane", to: "/preparer/securite", desc: "Objets autorisés, contrôle de sûreté et formalités douanières." },
  { icon: Users, title: "Familles & PMR", to: "/preparer/familles", desc: "Service Saphir, files prioritaires et espaces bébé." },
] as const;

const checklist = [
  "Passeport valide 6 mois après la date de retour",
  "Visa RDC ou visa de transit (selon nationalité)",
  "Carnet de vaccination internationale (fièvre jaune obligatoire)",
  "Test PCR / certificat sanitaire si exigé par la compagnie",
  "Carte d'embarquement (papier ou mobile)",
  "Taxe Go Pass : 50 USD international, 10 USD domestique",
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Préparer mon vol</Link>
          <h1 className="text-5xl font-extrabold mt-3">Avant le départ</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Tout ce qu'il faut savoir pour préparer sereinement votre voyage depuis Kinshasa-N'djili.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link key={c.title} to={c.to} className="group bg-card border border-border rounded-2xl p-7 hover:shadow-[var(--shadow-card)] hover:border-accent/40 transition">
            <c.icon className="h-9 w-9 text-accent" />
            <h3 className="mt-3 font-extrabold text-xl text-primary group-hover:text-accent">{c.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">Lire la suite <ArrowRight className="h-4 w-4" /></span>
          </Link>
        ))}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-extrabold text-primary inline-flex items-center gap-3"><Luggage className="h-7 w-7 text-accent" />Check-list voyageur</h2>
          <ul className="mt-6 grid md:grid-cols-2 gap-3">
            {checklist.map((c) => (
              <li key={c} className="bg-card border border-border rounded-xl p-4 text-sm text-muted-foreground flex gap-2">
                <span className="text-accent">✓</span>{c}
              </li>
            ))}
          </ul>
          <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm"><strong className="text-primary">Présentez-vous 3h avant un vol international</strong> et 2h avant un vol domestique.</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/preparer")({
  head: () => ({ meta: [{ title: "Préparer mon vol — KIN Aéroport" }] }),
  component: Page,
});
