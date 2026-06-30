import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Source palette — cinematic monochrome (Afterglow-inspired)
        obsidian: "#0a0a0a",
        coal: "#121212",
        graphite: "#1c1c1c",
        ash: "#8b8b90",
        chalk: "#fafafa",
        // Semantic tokens (used across components)
        parchment: "#0a0a0a", // page background — near-black
        ink: "#f5f5f5", // primary text, headings
        muted: "#8b8b90", // secondary text
        line: "#262626", // subtle dark border
        accent: "#fafafa", // brand / interactive — chalk white
        accentHover: "#c4c4c4", // hover state — dimmed white
        accentSoft: "#161616", // elevated surface tint — chip bg, hero wash
        surface: "#121212", // cards, panels
        surfaceHover: "#1c1c1c", // card hover
        brand: "#2f8bff", // bright electric blue — buttons / primary actions
        brandHover: "#1b78f0", // deeper electric blue — button hover
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.3)", opacity: "0" },
          "100%": { transform: "scale(1.3)", opacity: "0" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        pulseRing: "pulseRing 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
