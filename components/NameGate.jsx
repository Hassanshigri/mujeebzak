"use client";
import { useState } from "react";
import { findGuestByName } from "@/data/guests";
import { site } from "@/data/wedding.config";
import { Monogram } from "./Ornaments";

export default function NameGate({ t, onFound }) {
  const [value, setValue] = useState("");
  const [notFound, setNotFound] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const guest = findGuestByName(value);
    if (guest) {
      setNotFound(false);
      onFound(guest);
    } else {
      setNotFound(true);
    }
  };

  return (
    <main className="min-h-[100dvh] geo-bg grid place-items-center px-6 text-center">
      <form
        onSubmit={submit}
        className="panel corner max-w-md w-full px-8 py-14 animate-glassIn"
      >
        <Monogram initials={site.monogram} size={88} />

        <p className="kicker mt-8">{t.privateInvitation}</p>
        <h2 className="font-display text-goldlt text-3xl sm:text-4xl mt-2">
          {t.nameGateTitle}
        </h2>
        <p className="text-muted mt-4 leading-relaxed">{t.nameGateHelp}</p>

        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (notFound) setNotFound(false);
          }}
          placeholder={t.nameGatePlaceholder}
          autoFocus
          className="solid-input mt-8 w-full px-4 py-3 text-center text-lg"
        />

        {notFound && (
          <p className="text-red-300 text-sm mt-4 leading-relaxed">{t.nameGateNotFound}</p>
        )}

        <button type="submit" className="btn-gold mt-8">
          {t.nameGateSubmit}
        </button>
      </form>
    </main>
  );
}
