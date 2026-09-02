"use client";
import Image from "next/image";
import { site, families, scripture, notes, backgrounds, events } from "@/data/wedding.config";
import { Divider, Monogram } from "./Ornaments";
import CalendarEventCard from "./CalendarEventCard";
import Countdown from "./Countdown";
import RsvpForm from "./RsvpForm";

export default function InvitationScreen({ t }) {
  return (
    <>
      {/* Invitation */}
      <section className="relative min-h-[100dvh] overflow-hidden">
        <Image
          src={backgrounds.invitation}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/60 via-maroon/30 to-maroon/70" />

        <div className="relative z-10 py-16 sm:py-24 px-4">
          <div className="mx-auto max-w-3xl panel corner px-6 sm:px-14 py-14 sm:py-20 text-center animate-glassIn">
            <Monogram initials={site.monogram} size={104} />

            <p className="font-arabic text-maroon text-2xl sm:text-3xl mt-10 leading-loose">
              {scripture.bismillah}
            </p>

            <Divider className="my-10" />

            {families.blessingOf && (
              <>
                <p className="text-mutedDk text-lg sm:text-xl">{t.blessingsIntro}</p>
                <p className="font-display text-maroon text-2xl sm:text-3xl mt-2">
                  {families.blessingOf}
                </p>
                <p className="text-mutedDk text-base mt-8">{t.togetherWith}</p>
              </>
            )}

            <p className="font-caps text-ink text-xs sm:text-sm tracking-widest2 mt-3 leading-relaxed">
              {families.brideParents}
            </p>

            <p className="text-mutedDk text-lg sm:text-xl mt-8 leading-relaxed max-w-xl mx-auto">
              {t.requestHonor}
            </p>

            <div className="mt-10">
              <p className="font-display text-ink text-5xl sm:text-6xl">{site.groomFirst}</p>
              <p className="font-display text-golddk text-3xl my-2">&</p>
              <p className="font-display text-ink text-5xl sm:text-6xl">{site.brideFirst}</p>
            </div>

            <p className="font-caps text-mutedDk text-[10px] sm:text-xs tracking-widest2 mt-6">
              {t.sonOf} {families.groomParents}
            </p>

            <p className="font-arabic text-maroon text-2xl mt-12">{scripture.ayah}</p>
            <p className="text-mutedDk italic text-base mt-2">{scripture.ayahTranslation}</p>

            <Divider className="my-10" />

            <p className="text-ink/80 text-lg leading-relaxed max-w-lg mx-auto">
              {notes.closingLine}
            </p>
          </div>
        </div>
      </section>

      {/* Events + countdown, calendar style */}
      <section className="relative geo-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-maroon via-maroondk to-maroon" />

        <div className="relative z-10 px-4 py-24">
          <div className="text-center">
            <p className="kicker">{t.preparedFor}</p>
            <h2 className="font-display text-cream text-5xl sm:text-7xl mt-3">
              {t.yourCelebrations}
            </h2>

            <p className="kicker mt-12 mb-4">{t.countingDown}</p>
            <div className="panel corner inline-block px-8 sm:px-14 py-8">
              <Countdown
                targetIso={events[0].isoDate}
                labels={{ days: t.days, hours: t.hours, minutes: t.minutes, seconds: t.seconds }}
              />
            </div>
          </div>

          <div className="mx-auto max-w-4xl grid sm:grid-cols-2 gap-8 mt-16 items-start">
            {events.map((ev) => (
              <CalendarEventCard key={ev.id} event={ev} t={t} />
            ))}
          </div>

          {/* rsvp */}
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
            <p className="text-muted text-lg mt-4 max-w-md mx-auto leading-relaxed">
              {notes.gratitude}
            </p>
            <p className="font-display text-goldlt text-4xl mt-8 [text-shadow:0_2px_16px_rgba(0,0,0,.7)]">
              {site.groomFirst} <span className="text-gold">&</span> {site.brideFirst}
            </p>

            <Divider className="my-12" />

            <p className="kicker">{t.gentleNote}</p>
            <p className="text-cream/85 mt-3 max-w-md mx-auto">{notes.giftNote}</p>

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
