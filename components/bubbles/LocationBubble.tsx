import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

function buildWazeUrl() {
  return `https://waze.com/ul?q=${encodeURIComponent(siteConfig.venueAddress)}&navigate=yes`;
}

export default function LocationBubble() {
  return (
    <div className="text-center">
      <p className="font-display text-xl text-ink">{siteConfig.venueName}</p>
      <p className="mx-auto mt-1 max-w-[15rem] font-body text-sm text-ink-light">
        {siteConfig.venueAddress}
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <a
          href={siteConfig.venueMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-rose-100 px-4 py-3 text-left text-sm text-ink transition hover:bg-blush-50"
        >
          <span className="flex items-center gap-3">
            <MapPin size={18} className="text-rose-500" />
            Google Maps
          </span>
          <span className="text-ink-light">›</span>
        </a>

        <a
          href={buildWazeUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-2xl border border-rose-100 px-4 py-3 text-left text-sm text-ink transition hover:bg-blush-50"
        >
          <span className="flex items-center gap-3">
            <MapPin size={18} className="text-gold" />
            Waze
          </span>
          <span className="text-ink-light">›</span>
        </a>
      </div>
    </div>
  );
}
