import { Link } from "@tanstack/react-router";
import { Plane, Menu, User, HelpCircle } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/vols", label: "Vols" },
  { to: "/preparer", label: "Préparer mon vol" },
  { to: "/transports", label: "Transports & parking" },
  { to: "/aeroport", label: "À l'aéroport" },
  { to: "/kinshasa", label: "À Kinshasa" },
];

export function Header() {
  const [open, setOpen] = useState(false);
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

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-accent" }}
              className="text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              {n.label}
            </Link>
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
        <nav className="lg:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-sm font-semibold text-primary">
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
