import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/preparer/enregistrement")({
  head: () => ({ meta: [{ title: "Enregistrement — KIN Aéroport" }, { name: "description", content: "Comptoirs, bornes libre-service et enregistrement en ligne." }] }),
  component: () => <StubPage eyebrow="Préparer mon vol" title="Enregistrement" description="Comptoirs, bornes libre-service et enregistrement en ligne." />,
});
