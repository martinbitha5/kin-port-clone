import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/transports")({
  head: () => ({ meta: [{ title: "Transports & parking — KIN Aéroport" }] }),
  component: () => (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-extrabold text-primary">Transports & parking</h1>
      <p className="mt-4 text-muted-foreground">Tous les moyens d'accès à l'aéroport de N'djili.</p>
    </main>
  ),
});
