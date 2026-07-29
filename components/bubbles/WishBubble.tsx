"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { fetchWishes, timeAgo, Wish } from "@/lib/wishes";
import FloralDivider from "../FloralDivider";

type Status = "idle" | "submitting" | "success" | "error";

export default function WishBubble() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loadingWishes, setLoadingWishes] = useState(true);

  useEffect(() => {
    let active = true;

    fetchWishes().then((data) => {
      if (active) {
        setWishes(data);
        setLoadingWishes(false);
      }
    });

    // Live updates: new wishes from other guests appear without a refresh.
    const channel = supabase
      .channel("wishes-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          setWishes((prev) => [payload.new as Wish, ...prev]);
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

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
      <p className="mx-auto max-w-[16rem] font-body text-sm text-ink-light sm:max-w-[15rem]">
        Tinggalkan ucapan dan doa untuk mereka berdua 🌷
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
              Terima kasih atas ucapanmu 🌷
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-xs uppercase tracking-widest text-ink-light underline underline-offset-4"
            >
              Kirim lainnya
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
                Nama
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                required
                placeholder="e.g. Mak Bedah"
                className="w-full rounded-xl border border-rose-200 bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition focus:border-rose-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-widest text-ink-light">
                Ucapan & doa
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                required
                rows={4}
                placeholder="e.g. Semoga berbahagia hingga ke syurga"
                className="w-full resize-none rounded-xl border border-rose-200 bg-white/70 px-4 py-3 font-body text-sm text-ink outline-none transition focus:border-rose-400"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-rose-700">
                Something went wrong sending your wish — please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full rounded-full bg-rose-600 py-3 text-sm text-white transition hover:bg-rose-700 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send wish"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-8">
        <FloralDivider />
        <p className="eyebrow mt-4">
          {loadingWishes
            ? "Loading wishes..."
            : `${wishes.length} ${wishes.length === 1 ? "wish" : "wishes"} so far`}
        </p>

        <div
          className="mt-4 flex max-h-[42dvh] flex-col gap-3 overflow-y-auto overscroll-contain pr-1 text-left touch-pan-y sm:max-h-64 md:max-h-72"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {!loadingWishes && wishes.length === 0 && (
            <p className="py-4 text-center font-body text-sm text-ink-light">
              Be the first to leave a wish 🌷
            </p>
          )}

          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="rounded-2xl border border-rose-100 bg-blush-50/60 px-4 py-3"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display text-base text-ink">{wish.name}</p>
                <p className="shrink-0 text-[0.65rem] text-ink-light">
                  {timeAgo(wish.created_at)}
                </p>
              </div>
              <p className="mt-1 font-body text-sm text-ink-light">
                {wish.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
