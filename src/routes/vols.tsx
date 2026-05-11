import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/vols")({
  head: () => ({ meta: [{ title: "Vols — KIN Aéroport" }] }),
  component: () => (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-extrabold text-primary">Tous les vols</h1>
      <p className="mt-4 text-muted-foreground">Consultez les départs et arrivées en temps réel.</p>
    </main>
  ),
});
