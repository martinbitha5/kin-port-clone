import { createFileRoute } from "@tanstack/react-router";
import { StubPage } from "@/components/site/StubPage";

export const Route = createFileRoute("/preparer/securite")({
  head: () => ({ meta: [{ title: "Sécurité & douane — KIN Aéroport" }, { name: "description", content: "Objets autorisés, contrôle de sûreté et formalités douanières." }] }),
  component: () => <StubPage eyebrow="Préparer mon vol" title="Sécurité & douane" description="Objets autorisés, contrôle de sûreté et formalités douanières." />,
});
