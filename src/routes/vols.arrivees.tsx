import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/vols/arrivees")({
  head: () => ({ meta: [{ title: "Arrivées — KIN Aéroport" }, { name: "description", content: "Suivez en temps réel les vols à l'arrivée à N'djili." }] }),
  component: () => <StubPage eyebrow="Vols" title="Arrivées" description="Suivez en temps réel les vols à l'arrivée à N'djili." />,
});
