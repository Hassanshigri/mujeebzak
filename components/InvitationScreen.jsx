"use client";
import Image from "next/image";
import { site, families, scripture, notes, backgrounds, events, invitationVideo } from "@/data/wedding.config";
import { Divider, Monogram } from "./Ornaments";
import CalendarEventCard from "./CalendarEventCard";
import Countdown from "./Countdown";
import RsvpForm from "./RsvpForm";

// Light text sitting directly on the video needs its own guaranteed
// contrast — a dark drop-shadow, since there's no card behind it anymore.
const glow = "[text-shadow:0_2px_16px_rgba(0,0,0,.75)]";

export default function InvitationScreen({ t }) {
  return (
    <>
      {/* Invitation — text sits straight on the looping video, no card */}
      <section className="relative min-h-[100dvh] overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={invitationVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-maroondk/75 via-maroon/45 to-maroondk/80" />

        <div className="relative z-10 py-8 px-6 max-w-xl mx-auto text-center">
          <Monogram initials={site.monogram} size={64} />

          <p className={`font-arabic font-bold text-goldlt text-lg sm:text-xl mt-4 leading-snug ${glow}`}>
            {scripture.bismillah}
          </p>

          <Divider className="my-4" />

          {families.blessingOf && (
            <>
              <p className={`font-medium text-muted text-sm sm:text-base ${glow}`}>{t.blessingsIntro}</p>
              <p className={`font-display font-semibold text-goldlt text-lg sm:text-xl mt-1 ${glow}`}>
                {families.blessingOf}
              </p>
              <p className={`font-medium text-muted text-xs sm:text-sm mt-3 ${glow}`}>{t.togetherWith}</p>
            </>
          )}

          <p className={`font-caps font-semibold text-cream text-[11px] sm:text-xs tracking-widest2 mt-2 leading-relaxed ${glow}`}>
            {families.brideParents}
          </p>

          <p className={`font-medium text-muted text-sm sm:text-base mt-3 leading-snug max-w-md mx-auto ${glow}`}>
            {t.requestHonor}
          </p>

          <div className="mt-4">
            <p className={`font-display font-semibold text-cream text-3xl sm:text-4xl ${glow}`}>{site.groomFirst}</p>
            <p className={`font-display font-semibold text-gold text-xl my-0.5 ${glow}`}>&</p>
            <p className={`font-display font-semibold text-cream text-3xl sm:text-4xl ${glow}`}>{site.brideFirst}</p>
          </div>

          <p className={`font-caps font-semibold text-muted text-[9px] sm:text-[10px] tracking-widest2 mt-3 ${glow}`}>
            {t.sonOf} {families.groomParents}
          </p>

          <p className={`font-arabic font-bold text-goldlt text-lg mt-5 ${glow}`}>{scripture.ayah}</p>
          <p className={`font-medium text-muted italic text-xs mt-1 ${glow}`}>{scripture.ayahTranslation}</p>

          <Divider className="my-4" />

          <p className={`font-medium text-cream/90 text-sm sm:text-base leading-snug max-w-sm mx-auto ${glow}`}>
            {notes.closingLine}
          </p>
        </div>
      </section>

      {/* Countdown, calendar style — its own section on the art-directed bg */}
      <section className="relative countdown-bg">
        <div className="relative z-10 px-4 py-24">
          <div className="text-center">
            <p className="kicker">{t.preparedFor}</p>
            <h2 className="font-display text-cream text-5xl sm:text-7xl mt-3">
              {t.yourCelebrations}
            </h2>
          </div>

          <div className="mt-14">
            <Countdown event={events[0]} t={t} />
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="relative events-bg">
        <div className="relative z-10 px-4 py-24">
          <div className="mx-auto max-w-4xl grid sm:grid-cols-2 gap-8 items-start">
            {events.map((ev) => (
              <CalendarEventCard key={ev.id} event={ev} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="relative events-bg">
        <div className="relative z-10 px-4 py-24">
          <div className="mx-auto max-w-3xl">
            <RsvpForm t={t} events={events} />
          </div>
        </div>
      </section>

      {/* footer */}
      <section className="relative overflow-hidden py-24 px-4">
        <Image src={backgrounds.closing} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/70 via-maroon/40 to-maroon/80" />

        <div className="relative z-10 mx-auto max-w-2xl">
          <div
            className="rounded-[2.5rem] px-8 sm:px-16 py-14 sm:py-16 text-center"
            style={{
              background:
                "radial-gradient(closest-side, rgba(58,10,21,.88), rgba(58,10,21,.6) 72%, transparent 100%)",
            }}
          >
            <p className="font-arabic text-goldlt text-3xl [text-shadow:0_2px_14px_rgba(0,0,0,.7)]">
              {scripture.thanks}
            </p>
            <h3 className="font-display text-cream text-4xl mt-6 [text-shadow:0_2px_16px_rgba(0,0,0,.7)]">
              {t.withLove}
            </h3>
            <p className="text-muted text-lg mt-4 max-w-md mx-auto leading-relaxed [text-shadow:0_2px_12px_rgba(0,0,0,.7)]">
              {notes.gratitude}
            </p>
            <p className="font-display text-goldlt text-4xl mt-8 [text-shadow:0_2px_16px_rgba(0,0,0,.7)]">
              {site.groomFirst} <span className="text-gold">&</span> {site.brideFirst}
            </p>

            <Divider className="my-12" />

            <p className="kicker">{t.gentleNote}</p>
            <p className="text-cream/85 mt-3 max-w-md mx-auto [text-shadow:0_2px_12px_rgba(0,0,0,.7)]">{notes.giftNote}</p>

            <div className="mt-16">
              <Monogram initials={site.monogram} size={64} />
              <p className="font-caps text-[9px] tracking-widest2 text-muted/50 mt-6">
                © {site.year} {site.brideFirst} & {site.groomFirst}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
