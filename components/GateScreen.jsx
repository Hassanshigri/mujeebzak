"use client";
import Image from "next/image";
import { site, scripture, backgrounds } from "@/data/wedding.config";

// Light "stroke" around dark text so it reads over any part of a busy
// photo without needing an opaque panel behind it.
const outlineShadow =
  "-1px -1px 2px #fff, 1px -1px 2px #fff, -1px 1px 2px #fff, 1px 1px 2px #fff, 0 0 12px rgba(255,255,255,.85)";
const outlineShadowLg =
  "-2px -2px 3px #fff, 2px -2px 3px #fff, -2px 2px 3px #fff, 2px 2px 3px #fff, 0 0 26px rgba(255,255,255,.9), 0 0 48px rgba(255,255,255,.55)";

export default function GateScreen({ t, onEnter }) {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <Image
        src={backgrounds.gate}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Warm the cache for the next screen while the guest lingers here */}
      <Image src={backgrounds.transition} alt="" width={1} height={1} priority className="hidden" />

      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />

      {/* No solid backing here — the photo stays fully visible. Legibility
          comes from a light "stroke" (stacked text-shadow) around each
          letter instead, same trick used for text over busy photos/posters. */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
        <p
          className="font-arabic text-[#3E2723] text-xl sm:text-2xl mb-6 animate-fadeIn"
          style={{ textShadow: outlineShadow }}
        >
          {scripture.bismillah}
        </p>
        <p className="kicker mb-6 animate-fadeIn !text-[#3E2723]" style={{ textShadow: outlineShadow }}>
          {t.weddingCelebration}
        </p>

        <h1
          className="font-display text-[#3E2723] text-5xl sm:text-7xl md:text-8xl leading-none animate-fadeUp"
          style={{ textShadow: outlineShadowLg }}
        >
          {site.brideFirst}
          <span className="text-[#3E2723] px-3 sm:px-4">&</span>
          {site.groomFirst}
        </h1>

        <button onClick={onEnter} className="btn-gold mt-12 animate-fadeUp !text-[#3E2723]">
          {t.enter}
        </button>
      </div>
    </section>
  );
}
