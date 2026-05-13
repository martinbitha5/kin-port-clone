import { createFileRoute, Link } from "@tanstack/react-router";
import { FlightsBoard } from "@/components/site/FlightsBoard";

function Page() {
  return (
    <main className="bg-secondary/30 min-h-screen">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Vols</Link>
          <h1 className="text-5xl font-extrabold mt-3">Départs en temps réel</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">Suivez tous les vols au départ de l'aéroport international de Kinshasa-N'djili (FIH). Filtrez par compagnie, ville ou heure.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 -mt-8 pb-20">
        <FlightsBoard type="departure" />
      </div>
    </main>
  );
}

export const Route = createFileRoute("/vols/departs")({
  head: () => ({ meta: [{ title: "Départs en temps réel — KIN Aéroport" }] }),
  component: Page,
});
