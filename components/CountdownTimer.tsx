"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

function getTimeLeft() {
  const total = new Date(siteConfig.eventDate).getTime() - Date.now();
  const clamp = (n: number) => Math.max(n, 0);
  return {
    days: clamp(Math.floor(total / (1000 * 60 * 60 * 24))),
    hours: clamp(Math.floor((total / (1000 * 60 * 60)) % 24)),
    minutes: clamp(Math.floor((total / (1000 * 60)) % 60)),
    seconds: clamp(Math.floor((total / 1000) % 60)),
    isPast: total <= 0,
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  if (time.isPast) {
    return (
      <p className="text-center font-display text-xl italic text-rose-600">
        Perayaan telah dimulai 🌸
      </p>
    );
  }

  const units = [
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-6">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="font-display text-3xl text-ink sm:text-4xl">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-ink-light">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
