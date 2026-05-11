import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/transports/bus")({
  head: () => ({ meta: [{ title: "Bus & navettes — KIN Aéroport" }, { name: "description", content: "Transco, navettes VIP et bus urbains desservant l'aéroport." }] }),
  component: () => <StubPage eyebrow="Transports" title="Bus & navettes" description="Transco, navettes VIP et bus urbains desservant l'aéroport." />,
});
