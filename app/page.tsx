"use client";

import { useRef, useState } from "react";
import CoverScreen from "@/components/CoverScreen";
import FloralSprig from "@/components/FloralSprig";
import FloralDivider from "@/components/FloralDivider";
import CountdownTimer from "@/components/CountdownTimer";
import Modal from "@/components/Modal";
import BottomNav, { BubbleId } from "@/components/BottomNav";
import LocationBubble from "@/components/bubbles/LocationBubble";
import DateBubble from "@/components/bubbles/DateBubble";
import WishBubble from "@/components/bubbles/WishBubble";
import { siteConfig } from "@/config/site";
import BackgroundAudio, { BackgroundAudioHandle } from "@/components/BackgroundAudio";

const bubbleTitles: Record<BubbleId, string> = {
  location: "Lokasi Majlis",
  date: "Tarikh & Masa",
  wish: "Titipkan Ucapan",
};

const tentatif = [
  { time: "10:00 pagi", event: "Ketibaan pihak lelaki" },
  { time: "10:30 pagi", event: "Sesi beramah mesra & jemputan menikmati minuman ringan" },
  { time: "10:45 pagi", event: "Ucapan dari wakil pihak perempuan & wakil pihak lelaki" },
  { time: "11:30 pagi", event: "Sesi serahan cincin" },
  { time: "11:45 pagi", event: "Bacaan doa selamat" },
  { time: "12:00 tgh", event: "Sesi bergambar dengan keluarga & kenalan" },
  { time: "12:30 tgh", event: "Jamuan makan tengahari" },
  { time: "2 ptg", event: "Majlis bersurai" },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [activeBubble, setActiveBubble] = useState<BubbleId | null>(null);
  const audioHandleRef = useRef<BackgroundAudioHandle>(null);

  function handleOpen() {
    setOpen(true);
    audioHandleRef.current?.play();
  }

  return (
    <main className="relative">
      <CoverScreen open={open} onOpen={handleOpen} />
      <BackgroundAudio ref={audioHandleRef} visible={open} />

      {open && (
        <div className="card-shell overflow-hidden pb-28">
          <FloralSprig className="pointer-events-none absolute -top-4 -left-4 h-32 w-32 -scale-x-100 opacity-70" />
          <FloralSprig className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 rotate-180 opacity-70" />

          <section className="animate-fade-up px-8 pt-16 pb-8 text-center">
            <p className="eyebrow font-script text-3xl normal-case tracking-normal text-rose-500">
              Jemputan
            </p>
            <p className="mx-auto mt-4 max-w-xs font-body text-sm leading-relaxed text-ink-light">
              {siteConfig.invitationLine}
            </p>
              <p className="mt-3 font-display text-lg italic text-ink-light">
              Majlis Pertunangan
            </p>
            <h1 className="mt-5 font-display text-5xl font-medium text-ink">
              {siteConfig.brideName}
            </h1>
            <h2 className="mt-5 font-display text-3xl font-medium text-ink">
              <span className="mx-3 text-rose-400">&amp;</span>
            </h2>
            <h1 className="mt-5 font-display text-5xl font-medium text-ink">
              {siteConfig.groomName}
            </h1>
          </section>

          <section className="px-8 py-6">
            <FloralDivider />
            <div className="mt-6">
              <CountdownTimer />
            </div>
          </section>

          <section className="px-8 py-4">
            <div className="rounded-[2rem] border border-white/70 bg-white/65 px-5 py-6 shadow-[0_12px_30px_rgba(74,59,61,0.08)] backdrop-blur-sm">
              <p className="eyebrow text-center font-script text-3xl normal-case tracking-normal text-rose-500">
                Aturcara Majlis
              </p>
              <div className="mt-5 space-y-3">
                {tentatif.map((item) => (
                  <div
                    key={item.time}
                    className="grid grid-cols-[88px_1fr] gap-4 rounded-2xl bg-[#fffaf8] px-4 py-3 ring-1 ring-rose-100/80"
                  >
                    <span className="font-display text-sm font-semibold tracking-wide text-rose-500">
                      {item.time}
                    </span>
                    <span className="font-body text-sm leading-relaxed text-ink-light">
                      {item.event}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="px-8 pb-10 pt-6 text-center">
            <FloralDivider />
            <p className="mx-auto mt-6 max-w-xs font-body text-sm italic text-ink-light">
              {siteConfig.thankYouLine}
            </p>
            <p className="mt-3 font-script text-2xl text-rose-500">
              {siteConfig.signOff}
            </p>
          </footer>

          <BottomNav onOpen={(id) => setActiveBubble(id)} />

          <Modal
            open={activeBubble !== null}
            onClose={() => setActiveBubble(null)}
            title={activeBubble ? bubbleTitles[activeBubble] : ""}
          >
            {activeBubble === "location" && <LocationBubble />}
            {activeBubble === "date" && <DateBubble />}
            {activeBubble === "wish" && <WishBubble />}
          </Modal>
        </div>
      )}
    </main>
  );
}
