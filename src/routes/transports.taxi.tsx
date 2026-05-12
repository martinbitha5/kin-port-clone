import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, ShieldCheck, AlertTriangle, MapPin } from "lucide-react";

const operators = [
  { name: "Taxi officiel N'djili (orange)", price: "25 — 35 USD", time: "45 — 75 min", note: "Stationnés devant le hall arrivées, prix négocié à l'avance." },
  { name: "Yango", price: "12 000 — 25 000 FC", time: "45 — 90 min", note: "Application mobile, paiement cash ou carte. Recommandé." },
  { name: "Zem Express VTC", price: "30 000 — 45 000 FC", time: "45 — 75 min", note: "Réservation en ligne, véhicules climatisés." },
  { name: "Hôtels partenaires", price: "Forfait inclus", time: "45 — 90 min", note: "Pullman, Béatrice, Memling, Fleuve Congo proposent un transfert." },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Transports</Link>
          <h1 className="text-5xl font-extrabold mt-3">Taxi & VTC</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Stationnés devant les arrivées ou commandés via une application, plusieurs solutions pour rejoindre Kinshasa.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-6">
        {operators.map((o) => (
          <div key={o.name} className="bg-card border border-border rounded-2xl p-7">
            <Car className="h-8 w-8 text-accent" />
            <h3 className="mt-3 font-extrabold text-xl text-primary">{o.name}</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-secondary/40 rounded-lg p-3"><div className="text-xs uppercase text-muted-foreground font-bold">Tarif vers Gombe</div><div className="font-bold text-primary">{o.price}</div></div>
              <div className="bg-secondary/40 rounded-lg p-3"><div className="text-xs uppercase text-muted-foreground font-bold">Durée</div><div className="font-bold text-primary">{o.time}</div></div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{o.note}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-6">
          <div className="bg-card p-7 rounded-2xl border border-border">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <h4 className="mt-3 font-bold text-primary">Sécurité</h4>
            <p className="mt-2 text-sm text-muted-foreground">Privilégiez toujours les taxis officiels orange ou les VTC commandés par application. Vérifiez la plaque et le nom du chauffeur.</p>
          </div>
          <div className="bg-card p-7 rounded-2xl border border-border">
            <AlertTriangle className="h-8 w-8 text-amber-600" />
            <h4 className="mt-3 font-bold text-primary">Bon à savoir</h4>
            <p className="mt-2 text-sm text-muted-foreground">Négociez le prix avant de monter pour les taxis non-applicatifs. Évitez les rabatteurs à l'intérieur du terminal.</p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-6 mt-8 bg-primary text-primary-foreground rounded-2xl p-7 flex items-center gap-4">
          <MapPin className="h-8 w-8 text-accent" />
          <div><div className="font-bold">Station officielle</div><div className="text-sm text-primary-foreground/80">Sortie Hall arrivées, à droite après les portes automatiques.</div></div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/transports/taxi")({
  head: () => ({ meta: [{ title: "Taxi & VTC — KIN Aéroport" }] }),
  component: Page,
});
