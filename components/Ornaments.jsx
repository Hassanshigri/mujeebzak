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
