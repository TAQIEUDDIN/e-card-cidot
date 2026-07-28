"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import FloralDivider from "./FloralDivider";

export default function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl border border-rose-100 bg-white/95 px-6 py-7 shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 text-ink-light transition hover:text-ink"
            >
              <X size={18} />
            </button>

            <h2 className="text-center font-display text-2xl text-ink">
              {title}
            </h2>
            <div className="mt-3 flex justify-center">
              <FloralDivider />
            </div>

            <div className="mt-2">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
