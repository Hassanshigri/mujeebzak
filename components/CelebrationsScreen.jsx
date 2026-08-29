"use client";
import { site, scripture, notes } from "@/data/wedding.config";
import EventCard from "./EventCard";
import RsvpForm from "./RsvpForm";
import { Divider, Monogram } from "./Ornaments";

export default function CelebrationsScreen({ t, guest, events, onBack }) {
  return (
    <section className="relative geo-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

      <div className="relative z-10 px-4 pb-24">
        {/* header */}
        <div className="pt-24 pb-16 text-center">
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

        <div className="mx-auto max-w-3xl grid gap-8">
          {events.map((ev, i) => (
            <EventCard key={ev.id} event={ev} t={t} index={i} />
          ))}
        </div>

        {/* notes */}
        <div className="mx-auto max-w-3xl mt-24 text-center">
          <p className="kicker">{t.beforeYouJoin}</p>
          <h3 className="font-display text-goldlt text-4xl sm:text-5xl mt-2">
            {t.celebrationNotes}
          </h3>

          <div className="grid sm:grid-cols-2 gap-6 mt-10 text-left">
            <div className="panel corner px-7 py-8">
              <p className="kicker">{t.responseRequired}</p>
              <h4 className="font-display text-cream text-2xl mt-2">{t.rsvpDeadline}</h4>
              <p className="text-muted mt-3 leading-relaxed">
                {t.rsvpDeadlineBody(notes.rsvpDeadline)}
              </p>
            </div>
            <div className="panel corner px-7 py-8">
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

        {/* closing */}
        <div className="mx-auto max-w-3xl mt-28 text-center">
          <p className="font-arabic text-goldlt text-3xl">{scripture.thanks}</p>
          <h3 className="font-display text-cream text-4xl mt-6">{t.withLove}</h3>
          <p className="text-muted text-lg mt-4 max-w-md mx-auto leading-relaxed">
            {notes.gratitude}
          </p>
          <p className="font-display text-goldlt text-4xl mt-8">
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
          </div>
        </div>
      </div>
    </section>
  );
}
