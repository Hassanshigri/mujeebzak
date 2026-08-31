"use client";
import Image from "next/image";
import { site, families, scripture, notes, backgrounds } from "@/data/wedding.config";
import { Divider, Monogram } from "./Ornaments";

export default function InvitationScreen({ t, onDiscover }) {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      <Image
        src={backgrounds.invitation}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/60" />

      <div className="relative z-10 py-16 sm:py-24 px-4">
        <div
          className="mx-auto max-w-3xl panel corner px-6 sm:px-14 py-14 sm:py-20 text-center animate-glassIn"
          style={{ backgroundColor: "rgba(26,5,8,.62)" }}
        >
          <Monogram initials={site.monogram} size={104} />

          <p className="font-arabic text-goldlt text-2xl sm:text-3xl mt-10 leading-loose">
            {scripture.bismillah}
          </p>

          <Divider className="my-10" />

          {families.blessingOf && (
            <>
              <p className="text-muted text-lg sm:text-xl">{t.blessingsIntro}</p>
              <p className="font-display text-goldlt text-2xl sm:text-3xl mt-2">
                {families.blessingOf}
              </p>
              <p className="text-muted text-base mt-8">{t.togetherWith}</p>
            </>
          )}

          <p className="font-caps text-cream text-xs sm:text-sm tracking-widest2 mt-3 leading-relaxed">
            {families.brideParents}
          </p>

          <p className="text-muted text-lg sm:text-xl mt-8 leading-relaxed max-w-xl mx-auto">
            {t.requestHonor}
          </p>

          <div className="mt-10">
            <p className="font-display text-cream text-5xl sm:text-6xl">{site.brideFirst}</p>
            <p className="font-display text-gold text-3xl my-2">&</p>
            <p className="font-display text-cream text-5xl sm:text-6xl">{site.groomFirst}</p>
          </div>

          <p className="font-caps text-muted text-[10px] sm:text-xs tracking-widest2 mt-6">
            {t.sonOf} {families.groomParents}
          </p>

          <p className="font-arabic text-goldlt text-2xl mt-12">{scripture.ayah}</p>
          <p className="text-muted italic text-base mt-2">{scripture.ayahTranslation}</p>

          <Divider className="my-10" />

          <p className="text-cream/85 text-lg leading-relaxed max-w-lg mx-auto">
            {notes.closingLine}
          </p>

          <button onClick={onDiscover} className="btn-gold mt-12">
            {t.discover}
          </button>
        </div>

        <p className="text-center font-caps text-[9px] tracking-widest2 text-muted/50 mt-12">
          © {site.year} {site.studio} • CRAFTED WITH CARE
        </p>
      </div>
    </section>
  );
}
