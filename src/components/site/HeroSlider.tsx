import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import img1 from "@/assets/hero-fih-1.jpg";
import img2 from "@/assets/hero-fih-2.jpg";
import img3 from "@/assets/hero-fih-3.jpg";

const slides = [
  { src: img1, kicker: "Aéroport International", title: "Bienvenue à", highlight: "Kinshasa", desc: "Porte d'entrée de la République Démocratique du Congo, l'aéroport international de N'djili (FIH) vous accueille 24h/24." },
  { src: img2, kicker: "Tour de contrôle", title: "Au cœur du", highlight: "ciel congolais", desc: "Une infrastructure modernisée pour piloter chaque mouvement en toute sécurité." },
  { src: img3, kicker: "Sur le tarmac", title: "Vos vols depuis", highlight: "N'djili", desc: "Plus de 20 compagnies, vers la RDC, l'Afrique, l'Europe et le Moyen-Orient." },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative h-[640px] md:h-[720px] overflow-hidden">
      {slides.map((s, idx) => (
        <img
          key={idx}
          src={s.src}
          alt={s.kicker}
          width={1920}
          height={1080}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-primary/30" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 h-full flex flex-col justify-end pb-32">
        <span className="text-primary-foreground/90 text-xs font-bold tracking-[0.3em] uppercase mb-3">{slides[i].kicker}</span>
        <h1 className="text-primary-foreground text-5xl md:text-7xl font-extrabold tracking-tight max-w-3xl">
          {slides[i].title} <span className="text-accent">{slides[i].highlight}</span>
        </h1>
        <p className="text-primary-foreground/90 mt-4 max-w-xl text-lg">{slides[i].desc}</p>
        <div className="mt-8 flex items-center gap-3">
          <button className="grid place-items-center h-14 w-14 rounded-full bg-accent text-accent-foreground hover:scale-110 transition shadow-[var(--shadow-card)]">
            <ArrowRight className="h-6 w-6" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all ${idx === i ? "w-10 bg-accent" : "w-2 bg-primary-foreground/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary opacity-90" />
    </section>
  );
}
