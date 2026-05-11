import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/kinshasa/hotels")({
  head: () => ({ meta: [{ title: "Hôtels — KIN Aéroport" }, { name: "description", content: "Sélection d'hôtels près de l'aéroport et en ville." }] }),
  component: () => <StubPage eyebrow="À Kinshasa" title="Hôtels" description="Sélection d'hôtels près de l'aéroport et en ville." />,
});
