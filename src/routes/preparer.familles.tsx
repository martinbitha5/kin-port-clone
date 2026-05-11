import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/preparer/familles")({
  head: () => ({ meta: [{ title: "Familles & PMR — KIN Aéroport" }, { name: "description", content: "Assistance personnalisée pour familles et personnes à mobilité réduite." }] }),
  component: () => <StubPage eyebrow="Préparer mon vol" title="Familles & PMR" description="Assistance personnalisée pour familles et personnes à mobilité réduite." />,
});
