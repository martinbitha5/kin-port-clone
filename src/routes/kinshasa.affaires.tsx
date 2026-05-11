import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/kinshasa/affaires")({
  head: () => ({ meta: [{ title: "Voyage d'affaires — KIN Aéroport" }, { name: "description", content: "Centres de conférence et services pour professionnels." }] }),
  component: () => <StubPage eyebrow="À Kinshasa" title="Voyage d'affaires" description="Centres de conférence et services pour professionnels." />,
});
