"use client";

import { motion, AnimatePresence } from "framer-motion";
import FloralSprig from "./FloralSprig";
import { siteConfig } from "@/config/site";

export default function CoverScreen({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.button
          onClick={onOpen}
          aria-label="Open invitation"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blush-50 px-6"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <FloralSprig className="pointer-events-none absolute -top-2 -left-2 h-36 w-36 -scale-x-100" />
          <FloralSprig className="pointer-events-none absolute -bottom-2 -right-2 h-36 w-36 rotate-180" />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="eyebrow"
          >
            {siteConfig.coverEyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 0.8 }}
            className="mt-3 text-center font-display text-5xl font-medium leading-tight text-ink"
          >
            {siteConfig.coverNames}
          </motion.h1>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="mt-8 rounded-full border border-rose-400 px-6 py-2 text-sm tracking-wide text-rose-600"
          >
            {siteConfig.coverTapLabel}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
