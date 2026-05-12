import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Building2, Wifi, Users, FileText } from "lucide-react";

function Page() {
  const centers = [
    { name: "Centre de Conférences Pullman", cap: "500 places", desc: "Salles modulables, traduction simultanée, restauration." },
    { name: "Fleuve Congo Convention Center", cap: "800 places", desc: "Auditorium principal, espaces exposition, vue fleuve." },
    { name: "Centre Béatrice Affaires", cap: "300 places", desc: "Salles de réunion premium, bureaux à louer." },
    { name: "FIKIN — Foire Internationale de Kinshasa", cap: "10 000 m²", desc: "Halls d'exposition, salons professionnels annuels." },
  ];
  const services = [
    { icon: Wifi, t: "Connectivité fibre", d: "Internet haut débit, salles équipées de visioconférence." },
    { icon: Users, t: "Espaces coworking", d: "Ingenious City, Kinshasa Digital, Texaf Bilembo." },
    { icon: FileText, t: "Services administratifs", d: "Notaires, traducteurs assermentés, agences de visa business." },
    { icon: Briefcase, t: "Location véhicules avec chauffeur", d: "Hertz, Avis, agences locales — pour vos déplacements pros." },
  ];

  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › À Kinshasa</Link>
          <h1 className="text-5xl font-extrabold mt-3">Voyage d'affaires</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Kinshasa, capitale économique d'un marché de 100 millions d'habitants — tout pour réussir votre mission.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-primary flex items-center gap-3"><Building2 className="h-7 w-7 text-accent" />Centres de conférences</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {centers.map((c) => (
            <div key={c.name} className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-extrabold text-primary text-lg">{c.name}</h3>
              <div className="text-xs text-accent font-bold uppercase tracking-wider mt-1">{c.cap}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-primary">Services pros à Kinshasa</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.t} className="bg-card border border-border rounded-2xl p-6">
                <s.icon className="h-8 w-8 text-accent" />
                <div className="mt-3 font-bold text-primary">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/kinshasa/affaires")({
  head: () => ({ meta: [{ title: "Voyage d'affaires — KIN Aéroport" }] }),
  component: Page,
});
