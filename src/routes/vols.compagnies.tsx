import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/vols/compagnies")({
  head: () => ({ meta: [{ title: "Compagnies aériennes — KIN Aéroport" }, { name: "description", content: "Toutes les compagnies opérant à l'aéroport de Kinshasa." }] }),
  component: () => <StubPage eyebrow="Vols" title="Compagnies aériennes" description="Toutes les compagnies opérant à l'aéroport de Kinshasa." />,
});
