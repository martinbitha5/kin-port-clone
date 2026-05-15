import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft, Bell, Share2, Bookmark, Plane, Loader2, Clock, Users, Luggage,
  Building2, ShieldCheck, Car, Coffee, MapPin,
} from "lucide-react";
import { getFlights, buildCKey, type FlightRow } from "@/lib/flights.functions";
import { AirlineLogo } from "@/components/site/AirlineLogo";

type Search = { type: "departure" | "arrival"; flight: string; scheduled: string; cKey?: string };

export const Route = createFileRoute("/vols/detail")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    type: s.type === "arrival" ? "arrival" : "departure",
    flight: String(s.flight ?? ""),
    scheduled: String(s.scheduled ?? ""),
    cKey: s.cKey ? String(s.cKey) : undefined,
  }),
  head: () => ({ meta: [{ title: "Détail du vol — KIN Aéroport" }] }),
  component: Page,
});

function fmtDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long" });
}
function fmtTime(iso: string | null | undefined) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}
function statusTone(status: string) {
  const s = status.toLowerCase();
  if (s.includes("annul")) return "bg-red-500 text-white";
  if (s.includes("retard") || s.includes("incident") || s.includes("dérout")) return "bg-amber-500 text-white";
  return "bg-emerald-500 text-white";
}

