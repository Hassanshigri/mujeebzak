"use client";

// One layered-wing SVG butterfly, reused with different palettes/sizes.
// Wings are a single group so the CSS wing-flap (scaleX) animation flaps
// both sides together, the way a real butterfly's wingbeat reads.
function Butterfly({ primary, secondary, vein, size, style, flapDelay }) {
  return (
    <div className="butterfly" style={style} aria-hidden>
      <svg width={size} height={size * 0.8} viewBox="0 0 100 80">
        <g className="butterfly-wings" style={{ animationDelay: flapDelay }}>
          {/* left upper */}
          <path
            d="M48 38 C30 6, 4 4, 4 26 C4 44, 26 46, 48 40 Z"
            fill={primary}
          />
          <path
            d="M48 38 C34 16, 14 14, 12 26 C10 38, 28 40, 48 38 Z"
            fill={secondary}
            opacity="0.55"
          />
          <path d="M46 24 L14 20 M44 30 L12 30" stroke={vein} strokeWidth="0.7" opacity="0.5" fill="none" />
          {/* left lower */}
          <path
            d="M48 42 C34 54, 18 62, 14 52 C10 44, 26 40, 48 40 Z"
            fill={primary}
            opacity="0.92"
          />
          {/* right upper (mirrored) */}
          <path
            d="M52 38 C70 6, 96 4, 96 26 C96 44, 74 46, 52 40 Z"
            fill={primary}
          />
          <path
            d="M52 38 C66 16, 86 14, 88 26 C90 38, 72 40, 52 38 Z"
            fill={secondary}
            opacity="0.55"
          />
          <path d="M54 24 L86 20 M56 30 L88 30" stroke={vein} strokeWidth="0.7" opacity="0.5" fill="none" />
          {/* right lower */}
          <path
            d="M52 42 C66 54, 82 62, 86 52 C90 44, 74 40, 52 40 Z"
            fill={primary}
            opacity="0.92"
          />
        </g>
        {/* body + antennae, drawn last so they sit still while wings flap */}
        <path d="M50 14 C47 10, 45 7, 46 4 M50 14 C53 10, 55 7, 54 4" stroke={vein} strokeWidth="1" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="40" rx="2.6" ry="24" fill={vein} />
      </svg>
    </div>
  );
}

// Fixed configs (not randomized) so server/client render identically —
// six realistic-ish butterflies on distinct wandering flight paths.
const CONFIGS = [
  { animation: "flutter1", duration: "7.5s", delay: "0s",    size: 46, primary: "#C9A24B", secondary: "#F6EFE0", vein: "#5C1120" },
  { animation: "flutter2", duration: "8.4s", delay: "0.4s",  size: 38, primary: "#E7CE95", secondary: "#8A6B23", vein: "#3A0A15" },
  { animation: "flutter3", duration: "6.8s", delay: "0.9s",  size: 52, primary: "#D98C3D", secondary: "#2B0810", vein: "#2B0810" },
  { animation: "flutter4", duration: "9.2s", delay: "0.2s",  size: 34, primary: "#C9A24B", secondary: "#5C1120", vein: "#3A0A15" },
  { animation: "flutter5", duration: "7.1s", delay: "1.1s",  size: 42, primary: "#F6EFE0", secondary: "#C9A24B", vein: "#5C1120" },
  { animation: "flutter6", duration: "8.8s", delay: "0.6s",  size: 30, primary: "#E7CE95", secondary: "#D98C3D", vein: "#2B0810" },
];

export default function Butterflies() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {CONFIGS.map((c, i) => (
        <Butterfly
          key={i}
          primary={c.primary}
          secondary={c.secondary}
          vein={c.vein}
          size={c.size}
          flapDelay={c.delay}
          style={{
            left: 0,
            top: 0,
            animation: `${c.animation} ${c.duration} ease-in-out ${c.delay} 1 both`,
          }}
        />
      ))}
    </div>
  );
}
