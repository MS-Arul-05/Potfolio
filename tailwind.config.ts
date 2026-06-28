import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Source palette
        spaceIndigo: "#22223b",
        dustyGrape: "#4a4e69",
        lilacAsh: "#9a8c98",
        almondSilk: "#c9ada7",
        parchment: "#f2e9e4",
        // Semantic tokens (used across components)
        ink: "#22223b", // Space Indigo — primary text, headings, buttons, links
        muted: "#4a4e69", // Dusty Grape — secondary text
        line: "#e4d9d2", // warm border on parchment
        accent: "#22223b", // Space Indigo — brand / interactive
        accentHover: "#4a4e69", // Dusty Grape — hover state
        accentSoft: "#ece6ee", // soft lilac tint — chip backgrounds, hero wash
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
