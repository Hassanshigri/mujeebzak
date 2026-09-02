"use client";
import { useEffect, useState } from "react";

const CHICAGO = "America/Chicago";
const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

// Every guest sees the same calendar/date regardless of their own device's
// timezone — always read the event's Y/M/D/weekday in the venue's own
// timezone (Central), not the viewer's local one.
function chicagoParts(isoDate) {
  const d = new Date(isoDate);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO,
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).formatToParts(d);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    year: Number(get("year")),
    monthIndex: new Date(`${get("month")} 1, 2000`).getMonth(), // 0-11
    monthName: get("month"),
    day: Number(get("day")),
    weekday: get("weekday"),
  };
}

// Pure calendar math on Y/M/D components — safe regardless of the runtime's
// own timezone, since we're not converting an instant, just laying out a grid.
function monthGrid(year, monthIndex) {
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = Array(firstWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const diff = (targetIso) => {
  const ms = Math.max(0, new Date(targetIso).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
};

function DigitBox({ value, label }) {
  return (
    <div className="panel !rounded-2xl px-4 sm:px-6 py-4 text-center min-w-[70px] sm:min-w-[84px]">
      <div className="font-display font-bold text-maroon text-3xl sm:text-4xl tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <p className="font-caps text-[8px] sm:text-[9px] uppercase tracking-widest2 text-mutedDk mt-1">
        {label}
      </p>
    </div>
  );
}

export default function Countdown({ event, t }) {
  const [time, setTime] = useState(() => diff(event.isoDate));

  useEffect(() => {
    const id = setInterval(() => setTime(diff(event.isoDate)), 1000);
    return () => clearInterval(id);
  }, [event.isoDate]);

  const { year, monthIndex, monthName, day, weekday } = chicagoParts(event.isoDate);
  const cells = monthGrid(year, monthIndex);

  return (
    <div className="mx-auto max-w-sm text-center">
      {/* ornament + header */}
      <svg width="28" height="28" viewBox="0 0 24 24" className="mx-auto text-gold" aria-hidden>
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="12" y1="12"
            x2={12 + 9.5 * Math.cos((i * Math.PI) / 4)}
            y2={12 + 9.5 * Math.sin((i * Math.PI) / 4)}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
      </svg>
      <p className="kicker mt-3">{t.ourSpecialDay}</p>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        <span className="h-px w-10 bg-gold/50" />
        <span className="text-gold text-sm leading-none">◇</span>
        <span className="text-gold text-sm leading-none -ml-1">◇</span>
        <span className="h-px w-10 bg-gold/50" />
      </div>

      <p className="font-caps text-[11px] sm:text-xs tracking-widest2 text-cream mt-4">
        {event.time} · {weekday.toUpperCase()} · {day} {monthName.toUpperCase()} {year}
      </p>

      {/* calendar card */}
      <div className="panel corner mt-6 px-5 sm:px-7 py-6">
        <p className="font-display text-2xl">
          <span className="text-maroon">{monthName}</span>{" "}
          <span className="text-golddk">{year}</span>
        </p>

        <div className="grid grid-cols-7 gap-y-2 mt-4">
          {WEEKDAY_LABELS.map((w, i) => (
            <span key={i} className="font-caps text-[9px] tracking-widest2 text-mutedDk">
              {w}
            </span>
          ))}
          {cells.map((d, i) =>
            d === null ? (
              <span key={i} />
            ) : (
              <span
                key={i}
                className={`text-sm mx-auto flex items-center justify-center h-7 w-7 rounded-full
                  ${d === day ? "border border-gold text-golddk font-semibold" : "text-ink/70"}`}
              >
                {d}
              </span>
            )
          )}
        </div>
      </div>

      <p className="font-script text-goldlt text-4xl sm:text-5xl mt-8">
        {t.countdownTo} {event.name}
      </p>

      <div className="flex items-start justify-center gap-3 sm:gap-4 mt-6">
        <DigitBox value={time.days} label={t.days} />
        <DigitBox value={time.hours} label={t.hours} />
        <DigitBox value={time.minutes} label={t.minutes} />
        <DigitBox value={time.seconds} label={t.seconds} />
      </div>
    </div>
  );
}
