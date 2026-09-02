"use client";
import { useEffect, useState } from "react";

const diff = (targetIso) => {
  const ms = Math.max(0, new Date(targetIso).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
};

function Unit({ value, label }) {
  return (
    <div className="text-center">
      <div className="font-display text-ink text-4xl sm:text-5xl tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <p className="font-caps text-[9px] sm:text-[10px] uppercase tracking-widest2 text-mutedDk mt-1">
        {label}
      </p>
    </div>
  );
}

export default function Countdown({ targetIso, labels }) {
  const [t, setT] = useState(() => diff(targetIso));

  useEffect(() => {
    const id = setInterval(() => setT(diff(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return (
    <div className="flex items-start justify-center gap-5 sm:gap-8">
      <Unit value={t.days} label={labels.days} />
      <div className="font-display text-golddk text-3xl sm:text-4xl mt-1">:</div>
      <Unit value={t.hours} label={labels.hours} />
      <div className="font-display text-golddk text-3xl sm:text-4xl mt-1">:</div>
      <Unit value={t.minutes} label={labels.minutes} />
      <div className="font-display text-golddk text-3xl sm:text-4xl mt-1">:</div>
      <Unit value={t.seconds} label={labels.seconds} />
    </div>
  );
}
