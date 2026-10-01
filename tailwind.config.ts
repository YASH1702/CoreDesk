import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        wine: {
          DEFAULT: "#441417",
          hover: "#561B1F",
          dark: "#350E11",
          light: "#6A262B",
          glow: "rgba(68, 20, 23, 0.25)",
        },
        lemonade: {
          DEFAULT: "#F1EACD",
          light: "#FAF6EB",
          card: "#FAF6EB",
          border: "#DED6B8",
          dark: "#E4DCBD",
          soft: "#F8F4E2",
        },
        eighties: {
          DEFAULT: "#2F4364",
          hover: "#253652",
          light: "#415A84",
          dark: "#1D2B42",
          ice: "#91A6C3",
          shirt: "#B4C9DC",
        },
        warm: {
          bg: "#F1EACD",
          sec: "#EBE3C4",
          section: "#E5DCBE",
          card: "#FAF6EB",
          sidebar: "#EFE8CC",
        },
        dark: {
          bg: "#0B0E17",
          sec: "#111625",
          section: "#161C2E",
          card: "#1B2238",
          sidebar: "#0F1422",
        },
        gold: {
          primary: "#441417",
          hover: "#561B1F",
          dark: "#350E11",
          champagne: "#F1EACD",
          sand: "#DED6B8",
          cream: "#FAF6EB",
        },
        charcoal: {
          heading: "#2F4364",
          body: "#3E4D64",
          secondary: "#5C6E88",
          disabled: "#91A6C3",
        },
        border: {
          primary: "#DED6B8",
          secondary: "#EAE2C6",
          hover: "#441417",
          dark: "#27314A",
        },
        status: {
          success: "#5C9E6E",
          info: "#2F4364",
          warning: "#D89A2B",
          danger: "#441417",
        },
      },
      borderRadius: {
        "16": "16px",
        "28": "28px",
      },
      boxShadow: {
        "warm-lg": "0 25px 70px rgba(80, 65, 45, 0.10)",
        "warm-md": "0 10px 35px rgba(80, 65, 45, 0.08)",
        "warm-sm": "0 4px 15px rgba(80, 65, 45, 0.06)",
        "dark-lg": "0 25px 70px rgba(0, 0, 0, 0.45)",
        "dark-md": "0 10px 35px rgba(0, 0, 0, 0.35)",
        "glass-card": "0 20px 60px rgba(80, 65, 45, 0.08)",
        "gold-btn": "0 8px 25px rgba(198, 154, 75, 0.25)",
        "scene-depth": "0 40px 100px rgba(80, 65, 45, 0.12)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(180deg, #F8F7F3 0%, #F2EFE6 50%, #ECE6D8 100%)",
        "hero-gradient-dark": "linear-gradient(180deg, #0B0E17 0%, #111625 50%, #161C2E 100%)",
        "gold-gradient": "linear-gradient(135deg, #C69A4B 0%, #B7863D 100%)",
        "scene-business": "linear-gradient(135deg, #F8F7F3 0%, #F2EFE6 40%, #ECE6D8 100%)",
        "scene-customer": "linear-gradient(135deg, #FFFCF7 0%, #FFF8ED 40%, #F2EFE6 100%)",
        "scene-staff": "linear-gradient(135deg, #F2EFE6 0%, #ECE6D8 40%, #E8D7B2 100%)",
        "scene-control": "linear-gradient(135deg, #ECE6D8 0%, #E8D7B2 40%, #D9C7A0 100%)",
        "scene-system": "linear-gradient(135deg, #F8F7F3 0%, #ECE6D8 50%, #E8D7B2 100%)",
        "scene-platform": "linear-gradient(180deg, #F8F7F3 0%, #FFFCF7 100%)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "SF Pro Display", "system-ui", "sans-serif"],
      },
      // Motion tokens
      transitionDuration: {
        "fast": "200ms",
        "medium": "400ms",
        "slow": "700ms",
        "premium": "1200ms",
      },
      transitionTimingFunction: {
        "premium": "cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "cinematic": "cubic-bezier(0.77, 0, 0.175, 1)",
      },
      // Z-index scale for scene layering
      zIndex: {
        "scene-bg": "1",
        "scene-content": "10",
        "scene-ui": "20",
        "scene-typography": "30",
        "nav": "100",
        "nav-indicator": "90",
        "overlay": "200",
      },
      // Spacing tokens for scene compositions
      spacing: {
        "scene": "100vh",
        "scene-gap": "50vh",
      },
      // Typography scale for editorial headlines
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-lg": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "800" }],
        "display-md": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.08em", fontWeight: "700" }],
        "label-xs": ["0.625rem", { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};

export default config;
