import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, MapPin, Clock, GraduationCap } from "lucide-react";

const offers = [
  { title: "Agent d'escale passagers", type: "CDI", site: "T1 — N'djili", level: "Bac+2", desc: "Accueil, enregistrement et embarquement des passagers internationaux." },
  { title: "Technicien piste", type: "CDI", site: "Aire de trafic", level: "Technique", desc: "Assistance avion, marshalling, gestion des équipements piste." },
  { title: "Agent de sûreté aéroportuaire", type: "CDI", site: "PIF — Tous terminaux", level: "Certification TFP", desc: "Inspection-filtrage passagers et bagages, contrôle d'accès." },
  { title: "Pompier d'aéroport (SSLIA)", type: "CDI", site: "Caserne FIH", level: "Sapeur-pompier", desc: "Service de Sauvetage et de Lutte contre l'Incendie des Aéronefs." },
  { title: "Stagiaire communication", type: "Stage 6 mois", site: "Siège RVA", level: "Bac+3 minimum", desc: "Réseaux sociaux, magazine, événementiel — direction communication." },
  { title: "Contrôleur aérien", type: "CDI", site: "Tour de contrôle", level: "Diplôme ENAC ou équivalent", desc: "Gestion du trafic aérien dans la TMA de Kinshasa." },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Recrutement</Link>
          <h1 className="text-5xl font-extrabold mt-3">Rejoindre KIN Aéroport</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">L'aviation civile congolaise recrute. Découvrez les métiers de l'aéroport et postulez en ligne.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-primary inline-flex items-center gap-3"><Briefcase className="h-7 w-7 text-accent" />Offres en cours</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {offers.map((o) => (
            <div key={o.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-card)] transition">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-extrabold text-primary text-lg">{o.title}</h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-accent/10 text-accent uppercase">{o.type}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{o.desc}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{o.site}</span>
                <span className="inline-flex items-center gap-1"><GraduationCap className="h-3 w-3" />{o.level}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />Postuler avant 30j</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-7 rounded-2xl bg-secondary/40 border border-border">
          <h3 className="font-extrabold text-primary">Comment postuler</h3>
          <p className="mt-2 text-sm text-muted-foreground">Envoyez CV + lettre de motivation à <strong className="text-primary">recrutement@kin-aeroport.cd</strong> en précisant l'intitulé du poste. Les candidatures spontanées sont également étudiées.</p>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/recrutement")({
  head: () => ({ meta: [{ title: "Recrutement — KIN Aéroport" }] }),
  component: Page,
});
