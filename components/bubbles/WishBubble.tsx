"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "submitting" | "success" | "error";

export default function WishBubble() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setStatus("submitting");
    const { error } = await supabase.from("wishes").insert({
      name: name.trim().slice(0, 60),
      message: message.trim().slice(0, 500),
    });

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
    setName("");
    setMessage("");
  }

  return (
    <div className="text-center">
      <p className="mx-auto max-w-[15rem] font-body text-sm text-ink-light">
        Titipkan ucapan dan doa untuk pasangan pengantin. Semoga mereka berbahagia hingga ke akhir hayat 🌸
      </p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-rose-200 bg-blush-50 px-6 py-8"
          >
            <p className="font-display text-lg text-rose-600">
              Terima kasih atas ucapan Anda 🌷
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-xs uppercase tracking-widest text-ink-light underline underline-offset-4"
            >
              Kirim ucapan lain
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-col gap-4 text-left"
          >
            <div>
              <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-widest text-ink-light">
                Nama Anda
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                required
                placeholder="e.g. Cik Bedah"
                className="w-full rounded-xl border border-rose-200 bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition focus:border-rose-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-widest text-ink-light">
                Ucapan Anda
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                required
                rows={4}
                placeholder="Semoga bahagia hingga ke anak cucuk..."
                className="w-full resize-none rounded-xl border border-rose-200 bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition focus:border-rose-400"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-rose-700">
                Ada yang tidak kena saat menghantar ucapan Anda — sila cuba lagi.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full rounded-full bg-rose-600 py-3 text-sm text-white transition hover:bg-rose-700 disabled:opacity-60"
            >
              {status === "submitting" ? "Menghantar..." : "Kirim ucapan"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
