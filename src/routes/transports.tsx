import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, Bus, ParkingCircle, MapPin, Clock, ArrowRight } from "lucide-react";

const accesses = [
  { icon: Car, title: "En voiture", desc: "Boulevard Lumumba depuis le centre-ville (~25 km, 45 min à 1h30 selon le trafic). Sortie aéroport de N'djili indiquée.", to: "/parking", cta: "Réserver un parking" },
  { icon: Bus, title: "En bus", desc: "Lignes Transco et Esprit de Vie depuis la Gare Centrale et Victoire. Toutes les 20 à 30 min.", to: "/transports/bus", cta: "Voir les lignes" },
  { icon: Car, title: "En taxi / VTC", desc: "Taxis officiels orange devant les arrivées, Yango et Zem Express via application.", to: "/transports/taxi", cta: "Stations & tarifs" },
  { icon: ParkingCircle, title: "Parking", desc: "P1 courte durée, P1 Premium, P2 Eco, PX longue durée — réservation en ligne possible.", to: "/parking", cta: "Tarifs parking" },
] as const;

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Transports & parking</Link>
          <h1 className="text-5xl font-extrabold mt-3">Venir à l'aéroport</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Tous les moyens d'accès à l'aéroport international de Kinshasa-N'djili (FIH).</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-6">
        {accesses.map((a) => (
          <Link key={a.title} to={a.to} className="group bg-card border border-border rounded-2xl p-7 hover:shadow-[var(--shadow-card)] hover:border-accent/40 transition">
            <a.icon className="h-10 w-10 text-accent" />
            <h3 className="mt-3 font-extrabold text-2xl text-primary group-hover:text-accent">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">{a.cta} <ArrowRight className="h-4 w-4" /></span>
          </Link>
        ))}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-7 border border-border">
            <MapPin className="h-7 w-7 text-accent" />
            <h4 className="mt-3 font-bold text-primary">Adresse</h4>
            <p className="mt-2 text-sm text-muted-foreground">Aéroport International de N'djili, Boulevard Lumumba, Commune de N'djili, Kinshasa, RDC.</p>
          </div>
          <div className="bg-card rounded-2xl p-7 border border-border">
            <Clock className="h-7 w-7 text-accent" />
            <h4 className="mt-3 font-bold text-primary">Ouverture</h4>
            <p className="mt-2 text-sm text-muted-foreground">Terminaux ouverts 24h/24, 7j/7. Comptoirs d'enregistrement ouverts 3h avant chaque vol.</p>
          </div>
          <div className="bg-card rounded-2xl p-7 border border-border">
            <Car className="h-7 w-7 text-accent" />
            <h4 className="mt-3 font-bold text-primary">Dépose-minute</h4>
            <p className="mt-2 text-sm text-muted-foreground">Zone Kiss & Fly devant le hall départs, gratuite jusqu'à 10 min.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/transports")({
  head: () => ({ meta: [{ title: "Venir à l'aéroport — KIN Aéroport" }] }),
  component: Page,
});
