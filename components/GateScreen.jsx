"use client";
import { useRef, useState } from "react";
import { envelopeVideo } from "@/data/wedding.config";
import Butterflies from "./Butterflies";

const PLAY_DURATION_MS = 4200;

export default function GateScreen({ t, onEnter }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const tap = () => {
    if (playing) return;
    setPlaying(true);
    videoRef.current?.play();
    setTimeout(onEnter, PLAY_DURATION_MS);
  };

  return (
    <section
      onClick={tap}
      className="relative min-h-[100dvh] overflow-hidden bg-ink flex items-center justify-center cursor-pointer"
    >
      <video
        ref={videoRef}
        src={envelopeVideo}
        muted
        playsInline
        preload="auto"
        className="max-h-[100dvh] w-full object-contain"
      />

      {!playing && (
        <p className="absolute bottom-14 left-1/2 -translate-x-1/2 kicker text-goldlt animate-fadeIn pointer-events-none">
          {t.tapToOpen}
        </p>
      )}

      {playing && <Butterflies />}
    </section>
  );
}
