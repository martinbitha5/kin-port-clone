import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, X, Check, AlertTriangle, FileText } from "lucide-react";

function Page() {
  const allowed = ["Vêtements et effets personnels", "Médicaments avec ordonnance", "Appareils électroniques (laptop, tablette)", "Liquides ≤ 100 ml en sac transparent (1L max)", "Nourriture sèche emballée"];
  const forbidden = ["Armes à feu et munitions", "Objets tranchants (couteaux, ciseaux >6cm)", "Liquides > 100 ml en cabine", "Substances inflammables ou corrosives", "Ivoire et produits CITES sans permis"];

  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Préparer mon vol</Link>
          <h1 className="text-5xl font-extrabold mt-3">Sécurité & douane</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Tout ce que vous devez savoir pour passer les contrôles à l'aéroport de N'djili sans encombre.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3"><Check className="h-8 w-8 text-emerald-600" /><h3 className="font-extrabold text-2xl text-primary">Autorisé en cabine</h3></div>
          <ul className="mt-6 space-y-3">
            {allowed.map((a) => <li key={a} className="flex gap-3 text-sm"><Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />{a}</li>)}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3"><X className="h-8 w-8 text-accent" /><h3 className="font-extrabold text-2xl text-primary">Interdit en cabine</h3></div>
          <ul className="mt-6 space-y-3">
            {forbidden.map((a) => <li key={a} className="flex gap-3 text-sm"><X className="h-4 w-4 text-accent shrink-0 mt-0.5" />{a}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-primary flex items-center gap-3"><ShieldCheck className="h-7 w-7 text-accent" />Contrôle de sûreté</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">Le contrôle de sûreté est obligatoire pour tous les passagers. Comptez environ 15 à 20 minutes en heure de pointe.</p>
          <ol className="mt-8 grid md:grid-cols-4 gap-4">
            {["Présentez carte d'embarquement et passeport", "Déposez vos effets dans les bacs (ordinateur à part)", "Passez sous le portique détecteur", "Récupérez vos affaires"].map((s, i) => (
              <li key={i} className="bg-card p-6 rounded-xl border border-border">
                <div className="text-accent font-extrabold text-3xl">{i+1}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-extrabold text-primary flex items-center gap-3"><FileText className="h-7 w-7 text-accent" />Formalités douanières</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h4 className="font-bold text-primary">Au départ</h4>
            <p className="mt-2 text-sm text-muted-foreground">Déclaration obligatoire au-delà de 10 000 USD en espèces. Permis CITES pour produits artisanaux à base d'ivoire, bois précieux ou faune. Présentation des biens de valeur (matériel pro, bijoux).</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <h4 className="font-bold text-primary">À l'arrivée</h4>
            <p className="mt-2 text-sm text-muted-foreground">Franchise : 1 L d'alcool, 200 cigarettes, effets personnels. Déclaration obligatoire des marchandises commerciales et devises &gt; 10 000 USD.</p>
          </div>
        </div>
        <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm"><strong className="text-primary">Carte de vaccination internationale obligatoire</strong> (fièvre jaune) pour entrer et sortir du territoire congolais.</div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/preparer/securite")({
  head: () => ({ meta: [{ title: "Sécurité & douane — KIN Aéroport" }] }),
  component: Page,
});
