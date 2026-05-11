import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/transports/taxi")({
  head: () => ({ meta: [{ title: "Taxi & VTC — KIN Aéroport" }, { name: "description", content: "Stations officielles et services de taxi agréés." }] }),
  component: () => <StubPage eyebrow="Transports" title="Taxi & VTC" description="Stations officielles et services de taxi agréés." />,
});
