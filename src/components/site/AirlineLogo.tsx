import { useState } from "react";
import { Plane } from "lucide-react";

export function AirlineLogo({ iata, name, className = "h-6 w-auto" }: { iata: string; name?: string; className?: string }) {
  const [err, setErr] = useState(false);
  if (!iata || err) {
    return <Plane className="h-5 w-5 text-primary/50" />;
  }
  return (
    <img
      src={`https://pics.avs.io/120/40/${iata}.png`}
      alt={name || iata}
      className={className}
      loading="lazy"
      onError={() => setErr(true)}
    />
  );
}
