"use client";
import { useMemo, useState } from "react";
import { eventById, notes } from "@/data/wedding.config";
import { Divider } from "./Ornaments";

const STORAGE_KEY = (slug) => `rsvp:${slug}`;

export default function RsvpForm({ t, guest, events }) {
  // one answer per invited event
  const initial = useMemo(() => {
    let saved = null;
    if (typeof window !== "undefined") {
      try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY(guest.slug)) || "null"); }
      catch { saved = null; }
    }
    const base = {};
    events.forEach((e) => {
      base[e.id] = saved?.answers?.[e.id] ?? { attending: true, adults: guest.adults };
    });
    return { answers: base, message: saved?.message || "" };
  }, [guest.slug, guest.adults, events]);

  const [answers, setAnswers] = useState(initial.answers);
  const [message, setMessage] = useState(initial.message);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (id, patch) =>
    setAnswers((a) => ({ ...a, [id]: { ...a[id], ...patch } }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const payload = {
      slug: guest.slug,
      name: guest.name,
      adultsInvited: guest.adults,
      submittedAt: new Date().toISOString(),
      message,
      events: events.map((ev) => ({
        id: ev.id,
        name: ev.name,
        attending: answers[ev.id].attending,
        adults: answers[ev.id].attending ? Number(answers[ev.id].adults) : 0,
      })),
    };
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      localStorage.setItem(STORAGE_KEY(guest.slug), JSON.stringify({ answers, message }));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="mt-24">
      <div className="text-center">
        <p className="kicker">{t.rsvpChamber}</p>
        <h3 className="font-display text-goldlt text-4xl sm:text-5xl mt-2">
          {t.kindlyRespond}
        </h3>
        <p className="text-muted mt-4">{t.updatableLater}</p>
      </div>

      <div className="mt-12 grid gap-6">
        {events.map((ev) => {
          const a = answers[ev.id];
          return (
            <div key={ev.id} className="panel corner px-6 sm:px-10 py-8">
              <p className="kicker">{t.theCelebration}</p>
              <div className="flex flex-wrap items-baseline justify-between gap-3 mt-1">
                <h4 className="font-display text-cream text-3xl">{ev.name}</h4>
                <span className="text-muted text-sm">{ev.date}</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => set(ev.id, { attending: val })}
                    className={`font-caps text-[10px] uppercase tracking-widest2 px-4 py-4 rounded-sm
                      border transition-all duration-300
                      ${a.attending === val
                        ? "border-gold bg-gold text-ink"
                        : "border-gold/30 text-muted hover:border-gold/70 hover:text-goldlt"}`}
                  >
                    {val ? t.joyfully : t.regretfully}
                  </button>
                ))}
              </div>

              {a.attending && guest.adults > 1 && (
                <div className="mt-6">
                  <p className="field-label">{t.adultsAttending}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.from({ length: guest.adults }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => set(ev.id, { adults: n })}
                        className={`h-11 w-11 rounded-full border text-sm transition
                          ${Number(a.adults) === n
                            ? "border-gold bg-gold text-ink"
                            : "border-gold/30 text-muted hover:border-gold/70"}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="panel corner px-6 sm:px-10 py-8 mt-6">
        <label className="field-label" htmlFor="duas">{t.duas}</label>
        <textarea
          id="duas"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-3 w-full bg-ink/60 border border-gold/25 rounded-sm px-4 py-3
                     text-cream placeholder:text-muted/50 focus:border-gold focus:outline-none"
          placeholder="…"
        />
      </div>

      {/* Summary */}
      <div className="panel corner px-6 sm:px-10 py-10 mt-6 text-center">
        <p className="kicker">{t.yourInvitation}</p>
        <h4 className="font-display text-goldlt text-3xl mt-2">{t.reservedAttendance}</h4>
        <p className="font-display text-cream text-2xl mt-4">{guest.salutation || guest.name}</p>

        <Divider className="my-8" />

        <div className="grid sm:grid-cols-2 gap-8 text-left max-w-lg mx-auto">
          <div>
            <p className="field-label">{t.adultsInvited}</p>
            <p className="text-cream text-2xl mt-1">{guest.adults}</p>
          </div>
          <div>
            <p className="field-label">{t.includedCelebrations}</p>
            <ul className="mt-1 space-y-1">
              {events.map((ev) => (
                <li key={ev.id} className="flex justify-between gap-4 text-cream">
                  <span>{ev.name}</span>
                  <span className={answers[ev.id].attending ? "text-gold" : "text-muted"}>
                    {answers[ev.id].attending ? t.joyfully : t.regretfully}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-gold mt-10 disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.confirm}
        </button>

        {status === "sent" && <p className="text-gold mt-5">{t.sent}</p>}
        {status === "error" && <p className="text-red-300 mt-5">{t.failed}</p>}

        <p className="text-muted text-sm mt-5">{t.returnNote}</p>
      </div>
    </form>
  );
}
