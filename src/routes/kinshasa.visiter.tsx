import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Camera, Music, Trees, Landmark } from "lucide-react";

const sites = [
  { icon: Trees, name: "Lola ya Bonobo", cat: "Nature", desc: "Sanctuaire unique au monde de bonobos, à 30 km du centre. Visites guidées en matinée.", duration: "Demi-journée" },
  { icon: MapPin, name: "Fleuve Congo & Pointe Kinsuka", cat: "Panorama", desc: "Les rapides du fleuve Congo en aval de Kinshasa, vue spectaculaire au coucher du soleil.", duration: "2h" },
  { icon: Landmark, name: "Académie des Beaux-Arts", cat: "Culture", desc: "Atelier de sculpture vivant, œuvres en bronze et bois. Galerie ouverte au public.", duration: "1h30" },
  { icon: Camera, name: "Marché de la Liberté (Masina)", cat: "Vie locale", desc: "L'un des plus grands marchés d'Afrique centrale. Couleurs, sons et saveurs garantis.", duration: "2h" },
  { icon: Music, name: "Quartier Matonge — Rumba Lingala", cat: "Musique", desc: "Berceau de la rumba congolaise, bars-concerts et boutiques de disques. Ambiance le soir." , duration: "Soirée" },
  { icon: Landmark, name: "Mausolée Laurent-Désiré Kabila", cat: "Histoire", desc: "Sur le boulevard du 30 Juin, mémorial du Mzee. Architecture solennelle.", duration: "45 min" },
  { icon: Trees, name: "Jardin Botanique de Kinshasa", cat: "Nature", desc: "Oasis de verdure au cœur de Gombe, espèces tropicales rares.", duration: "1h30" },
  { icon: Camera, name: "Symphonie des Arts (Symba)", cat: "Art urbain", desc: "Fresques street-art racontant l'histoire de la RDC, dans le quartier de la Gombe.", duration: "1h" },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › À Kinshasa</Link>
          <h1 className="text-5xl font-extrabold mt-3">Que visiter à Kinshasa</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Kin la Belle — entre fleuve majestueux, art vibrant et nuits enflammées de rumba.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sites.map((s) => (
          <div key={s.name} className="bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-card)] transition">
            <s.icon className="h-9 w-9 text-accent" />
            <div className="mt-3 text-xs text-accent font-bold uppercase tracking-wider">{s.cat}</div>
            <h3 className="mt-1 font-extrabold text-primary text-lg">{s.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <div className="mt-3 text-xs text-muted-foreground">⏱️ {s.duration}</div>
          </div>
        ))}
      </section>
    </main>
  );
}

export const Route = createFileRoute("/kinshasa/visiter")({
  head: () => ({ meta: [{ title: "Que visiter à Kinshasa — KIN Aéroport" }] }),
  component: Page,
});
