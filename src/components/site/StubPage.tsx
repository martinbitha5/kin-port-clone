import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function StubPage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <Link to="/" className="text-sm text-accent font-bold inline-flex items-center gap-1 mb-6"><ArrowLeft className="h-4 w-4" /> Accueil</Link>
      <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">{eyebrow}</span>
      <h1 className="text-5xl font-extrabold text-primary mt-2">{title}</h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{description}</p>
      <div className="mt-12 p-8 rounded-2xl bg-secondary/40 border border-border">
        <p className="text-sm text-muted-foreground">Page en cours de mise à jour. Le contenu détaillé sera disponible prochainement.</p>
      </div>
    </main>
  );
}
