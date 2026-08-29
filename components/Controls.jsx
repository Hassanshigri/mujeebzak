"use client";
import { useEffect, useRef, useState } from "react";
import { music } from "@/data/wedding.config";

export default function Controls({ lang, setLang, t, playMusic }) {
  const audioRef = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = music.volume;
    if (playMusic && music.autoplayAfterGate && !on) {
      a.play().then(() => setOn(true)).catch(() => setOn(false)); // browser may block
    }
  }, [playMusic]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (on) { a.pause(); setOn(false); }
    else { a.play().then(() => setOn(true)).catch(() => {}); }
  };

  return (
    <>
      <audio ref={audioRef} src={music.src} loop preload="none" />
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setLang(lang === "en" ? "ur" : "en")}
          className="h-11 px-4 rounded-full border border-gold/40 bg-ink/70 backdrop-blur
                     text-goldlt text-xs hover:bg-gold hover:text-ink transition"
          aria-label="Switch language"
        >
          {t.toggle}
        </button>
        <button
          onClick={toggle}
          className="h-11 w-11 rounded-full border border-gold/40 bg-ink/70 backdrop-blur
                     text-goldlt hover:bg-gold hover:text-ink transition grid place-items-center"
          aria-label={on ? "Mute music" : "Play music"}
        >
          {on ? "♫" : "♪✕"}
        </button>
      </div>
    </>
  );
}
