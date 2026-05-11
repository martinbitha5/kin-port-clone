import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Bus, Car, ParkingCircle, Train, Clock, ChevronRight, MapPin, Bell } from "lucide-react";
import { FlightSearch } from "@/components/site/FlightSearch";
import heroImg from "@/assets/hero-kinshasa.jpg";
import terminalImg from "@/assets/terminal.jpg";
import planeImg from "@/assets/plane.jpg";
import paris from "@/assets/dest-paris.jpg";
import brussels from "@/assets/dest-brussels.jpg";
import dubai from "@/assets/dest-dubai.jpg";
import capetown from "@/assets/dest-capetown.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KIN Aéroport — Aéroport International de Kinshasa N'djili" },
      { name: "description", content: "Site officiel de l'aéroport international de Kinshasa-N'djili (FIH). Vols, transports, parkings, services et destinations." },
    ],
  }),
  component: Index,
});

const flights = [
  { code: "AF879", city: "Paris-CDG", time: "14:25", terminal: "T1", status: "À l'heure", departure: true },
  { code: "SN359", city: "Bruxelles", time: "15:10", terminal: "T1", status: "Embarquement", departure: true },
  { code: "ET852", city: "Addis-Abeba", time: "16:40", terminal: "T2", status: "À l'heure", departure: true },
  { code: "KQ552", city: "Nairobi", time: "17:55", terminal: "T2", status: "Retardé", departure: true },
  { code: "TK588", city: "Istanbul", time: "19:20", terminal: "T1", status: "À l'heure", departure: true },
];

