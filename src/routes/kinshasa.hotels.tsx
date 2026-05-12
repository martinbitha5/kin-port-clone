import { createFileRoute, Link } from "@tanstack/react-router";
import { Hotel, Star, MapPin } from "lucide-react";

const hotels = [
  { name: "Pullman Kinshasa Grand Hôtel", area: "Gombe", stars: 5, price: "Dès 220 USD/nuit", desc: "Vue imprenable sur le fleuve Congo, 3 restaurants, piscine, navette aéroport." },
  { name: "Hôtel Béatrice", area: "Gombe", stars: 5, price: "Dès 250 USD/nuit", desc: "Référence des voyageurs d'affaires, salles de conférence, spa." },
  { name: "Memling Hôtel", area: "Gombe — centre", stars: 4, price: "Dès 160 USD/nuit", desc: "Hôtel historique au cœur du centre administratif." },
  { name: "Fleuve Congo Hôtel", area: "Bord du fleuve", stars: 4, price: "Dès 180 USD/nuit", desc: "Architecture moderne, casino, vue panoramique." },
  { name: "Rotana Kin Plaza", area: "Gombe", stars: 5, price: "Dès 240 USD/nuit", desc: "Tour emblématique, restaurants internationaux, fitness." },
  { name: "Sultani Hôtel", area: "Limete", stars: 4, price: "Dès 130 USD/nuit", desc: "Idéal pour séjours moyens, accès facile à l'aéroport." },
  { name: "Estoril Résidence", area: "Gombe", stars: 3, price: "Dès 95 USD/nuit", desc: "Appartements meublés pour longs séjours." },
  { name: "Hôtel Invest", area: "N'djili — proche aéroport", stars: 3, price: "Dès 85 USD/nuit", desc: "À 10 min de l'aéroport, parfait pour escale." },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › À Kinshasa</Link>
          <h1 className="text-5xl font-extrabold mt-3">Hôtels à Kinshasa</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Une sélection d'hébergements de qualité, du business hôtel au refuge bord de fleuve.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-6">
        {hotels.map((h) => (
          <div key={h.name} className="bg-card border border-border rounded-2xl p-7 flex gap-5">
            <div className="grid place-items-center h-14 w-14 rounded-xl bg-accent/10 shrink-0"><Hotel className="h-7 w-7 text-accent" /></div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-extrabold text-lg text-primary">{h.name}</h3>
                <div className="flex">{Array.from({length: h.stars}).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}</div>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" />{h.area}</div>
              <p className="mt-3 text-sm text-muted-foreground">{h.desc}</p>
              <div className="mt-3 text-sm font-bold text-accent">{h.price}</div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export const Route = createFileRoute("/kinshasa/hotels")({
  head: () => ({ meta: [{ title: "Hôtels à Kinshasa — KIN Aéroport" }] }),
  component: Page,
});
