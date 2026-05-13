import { createFileRoute, Link } from "@tanstack/react-router";
import { Hotel, Landmark, Briefcase, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-kinshasa.jpg";

const blocks = [
  { icon: Hotel, title: "Hôtels", to: "/kinshasa/hotels", desc: "Pullman, Béatrice, Memling, Fleuve Congo et adresses de charme." },
  { icon: Landmark, title: "Que visiter", to: "/kinshasa/visiter", desc: "Lola ya Bonobo, Symphonie des Arts, Marché de la Liberté, Académie des Beaux-Arts." },
  { icon: Briefcase, title: "Voyage d'affaires", to: "/kinshasa/affaires", desc: "Centres de conférences, coworking et services dédiés." },
] as const;

function Page() {
  return (
    <main className="bg-background">
      <section className="relative h-[460px] overflow-hidden">
        <img src={heroImg} alt="Kinshasa" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/65" />
        <div className="relative mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-12 text-primary-foreground">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › À Kinshasa</Link>
          <h1 className="text-5xl font-extrabold mt-3">Bienvenue à Kinshasa</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">Capitale de la République Démocratique du Congo, ville-monde sur les rives du fleuve Congo.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-6">
        {blocks.map((b) => (
          <Link key={b.title} to={b.to} className="group bg-card border border-border rounded-2xl p-7 hover:shadow-[var(--shadow-card)] hover:border-accent/40 transition">
            <b.icon className="h-9 w-9 text-accent" />
            <h3 className="mt-3 font-extrabold text-xl text-primary group-hover:text-accent">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent">Explorer <ArrowRight className="h-4 w-4" /></span>
          </Link>
        ))}
      </section>
    </main>
  );
}

export const Route = createFileRoute("/kinshasa")({
  head: () => ({ meta: [{ title: "Bienvenue à Kinshasa — KIN Aéroport" }] }),
  component: Page,
});
