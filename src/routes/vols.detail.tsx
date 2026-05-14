import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, Bell, Share2, Bookmark, Plane, Loader2, Clock, Users, Luggage, Building2 } from "lucide-react";
import { getFlights, type FlightRow } from "@/lib/flights.functions";
import { AirlineLogo } from "@/components/site/AirlineLogo";

type Search = { type: "departure" | "arrival"; flight: string; scheduled: string };

export const Route = createFileRoute("/vols/detail")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    type: (s.type === "arrival" ? "arrival" : "departure"),
    flight: String(s.flight ?? ""),
    scheduled: String(s.scheduled ?? ""),
  }),
  head: () => ({ meta: [{ title: "Détail du vol — KIN Aéroport" }] }),
  component: Page,
});

function fmtDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short" });
}
function fmtTime(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
function statusTone(status: string) {
  const s = status.toLowerCase();
  if (s.includes("annul")) return "bg-red-500 text-white";
  if (s.includes("retard") || s.includes("incident") || s.includes("dérout")) return "bg-amber-500 text-white";
  return "bg-emerald-500 text-white";
}

function Page() {
  const { type, flight, scheduled } = Route.useSearch();
  const fetchFn = useServerFn(getFlights);
  const [row, setRow] = useState<FlightRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchFn({ data: { type } })
      .then((r) => {
        if (!active) return;
        const found = r.rows.find((x) => x.flight === flight && x.scheduled === scheduled)
          ?? r.rows.find((x) => x.flight === flight)
          ?? null;
        setRow(found);
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [type, flight, scheduled, fetchFn]);

  return (
    <main className="bg-secondary/30 min-h-screen pb-20">
      <section className="relative bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/src/assets/hero-fih-2.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <Link to={type === "departure" ? "/vols/departs" : "/vols/arrivees"} className="inline-flex items-center gap-2 text-xs text-accent font-bold tracking-[0.3em] uppercase">
            <ArrowLeft className="h-3.5 w-3.5" /> Retour {type === "departure" ? "aux départs" : "aux arrivées"}
          </Link>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold">
            {row ? (
              <>Vol <span className="font-mono">{row.flight}</span> {row.depIata} – {row.arrIata}</>
            ) : (loading ? "Chargement…" : "Vol introuvable")}
          </h1>
          {row && <p className="mt-2 text-primary-foreground/80">avec <span className="font-bold uppercase">{row.airline}</span></p>}
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider hover:opacity-90">
              <Bell className="h-3.5 w-3.5" /> Être notifié sur ce vol
            </button>
            <button className="inline-flex items-center gap-2 bg-card text-primary rounded-full px-3 py-2 text-xs font-bold"><Bookmark className="h-3.5 w-3.5" /></button>
            <button className="inline-flex items-center gap-2 bg-card text-primary rounded-full px-3 py-2 text-xs font-bold"><Share2 className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 -mt-10">
        {loading ? (
          <div className="bg-card rounded-2xl border border-border p-16 text-center text-muted-foreground inline-flex items-center justify-center gap-2 w-full">
            <Loader2 className="h-4 w-4 animate-spin" /> Chargement des informations du vol…
          </div>
        ) : !row ? (
          <div className="bg-card rounded-2xl border border-border p-16 text-center text-muted-foreground">
            Ce vol n'est plus disponible. <Link to={type === "departure" ? "/vols/departs" : "/vols/arrivees"} className="text-accent font-bold">Voir tous les vols</Link>
          </div>
        ) : (
          <>
            {/* Main card */}
            <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] border border-border overflow-hidden">
              <div className="px-6 py-3 border-b border-border flex items-center justify-between flex-wrap gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${statusTone(row.status)}`}>
                  <span className="h-2 w-2 rounded-full bg-white" /> {row.status}
                </span>
                <div className="flex items-center gap-3">
                  <div className="h-10 px-3 flex items-center bg-secondary/60 rounded-md">
                    <AirlineLogo iata={row.airlineIata} name={row.airline} className="max-h-7 w-auto" />
                  </div>
                  <p className="font-mono font-extrabold text-primary">{row.flight}</p>
                </div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Mis à jour à l'instant
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-6 py-8 items-center">
                {/* Departure */}
                <div className="md:col-span-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{row.depAirport}</p>
                  <p className="text-5xl md:text-6xl font-extrabold text-primary mt-1 tracking-tight">{row.depIata}</p>
                  <p className="mt-3 text-sm">
                    <span className="text-muted-foreground">{fmtDate(row.depScheduled)}</span>{" "}
                    <span className="font-bold text-primary text-lg">{fmtTime(row.depScheduled)}</span>
                  </p>
                  {row.depTerminal && <p className="mt-1 text-sm font-semibold">Terminal {row.depTerminal}</p>}
                  {row.depGate && <p className="text-sm">Porte {row.depGate}</p>}
                </div>

                {/* Middle */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="w-full flex items-center gap-2">
                    <div className="h-px bg-border flex-1" />
                    <Plane className="h-5 w-5 text-accent" />
                    <div className="h-px bg-border flex-1" />
                  </div>
                  {row.aircraft && <p className="mt-3 text-xs text-muted-foreground uppercase tracking-wider">{row.aircraft}</p>}
                </div>

                {/* Arrival */}
                <div className="md:col-span-4 md:text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{row.arrAirport}</p>
                  <p className="text-5xl md:text-6xl font-extrabold text-primary mt-1 tracking-tight">{row.arrIata}</p>
                  <p className="mt-3 text-sm">
                    <span className="text-muted-foreground">{fmtDate(row.arrScheduled)}</span>{" "}
                    <span className="font-bold text-primary text-lg">{fmtTime(row.arrScheduled)}</span>
                  </p>
                  {row.arrTerminal && <p className="mt-1 text-sm font-semibold">Terminal {row.arrTerminal}</p>}
                  {row.arrGate && <p className="text-sm">Porte {row.arrGate}</p>}
                </div>
              </div>

              {/* Sub-panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-t border-border">
                <div className="px-6 py-6 border-b md:border-b-0 md:border-r border-border">
                  <p className="text-xs uppercase tracking-wider font-bold text-primary">Enregistrement</p>
                  <div className="mt-3 flex items-center gap-3">
                    <Users className="h-6 w-6 text-accent" />
                    <p className="text-sm text-muted-foreground">Comptoirs ouverts environ 3h avant le départ. Présentez-vous tôt à FIH (affluence aux contrôles).</p>
                  </div>
                </div>
                <div className="px-6 py-6 border-b md:border-b-0 md:border-r border-border">
                  <p className="text-xs uppercase tracking-wider font-bold text-primary">Temps d'attente</p>
                  <div className="mt-3 flex items-center gap-3">
                    <Clock className="h-6 w-6 text-accent" />
                    <p className="text-sm text-muted-foreground">Police aux frontières et sûreté : prévoir <strong>30 à 45 min</strong> en heure de pointe.</p>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <p className="text-xs uppercase tracking-wider font-bold text-primary">{type === "departure" ? "Embarquement" : "Livraison bagages"}</p>
                  <div className="mt-3 flex items-center gap-3">
                    {type === "departure" ? <Building2 className="h-6 w-6 text-accent" /> : <Luggage className="h-6 w-6 text-accent" />}
                    <p className="text-sm text-muted-foreground">
                      {type === "departure"
                        ? <>Porte communiquée environ 45 min avant le décollage.{row.gate ? <> Porte actuelle : <strong>{row.gate}</strong>.</> : null}</>
                        : <>Bagages disponibles environ 20 à 30 min après l'atterrissage au tapis arrivée.</>}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical info */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="font-extrabold text-primary uppercase tracking-wider text-sm">{type === "departure" ? "Avant de partir de Kinshasa" : "À votre arrivée à Kinshasa"}</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  {type === "departure" ? (
                    <>
                      <li>Présentez-vous au plus tard <strong>3h avant</strong> le départ pour les vols internationaux.</li>
                      <li>Réglez votre <strong>Go Pass</strong> (50 USD international, 10 USD national) avant l'enregistrement.</li>
                      <li>Munissez-vous de votre <strong>passeport</strong>, du carnet de vaccination (fièvre jaune) et de l'attestation de voyage.</li>
                      <li>Contrôles : DGM, douane, sûreté. Liquides limités à 100 ml en cabine.</li>
                    </>
                  ) : (
                    <>
                      <li>Préparez votre <strong>passeport</strong>, le visa RDC et le carnet jaune.</li>
                      <li>À la sortie : taxis officiels, <strong>Yango</strong>, navettes hôtels et bus Transco vers le centre-ville.</li>
                      <li>Change de devises possible dans le hall arrivées (USD ↔ CDF).</li>
                      <li>Comptez environ <strong>45 min à 1h30</strong> pour rejoindre Gombe selon le trafic.</li>
                    </>
                  )}
                </ul>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="font-extrabold text-primary uppercase tracking-wider text-sm">Compagnie</h2>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-16 w-28 rounded-md bg-secondary/60 border border-border flex items-center justify-center p-2">
                    <AirlineLogo iata={row.airlineIata} name={row.airline} className="max-h-12 w-auto" />
                  </div>
                  <div>
                    <p className="font-bold text-primary uppercase">{row.airline}</p>
                    <p className="text-xs text-muted-foreground">Code IATA : {row.airlineIata || "—"}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Pour toute question relative à votre billet, bagages ou correspondance, contactez directement {row.airline}.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
