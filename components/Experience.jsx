"use client";
import { useEffect, useState } from "react";
import { t as strings } from "@/data/i18n";
import GateScreen from "./GateScreen";
import InvitationScreen from "./InvitationScreen";
import Controls from "./Controls";

export default function Experience() {
  const [stage, setStage] = useState("gate"); // gate | invitation
  const t = strings.en;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [stage]);

  return (
    <main>
      <Controls t={t} playMusic={stage !== "gate"} />
      {stage === "gate" && <GateScreen t={t} onEnter={() => setStage("invitation")} />}
      {stage === "invitation" && <InvitationScreen t={t} />}
    </main>
  );
}