function Page() {
  const { type, flight, scheduled, cKey } = Route.useSearch();
  const fetchFn = useServerFn(getFlights);
  const [row, setRow] = useState<FlightRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchFn({ data: { type } })
      .then((r) => {
        if (!active) return;
        const found =
          (cKey && r.rows.find((x) => buildCKey(x) === cKey)) ||
          r.rows.find((x) => x.flight === flight && x.scheduled === scheduled) ||
          r.rows.find((x) => x.flight === flight) ||
          null;
        setRow(found);
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [type, flight, scheduled, cKey, fetchFn]);

  const isDeparture = type === "departure";
  const backTo = isDeparture ? "/vols/departs" : "/vols/arrivees";

  // Per-type relevant endpoint metadata
  const focusAirport = row ? (isDeparture ? row.depAirport : row.arrAirport) : "—";
  const focusIata = row ? (isDeparture ? row.depIata : row.arrIata) : "—";
  const focusTerminal = row ? (isDeparture ? row.depTerminal : row.arrTerminal) : null;
  const focusGate = row ? (isDeparture ? row.depGate : row.arrGate) : null;
  const focusScheduled = row ? (isDeparture ? row.depScheduled : row.arrScheduled) : "";
  const focusEstimated = row ? (isDeparture ? row.depEstimated : row.arrEstimated) : null;

  return (
    <main className="bg-secondary/30 min-h-screen pb-20">
      <section className="relative bg-primary text-primary-foreground">
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <Link to={backTo} className="inline-flex items-center gap-2 text-xs text-accent font-bold tracking-[0.3em] uppercase">
            <ArrowLeft className="h-3.5 w-3.5" /> Retour {isDeparture ? "aux départs" : "aux arrivées"}
          </Link>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold">
            {row ? (
              <>Vol <span className="font-mono">{row.flight}</span> {row.depIata} – {row.arrIata}</>
            ) : loading ? "Chargement…" : "Vol introuvable"}
          </h1>
          {row && (
            <p className="mt-2 text-primary-foreground/80">
              avec <span className="font-bold uppercase">{row.airline}</span>
              {cKey && <span className="ml-2 font-mono text-xs opacity-70">cKey: {cKey}</span>}
            </p>
          )}
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
            Ce vol n'est plus disponible. <Link to={backTo} className="text-accent font-bold">Voir tous les vols</Link>
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
                  <AirlineLogo iata={row.airlineIata} name={row.airline} width={96} height={32} />
                  <p className="font-mono font-extrabold text-primary">{row.flight}</p>
                </div>
                <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Mis à jour à l'instant
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-6 py-8 items-center">
                <FlightEnd
                  airport={row.depAirport}
                  iata={row.depIata}
                  scheduled={row.depScheduled}
                  estimated={row.depEstimated}
                  terminal={row.depTerminal}
                  gate={row.depGate}
                  label="Départ"
                />
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="w-full flex items-center gap-2">
                    <div className="h-px bg-border flex-1" />
                    <Plane className="h-5 w-5 text-accent" />
                    <div className="h-px bg-border flex-1" />
                  </div>
                  {row.aircraft && <p className="mt-3 text-xs text-muted-foreground uppercase tracking-wider">Appareil {row.aircraft}</p>}
                </div>
                <FlightEnd
                  airport={row.arrAirport}
                  iata={row.arrIata}
                  scheduled={row.arrScheduled}
                  estimated={row.arrEstimated}
                  terminal={row.arrTerminal}
                  gate={row.arrGate}
                  label="Arrivée"
                  align="right"
                />
              </div>

              {/* Per-type focus banner */}
              <div className="border-t border-border bg-secondary/40 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{isDeparture ? "Au départ de" : "À l'arrivée à"}</span>
                  <p className="font-bold text-primary">{focusAirport} <span className="font-mono text-muted-foreground">({focusIata})</span></p>
                </div>
                <div className="text-sm flex flex-wrap gap-4">
                  {focusTerminal && <span><span className="text-xs text-muted-foreground">Terminal</span> <strong>{focusTerminal}</strong></span>}
                  {focusGate && <span><span className="text-xs text-muted-foreground">{isDeparture ? "Porte" : "Tapis"}</span> <strong>{focusGate}</strong></span>}
                  <span><span className="text-xs text-muted-foreground">Heure prévue</span> <strong>{fmtTime(focusScheduled) ?? "—"}</strong></span>
                  {focusEstimated && <span><span className="text-xs text-muted-foreground">Heure estimée</span> <strong className="text-amber-700">{fmtTime(focusEstimated)}</strong></span>}
                </div>
              </div>
            </div>

            {/* "Paris Aéroport"-style modules */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <ModuleCard
                icon={<Users className="h-6 w-6 text-accent" />}
                title={isDeparture ? "Enregistrement" : "Police aux frontières"}
                body={isDeparture
                  ? <>Comptoirs ouverts <strong>3h avant</strong> le départ international (1h30 pour les vols nationaux). Privilégiez l'enregistrement en ligne quand votre compagnie le propose.</>
                  : <>Préparez passeport, visa RDC et carnet jaune. Comptez 20 à 40 min selon l'affluence.</>}
                link={isDeparture
                  ? { to: "/preparer/enregistrement", label: "Préparer mon enregistrement" }
                  : { to: "/preparer", label: "Formalités d'arrivée" }}
              />
              <ModuleCard
                icon={<ShieldCheck className="h-6 w-6 text-accent" />}
                title="Contrôle sûreté & douane"
                body={<>Liquides ≤ 100 ml en cabine, électronique sortie du sac. À FIH, prévoyez <strong>30 à 45 min</strong> en heure de pointe pour la sûreté et la DGM.</>}
                link={{ to: "/preparer/securite", label: "Règles de sûreté" }}
              />
              <ModuleCard
                icon={isDeparture ? <Building2 className="h-6 w-6 text-accent" /> : <Luggage className="h-6 w-6 text-accent" />}
                title={isDeparture ? "Embarquement" : "Livraison bagages"}
                body={isDeparture
                  ? <>Porte communiquée environ <strong>45 min</strong> avant le décollage{focusGate ? <> — porte actuelle : <strong>{focusGate}</strong></> : null}. Présentez-vous dès l'appel.</>
                  : <>Bagages disponibles en moyenne <strong>20 à 30 min</strong> après l'atterrissage{focusGate ? <> au tapis <strong>{focusGate}</strong></> : null}.</>}
                link={{ to: "/aeroport/services", label: "Services à l'aéroport" }}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <ModuleCard
                icon={<Car className="h-6 w-6 text-accent" />}
                title={isDeparture ? "Venir à l'aéroport" : "Quitter l'aéroport"}
                body={<>Taxis officiels, <strong>Yango</strong>, navettes hôtels et bus <strong>Transco</strong>. Comptez 45 min à 1h30 vers Gombe selon le trafic.</>}
                link={{ to: "/transports", label: "Transports & parking" }}
              />
              <ModuleCard
                icon={<Coffee className="h-6 w-6 text-accent" />}
                title="Salons & boutiques"
                body={<>Salon Karibu, Salon Présidentiel, espace SkyTeam, duty-free et restauration en zone embarquement.</>}
                link={{ to: "/aeroport/boutiques", label: "Boutiques & salons" }}
              />
              <ModuleCard
                icon={<MapPin className="h-6 w-6 text-accent" />}
                title={isDeparture ? "Go Pass & taxes" : "Bienvenue à Kinshasa"}
                body={isDeparture
                  ? <>Réglez votre <strong>Go Pass</strong> avant l'enregistrement : <strong>50 USD</strong> (international) ou <strong>10 USD</strong> (national).</>
                  : <>Change USD ↔ CDF dans le hall arrivées, info-touriste et points télécoms à la sortie.</>}
                link={isDeparture
                  ? { to: "/preparer", label: "Préparer mon vol" }
                  : { to: "/kinshasa", label: "Découvrir Kinshasa" }}
              />
            </div>

            {/* Airline */}
            <div className="bg-card rounded-2xl border border-border p-6 mt-6">
              <h2 className="font-extrabold text-primary uppercase tracking-wider text-sm">Compagnie</h2>
              <div className="mt-4 flex items-center gap-4">
                <AirlineLogo iata={row.airlineIata} name={row.airline} width={120} height={40} />
                <div>
                  <p className="font-bold text-primary uppercase">{row.airline}</p>
                  <p className="text-xs text-muted-foreground">Code IATA : {row.airlineIata || "—"}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Pour toute question relative à votre billet, bagages ou correspondance, contactez directement {row.airline}.</p>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">Date du vol : {fmtDate(row.scheduled)}.</p>
          </>
        )}
      </div>
    </main>
  );
}

function FlightEnd({
  airport, iata, scheduled, estimated, terminal, gate, label, align = "left",
}: {
  airport: string; iata: string; scheduled: string; estimated: string | null;
  terminal: string | null; gate: string | null; label: string; align?: "left" | "right";
}) {
  const sched = fmtTime(scheduled);
  const est = fmtTime(estimated);
  const delayed = est && sched && est !== sched;
  return (
    <div className={`md:col-span-4 ${align === "right" ? "md:text-right" : ""}`}>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label} · {airport}</p>
      <p className="text-5xl md:text-6xl font-extrabold text-primary mt-1 tracking-tight">{iata}</p>
      <p className="mt-3 text-sm">
        <span className="text-muted-foreground">prévu </span>
        <span className={`font-bold text-lg ${delayed ? "line-through text-muted-foreground" : "text-primary"}`}>{sched ?? "—"}</span>
        {delayed && <span className="ml-2 font-bold text-lg text-amber-600">{est}</span>}
      </p>
      {terminal && <p className="mt-1 text-sm font-semibold">Terminal {terminal}</p>}
      {gate && <p className="text-sm">Porte / Tapis {gate}</p>}
    </div>
  );
}

function ModuleCard({
  icon, title, body, link,
}: {
  icon: React.ReactNode;
  title: string;
  body: React.ReactNode;
  link?: { to: string; label: string };
}) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-xs uppercase tracking-wider font-extrabold text-primary">{title}</p>
      </div>
      <div className="mt-3 text-sm text-muted-foreground flex-1">{body}</div>
      {link && (
        <Link to={link.to} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider hover:gap-2 transition-all">
          {link.label} →
        </Link>
      )}
    </div>
  );
}
