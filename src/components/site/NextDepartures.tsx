import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Loader2, PlaneTakeoff } from "lucide-react";
import { getFlights, buildCKey, type FlightRow } from "@/lib/flights.functions";
import { AirlineLogo } from "@/components/site/AirlineLogo";

export function NextDepartures() {
  const fetchFn = useServerFn(getFlights);
  const [rows, setRows] = useState<FlightRow[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchFn({ data: { type: "departure" } })
      .then((r) => { if (active) setRows(r.rows.slice(0, 6)); })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [fetchFn]);

  return (
    <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-bold text-primary inline-flex items-center gap-2">
          <PlaneTakeoff className="h-4 w-4 text-accent" /> Prochains départs (temps réel)
        </h3>
        <Link to="/vols/departs" className="text-xs font-bold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all">
          Tous les départs <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      {loading ? (
        <div className="px-6 py-12 text-center text-muted-foreground inline-flex items-center justify-center gap-2 w-full">
          <Loader2 className="h-4 w-4 animate-spin" /> Chargement…
        </div>
      ) : !rows || rows.length === 0 ? (
        <div className="px-6 py-12 text-center text-sm text-muted-foreground">
          Aucun mouvement renvoyé par Aviationstack pour FIH actuellement.
          <div className="mt-2"><Link to="/vols/departs" className="text-accent font-bold">Voir le tableau complet →</Link></div>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {rows.map((f, i) => (
            <li key={i}>
              <Link
                to="/vols/detail"
                search={{ type: "departure", flight: f.flight, scheduled: f.scheduled }}
                className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-secondary/40 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-primary text-sm">{f.flight}</span>
                  <div>
                    <p className="font-semibold text-primary">{f.city} <span className="text-xs text-muted-foreground font-mono">({f.iata})</span></p>
                    <p className="text-xs text-muted-foreground">{f.airline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-primary text-lg tabular-nums">{f.time}</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-secondary text-primary">{f.status}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
