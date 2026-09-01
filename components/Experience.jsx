"use client";
import { useEffect, useMemo, useState } from "react";
import { events as allEvents } from "@/data/wedding.config";
import { t as strings } from "@/data/i18n";
import GateScreen from "./GateScreen";
import TransitionScreen from "./TransitionScreen";
import NameGate from "./NameGate";
import InvitationScreen from "./InvitationScreen";
import CelebrationsScreen from "./CelebrationsScreen";
import Controls from "./Controls";

export default function Experience() {
  const [guest, setGuest] = useState(null);
  const [lang, setLang] = useState("en");
  const [stage, setStage] = useState("gate"); // gate | transition | name | invitation | celebrations
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

  return (
    <main>
      <Controls lang={lang} setLang={setLang} t={t} playMusic={stage !== "gate"} />
      {stage === "gate" && <GateScreen t={t} onEnter={() => setStage("transition")} />}
      {stage === "transition" && (
        <TransitionScreen onDone={() => setStage("name")} />
      )}
      {stage === "name" && (
        <NameGate
          t={t}
          onFound={(g) => {
            setGuest(g);
            setStage("invitation");
          }}
        />
      )}
      {stage === "invitation" && (
        <InvitationScreen t={t} onDiscover={() => setStage("celebrations")} />
      )}
      {stage === "celebrations" && guest && (
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
