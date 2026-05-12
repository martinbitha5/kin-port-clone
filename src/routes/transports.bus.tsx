import { createFileRoute, Link } from "@tanstack/react-router";
import { Bus, MapPin, Clock, Wallet } from "lucide-react";

const lines = [
  { line: "Transco — Ligne Aéroport", path: "N'djili ↔ Gare Centrale (UPN)", freq: "Toutes les 30 min", price: "1 500 FC", time: "5h00 — 21h00" },
  { line: "Esprit de Vie", path: "N'djili ↔ Rond-point Victoire", freq: "Toutes les 20 min", price: "1 000 FC", time: "5h30 — 20h00" },
  { line: "Navette VIP Pullman", path: "N'djili ↔ Hôtel Pullman (Gombe)", freq: "Service à la demande", price: "Inclus client", time: "24h/24" },
  { line: "Navette VIP Béatrice", path: "N'djili ↔ Hôtel Béatrice", freq: "Sur réservation", price: "Inclus client", time: "5h — 23h" },
  { line: "Bus 207 (Esprit de Mort)", path: "N'djili ↔ Marché Central", freq: "Continu en journée", price: "500 FC", time: "5h — 19h" },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Transports</Link>
          <h1 className="text-5xl font-extrabold mt-3">Bus & navettes</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Toutes les lignes de bus et navettes desservant l'aéroport de N'djili depuis et vers Kinshasa.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-4 bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary">
            <div className="col-span-3">Ligne</div>
            <div className="col-span-3">Itinéraire</div>
            <div className="col-span-2">Fréquence</div>
            <div className="col-span-2">Tarif</div>
            <div className="col-span-2">Horaires</div>
          </div>
          {lines.map((l) => (
            <div key={l.line} className="grid grid-cols-12 px-6 py-5 border-t border-border text-sm items-center">
              <div className="col-span-3 font-bold text-primary flex items-center gap-2"><Bus className="h-4 w-4 text-accent" />{l.line}</div>
              <div className="col-span-3 text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{l.path}</div>
              <div className="col-span-2 text-muted-foreground">{l.freq}</div>
              <div className="col-span-2 font-semibold text-accent flex items-center gap-1"><Wallet className="h-3 w-3" />{l.price}</div>
              <div className="col-span-2 text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{l.time}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-secondary/40 rounded-2xl p-8">
            <h3 className="font-extrabold text-xl text-primary">Point d'arrêt à l'aéroport</h3>
            <p className="mt-2 text-sm text-muted-foreground">Sortie Hall arrivées, parvis principal — direction Boulevard Lumumba. Suivez les pictogrammes "Bus".</p>
          </div>
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-8">
            <h3 className="font-extrabold text-xl text-primary">Conseil</h3>
            <p className="mt-2 text-sm text-muted-foreground">Comptez entre 45 min et 1h30 selon le trafic sur le Boulevard Lumumba. Préférez les navettes VIP en heures de pointe.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/transports/bus")({
  head: () => ({ meta: [{ title: "Bus & navettes — KIN Aéroport" }] }),
  component: Page,
});
