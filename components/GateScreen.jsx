"use client";
import { useState } from "react";
import { site, scripture } from "@/data/wedding.config";
import { Arch } from "./Ornaments";

export default function GateScreen({ t, onEnter }) {
  const [opening, setOpening] = useState(false);

  const enter = () => {
    setOpening(true);
    setTimeout(onEnter, 2000);
  };

  return (
    <section className="relative min-h-[100dvh] overflow-hidden geo-bg">
      {/* Gate leaves */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div
          className={`w-1/2 h-full origin-left border-r border-gold/25
            bg-[linear-gradient(100deg,#1A0508_0%,#4A121A_55%,#1A0508_100%)]
            ${opening ? "animate-gateOpenL" : ""}`}
        >
          <Arch className="h-full w-full opacity-60" />
        </div>
        <div
          className={`w-1/2 h-full origin-right border-l border-gold/25
            bg-[linear-gradient(260deg,#1A0508_0%,#4A121A_55%,#1A0508_100%)]
            ${opening ? "animate-gateOpenR" : ""}`}
        >
          <Arch className="h-full w-full opacity-60 scale-x-[-1]" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/70" />

      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
        <p className="font-arabic text-goldlt/90 text-xl sm:text-2xl mb-6 animate-fadeIn">
          {scripture.bismillah}
        </p>
        <p className="kicker mb-6 animate-fadeIn">{t.weddingCelebration}</p>

        <h1 className="font-display text-cream text-5xl sm:text-7xl md:text-8xl leading-none animate-fadeUp">
          {site.brideFirst}
          <span className="text-gold px-3 sm:px-4">&</span>
          {site.groomFirst}
        </h1>

        <button
          onClick={enter}
          disabled={opening}
          className="btn-gold mt-12 animate-fadeUp disabled:opacity-60"
        >
          {opening ? t.entering : t.enter}
        </button>
      </div>
    </section>
  );
}
