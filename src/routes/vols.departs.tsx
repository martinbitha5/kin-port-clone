import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/vols/departs")({
  head: () => ({ meta: [{ title: "Départs — KIN Aéroport" }, { name: "description", content: "Suivez en temps réel les vols au départ de Kinshasa-N'djili." }] }),
  component: () => <StubPage eyebrow="Vols" title="Départs" description="Suivez en temps réel les vols au départ de Kinshasa-N'djili." />,
});
