import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const channels = [
  { icon: Phone, title: "Standard 24h/24", value: "+243 81 000 0000", desc: "Information vols, urgences passagers." },
  { icon: Mail, title: "Email général", value: "info@kin-aeroport.cd", desc: "Réponse sous 48h ouvrables." },
  { icon: MessageCircle, title: "WhatsApp", value: "+243 81 000 0001", desc: "Notifications de vol et assistance rapide." },
  { icon: MapPin, title: "Adresse", value: "Aéroport International de N'djili, Kinshasa, RDC", desc: "Boulevard Lumumba, commune de N'djili." },
];

const services = [
  { name: "Objets trouvés", tel: "+243 81 000 0010", mail: "lostfound@kin-aeroport.cd", hours: "Tous les jours · 06h — 22h" },
  { name: "Assistance PMR (Saphir)", tel: "+243 81 000 0020", mail: "saphir@kin-aeroport.cd", hours: "24h/24, sur réservation 48h avant" },
  { name: "Réservation parking", tel: "+243 81 000 0030", mail: "parking@kin-aeroport.cd", hours: "Lun — Sam · 08h — 18h" },
  { name: "Service presse", tel: "+243 81 000 0040", mail: "presse@kin-aeroport.cd", hours: "Lun — Ven · 09h — 17h" },
];

function Page() {
  return (
    <main className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/" className="text-xs text-accent font-bold tracking-[0.3em] uppercase">Accueil › Contact</Link>
          <h1 className="text-5xl font-extrabold mt-3">Nous contacter</h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl">Une question, une réclamation, un projet ? L'équipe de KIN Aéroport est à votre écoute 24h/24.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {channels.map((c) => (
          <div key={c.title} className="bg-card border border-border rounded-2xl p-6">
            <c.icon className="h-9 w-9 text-accent" />
            <h3 className="mt-3 font-extrabold text-primary">{c.title}</h3>
            <p className="mt-2 text-sm font-bold text-primary">{c.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold text-primary inline-flex items-center gap-3"><Clock className="h-7 w-7 text-accent" />Contacts par service</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {services.map((s) => (
              <div key={s.name} className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-extrabold text-primary text-lg">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">📞 {s.tel}</p>
                <p className="text-sm text-muted-foreground">✉️ {s.mail}</p>
                <p className="text-xs text-accent font-bold mt-2">{s.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — KIN Aéroport" }] }),
  component: Page,
});
