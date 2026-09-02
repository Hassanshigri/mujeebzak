"use client";
import { useMemo, useState } from "react";

const STORAGE_KEY = "rsvp:submission";

export default function RsvpForm({ t, events }) {
  const initial = useMemo(() => {
    let saved = null;
    if (typeof window !== "undefined") {
      try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
      catch { saved = null; }
    }
    const attending = {};
    events.forEach((e) => {
      attending[e.id] = saved?.attending?.[e.id] ?? true;
    });
    return {
      name: saved?.name || "",
      phone: saved?.phone || "",
      attending,
      message: saved?.message || "",
    };
  }, [events]);

  const [name, setName] = useState(initial.name);
  const [phone, setPhone] = useState(initial.phone);
  const [attending, setAttending] = useState(initial.attending);
  const [message, setMessage] = useState(initial.message);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const toggle = (id, checked) =>
    setAttending((a) => ({ ...a, [id]: checked }));

  const attendingNames = events.filter((ev) => attending[ev.id]).map((ev) => ev.name);
  const firstName = name.trim().split(/\s+/)[0] || name;

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const payload = {
      name,
      phone,
      submittedAt: new Date().toISOString(),
      message,
      events: events.map((ev) => ({
        id: ev.id,
        name: ev.name,
        attending: attending[ev.id],
      })),
    };
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, phone, attending, message }));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="mt-24">
        <div
          role="status"
          aria-live="polite"
          className="panel corner px-6 sm:px-10 py-14 sm:py-16 text-center animate-glassIn"
        >
          <div
            className="mx-auto grid place-items-center h-20 w-20 rounded-full animate-popIn"
            style={{ background: "linear-gradient(180deg, #E7CE95, #C9A24B)" }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 13l4.5 4.5L19 7.5"
                stroke="#2B0810"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h3 className="panel-title text-5xl sm:text-6xl mt-6">{t.sentHeading}</h3>
          <p className="text-ink text-lg mt-4">
            Thank you, <span className="font-semibold">{firstName}</span> — {t.sent}
          </p>

          <p className="text-mutedDk mt-3 max-w-md mx-auto leading-relaxed">
            {attendingNames.length > 0
              ? `${t.joiningFor} ${attendingNames.join(" & ")}.`
              : t.notJoining}
          </p>

          {message.trim() && (
            <p className="text-mutedDk mt-2">{t.sentDuas}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-24">
      <div className="panel corner px-6 sm:px-10 py-10 animate-glassIn">
        <div className="text-center">
          <p className="kicker">{t.rsvpChamber}</p>
          <h3 className="panel-title text-5xl sm:text-6xl mt-2">
            {t.kindlyRespond}
          </h3>
          <p className="text-mutedDk mt-4">{t.updatableLater}</p>
        </div>

        <div className="mt-10 max-w-lg mx-auto grid sm:grid-cols-2 gap-5">
          <div>
            <label className="field-label" htmlFor="rsvp-name">{t.yourName}</label>
            <input
              id="rsvp-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="solid-input mt-2 w-full px-4 py-3"
              placeholder="…"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="rsvp-phone">{t.phoneNumber}</label>
            <input
              id="rsvp-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="solid-input mt-2 w-full px-4 py-3"
              placeholder="…"
            />
          </div>
        </div>

        <div className="mt-10 max-w-lg mx-auto">
          {events.map((ev) => (
            <label
              key={ev.id}
              htmlFor={`attend-${ev.id}`}
              className="flex items-center justify-between gap-4 py-4 border-t border-golddk/20 first:border-t-0 cursor-pointer"
            >
              <div>
                <p className="text-ink text-lg">{ev.name}</p>
                <p className="text-mutedDk text-sm">{ev.date}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`font-caps text-[10px] uppercase tracking-widest2 whitespace-nowrap
                    ${attending[ev.id] ? "text-golddk" : "text-mutedDk"}`}
                >
                  {attending[ev.id] ? t.joyfully : t.regretfully}
                </span>
                <input
                  id={`attend-${ev.id}`}
                  type="checkbox"
                  checked={attending[ev.id]}
                  onChange={(e) => toggle(ev.id, e.target.checked)}
                  className="h-6 w-6 rounded border-2 border-golddk/60 bg-transparent accent-[#8A6B23] cursor-pointer"
                />
              </div>
            </label>
          ))}
        </div>

        <div className="mt-10 max-w-lg mx-auto">
          <label className="field-label" htmlFor="duas">{t.duas}</label>
          <textarea
            id="duas"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="solid-input mt-3 w-full px-4 py-3"
            placeholder="…"
          />
        </div>

        {status === "error" && (
          <div
            role="alert"
            aria-live="assertive"
            className="mt-8 max-w-lg mx-auto rounded-xl border border-danger/40 bg-dangerbg px-5 py-4 flex items-start gap-3 text-left animate-shake"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-danger shrink-0 mt-0.5"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 7.5v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="16.5" r="1.1" fill="currentColor" />
            </svg>
            <div>
              <p className="font-caps text-[10px] uppercase tracking-widest2 text-danger">
                {t.errorHeading}
              </p>
              <p className="text-ink text-sm mt-1">{t.failed}</p>
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-gold disabled:opacity-60"
          >
            {status === "sending" ? t.sending : t.confirm}
          </button>

          <p className="text-mutedDk text-sm mt-5">{t.returnNote}</p>
        </div>
      </div>
    </form>
  );
}
