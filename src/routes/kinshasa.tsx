import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/kinshasa")({
  head: () => ({ meta: [{ title: "À Kinshasa — KIN Aéroport" }] }),
  component: () => (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-5xl font-extrabold text-primary">À Kinshasa</h1>
      <p className="mt-4 text-muted-foreground">Découvrez la capitale congolaise et ses bonnes adresses.</p>
    </main>
  ),
});
