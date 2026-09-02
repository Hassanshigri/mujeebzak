/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Mehroon (maroon) + beige — the page itself is a rich maroon, cards
        // are warm cardstock beige (like the client's printed invitations).
        ink:     "#2B0810",  // near-black maroon — dark text on beige, deep shadows
        maroon:  "#5C1120",  // primary page background
        maroondk:"#3A0A15",  // deeper maroon for gradients
        beige:   "#F3E7CC",  // cardstock panel background
        beigedk: "#E2CE9F",  // deeper beige — borders/hover on beige surfaces
        gold:    "#C9A24B",  // primary metallic accent
        goldlt:  "#E7CE95",  // light gold — headings on maroon
        golddk:  "#8A6B23",  // deeper gold — text/accents on beige (better contrast)
        cream:   "#F6EFE0",  // light text on maroon
        muted:   "#D9C3AE",  // secondary text on maroon
        mutedDk: "#7A5F49",  // secondary text on beige
        // Legacy aliases so any leftover bg-forest/bg-emerald/bg-moss keep working
        forest:  "#3A0A15",
        emerald: "#5C1120",
        moss:    "#7A1B2C",
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
        // Frosted-glass materialize: panel "condenses" into focus, like an
        // iOS sheet/card appearing — blur + scale settle into place.
        glassIn: {
          "0%":   { opacity: 0, filter: "blur(16px)", transform: "translateY(28px) scale(0.94)" },
          "60%":  { filter: "blur(2px)" },
          "100%": { opacity: 1, filter: "blur(0)", transform: "none" },
        },
      },
      animation: {
        fadeUp: "fadeUp 1s cubic-bezier(.2,.7,.3,1) both",
        fadeIn: "fadeIn 1.2s ease both",
        shimmer: "shimmer 3.5s ease-in-out infinite",
        glassIn: "glassIn 1.1s cubic-bezier(.2,.7,.3,1) both",
      },
    },
  },
  plugins: [],
};
