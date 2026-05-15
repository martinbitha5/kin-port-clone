import { createFileRoute, Link } from "@tanstack/react-router";

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Cookies</Link>
          <h1 className="text-4xl font-extrabold mt-3">Politique de cookies</h1>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-6 py-12 space-y-4 text-muted-foreground">
        <p>Le site kin-aeroport.cd utilise des cookies pour assurer son bon fonctionnement, mesurer son audience et améliorer votre expérience.</p>
        <h2 className="text-xl font-extrabold text-primary">Cookies essentiels</h2>
        <p>Nécessaires au fonctionnement du site (session, préférences linguistiques). Ils ne peuvent pas être désactivés.</p>
        <h2 className="text-xl font-extrabold text-primary">Cookies de mesure d'audience</h2>
        <p>Permettent de comprendre l'usage du site afin de l'améliorer (pages consultées, durée). Anonymisés.</p>
        <h2 className="text-xl font-extrabold text-primary">Gestion</h2>
        <p>Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies non essentiels.</p>
      </article>
    </main>
  );
}

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookies — KIN Aéroport" }] }),
  component: Page,
});
