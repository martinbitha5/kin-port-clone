import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/kinshasa/visiter")({
  head: () => ({ meta: [{ title: "Que visiter — KIN Aéroport" }, { name: "description", content: "Sites incontournables et expériences à découvrir." }] }),
  component: () => <StubPage eyebrow="À Kinshasa" title="Que visiter" description="Sites incontournables et expériences à découvrir." />,
});
