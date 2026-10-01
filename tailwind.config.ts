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
        chocolate: {
          DEFAULT: "#37261A",
          hover: "#493323",
          dark: "#2A1D14",
          light: "#5A402D",
          glow: "rgba(55, 38, 26, 0.25)",
        },
        marlborough: {
          DEFAULT: "#8AA2BA",
          hover: "#7891A9",
          light: "#A4B8CC",
          dark: "#5E7790",
          glow: "rgba(138, 162, 186, 0.25)",
        },
        khadi: {
          DEFAULT: "#DED9D0",
          light: "#F5F2EB",
          card: "#F5F2EB",
          border: "#C8C1B4",
          dark: "#CCC5BA",
          soft: "#FAF8F5",
        },
        blackout: {
          DEFAULT: "#1E1E1E",
          soft: "#2A2A2A",
          deep: "#141414",
        },
        bronco: {
          DEFAULT: "#AAA194",
          hover: "#999083",
          light: "#C2BCB2",
          dark: "#7A7165",
        },
        wine: {
          DEFAULT: "#37261A",
          hover: "#493323",
          dark: "#2A1D14",
          light: "#5A402D",
          glow: "rgba(55, 38, 26, 0.25)",
        },
        lemonade: {
          DEFAULT: "#DED9D0",
          light: "#F5F2EB",
          card: "#F5F2EB",
          border: "#C8C1B4",
          dark: "#CCC5BA",
          soft: "#FAF8F5",
        },
        eighties: {
          DEFAULT: "#8AA2BA",
          hover: "#7891A9",
          light: "#A4B8CC",
          dark: "#1E1E1E",
          ice: "#B4C7D8",
          shirt: "#8AA2BA",
        },
        warm: {
          bg: "#DED9D0",
          sec: "#E6E2D9",
          section: "#D5CFBF",
          card: "#F5F2EB",
          sidebar: "#EAE6DD",
        },
        dark: {
          bg: "#141414",
          sec: "#1E1E1E",
          section: "#2A2A2A",
          card: "#242424",
          sidebar: "#1A1A1A",
        },
        gold: {
          primary: "#37261A",
          hover: "#493323",
          dark: "#2A1D14",
          champagne: "#DED9D0",
          sand: "#C8C1B4",
          cream: "#F5F2EB",
        },
        charcoal: {
          heading: "#1E1E1E",
          body: "#4A443B",
          secondary: "#7A7165",
          disabled: "#AAA194",
        },
        border: {
          primary: "#C8C1B4",
          secondary: "#DED9D0",
          hover: "#37261A",
          dark: "#2A2A2A",
        },
        status: {
          success: "#5C9E6E",
          info: "#8AA2BA",
          warning: "#D89A2B",
          danger: "#37261A",
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
