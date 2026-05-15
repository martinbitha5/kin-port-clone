import { useState } from "react";
import { Plane } from "lucide-react";

type Props = {
  iata: string;
  name?: string;
  /** rendered box width in px (height auto-derived 1:3 ratio of avs.io) */
  width?: number;
  height?: number;
  className?: string;
};

/**
 * Stable airline logo. Reserves the box size up-front (no layout shift),
 * uses object-contain so any logo ratio fits cleanly, and falls back to a
 * neutral plane icon on error or when no IATA is provided.
 */
export function AirlineLogo({ iata, name, width = 96, height = 32, className = "" }: Props) {
  const [err, setErr] = useState(false);
  const code = (iata || "").trim().toUpperCase();
  const showFallback = !code || err;

  return (
    <span
      className={`inline-flex items-center justify-center bg-white/60 rounded ${className}`}
      style={{ width, height }}
      aria-label={name || code || "Compagnie"}
    >
      {showFallback ? (
        <Plane className="h-4 w-4 text-primary/40" aria-hidden />
      ) : (
        <img
          src={`https://pics.avs.io/${width}/${height}/${code}.png`}
          srcSet={`https://pics.avs.io/${width * 2}/${height * 2}/${code}@2x.png 2x`}
          alt={name || code}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onError={() => setErr(true)}
          className="max-h-full max-w-full object-contain"
        />
      )}
    </span>
  );
}
