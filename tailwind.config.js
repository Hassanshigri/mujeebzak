/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Deep wine/burgundy + antique gold — matches the maroon-and-gold
        // tones on the client's printed cards. Token names kept as-is
        // (just repointed) so every existing bg-emerald/bg-moss/etc. class
        // across the components picks up the new hue automatically.
        ink:     "#1A0508",  // deepest background
        forest:  "#2E0B10",  // panel background
        emerald: "#4A121A",  // card / raised surface
        moss:    "#6E1B24",  // hover / accent surface
        gold:    "#C9A24B",  // primary metallic
        goldlt:  "#E7CE95",  // light gold for headings
        golddk:  "#8A6B23",  // hairlines
        cream:   "#F3EADA",  // body text
        muted:   "#C4AC96",  // secondary text
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "serif"],
        caps:    ["var(--font-caps)", "Cinzel", "serif"],
        arabic:  ["var(--font-arabic)", "Amiri", "serif"],
        urdu:    ["var(--font-urdu)", "Noto Nastaliq Urdu", "serif"],
      },
      letterSpacing: { widest2: "0.32em" },
      keyframes: {
        fadeUp:   { "0%": { opacity: 0, transform: "translateY(24px)" }, "100%": { opacity: 1, transform: "none" } },
        fadeIn:   { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        shimmer:  { "0%,100%": { opacity: 0.35 }, "50%": { opacity: 1 } },
        gateOpenL:{ "0%": { transform: "none" }, "100%": { transform: "translateX(-105%) rotateY(28deg)" } },
        gateOpenR:{ "0%": { transform: "none" }, "100%": { transform: "translateX(105%) rotateY(-28deg)" } },
      },
      animation: {
        fadeUp: "fadeUp 1s cubic-bezier(.2,.7,.3,1) both",
        fadeIn: "fadeIn 1.2s ease both",
        shimmer: "shimmer 3.5s ease-in-out infinite",
        gateOpenL: "gateOpenL 2.2s cubic-bezier(.6,.05,.2,1) forwards",
        gateOpenR: "gateOpenR 2.2s cubic-bezier(.6,.05,.2,1) forwards",
      },
    },
  },
  plugins: [],
};
