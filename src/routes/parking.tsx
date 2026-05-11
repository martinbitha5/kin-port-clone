import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, ParkingCircle } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/parking")({
  head: () => ({
    meta: [
      { title: "Réserver un parking — KIN Aéroport" },
      { name: "description", content: "Réservez votre place de parking à l'aéroport de Kinshasa-N'djili." },
      { property: "og:title", content: "Réserver un parking — KIN Aéroport" },
      { property: "og:description", content: "P1, P2, PX — réservez en ligne et économisez." },
    ],
  }),
  component: Parking,
});

const lots = [
  { id: "P1", name: "P1 — Courte durée", price: 8, desc: "À 2 min à pied du terminal", color: "bg-accent" },
  { id: "P1P", name: "P1 Premium", price: 15, desc: "Couvert, places XL, accès direct T1", color: "bg-primary" },
  { id: "P2", name: "P2 Eco", price: 5, desc: "Navette gratuite toutes les 10 min", color: "bg-secondary" },
  { id: "PX", name: "PX Longue durée", price: 3, desc: "Idéal à partir de 4 jours", color: "bg-secondary" },
];

function Parking() {
  const today = new Date().toISOString().slice(0, 10);
  const [lot, setLot] = useState("P1");
  const [arr, setArr] = useState(today);
  const [dep, setDep] = useState(today);
  const [confirmed, setConfirmed] = useState<null | { ref: string; total: number }>(null);

  const days = useMemo(() => {
    const a = new Date(arr).getTime(), d = new Date(dep).getTime();
    return Math.max(1, Math.ceil((d - a) / 86400000) || 1);
  }, [arr, dep]);

  const selected = lots.find((l) => l.id === lot)!;
  const total = days * selected.price;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed({ ref: "KIN-" + Math.random().toString(36).slice(2, 8).toUpperCase(), total });
  };

  if (confirmed) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="grid place-items-center h-16 w-16 rounded-full bg-accent text-accent-foreground mx-auto"><Check className="h-8 w-8" /></div>
        <h1 className="text-4xl font-extrabold text-primary mt-6">Réservation confirmée</h1>
        <p className="mt-4 text-muted-foreground">Votre place est réservée au <strong>{selected.name}</strong> pour {days} jour{days > 1 ? "s" : ""}.</p>
        <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Référence</p>
          <p className="text-2xl font-mono font-bold text-primary mt-1">{confirmed.ref}</p>
          <p className="mt-4 text-3xl font-extrabold text-accent">{confirmed.total} USD</p>
        </div>
        <button onClick={() => setConfirmed(null)} className="mt-8 text-sm font-bold text-accent">Faire une autre réservation</button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 lg:px-8 py-16">
      <Link to="/" className="text-sm text-accent font-bold inline-flex items-center gap-1 mb-6"><ArrowLeft className="h-4 w-4" /> Accueil</Link>
      <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Transports & parking</span>
      <h1 className="text-5xl md:text-6xl font-extrabold text-primary mt-2">Réserver un parking</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl">Réservez votre place en quelques clics et bénéficiez de tarifs avantageux à l'aéroport de N'djili.</p>

      <div className="mt-12 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {lots.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLot(l.id)}
              className={`text-left p-6 rounded-2xl border-2 transition ${lot === l.id ? "border-accent bg-accent/5" : "border-border bg-card hover:border-primary/30"}`}
            >
              <div className="flex items-start justify-between">
                <div className={`grid place-items-center h-12 w-12 rounded-xl ${l.color} ${l.id === "P1P" ? "text-primary-foreground" : "text-primary"}`}>
                  <ParkingCircle className="h-6 w-6" />
                </div>
                {lot === l.id && <Check className="h-5 w-5 text-accent" />}
              </div>
              <h3 className="font-bold text-primary mt-4">{l.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{l.desc}</p>
              <p className="text-2xl font-extrabold text-accent mt-3">{l.price} USD<span className="text-xs font-bold text-muted-foreground">/jour</span></p>
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-primary text-lg">Votre réservation</h2>
          <label className="block mt-4 text-xs font-bold text-primary uppercase">Arrivée</label>
          <input type="date" required value={arr} min={today} onChange={(e) => setArr(e.target.value)} className="mt-1 w-full border border-border rounded-lg px-3 py-2 text-sm" />
          <label className="block mt-4 text-xs font-bold text-primary uppercase">Départ</label>
          <input type="date" required value={dep} min={arr} onChange={(e) => setDep(e.target.value)} className="mt-1 w-full border border-border rounded-lg px-3 py-2 text-sm" />
          <label className="block mt-4 text-xs font-bold text-primary uppercase">Plaque d'immatriculation</label>
          <input type="text" required placeholder="ex. 0123 AB 01" className="mt-1 w-full border border-border rounded-lg px-3 py-2 text-sm" />
          <label className="block mt-4 text-xs font-bold text-primary uppercase">Email</label>
          <input type="email" required placeholder="vous@email.com" className="mt-1 w-full border border-border rounded-lg px-3 py-2 text-sm" />

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{days} jour{days > 1 ? "s" : ""} × {selected.price} USD</span>
            <span className="text-2xl font-extrabold text-primary">{total} USD</span>
          </div>
          <button type="submit" className="mt-4 w-full bg-accent text-accent-foreground font-bold py-3 rounded-full hover:scale-[1.02] transition">
            Confirmer la réservation
          </button>
        </form>
      </div>
    </main>
  );
}
