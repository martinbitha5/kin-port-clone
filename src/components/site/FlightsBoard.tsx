import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Search, Clock, Plane, PlaneTakeoff, PlaneLanding, Loader2 } from "lucide-react";
import { getFlights, type FlightRow } from "@/lib/flights.functions";

type Props = { type: "departure" | "arrival" };

export function FlightsBoard({ type }: Props) {
  const fetchFn = useServerFn(getFlights);
  const [rows, setRows] = useState<FlightRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState<string>("");
  const [airline, setAirline] = useState("");
  const [city, setCity] = useState("");
  const [hour, setHour] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchFn({ data: { type } })
      .then((r) => {
        if (!active) return;
        setRows(r.rows);
        setUpdated(new Date(r.fetchedAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [type, fetchFn]);

  const airlines = useMemo(() => Array.from(new Set((rows ?? []).map((r) => r.airline).filter(Boolean))).sort(), [rows]);
  const hours = useMemo(() => Array.from(new Set((rows ?? []).map((r) => r.time.substring(0, 2)))).sort(), [rows]);

  const filtered = (rows ?? []).filter((r) =>
    (!airline || r.airline === airline) &&
    (!city || (r.city + " " + r.iata).toLowerCase().includes(city.toLowerCase())) &&
    (!hour || r.time.startsWith(hour))
  );

  const Icon = type === "departure" ? PlaneTakeoff : PlaneLanding;
  const cityLabel = type === "departure" ? "Destination" : "Provenance";

  return (
    <div>
      <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-4 grid grid-cols-1 md:grid-cols-12 gap-3 border border-border">
        <div className="md:col-span-4 flex items-center gap-2 px-3 py-2 bg-secondary/40 rounded-lg">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder={`Ville ou code (ex. CDG, Paris)`} className="w-full bg-transparent outline-none text-sm" />
        </div>
        <select value={airline} onChange={(e) => setAirline(e.target.value)} className="md:col-span-4 px-3 py-2 bg-secondary/40 rounded-lg text-sm outline-none">
          <option value="">Toutes compagnies</option>
          {airlines.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={hour} onChange={(e) => setHour(e.target.value)} className="md:col-span-2 px-3 py-2 bg-secondary/40 rounded-lg text-sm outline-none">
          <option value="">Toutes heures</option>
          {hours.map((h) => <option key={h} value={h}>{h}h — {h}h59</option>)}
        </select>
        <div className="md:col-span-2 inline-flex items-center justify-end gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> {updated || "—"}
        </div>
      </div>

      <div className="mt-6 bg-card rounded-2xl border border-border overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-4 bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary">
          <div className="col-span-2">Heure</div>
          <div className="col-span-2">Vol</div>
          <div className="col-span-3 hidden md:block">Compagnie</div>
          <div className="col-span-4 md:col-span-3">{cityLabel}</div>
          <div className="col-span-1 hidden md:block">{type === "departure" ? "Porte" : "Tapis"}</div>
          <div className="col-span-4 md:col-span-1 text-right">Statut</div>
        </div>

        {loading ? (
          <div className="px-6 py-16 text-center text-muted-foreground inline-flex items-center justify-center gap-2 w-full">
            <Loader2 className="h-4 w-4 animate-spin" /> Chargement des vols réels…
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center text-muted-foreground">
            {rows && rows.length === 0 ? "Aucun vol retourné par l'API pour FIH actuellement." : "Aucun vol ne correspond aux filtres."}
          </div>
        ) : filtered.map((f, i) => (
          <div key={i} className="grid grid-cols-12 px-6 py-4 border-t border-border items-center hover:bg-secondary/30">
            <div className="col-span-2 font-bold text-primary text-lg">{f.time}</div>
            <div className="col-span-2 text-sm text-muted-foreground font-mono">{f.flight}</div>
            <div className="col-span-3 hidden md:block text-sm">{f.airline}</div>
            <div className="col-span-4 md:col-span-3 font-semibold flex items-center gap-2"><Icon className="h-3.5 w-3.5 text-accent" />{f.city} <span className="text-xs text-muted-foreground font-mono">({f.iata})</span></div>
            <div className="col-span-1 hidden md:block text-sm font-mono">{(type === "departure" ? f.gate : f.terminal) ?? "—"}</div>
            <div className="col-span-4 md:col-span-1 text-right text-xs font-bold text-primary">{f.status}</div>
          </div>
        ))}
      </div>

      {!loading && rows && rows.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">Source : Aviationstack. Le plan gratuit ne renvoie pas toujours de mouvements pour FIH ; les filtres restent fonctionnels dès que des données sont disponibles.</p>
      )}
    </div>
  );
}
