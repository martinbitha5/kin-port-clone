import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Search, Clock } from "lucide-react";
import { useState } from "react";

const flights = [
  { time: "06:45", flight: "8U 412", company: "Congo Airways", dest: "Lubumbashi (FBM)", gate: "A2", status: "Embarquement", statusColor: "text-accent" },
  { time: "07:20", flight: "ET 838", company: "Ethiopian Airlines", dest: "Addis-Abeba (ADD)", gate: "B5", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "08:10", flight: "KQ 552", company: "Kenya Airways", dest: "Nairobi (NBO)", gate: "B3", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "09:55", flight: "AF 879", company: "Air France", dest: "Paris CDG", gate: "C1", status: "Retardé 25 min", statusColor: "text-amber-600" },
  { time: "10:30", flight: "SN 359", company: "Brussels Airlines", dest: "Bruxelles (BRU)", gate: "C4", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "11:15", flight: "TK 562", company: "Turkish Airlines", dest: "Istanbul (IST)", gate: "B2", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "12:40", flight: "8U 220", company: "Congo Airways", dest: "Goma (GOM)", gate: "A4", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "13:25", flight: "AT 561", company: "Royal Air Maroc", dest: "Casablanca (CMN)", gate: "C2", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "14:50", flight: "EK 786", company: "Emirates", dest: "Dubaï (DXB)", gate: "C5", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "16:05", flight: "ASF 110", company: "ASKY Airlines", dest: "Lomé (LFW)", gate: "B1", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "18:30", flight: "8U 305", company: "Congo Airways", dest: "Kisangani (FKI)", gate: "A1", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "21:45", flight: "SA 077", company: "South African Airways", dest: "Johannesburg (JNB)", gate: "C3", status: "À l'heure", statusColor: "text-emerald-600" },
];

function Page() {
  const [q, setQ] = useState("");
  const filtered = flights.filter((f) => (f.dest + f.flight + f.company).toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="bg-secondary/30 min-h-screen">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Vols</Link>
          <h1 className="text-5xl font-extrabold mt-3">Départs en temps réel</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">Suivez tous les vols au départ de l'aéroport international de Kinshasa-N'djili (FIH).</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 -mt-8 pb-20">
        <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-4 flex items-center gap-3 border border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une destination, un vol, une compagnie…" className="w-full bg-transparent outline-none text-sm" />
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Mis à jour à l'instant</span>
        </div>

        <div className="mt-8 bg-card rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-4 bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary">
            <div className="col-span-2">Heure</div>
            <div className="col-span-2">Vol</div>
            <div className="col-span-3 hidden md:block">Compagnie</div>
            <div className="col-span-4 md:col-span-3">Destination</div>
            <div className="col-span-1 hidden md:block">Porte</div>
            <div className="col-span-4 md:col-span-1 text-right">Statut</div>
          </div>
          {filtered.map((f, i) => (
            <div key={i} className="grid grid-cols-12 px-6 py-4 border-t border-border items-center hover:bg-secondary/30">
              <div className="col-span-2 font-bold text-primary text-lg">{f.time}</div>
              <div className="col-span-2 text-sm text-muted-foreground">{f.flight}</div>
              <div className="col-span-3 hidden md:block text-sm">{f.company}</div>
              <div className="col-span-4 md:col-span-3 font-semibold flex items-center gap-2"><Plane className="h-3.5 w-3.5 text-accent" />{f.dest}</div>
              <div className="col-span-1 hidden md:block text-sm font-mono">{f.gate}</div>
              <div className={`col-span-4 md:col-span-1 text-right text-xs font-bold ${f.statusColor}`}>{f.status}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/vols/departs")({
  head: () => ({ meta: [{ title: "Départs — KIN Aéroport" }] }),
  component: Page,
});
