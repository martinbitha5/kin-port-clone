import { Link } from "@tanstack/react-router";
import { Plane, Menu, User, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

type SubItem = { to: string; label: string; desc?: string };
type NavItem = { to: string; label: string; sub: SubItem[] };

const nav: NavItem[] = [
  {
    to: "/vols",
    label: "Vols",
    sub: [
      { to: "/vols", label: "Tous les vols", desc: "Départs et arrivées en temps réel" },
      { to: "/vols/departs", label: "Départs", desc: "Suivez les vols au départ de N'djili" },
      { to: "/vols/arrivees", label: "Arrivées", desc: "Suivez les vols à l'arrivée" },
      { to: "/destinations", label: "Destinations", desc: "Toutes les destinations au départ de Kinshasa" },
      { to: "/vols/compagnies", label: "Compagnies aériennes", desc: "Compagnies opérant à N'djili" },
    ],
  },
  {
    to: "/preparer",
    label: "Préparer mon vol",
    sub: [
      { to: "/preparer", label: "Avant le départ", desc: "Bagages, documents, formalités" },
      { to: "/preparer/enregistrement", label: "Enregistrement", desc: "Comptoirs et bornes" },
      { to: "/preparer/securite", label: "Sécurité & douane", desc: "Objets autorisés et contrôle" },
      { to: "/preparer/familles", label: "Familles & PMR", desc: "Assistance personnalisée" },
    ],
  },
  {
    to: "/transports",
    label: "Transports & parking",
    sub: [
      { to: "/transports", label: "Venir à l'aéroport", desc: "Accès, plans et itinéraires" },
      { to: "/parking", label: "Réserver un parking", desc: "P1, P2, PX — réservation en ligne" },
      { to: "/transports/bus", label: "Bus & navettes", desc: "Transco et navettes VIP" },
      { to: "/transports/taxi", label: "Taxi & VTC", desc: "Stations officielles" },
    ],
  },
  {
    to: "/aeroport",
    label: "À l'aéroport",
    sub: [
      { to: "/aeroport", label: "Plans & terminaux", desc: "T1 et T2" },
      { to: "/aeroport/boutiques", label: "Boutiques & restaurants", desc: "Shopping et restauration" },
      { to: "/aeroport/services", label: "Services passagers", desc: "Salons, wifi, change" },
      { to: "/actualites", label: "Actualités", desc: "Toute l'actualité de N'djili" },
    ],
  },
  {
    to: "/kinshasa",
    label: "À Kinshasa",
    sub: [
      { to: "/kinshasa", label: "Bienvenue à Kinshasa", desc: "Découvrir la capitale" },
      { to: "/kinshasa/hotels", label: "Hôtels", desc: "Où séjourner" },
      { to: "/kinshasa/visiter", label: "Que visiter", desc: "Sites incontournables" },
      { to: "/kinshasa/affaires", label: "Voyage d'affaires", desc: "Centres et services" },
    ],
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="grid place-items-center h-11 w-11 rounded-md bg-primary text-primary-foreground">
            <Plane className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold tracking-tight text-primary text-lg">KIN</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-accent font-bold">Aéroport</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHover(null)}>
          {nav.map((n, i) => {
            const isLast = i >= nav.length - 2;
            return (
            <div key={n.to} className="relative" onMouseEnter={() => setHover(n.to)}>
              <Link
                to={n.to}
                activeProps={{ className: "text-accent" }}
                className="px-3 py-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                {n.label}
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Link>

              {hover === n.to && (
                <div className={`absolute top-full pt-3 w-[420px] ${isLast ? "right-0" : "left-1/2 -translate-x-1/2"}`}>
                  <div className="bg-card border border-border rounded-2xl shadow-[var(--shadow-card)] p-3 grid grid-cols-1 gap-1">
                    {n.sub.map((s) => (
                      <Link
                        key={s.to}
                        to={s.to}
                        onClick={() => setHover(null)}
                        className="rounded-xl p-3 hover:bg-secondary/60 transition group"
                      >
                        <div className="font-bold text-primary text-sm group-hover:text-accent">{s.label}</div>
                        {s.desc && <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-xs font-semibold text-primary">
            <span className="text-accent">FR</span> / EN
          </span>
          <button aria-label="Compte" className="hidden md:grid place-items-center h-9 w-9 rounded-full border border-border text-primary hover:bg-secondary">
            <User className="h-4 w-4" />
          </button>
          <button aria-label="Aide" className="hidden md:grid place-items-center h-9 w-9 rounded-full border border-border text-primary hover:bg-secondary">
            <HelpCircle className="h-4 w-4" />
          </button>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-primary" aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-background max-h-[70vh] overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col">
            {nav.map((n) => (
              <div key={n.to} className="border-b border-border py-2">
                <Link to={n.to} onClick={() => setOpen(false)} className="py-2 font-bold text-primary block">
                  {n.label}
                </Link>
                <div className="pl-3 flex flex-col">
                  {n.sub.map((s) => (
                    <Link key={s.to} to={s.to} onClick={() => setOpen(false)} className="py-1.5 text-sm text-muted-foreground hover:text-accent">
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
