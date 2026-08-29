"use client";

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
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span
        className="absolute inset-0 border border-gold/55"
        style={{ transform: "rotate(45deg)" }}
      />
      <span
        className="absolute inset-[7px] border border-gold/25"
        style={{ transform: "rotate(45deg)" }}
      />
      <span className="font-caps text-goldlt tracking-[0.15em]" style={{ fontSize: size * 0.26 }}>
        {initials}
      </span>
    </div>
  );
}

export function Arch({ className = "" }) {
  return (
    <svg viewBox="0 0 200 260" className={className} fill="none" aria-hidden>
      <path
        d="M20 258V110C20 60 55 22 100 22s80 38 80 88v148"
        stroke="rgba(201,162,75,.35)"
        strokeWidth="1.2"
      />
      <path
        d="M34 258V112c0-42 30-76 66-76s66 34 66 76v146"
        stroke="rgba(201,162,75,.18)"
        strokeWidth="1"
      />
    </svg>
  );
}
