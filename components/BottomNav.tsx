"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, MessageSquareText, CalendarDays } from "lucide-react";

export type BubbleId = "location" | "wish" | "date";

const navItems: { id: BubbleId; icon: React.ReactNode; label: string }[] = [
  { id: "location", icon: <MapPin size={19} />, label: "Lokasi" },
  { id: "wish", icon: <MessageSquareText size={19} />, label: "Ucapan" },
  { id: "date", icon: <CalendarDays size={19} />, label: "Tarikh" },
];

export default function BottomNav({
  onOpen,
}: {
  onOpen: (id: BubbleId) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const navWidth = scrolled ? "min(92vw, 460px)" : "min(94vw, 480px)";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      <motion.nav
        layout
        className="grid items-center rounded-full border border-white/35 shadow-lg backdrop-blur-xl"
        animate={{
          width: navWidth,
          backgroundColor: scrolled ? "rgba(255,255,255,0.94)" : "rgba(74,59,61,0.58)",
          boxShadow: scrolled
            ? "0 14px 34px rgba(74,59,61,0.18)"
            : "0 8px 24px rgba(74,59,61,0.15)",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: scrolled ? 8 : 10,
          paddingLeft: scrolled ? 10 : 12,
          paddingRight: scrolled ? 10 : 12,
          paddingTop: scrolled ? 10 : 12,
          paddingBottom: scrolled ? 10 : 12,
        }}
        transition={{
          layout: { type: "spring", stiffness: 260, damping: 28, mass: 0.7 },
          backgroundColor: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
          boxShadow: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
          width: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onOpen(item.id)}
            aria-label={item.label}
            className="flex min-w-0 flex-col items-center gap-1 rounded-full px-1 py-1 text-center"
            animate={{
              color: scrolled ? "#B85B6B" : "#ffffff",
              scale: scrolled ? 1 : 0.99,
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {item.icon}
            <span className="text-[0.52rem] font-medium uppercase tracking-[0.24em] sm:text-[0.58rem] sm:tracking-[0.28em]">
              {item.label}
            </span>
          </motion.button>
        ))}
      </motion.nav>
    </div>
  );
}
