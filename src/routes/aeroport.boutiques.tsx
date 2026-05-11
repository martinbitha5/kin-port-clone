import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/aeroport/boutiques")({
  head: () => ({ meta: [{ title: "Boutiques & restaurants — KIN Aéroport" }, { name: "description", content: "Shopping, restauration et duty-free dans les terminaux." }] }),
  component: () => <StubPage eyebrow="À l'aéroport" title="Boutiques & restaurants" description="Shopping, restauration et duty-free dans les terminaux." />,
});
