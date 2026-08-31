"use client";
import Image from "next/image";
import { site, scripture, backgrounds } from "@/data/wedding.config";

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

      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
        {/* Soft light scrim behind the text — dark brown text needs a
            reliably light backing, and the photo alone isn't consistently
            light enough everywhere for that. */}
        <div
          className="rounded-[3rem] backdrop-blur-lg px-8 sm:px-16 py-12 sm:py-16"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,250,240,.6), rgba(255,250,240,.28) 70%, transparent 100%)",
          }}
        >
          <p className="font-arabic text-[#3E2723] text-xl sm:text-2xl mb-6 animate-fadeIn">
            {scripture.bismillah}
          </p>
          <p className="kicker mb-6 animate-fadeIn !text-[#3E2723]">{t.weddingCelebration}</p>

          <h1 className="font-display text-[#3E2723] text-5xl sm:text-7xl md:text-8xl leading-none animate-fadeUp">
            {site.brideFirst}
            <span className="text-[#3E2723] px-3 sm:px-4">&</span>
            {site.groomFirst}
          </h1>

          <button onClick={onEnter} className="btn-gold mt-12 animate-fadeUp !text-[#3E2723]">
            {t.enter}
          </button>
        </div>
      </div>
    </section>
  );
}
