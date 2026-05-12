import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Utensils, Coffee, Gift } from "lucide-react";

const shops = [
  { name: "Duty Free Kin", cat: "Duty-Free", desc: "Parfums, spiritueux, tabac, électronique. Zone internationale T1." },
  { name: "Boutique Congo Souvenirs", cat: "Artisanat", desc: "Masques, statuettes, tissus wax, bijoux en malachite et cuivre du Katanga." },
  { name: "Pharmacie de l'Aéroport", cat: "Santé", desc: "Médicaments courants, antipaludéens, vaccins de voyage. Hall départs." },
  { name: "Librairie Afrique", cat: "Presse", desc: "Journaux, magazines, romans d'auteurs congolais (Wabéri, In Koli Jean Bofane)." },
];

const restos = [
  { name: "Mama Colonel", cat: "Cuisine congolaise", desc: "Poulet à la moambé, pondu, fumbwa, liboke de poisson. Salle d'embarquement T1." },
  { name: "Le Zaïko", cat: "Brasserie", desc: "Brochettes, frites de manioc, Primus et Skol pression. Hall public." },
  { name: "Kin Coffee", cat: "Café — Snack", desc: "Cafés robusta du Kivu, croissants, sandwiches frais. Ouvert 24h/24." },
  { name: "Inzia Express", cat: "Fast-food", desc: "Burgers, pizzas, salades. Salle d'embarquement T2." },
  { name: "Saveurs du Fleuve", cat: "Restaurant", desc: "Capitaine grillé, ngolo, plats à partager. Mezzanine T1." },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › À l'aéroport</Link>
          <h1 className="text-5xl font-extrabold mt-3">Boutiques & restaurants</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Faites du shopping et savourez la cuisine congolaise avant d'embarquer.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-primary flex items-center gap-3"><ShoppingBag className="h-7 w-7 text-accent" />Boutiques</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          {shops.map((s) => (
            <div key={s.name} className="bg-card border border-border rounded-2xl p-6 flex gap-4">
              <Gift className="h-8 w-8 text-accent shrink-0" />
              <div>
                <div className="font-extrabold text-primary">{s.name}</div>
                <div className="text-xs text-accent font-bold uppercase tracking-wider mt-1">{s.cat}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-primary flex items-center gap-3"><Utensils className="h-7 w-7 text-accent" />Restaurants & cafés</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {restos.map((s) => (
              <div key={s.name} className="bg-card border border-border rounded-2xl p-6">
                <Coffee className="h-7 w-7 text-accent" />
                <div className="mt-3 font-extrabold text-primary">{s.name}</div>
                <div className="text-xs text-accent font-bold uppercase tracking-wider mt-1">{s.cat}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/aeroport/boutiques")({
  head: () => ({ meta: [{ title: "Boutiques & restaurants — KIN Aéroport" }] }),
  component: Page,
});
