import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/aeroport")({
  head: () => ({ meta: [{ title: "À l'aéroport — KIN Aéroport" }] }),
  component: () => (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-extrabold text-primary">À l'aéroport</h1>
      <p className="mt-4 text-muted-foreground">Services, boutiques, restaurants et salons.</p>
    </main>
  ),
});
