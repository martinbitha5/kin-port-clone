import { createFileRoute, Link } from "@tanstack/react-router";
import { Baby, Accessibility, Heart, Phone, Users } from "lucide-react";

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Préparer mon vol</Link>
          <h1 className="text-5xl font-extrabold mt-3">Familles & PMR</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Une assistance dédiée pour voyager sereinement avec vos enfants ou en situation de mobilité réduite.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-6">
        {[
          { icon: Baby, title: "Familles avec enfants", items: ["Files prioritaires aux comptoirs et à la sûreté", "Espaces bébé avec table à langer (T1 et T2)", "Aire de jeux salle d'embarquement", "Poussettes acceptées jusqu'à la passerelle", "Repas enfants disponibles dans les restaurants"] },
          { icon: Accessibility, title: "Personnes à mobilité réduite", items: ["Service Saphir gratuit sur réservation 48h avant", "Fauteuils roulants disponibles à l'entrée", "Comptoirs adaptés et sanitaires accessibles", "Accompagnement jusqu'à la porte d'embarquement", "Chiens d'assistance acceptés"] },
        ].map((b) => (
          <div key={b.title} className="bg-card border border-border rounded-2xl p-8">
            <b.icon className="h-10 w-10 text-accent" />
            <h3 className="mt-4 font-extrabold text-xl text-primary">{b.title}</h3>
            <ul className="mt-4 space-y-2">
              {b.items.map((i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-accent">•</span>{i}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-extrabold text-primary flex items-center gap-3"><Heart className="h-7 w-7 text-accent" />Demander une assistance</h2>
          <p className="mt-3 text-muted-foreground">Contactez votre compagnie aérienne au moins 48h avant votre vol. Vous pouvez aussi joindre directement notre cellule d'assistance N'djili.</p>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-card p-6 rounded-xl border border-border flex items-center gap-4">
              <Phone className="h-8 w-8 text-accent" />
              <div><div className="text-xs uppercase text-muted-foreground font-bold">Cellule assistance</div><div className="font-extrabold text-primary text-lg">+243 81 000 0000</div></div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border flex items-center gap-4">
              <Users className="h-8 w-8 text-accent" />
              <div><div className="text-xs uppercase text-muted-foreground font-bold">Point de rencontre</div><div className="font-extrabold text-primary text-lg">Hall départs T1, banque info</div></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/preparer/familles")({
  head: () => ({ meta: [{ title: "Familles & PMR — KIN Aéroport" }] }),
  component: Page,
});
