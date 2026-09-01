"use client";
import Image from "next/image";

export function Divider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-gold/50" />
      <span className="text-gold/70 text-[10px] rotate-45 leading-none">◆</span>
      <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}

export function Monogram({ initials, size = 96 }) {
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <Image
        src="/images/monogram.png"
        alt={initials ? `${initials} monogram` : ""}
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </div>
  );
}
