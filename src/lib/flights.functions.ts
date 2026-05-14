import { createServerFn } from "@tanstack/react-start";

export type FlightRow = {
  type: "departure" | "arrival";
  scheduled: string; // ISO of the relevant endpoint (dep for departures, arr for arrivals)
  time: string; // HH:mm
  flight: string; // IATA + number e.g. AF879
  airline: string;
  airlineIata: string;
  city: string;
  iata: string;
  terminal: string | null;
  gate: string | null;
  status: string;
  // Full leg detail
  depAirport: string;
  depIata: string;
  depScheduled: string;
  depEstimated: string | null;
  depTerminal: string | null;
  depGate: string | null;
  arrAirport: string;
  arrIata: string;
  arrScheduled: string;
  arrEstimated: string | null;
  arrTerminal: string | null;
  arrGate: string | null;
  aircraft: string | null;
};

const FIH = "FIH";

function mapStatus(s: string): string {
  switch ((s || "").toLowerCase()) {
    case "scheduled": return "Prévu à l'heure";
    case "active": return "En vol";
    case "landed": return "Atterri";
    case "cancelled": return "Annulé";
    case "incident": return "Incident";
    case "diverted": return "Dérouté";
    default: return s || "—";
  }
}

function hhmm(iso: string | undefined | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "—";
  return d.toISOString().substring(11, 16);
}

async function fetchFromAviationstack(type: "departure" | "arrival"): Promise<FlightRow[]> {
  const key = process.env.AVIATIONSTACK_API_KEY;
  if (!key) return [];
  const param = type === "departure" ? "dep_iata" : "arr_iata";
  const url = `http://api.aviationstack.com/v1/flights?access_key=${key}&${param}=${FIH}&limit=100`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const json: any = await res.json();
    const data: any[] = json?.data ?? [];
    return data.map((f) => {
      const sched = type === "departure" ? f.departure?.scheduled : f.arrival?.scheduled;
      const other = type === "departure" ? f.arrival : f.departure;
      const d = sched ? new Date(sched) : new Date();
      return {
        type,
        scheduled: sched ?? d.toISOString(),
        time: hhmm(sched),
        flight: `${f.airline?.iata ?? ""}${f.flight?.number ?? ""}`.trim() || (f.flight?.iata ?? "—"),
        airline: f.airline?.name ?? "—",
        airlineIata: f.airline?.iata ?? "",
        city: other?.airport ?? "—",
        iata: other?.iata ?? "—",
        terminal: (type === "departure" ? f.departure : f.arrival)?.terminal ?? null,
        gate: (type === "departure" ? f.departure : f.arrival)?.gate ?? null,
        status: mapStatus(f.flight_status),
        depAirport: f.departure?.airport ?? "—",
        depIata: f.departure?.iata ?? "—",
        depScheduled: f.departure?.scheduled ?? "",
        depEstimated: f.departure?.estimated ?? null,
        depTerminal: f.departure?.terminal ?? null,
        depGate: f.departure?.gate ?? null,
        arrAirport: f.arrival?.airport ?? "—",
        arrIata: f.arrival?.iata ?? "—",
        arrScheduled: f.arrival?.scheduled ?? "",
        arrEstimated: f.arrival?.estimated ?? null,
        arrTerminal: f.arrival?.terminal ?? null,
        arrGate: f.arrival?.gate ?? null,
        aircraft: f.aircraft?.iata ?? f.aircraft?.icao ?? null,
      } as FlightRow;
    }).sort((a, b) => a.scheduled.localeCompare(b.scheduled));
  } catch {
    return [];
  }
}

export const getFlights = createServerFn({ method: "GET" })
  .inputValidator((data: { type: "departure" | "arrival" }) => data)
  .handler(async ({ data }) => {
    const rows = await fetchFromAviationstack(data.type);
    return { rows, fetchedAt: new Date().toISOString() };
  });
