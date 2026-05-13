import { createFileRoute, Link } from "@tanstack/react-router";
import { FlightsBoard } from "@/components/site/FlightsBoard";

function Page() {
  return (
    <main className="bg-secondary/30 min-h-screen">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Vols</Link>
          <h1 className="text-5xl font-extrabold mt-3">Arrivées en temps réel</h1>
          <p className="mt-3 text-primary-foreground/80 max-w-2xl">Suivez tous les vols à destination de Kinshasa-N'djili (FIH). Filtrez par compagnie, ville ou heure.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 -mt-8 pb-20">
        <FlightsBoard type="arrival" />
      </div>
    </main>
  );
}

export const Route = createFileRoute("/vols/arrivees")({
  head: () => ({ meta: [{ title: "Arrivées en temps réel — KIN Aéroport" }] }),
  component: Page,
});
