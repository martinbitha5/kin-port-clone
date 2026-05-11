import { Plane, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export function FlightSearch() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"departs" | "arrivees">("departs");
  return (
    <div className="relative -mt-24 mx-auto max-w-5xl px-4 z-20">
      <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-8 md:p-10 border border-border">
        <div className="flex items-center justify-center gap-6 mb-6">
          {(["departs", "arrivees"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 text-sm font-bold uppercase tracking-wider transition border-b-2 ${
                tab === t ? "text-primary border-accent" : "text-muted-foreground border-transparent"
              }`}
            >
              {t === "departs" ? "Départs" : "Arrivées"}
            </button>
          ))}
        </div>
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-primary mb-6">
          Trouver un vol
        </h2>
        <div className="flex items-center bg-input rounded-xl px-5 h-14">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ville ou n° de vol"
            className="flex-1 bg-transparent px-3 outline-none text-primary placeholder:text-muted-foreground"
          />
          <Plane className="h-5 w-5 text-primary" />
        </div>
        <div className="flex justify-center mt-6">
          <a href="#vols" className="inline-flex items-center gap-2 text-accent font-bold text-sm hover:gap-3 transition-all">
            Tous les vols <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
