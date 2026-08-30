"use client";
import { useEffect } from "react";
import Image from "next/image";
import { backgrounds } from "@/data/wedding.config";

export default function TransitionScreen({ onDone }) {
  useEffect(() => {
    const id = setTimeout(onDone, 1500);
    return () => clearTimeout(id);
  }, [onDone]);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden animate-fadeIn">
      <Image
        src={backgrounds.transition}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/45" />
    </section>
  );
}
