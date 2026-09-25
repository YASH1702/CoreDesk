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
        warm: {
          bg: "#F8F7F3",
          sec: "#F2EFE6",
          section: "#ECE6D8",
          card: "#FFFCF7",
          sidebar: "#F3EFE7",
        },
        dark: {
          bg: "#0B0E17",
          sec: "#111625",
          section: "#161C2E",
          card: "#1B2238",
          sidebar: "#0F1422",
        },
        gold: {
          primary: "#C69A4B",
          hover: "#B7863D",
          dark: "#8F6B2F",
          champagne: "#E8D7B2",
          sand: "#D9C7A0",
          cream: "#FFF8ED",
        },
        charcoal: {
          heading: "#2A2927",
          body: "#5D5A56",
          secondary: "#8B857D",
          disabled: "#B8B2A8",
        },
        border: {
          primary: "#DDD6C9",
          secondary: "#ECE6D8",
          hover: "#D6C6A5",
          dark: "#27314A",
        },
        status: {
          success: "#5C9E6E",
          info: "#5B8DEF",
          warning: "#D89A2B",
          danger: "#D96459",
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
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(180deg, #F8F7F3 0%, #F2EFE6 50%, #ECE6D8 100%)",
        "hero-gradient-dark": "linear-gradient(180deg, #0B0E17 0%, #111625 50%, #161C2E 100%)",
        "gold-gradient": "linear-gradient(135deg, #C69A4B 0%, #B7863D 100%)",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "SF Pro Display", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
