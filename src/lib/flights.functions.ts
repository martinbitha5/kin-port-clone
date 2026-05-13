import { createServerFn } from "@tanstack/react-start";

export type FlightRow = {
  type: "departure" | "arrival";
  scheduled: string; // ISO
  time: string; // HH:mm
  flight: string; // IATA + number
  airline: string;
  city: string; // other endpoint city name
  iata: string; // other endpoint IATA
  terminal: string | null;
  gate: string | null;
  status: string;
};

const FIH = "FIH";

function mapStatus(s: string): string {
  switch ((s || "").toLowerCase()) {
    case "scheduled": return "À l'heure";
    case "active": return "En vol";
    case "landed": return "Atterri";
    case "cancelled": return "Annulé";
    case "incident": return "Incident";
    case "diverted": return "Dérouté";
    default: return s || "—";
  }
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
      const hh = d.toISOString().substring(11, 16);
      return {
        type,
        scheduled: sched ?? d.toISOString(),
        time: hh,
        flight: `${f.airline?.iata ?? ""}${f.flight?.number ?? ""}`.trim() || (f.flight?.iata ?? "—"),
        airline: f.airline?.name ?? "—",
        city: other?.airport ?? "—",
        iata: other?.iata ?? "—",
        terminal: (type === "departure" ? f.departure : f.arrival)?.terminal ?? null,
        gate: (type === "departure" ? f.departure : f.arrival)?.gate ?? null,
        status: mapStatus(f.flight_status),
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
