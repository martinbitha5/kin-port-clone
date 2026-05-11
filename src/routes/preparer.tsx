import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/preparer")({
  head: () => ({ meta: [{ title: "Préparer mon vol — KIN Aéroport" }] }),
  component: () => (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-extrabold text-primary">Préparer mon vol</h1>
      <p className="mt-4 text-muted-foreground">Formalités, bagages, contrôles et conseils pratiques.</p>
    </main>
  ),
});
