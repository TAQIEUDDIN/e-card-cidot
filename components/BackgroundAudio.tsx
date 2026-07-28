"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export type BackgroundAudioHandle = {
  play: () => void;
};

type BackgroundAudioProps = {
  visible?: boolean;
};

const BackgroundAudio = forwardRef<BackgroundAudioHandle, BackgroundAudioProps>(
  ({ visible = true }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);

    useImperativeHandle(ref, () => ({
      play: () => {
        audioRef.current
          ?.play()
          .then(() => setPlaying(true))
          .catch(() => {
            // Autoplay was blocked (e.g. browser policy) — guest can
            // still tap the toggle button to start it manually.
          });
      },
    }));

    function toggle() {
      const audio = audioRef.current;
      if (!audio) return;

      if (audio.paused) {
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => {});
      } else {
        audio.pause();
        setPlaying(false);
      }
    }

    return (
      <>
        <audio ref={audioRef} src="/audio/background-music.mp3" loop preload="none" />
        <button
          onClick={toggle}
          aria-label={playing ? "Mute background music" : "Play background music"}
          aria-hidden={!visible}
          tabIndex={visible ? 0 : -1}
          className={`fixed right-4 top-4 z-[65] flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-rose-600 shadow-md backdrop-blur transition hover:bg-white ${
            visible ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </>
    );
  },
);

BackgroundAudio.displayName = "BackgroundAudio";
export default BackgroundAudio;
