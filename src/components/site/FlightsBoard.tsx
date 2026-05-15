import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Search, Clock, Loader2, ArrowRight } from "lucide-react";
import { getFlights, buildCKey, type FlightRow } from "@/lib/flights.functions";
import { AirlineLogo } from "@/components/site/AirlineLogo";

type Props = { type: "departure" | "arrival" };

function statusTone(status: string) {
  const s = status.toLowerCase();
  if (s.includes("annul")) return "bg-red-500/10 text-red-600 border-red-500/30";
  if (s.includes("retard") || s.includes("incident") || s.includes("dérout")) return "bg-amber-500/10 text-amber-700 border-amber-500/30";
  return "bg-emerald-500/10 text-emerald-700 border-emerald-500/30";
}

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

  const airlines = useMemo(() => Array.from(new Set((rows ?? []).map((r) => r.airline).filter((a) => a && a !== "—" && a !== "empty"))).sort(), [rows]);
  const hours = useMemo(() => Array.from(new Set((rows ?? []).map((r) => r.time.substring(0, 2)))).sort(), [rows]);

  const filtered = (rows ?? []).filter((r) =>
    (!airline || r.airline === airline) &&
    (!city || (r.city + " " + r.iata).toLowerCase().includes(city.toLowerCase())) &&
    (!hour || r.time.startsWith(hour))
  );

  const arrowDir = type === "departure" ? "→" : "←";
  const fromLabel = type === "departure" ? "FIH" : "—";
  const toLabel = type === "departure" ? null : "FIH";

  return (
    <div>
      <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-3 grid grid-cols-1 md:grid-cols-12 gap-2 border border-border">
        <div className="md:col-span-5 flex items-center gap-2 px-3 py-2 bg-secondary/40 rounded-lg">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ville ou code (ex. JNB, Lubumbashi)" className="w-full bg-transparent outline-none text-sm" />
        </div>
        <select value={airline} onChange={(e) => setAirline(e.target.value)} className="md:col-span-4 px-3 py-2 bg-secondary/40 rounded-lg text-sm outline-none">
          <option value="">Toutes compagnies</option>
          {airlines.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={hour} onChange={(e) => setHour(e.target.value)} className="md:col-span-2 px-3 py-2 bg-secondary/40 rounded-lg text-sm outline-none">
          <option value="">Heure</option>
          {hours.map((h) => <option key={h} value={h}>{h}h</option>)}
        </select>
        <div className="md:col-span-1 inline-flex items-center justify-end gap-1 text-xs text-muted-foreground pr-2">
          <Clock className="h-3.5 w-3.5" /> {updated || "—"}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-muted-foreground">{filtered.length} vol{filtered.length > 1 ? "s" : ""}</p>
      </div>

      <div className="mt-3 space-y-3">
        {loading ? (
          <div className="px-6 py-16 text-center text-muted-foreground inline-flex items-center justify-center gap-2 w-full bg-card rounded-2xl border border-border">
            <Loader2 className="h-4 w-4 animate-spin" /> Chargement des vols réels…
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-16 text-center text-muted-foreground bg-card rounded-2xl border border-border">
            {rows && rows.length === 0 ? "Aucun vol retourné par l'API pour FIH actuellement." : "Aucun vol ne correspond aux filtres."}
          </div>
        ) : filtered.map((f, i) => {
          const today = new Date(f.scheduled);
          const dateStr = today.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "2-digit" });
          const fromIata = type === "departure" ? fromLabel : f.iata;
          const toIata = type === "departure" ? f.iata : toLabel;
          return (
            <Link
              key={i}
              to="/vols/detail"
              search={{ type, flight: f.flight, scheduled: f.scheduled }}
              className="block bg-card rounded-2xl border border-border hover:border-accent/40 hover:shadow-[var(--shadow-card)] transition grid grid-cols-12 items-center gap-4 px-4 md:px-6 py-4"
            >
              <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                <div className="h-14 w-24 rounded-md bg-primary/5 border border-border flex items-center justify-center p-2">
                  <AirlineLogo iata={f.airlineIata} name={f.airline} className="max-h-10 w-auto" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono font-bold text-primary text-sm truncate">{f.flight}</p>
                  <p className="text-xs text-muted-foreground truncate">{f.airline === "empty" ? "—" : f.airline}</p>
                </div>
              </div>

              <div className="col-span-4 md:col-span-2">
                <p className="text-2xl md:text-3xl font-extrabold text-primary tabular-nums leading-none">{f.time}</p>
                <p className="text-xs text-muted-foreground mt-1">{dateStr}</p>
              </div>

              <div className="col-span-8 md:col-span-3">
                <p className="font-extrabold text-primary uppercase tracking-wide truncate">{f.city}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">{fromIata} {arrowDir} {toIata}</p>
              </div>

              <div className="col-span-10 md:col-span-3 flex md:justify-end">
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${statusTone(f.status)}`}>
                  <span className="h-2 w-2 rounded-full bg-current" /> {f.status}
                </span>
              </div>

              <div className="col-span-2 md:col-span-1 flex justify-end">
                <ArrowRight className="h-5 w-5 text-accent" />
              </div>
            </Link>
          );
        })}
      </div>

      {!loading && rows && rows.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">Source : Aviationstack. Le plan gratuit ne renvoie pas toujours de mouvements pour FIH ; les filtres restent fonctionnels dès que des données sont disponibles.</p>
      )}
    </div>
  );
}
