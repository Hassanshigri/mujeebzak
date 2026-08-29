"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getGuest } from "@/data/guests";
import { events as allEvents, site } from "@/data/wedding.config";
import { t as strings } from "@/data/i18n";
import GateScreen from "./GateScreen";
import InvitationScreen from "./InvitationScreen";
import CelebrationsScreen from "./CelebrationsScreen";
import Controls from "./Controls";

export default function Experience() {
  const params = useSearchParams();
  const slug = params.get("invite");
  const guest = useMemo(() => getGuest(slug), [slug]);

  const [lang, setLang] = useState("en");
  const [stage, setStage] = useState("gate"); // gate | invitation | celebrations
  const t = strings[lang];

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [stage]);

  const guestEvents = useMemo(
    () => (guest ? allEvents.filter((e) => guest.events.includes(e.id)) : []),
    [guest]
  );

  if (!guest) {
    return (
      <main className="min-h-[100dvh] geo-bg grid place-items-center px-6 text-center">
        <div className="panel corner max-w-md px-8 py-14">
          <p className="font-display text-goldlt text-3xl">{t.notFoundTitle}</p>
          <p className="text-muted mt-4 leading-relaxed">{t.notFoundBody}</p>
          <p className="font-caps text-[9px] tracking-widest2 text-muted/40 mt-10">
            © {site.year} {site.studio}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Controls lang={lang} setLang={setLang} t={t} playMusic={stage !== "gate"} />
      {stage === "gate" && <GateScreen t={t} onEnter={() => setStage("invitation")} />}
      {stage === "invitation" && (
        <InvitationScreen t={t} guest={guest} onDiscover={() => setStage("celebrations")} />
      )}
      {stage === "celebrations" && (
        <CelebrationsScreen
          t={t}
          guest={guest}
          events={guestEvents}
          onBack={() => setStage("invitation")}
        />
      )}
    </main>
  );
}
