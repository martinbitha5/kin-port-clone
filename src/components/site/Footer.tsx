import { Link } from "@tanstack/react-router";
import { Plane, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid place-items-center h-11 w-11 rounded-md bg-accent">
              <Plane className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-extrabold text-lg">KIN Aéroport</div>
              <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">N'djili · FIH</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80 max-w-xs">
            Le portail officiel de l'aéroport international de Kinshasa-N'djili. Vols, transports, services & destinations.
          </p>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid place-items-center h-9 w-9 rounded-full border border-white/20 hover:bg-accent transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Passagers", links: ["Tous les vols", "Préparer mon vol", "Transports & parking", "À l'aéroport"] },
          { title: "Découvrir", links: ["Visiter Kinshasa", "Destinations", "Magazine", "Actualités"] },
          { title: "À propos", links: ["Régie de l'aéroport", "Recrutement", "Presse", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">{col.title}</h4>
            <ul className="space-y-2 text-sm opacity-90">
              {col.links.map((l) => (
                <li key={l}><Link to="/" className="hover:text-accent">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs opacity-80">
          <p>© {new Date().getFullYear()} KIN Aéroport — N'djili. Tous droits réservés.</p>
          <div className="flex gap-5">
            <a href="#">Mentions légales</a>
            <a href="#">Cookies</a>
            <a href="#">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
