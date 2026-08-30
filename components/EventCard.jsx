"use client";
import Image from "next/image";
import { site } from "@/data/wedding.config";
import { Divider } from "./Ornaments";

const fill = (s) =>
  s.replace(/\{BRIDE\}/g, site.brideFirst).replace(/\{GROOM\}/g, site.groomFirst);

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
      className={`relative rounded-2xl overflow-hidden animate-glassIn w-full
        md:w-[62%] ${align === "right" ? "md:ml-auto" : "md:mr-auto"}`}
      style={{ animationDelay: `${Math.min(index, 5) * 90}ms` }}
    >
      {event.image && (
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(min-width: 768px) 62vw, 100vw"
          className="object-cover"
        />
      )}
      <div className="panel corner">
        <div className="px-7 sm:px-12 py-12">
          <p className="kicker">{t.theCelebration}</p>
          <h3 className="font-display text-goldlt text-5xl sm:text-6xl mt-2">{event.name}</h3>

          <p className="text-cream/80 text-lg leading-relaxed mt-6 max-w-md">
            {fill(event.blurb)}
          </p>

          <Divider className="my-8" />

          <div className="max-w-md">
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
      </div>
    </article>
  );
}
