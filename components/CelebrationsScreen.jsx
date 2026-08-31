"use client";
import Image from "next/image";
import { site, scripture, notes, backgrounds } from "@/data/wedding.config";
import EventCard from "./EventCard";
import RsvpForm from "./RsvpForm";
import { Divider, Monogram } from "./Ornaments";

export default function CelebrationsScreen({ t, guest, events, onBack }) {
  return (
    <>
      <section className="relative geo-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

        <div className="relative z-10">
          {/* header */}
          <div className="px-4 pt-24 pb-16 text-center">
            <button
              onClick={onBack}
              className="absolute left-4 top-6 font-caps text-[10px] uppercase tracking-widest2
                         text-muted border border-gold/30 rounded-full px-5 py-3
                         hover:text-goldlt hover:border-gold/70 transition"
            >
              {t.backToWelcome}
            </button>
            <p className="kicker">{t.preparedFor}</p>
            <h2 className="font-display text-cream text-5xl sm:text-7xl mt-3">
              {t.yourCelebrations}
            </h2>
          </div>

          {/* Each event gets its own full-bleed section: photo behind, details
              card floated to alternating sides on top of it. */}
          <div>
            {events.map((ev, i) => (
              <EventCard
                key={ev.id}
                event={ev}
                t={t}
                index={i}
                align={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>

          <div className="px-4 pb-24">
            {/* notes */}
            <div className="mx-auto max-w-3xl mt-24 text-center">
              <p className="kicker">{t.beforeYouJoin}</p>
              <h3 className="font-display text-goldlt text-4xl sm:text-5xl mt-2">
                {t.celebrationNotes}
              </h3>

              <div className="grid sm:grid-cols-2 gap-6 mt-10 text-left">
                <div className="panel corner px-7 py-8 animate-glassIn">
                  <p className="kicker">{t.responseRequired}</p>
                  <h4 className="font-display text-cream text-2xl mt-2">{t.rsvpDeadline}</h4>
                  <p className="text-muted mt-3 leading-relaxed">
                    {t.rsvpDeadlineBody(notes.rsvpDeadline)}
                  </p>
                </div>
                <div className="panel corner px-7 py-8 animate-glassIn" style={{ animationDelay: "90ms" }}>
                  <p className="kicker">{t.pleaseNote}</p>
                  <h4 className="font-display text-cream text-2xl mt-2">{t.privateInvitation}</h4>
                  <p className="text-muted mt-3 leading-relaxed">{notes.privateNotice}</p>
                </div>
              </div>
            </div>

            {/* rsvp */}
            <div className="mx-auto max-w-3xl">
              <RsvpForm t={t} guest={guest} events={events} />
            </div>
          </div>
        </div>
      </section>

      {/* closing */}
      <section className="relative overflow-hidden py-28 px-4">
        <Image src={backgrounds.closing} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/35 to-ink/75" />

        <div className="relative z-10 mx-auto max-w-2xl">
          {/* Soft scrim behind the text — the photo alone isn't dark enough
              everywhere for reliable contrast, so give the words their own
              backing without turning it into a hard-edged card. */}
          <div
            className="rounded-[2.5rem] backdrop-blur-md px-8 sm:px-16 py-14 sm:py-16 text-center"
            style={{
              background:
                "radial-gradient(closest-side, rgba(26,5,8,.72), rgba(26,5,8,.4) 72%, transparent 100%)",
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
              {site.brideFirst} <span className="text-gold">&</span> {site.groomFirst}
            </p>

            <Divider className="my-12" />

            <p className="kicker">{t.gentleNote}</p>
            <p className="text-cream/85 mt-3 max-w-md mx-auto">{notes.giftNote}</p>

            <div className="mt-16">
              <Monogram initials={site.monogram} size={72} />
              <p className="font-caps text-[9px] tracking-widest2 text-muted/60 mt-6">
                {t.craftedBy}
              </p>
              <p className="font-caps text-[10px] tracking-widest2 text-gold/70 mt-1">
                {site.studio}
              </p>
              <p className="font-caps text-[9px] tracking-widest2 text-muted/40 mt-1">
                © {site.year}
              </p>
              <p className="font-caps text-[8px] tracking-widest2 text-muted/30 mt-4">
                MUSIC: "DESERT CITY" BY KEVIN MACLEOD (INCOMPETECH.COM) — CC BY 4.0
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
