import { createFileRoute, Link } from "@tanstack/react-router";
import { Wifi, Banknote, Briefcase, Cross, Luggage, Phone, Church } from "lucide-react";

const services = [
  { icon: Wifi, name: "WiFi gratuit", desc: "Réseau \"KIN-Free-WiFi\" disponible dans tous les terminaux, illimité." },
  { icon: Banknote, name: "Bureaux de change & ATM", desc: "BCDC, Equity Bank, Rawbank — change USD/EUR/FC, distributeurs 24h/24." },
  { icon: Briefcase, name: "Salons VIP", desc: "Salon Présidentiel, Salon Karibu (Star Alliance), Salon SkyTeam Lounge." },
  { icon: Luggage, name: "Consigne à bagages", desc: "Hall arrivées T1, tarifs à l'heure ou à la journée." },
  { icon: Cross, name: "Poste médical", desc: "Infirmerie 24h/24, médecin sur appel. Niveau 0 du terminal central." },
  { icon: Phone, name: "Cartes SIM locales", desc: "Vodacom, Orange, Airtel — kiosques au hall arrivées, activation immédiate." },
  { icon: Church, name: "Salle de prière", desc: "Espaces œcuméniques (chrétien, musulman) — accès libre, 5h à 22h." },
  { icon: Briefcase, name: "Objets trouvés", desc: "Comptoir au niveau arrivées, ouvert 6h — 22h. Tél : +243 81 000 0001." },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › À l'aéroport</Link>
          <h1 className="text-5xl font-extrabold mt-3">Services passagers</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Tous les services à votre disposition pour rendre votre passage à N'djili agréable.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s) => (
          <div key={s.name} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-card)] transition">
            <s.icon className="h-9 w-9 text-accent" />
            <h3 className="mt-3 font-extrabold text-primary">{s.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

export const Route = createFileRoute("/aeroport/services")({
  head: () => ({ meta: [{ title: "Services passagers — KIN Aéroport" }] }),
  component: Page,
});
