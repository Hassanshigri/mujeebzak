"use client";
import Image from "next/image";
import { site } from "@/data/wedding.config";
import { Divider } from "./Ornaments";

const fill = (s) =>
  s.replace(/\{BRIDE\}/g, site.brideFirst).replace(/\{GROOM\}/g, site.groomFirst);

// Darkens the side the details card sits on so text stays readable, while
// the far side of the photo is left clear and vivid.
const vignette = (align) => {
  const angle = align === "right" ? 270 : 90;
  return {
    backgroundImage: `linear-gradient(${angle}deg, rgba(26,5,8,.85) 0%, rgba(26,5,8,.42) 46%, rgba(26,5,8,.16) 72%, rgba(26,5,8,.55) 100%),
      linear-gradient(rgba(26,5,8,.35), rgba(26,5,8,0) 65%, rgba(26,5,8,.65))`,
  };
};

function Row({ label, children }) {
  return (
    <div className="py-4 border-t border-gold/15 first:border-t-0">
      <p className="field-label">{label}</p>
      <div className="text-cream text-lg mt-1 leading-snug">{children}</div>
    </div>
  );
}

export default function EventCard({ event, t, index, align = "left" }) {
  return (
    <article
      className={`relative min-h-[85vh] sm:min-h-screen overflow-hidden flex items-center
        ${align === "right" ? "justify-end" : "justify-start"} px-6 sm:px-12 lg:px-20 py-16`}
    >
      {event.image ? (
        <Image
          src={event.image}
          alt=""
          fill
          sizes="100vw"
          priority={index === 0}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 geo-bg" />
      )}
      <div className="absolute inset-0" style={vignette(align)} />

      <div className="relative z-10 panel corner w-full max-w-md sm:max-w-lg px-7 sm:px-10 py-10 sm:py-12 animate-glassIn">
        <p className="kicker">{t.theCelebration}</p>
        <h3 className="font-display text-goldlt text-5xl sm:text-6xl mt-2">{event.name}</h3>

        <p className="text-cream/80 text-lg leading-relaxed mt-6">
          {fill(event.blurb)}
        </p>

        <Divider className="my-8" />

        <div>
          <Row label={t.date}>{event.date}</Row>
          <Row label={t.time}>{event.time}</Row>
          <Row label={t.venue}>{event.venue}</Row>
          <Row label={t.address}>
            {event.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </Row>
          {event.dressCode ? <Row label="Dress code">{event.dressCode}</Row> : null}
          {event.note ? <Row label={t.pleaseNote}>{event.note}</Row> : null}
        </div>

        {event.mapUrl ? (
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-block mt-8"
          >
            {t.viewLocation}
          </a>
        ) : null}
      </div>
    </article>
  );
}