function Index() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-[640px] md:h-[720px] overflow-hidden">
        <img src={heroImg} alt="Kinshasa skyline" width={1920} height={1024} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 bg-primary/30" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8 h-full flex flex-col justify-end pb-32">
          <span className="text-primary-foreground/90 text-xs font-bold tracking-[0.3em] uppercase mb-3">Vous Accueillir</span>
          <h1 className="text-primary-foreground text-5xl md:text-7xl font-extrabold tracking-tight max-w-3xl">
            Bienvenue à <span className="text-accent">Kinshasa</span>
          </h1>
          <p className="text-primary-foreground/90 mt-4 max-w-xl text-lg">
            Porte d'entrée de la République Démocratique du Congo, l'aéroport international de N'djili vous accueille 24h/24.
          </p>
          <div className="mt-8">
            <button className="grid place-items-center h-14 w-14 rounded-full bg-accent text-accent-foreground hover:scale-110 transition shadow-[var(--shadow-card)]">
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Decorative blob */}
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary opacity-90" />
      </section>

      {/* FLIGHT SEARCH */}
      <FlightSearch />

      {/* INTRO */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <p className="text-muted-foreground leading-relaxed">
          Bienvenue sur le site officiel de KIN Aéroport, votre référence pour toutes les informations
          concernant l'aéroport international de Kinshasa-N'djili (FIH). Trouvez ici tout ce dont vous avez
          besoin, de la recherche d'un vol aux différents services proposés, en passant par des conseils
          pratiques pour faciliter vos voyages depuis et vers la capitale congolaise.
        </p>
      </section>

      {/* REAL TIME */}
      <section id="vols" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Vos informations en temps réel</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary mt-2">Maîtrisez votre temps</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Mis à jour {time}
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] border border-border">
              <p className="text-xs font-bold text-accent uppercase tracking-wider">Temps d'attente sécurité</p>
              <p className="text-7xl font-extrabold text-primary mt-3">12<span className="text-2xl font-bold text-muted-foreground ml-1">min</span></p>
              <p className="mt-2 text-sm text-muted-foreground">N'djili · Terminal 1 · Départ</p>
              <div className="mt-6 h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-1/3 bg-accent" />
              </div>
            </div>

            <div className="lg:col-span-2 bg-card rounded-2xl shadow-[var(--shadow-card)] border border-border overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-bold text-primary">Prochains départs</h3>
                <Link to="/" className="text-xs font-bold text-accent inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Tous les vols <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
              <ul className="divide-y divide-border">
                {flights.map((f) => (
                  <li key={f.code} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-secondary/40 transition">
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-primary text-sm">{f.code}</span>
                      <div>
                        <p className="font-semibold text-primary">{f.city}</p>
                        <p className="text-xs text-muted-foreground">Terminal {f.terminal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-bold text-primary text-lg tabular-nums">{f.time}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        f.status === "Retardé" ? "bg-accent/10 text-accent" :
                        f.status === "Embarquement" ? "bg-primary text-primary-foreground" :
                        "bg-secondary text-primary"
                      }`}>{f.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPORTS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Transports & Parkings</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mt-2 mb-10">À l'aéroport</h2>

          <h3 className="text-2xl font-bold text-primary mb-6">Transports publics</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Bus, label: "Bus Transco", state: "Fluide" },
              { icon: Car, label: "Taxi", state: "Fluide" },
              { icon: Train, label: "Navette VIP", state: "Fluide" },
              { icon: ParkingCircle, label: "Voiture privée", state: "Modéré" },
            ].map(({ icon: Icon, label, state }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-card)] transition">
                <div className="grid place-items-center h-12 w-12 rounded-xl bg-secondary text-primary mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="font-bold text-primary">{label}</p>
                <p className={`text-sm mt-1 ${state === "Fluide" ? "text-emerald-600" : "text-accent"}`}>{state}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid lg:grid-cols-2 gap-6">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">Trafic routier</span>
              <h3 className="text-2xl font-bold mt-2">Boulevard Lumumba</h3>
              <p className="text-sm opacity-80 mt-1">vers Aéroport de N'djili</p>
              <p className="text-5xl font-extrabold mt-6">28 <span className="text-lg font-bold opacity-80">min</span></p>
              <Link to="/transports" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">
                Venir en voiture <ArrowRight className="h-4 w-4" />
              </Link>
              <MapPin className="absolute -right-6 -bottom-6 h-40 w-40 opacity-10" />
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Parkings disponibles à la réservation</h3>
              <ul className="divide-y divide-border">
                {[
                  ["P1 — Courte durée", "Disponible"],
                  ["P1 Premium", "Dernières places"],
                  ["P2 Eco", "Disponible"],
                  ["PX Longue durée", "Disponible"],
                ].map(([n, s]) => (
                  <li key={n} className="py-3 flex items-center justify-between">
                    <span className="font-semibold text-primary">{n}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${s === "Dernières places" ? "bg-accent/10 text-accent" : "bg-secondary text-primary"}`}>{s}</span>
                  </li>
                ))}
              </ul>
              <Link to="/parking" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">
                Réserver un parking <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Nous sommes à vos côtés</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mt-2 mb-10">
            Toutes les informations pour préparer votre venue
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: terminalImg, tag: "Actualité", title: "Nouveau hall d'embarquement au Terminal 1", cta: "Je découvre" },
              { img: planeImg, tag: "Information", title: "Programme de modernisation 2026 — informez-vous", cta: "Je me renseigne" },
              { img: heroImg, tag: "Magazine", title: "Lisez le nouveau numéro KIN Magazine", cta: "Je lis le magazine" },
            ].map((c) => (
              <Link to="/actualites" key={c.title} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-[var(--shadow-card)] transition block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{c.tag}</span>
                  <h3 className="text-xl font-bold text-primary mt-2 leading-snug">{c.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent">
                    {c.cta} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/actualites" className="inline-flex items-center gap-2 text-sm font-bold text-accent">
              Toutes les actualités <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">S'inspirer</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mt-2 mb-10">
            Voyager depuis Kinshasa
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { img: paris, name: "Paris", desc: "Capitale lumineuse, art & gastronomie" },
              { img: brussels, name: "Bruxelles", desc: "Cœur historique de l'Europe" },
              { img: dubai, name: "Dubaï", desc: "Métropole futuriste du Golfe" },
              { img: capetown, name: "Le Cap", desc: "Entre océan et montagne" },
            ].map((d) => (
              <Link key={d.name} to="/destinations" className="group relative aspect-[3/4] rounded-2xl overflow-hidden block">
                <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
                  <h3 className="text-2xl font-extrabold">{d.name}</h3>
                  <p className="text-sm opacity-90 mt-1">{d.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/destinations" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-7 py-3 rounded-full hover:scale-105 transition">
              Toutes les destinations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8 pb-8">
        <div className="bg-primary rounded-3xl p-10 md:p-16 text-primary-foreground relative overflow-hidden">
          <Bell className="absolute right-10 top-10 h-32 w-32 opacity-10" />
          <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">Notifications vols</span>
          <h2 className="text-4xl md:text-5xl font-extrabold max-w-2xl mt-3">
            Le vol de vos proches en direct sur WhatsApp
          </h2>
          <p className="opacity-90 mt-4 max-w-xl">
            Recevez l'état des arrivées et départs de l'aéroport de Kinshasa-N'djili en temps réel, directement sur votre téléphone.
          </p>
          <a
            href="https://wa.me/243800000000?text=Bonjour%20KIN%20A%C3%A9roport%2C%20je%20souhaite%20activer%20les%20notifications%20de%20vol."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold px-7 py-4 rounded-full hover:scale-105 transition"
          >
            Activer les notifications WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
