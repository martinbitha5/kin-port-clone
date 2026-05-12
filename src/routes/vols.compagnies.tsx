import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Globe2 } from "lucide-react";

const companies = [
  { name: "Congo Airways", code: "8U", country: "RD Congo", hub: true, routes: ["Lubumbashi", "Goma", "Kisangani", "Mbuji-Mayi", "Kindu"], desc: "Compagnie nationale congolaise, opérateur principal du réseau domestique." },
  { name: "CAA — Compagnie Africaine d'Aviation", code: "BU", country: "RD Congo", hub: true, routes: ["Lubumbashi", "Mbandaka", "Bukavu"], desc: "Liaisons intérieures et régionales depuis Kinshasa." },
  { name: "Air France", code: "AF", country: "France", hub: false, routes: ["Paris CDG"], desc: "Vol quotidien Kinshasa — Paris en 777." },
  { name: "Brussels Airlines", code: "SN", country: "Belgique", hub: false, routes: ["Bruxelles"], desc: "Liaison historique Kinshasa — Bruxelles, 5 vols par semaine." },
  { name: "Ethiopian Airlines", code: "ET", country: "Éthiopie", hub: false, routes: ["Addis-Abeba"], desc: "Hub africain, correspondances vers l'Asie et l'Amérique du Nord." },
  { name: "Kenya Airways", code: "KQ", country: "Kenya", hub: false, routes: ["Nairobi"], desc: "Correspondances Pride of Africa vers l'est et le sud du continent." },
  { name: "Turkish Airlines", code: "TK", country: "Turquie", hub: false, routes: ["Istanbul"], desc: "Vols vers Istanbul, plus de 300 destinations en correspondance." },
  { name: "Emirates", code: "EK", country: "Émirats arabes unis", hub: false, routes: ["Dubaï via Luanda"], desc: "Vol via Luanda vers le hub de Dubaï." },
  { name: "Royal Air Maroc", code: "AT", country: "Maroc", hub: false, routes: ["Casablanca"], desc: "Liaison vers le hub de Casablanca, correspondances Europe et Amériques." },
  { name: "South African Airways", code: "SA", country: "Afrique du Sud", hub: false, routes: ["Johannesburg"], desc: "Liaisons vers l'Afrique australe." },
  { name: "ASKY Airlines", code: "KP", country: "Togo", hub: false, routes: ["Lomé"], desc: "Réseau ouest et centre-africain via Lomé." },
  { name: "RwandAir", code: "WB", country: "Rwanda", hub: false, routes: ["Kigali"], desc: "Liaisons quotidiennes via Kigali." },
];

function Page() {
  return (
    <main className="bg-secondary/30 min-h-screen">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Vols</Link>
          <h1 className="text-5xl font-extrabold mt-3">Compagnies aériennes</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">Plus de 20 compagnies opèrent à N'djili, reliant Kinshasa au reste de la RDC, à l'Afrique et au monde.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-6">
        {companies.map((c) => (
          <div key={c.code} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-card)] transition">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-extrabold text-xl text-primary">{c.name}</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2"><Globe2 className="h-3 w-3" />{c.country} · Code {c.code}</div>
              </div>
              {c.hub && <span className="px-2 py-1 rounded bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">Basée à FIH</span>}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.routes.map((r) => (
                <span key={r} className="text-xs bg-secondary px-3 py-1 rounded-full inline-flex items-center gap-1"><Plane className="h-3 w-3 text-accent" />{r}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export const Route = createFileRoute("/vols/compagnies")({
  head: () => ({ meta: [{ title: "Compagnies aériennes — KIN Aéroport" }] }),
  component: Page,
});
