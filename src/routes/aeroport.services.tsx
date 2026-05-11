import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/aeroport/services")({
  head: () => ({ meta: [{ title: "Services passagers — KIN Aéroport" }, { name: "description", content: "Salons, wifi, change et services aux voyageurs." }] }),
  component: () => <StubPage eyebrow="À l'aéroport" title="Services passagers" description="Salons, wifi, change et services aux voyageurs." />,
});
