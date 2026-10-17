/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    transparent: "transparent",
    current: "currentColor",
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          50: "#f1f7f4",
          100: "#dcebe3",
          200: "#b7d4c6",
          300: "#86b5a0",
          400: "#4f8f74",
          500: "#2f6e56",
          600: "#1f5341",
          700: "#173f32",
          800: "#102c23",
          900: "#0c1f19",
          950: "#071410",
        },
        surface: {
          50: "#f4f6f5",
          100: "#e7ece9",
          200: "#d5ddd8",
          300: "#b7c3bc",
          400: "#8b9b93",
          500: "#6a7a72",
          600: "#516159",
          700: "#3a4640",
          800: "#242c29",
          900: "#141a17",
        },
        tremor: {
          brand: {
            faint: "#f1f7f4",
            muted: "#b7d4c6",
            subtle: "#4f8f74",
            DEFAULT: "#1f5341",
            emphasis: "#102c23",
            inverted: colors.white,
          },
          background: {
            muted: colors.gray[50],
            subtle: colors.gray[100],
            DEFAULT: colors.white,
            emphasis: colors.gray[700],
          },
          border: { DEFAULT: colors.gray[200] },
          ring: { DEFAULT: colors.gray[200] },
          content: {
            subtle: colors.gray[400],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[700],
            strong: colors.gray[900],
            inverted: colors.white,
          },
        },
        "dark-tremor": {
          brand: {
            faint: "#071410",
            muted: "#0c1f19",
            subtle: "#1f5341",
            DEFAULT: "#4f8f74",
            emphasis: "#b7d4c6",
            inverted: "#071410",
          },
          background: {
            muted: "#131A2B",
            subtle: colors.gray[800],
            DEFAULT: colors.gray[900],
            emphasis: colors.gray[300],
          },
          border: { DEFAULT: colors.gray[800] },
          ring: { DEFAULT: colors.gray[800] },
          content: {
            subtle: colors.gray[600],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950],
          },
        },
      },
      fontFamily: {
        sans: ["Figtree", "system-ui", "-apple-system", "sans-serif"],
        display: ["Sora", "Figtree", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.55rem",
        "2xl": "0.7rem",
        "3xl": "0.95rem",
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)",
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      keyframes: {
        "login-rise": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "sheet-up": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-up-desktop": {
          "0%": { opacity: "0", transform: "translateY(18px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "ambient-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(18px, -22px) scale(1.06)" },
        },
        "ambient-drift-alt": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-20px, 14px) scale(1.05)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "success-pop": {
          "0%": { opacity: "0", transform: "scale(0.92) translateY(6px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "fab-in": {
          "0%": { opacity: "0", transform: "scale(0.85) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "nav-dot": {
          "0%": { transform: "scaleX(0.4)", opacity: "0" },
          "100%": { transform: "scaleX(1)", opacity: "1" },
        },
      },
      animation: {
        "login-rise": "login-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "login-rise-delayed": "login-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both",
        "login-rise-late": "login-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both",
        "fade-in": "fade-in 0.25s ease-out both",
        "scale-in": "scale-in 0.28s cubic-bezier(0.22, 1, 0.36, 1) both",
        "sheet-up": "sheet-up 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
        "sheet-up-desktop": "sheet-up-desktop 0.32s cubic-bezier(0.22, 1, 0.36, 1) both",
        "ambient-drift": "ambient-drift 18s ease-in-out infinite",
        "ambient-drift-alt": "ambient-drift-alt 22s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
        "success-pop": "success-pop 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fab-in": "fab-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
        "nav-dot": "nav-dot 0.25s ease-out both",
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "data-[selected]"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "data-[selected]"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "data-[selected]"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [],
};

/* set favicon */ const icon = require("./public/favicon-125x125.svg")