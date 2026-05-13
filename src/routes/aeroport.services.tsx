import { createFileRoute, Link } from "@tanstack/react-router";
import { Wifi, Banknote, Briefcase, Cross, Luggage, Phone, Church } from "lucide-react";
import salonKaribu from "@/assets/salon-karibu.jpg";
import salonPresidentiel from "@/assets/salon-presidentiel.jpg";
import salonSkyteam from "@/assets/salon-skyteam.jpg";

const salons = [
  { img: salonPresidentiel, name: "Salon Présidentiel", access: "Sur invitation officielle", desc: "Espace VIP réservé aux délégations d'État, fauteuils en cuir, salons privés et service personnalisé." },
  { img: salonKaribu, name: "Salon Karibu (Star Alliance)", access: "Membres Star Alliance Gold, classes Affaires & Première", desc: "Buffet africain et continental, douches, espaces de travail, vue sur le tarmac." },
  { img: salonSkyteam, name: "SkyTeam Lounge N'djili", access: "Membres SkyTeam Elite Plus, classes Affaires", desc: "Bar, restauration chaude, postes de travail et baies vitrées plein sud." },
];

const services = [
  { icon: Wifi, name: "WiFi gratuit", desc: "Réseau \"KIN-Free-WiFi\" disponible dans tous les terminaux, illimité." },
  { icon: Banknote, name: "Bureaux de change & ATM", desc: "BCDC, Equity Bank, Rawbank — change USD/EUR/FC, distributeurs 24h/24." },
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
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Salons VIP, WiFi, change, assistance — tout pour rendre votre passage à N'djili agréable.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-primary inline-flex items-center gap-3"><Briefcase className="h-7 w-7 text-accent" />Salons VIP</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">Trois espaces premium pour patienter avant l'embarquement à Kinshasa-N'djili.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {salons.map((s) => (
            <div key={s.name} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-extrabold text-primary text-lg">{s.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-accent font-bold">{s.access}</p>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-primary">Tous les services</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.name} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-card)] transition">
                <s.icon className="h-9 w-9 text-accent" />
                <h3 className="mt-3 font-extrabold text-primary">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/aeroport/services")({
  head: () => ({ meta: [{ title: "Services passagers — KIN Aéroport" }] }),
  component: Page,
});
