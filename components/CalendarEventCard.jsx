"use client";
import Image from "next/image";

// Every guest sees the same date regardless of their own device's
// timezone — always format in the venue's timezone (Central), never the
// viewer's local one (.getDate()/.getMonth() would drift by a day for
// anyone browsing from further east).
const CHICAGO = "America/Chicago";

export default function CalendarEventCard({ event, t }) {
  const d = new Date(event.isoDate);
  const day = d.toLocaleDateString("en-US", { day: "numeric", timeZone: CHICAGO });
  const month = d.toLocaleDateString("en-US", { month: "short", timeZone: CHICAGO }).toUpperCase();
  const weekday = d.toLocaleDateString("en-US", { weekday: "long", timeZone: CHICAGO });

  return (
    <article className="panel corner overflow-hidden">
      {event.image && (
        <div className="relative h-40 sm:h-48 w-full">
          <Image src={event.image} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-beige via-beige/10 to-transparent" />
        </div>
      )}

      <div className="px-7 sm:px-9 py-8 text-center">
        {/* calendar-page date block */}
        <div className="inline-flex flex-col items-center border-2 border-golddk/50 rounded-xl px-6 py-3 -mt-16 relative bg-beige">
          <span className="font-caps text-[11px] tracking-widest2 text-maroon">{month}</span>
          <span className="font-display text-ink text-5xl leading-none mt-1">{day}</span>
          <span className="font-caps text-[9px] tracking-widest2 text-golddk mt-1">{weekday.toUpperCase()}</span>
        </div>

        <h3 className="font-display text-maroon text-4xl sm:text-5xl mt-6">{event.name}</h3>
        <p className="text-ink/80 text-base leading-relaxed mt-3 max-w-sm mx-auto">{event.blurb}</p>

        <div className="mt-6 grid gap-3 text-left max-w-xs mx-auto">
          <div className="flex justify-between gap-4 border-t border-golddk/20 pt-3">
            <span className="field-label pt-0.5">{t.time}</span>
            <span className="text-ink text-right">{event.time}</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-golddk/20 pt-3">
            <span className="field-label pt-0.5">{t.venue}</span>
            <span className="text-ink text-right">{event.venue}</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-golddk/20 pt-3">
            <span className="field-label pt-0.5">{t.address}</span>
            <span className="text-ink text-right">
              {event.address.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </span>
          </div>
          {event.note && (
            <div className="flex justify-between gap-4 border-t border-golddk/20 pt-3">
              <span className="field-label pt-0.5">{t.pleaseNote}</span>
              <span className="text-ink text-right">{event.note}</span>
            </div>
          )}
        </div>

        {event.mapUrl && (
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-flex items-center gap-2 mt-7"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 22s7-7.58 7-12.5S16.4 2 12 2 5 4.86 5 9.5 12 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {t.viewLocation}
          </a>
        )}
      </div>
    </article>
  );
}
