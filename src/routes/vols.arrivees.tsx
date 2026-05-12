import { createFileRoute, Link } from "@tanstack/react-router";
import { PlaneLanding, Search, Clock } from "lucide-react";
import { useState } from "react";

const flights = [
  { time: "05:55", flight: "ET 837", company: "Ethiopian Airlines", origin: "Addis-Abeba (ADD)", belt: "T1-2", status: "Atterri", statusColor: "text-emerald-600" },
  { time: "07:30", flight: "KQ 553", company: "Kenya Airways", origin: "Nairobi (NBO)", belt: "T1-3", status: "Atterri", statusColor: "text-emerald-600" },
  { time: "08:45", flight: "8U 413", company: "Congo Airways", origin: "Lubumbashi (FBM)", belt: "T2-1", status: "Atterri", statusColor: "text-emerald-600" },
  { time: "10:10", flight: "SN 358", company: "Brussels Airlines", origin: "Bruxelles (BRU)", belt: "T1-1", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "11:20", flight: "AF 878", company: "Air France", origin: "Paris CDG", belt: "T1-2", status: "Retardé 15 min", statusColor: "text-amber-600" },
  { time: "12:05", flight: "TK 561", company: "Turkish Airlines", origin: "Istanbul (IST)", belt: "T1-3", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "13:50", flight: "8U 221", company: "Congo Airways", origin: "Goma (GOM)", belt: "T2-2", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "15:15", flight: "AT 560", company: "Royal Air Maroc", origin: "Casablanca (CMN)", belt: "T1-1", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "16:40", flight: "EK 787", company: "Emirates", origin: "Dubaï (DXB)", belt: "T1-2", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "19:25", flight: "8U 306", company: "Congo Airways", origin: "Kisangani (FKI)", belt: "T2-1", status: "À l'heure", statusColor: "text-emerald-600" },
  { time: "22:50", flight: "SA 076", company: "South African Airways", origin: "Johannesburg (JNB)", belt: "T1-3", status: "À l'heure", statusColor: "text-emerald-600" },
];

function Page() {
  const [q, setQ] = useState("");
  const filtered = flights.filter((f) => (f.origin + f.flight + f.company).toLowerCase().includes(q.toLowerCase()));
  return (
    <main className="bg-secondary/30 min-h-screen">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Vols</Link>
          <h1 className="text-5xl font-extrabold mt-3">Arrivées en temps réel</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">Suivez tous les vols à destination de Kinshasa-N'djili (FIH).</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 -mt-8 pb-20">
        <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-4 flex items-center gap-3 border border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une provenance, un vol…" className="w-full bg-transparent outline-none text-sm" />
          <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Mis à jour à l'instant</span>
        </div>
        <div className="mt-8 bg-card rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-4 bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary">
            <div className="col-span-2">Heure</div><div className="col-span-2">Vol</div>
            <div className="col-span-3 hidden md:block">Compagnie</div>
            <div className="col-span-4 md:col-span-3">Provenance</div>
            <div className="col-span-1 hidden md:block">Tapis</div>
            <div className="col-span-4 md:col-span-1 text-right">Statut</div>
          </div>
          {filtered.map((f, i) => (
            <div key={i} className="grid grid-cols-12 px-6 py-4 border-t border-border items-center hover:bg-secondary/30">
              <div className="col-span-2 font-bold text-primary text-lg">{f.time}</div>
              <div className="col-span-2 text-sm text-muted-foreground">{f.flight}</div>
              <div className="col-span-3 hidden md:block text-sm">{f.company}</div>
              <div className="col-span-4 md:col-span-3 font-semibold flex items-center gap-2"><PlaneLanding className="h-3.5 w-3.5 text-accent" />{f.origin}</div>
              <div className="col-span-1 hidden md:block text-sm font-mono">{f.belt}</div>
              <div className={`col-span-4 md:col-span-1 text-right text-xs font-bold ${f.statusColor}`}>{f.status}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/vols/arrivees")({
  head: () => ({ meta: [{ title: "Arrivées — KIN Aéroport" }] }),
  component: Page,
});
