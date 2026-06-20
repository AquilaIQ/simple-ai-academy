import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8f9fa",
        foreground: "#191c1d",
        primary: {
          DEFAULT: "#006565",
          container: "#008080",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#a43c12",
          container: "#fe7e4f",
          foreground: "#ffffff",
        },
        tertiary: {
          DEFAULT: "#5e5a53",
          container: "#77726b",
          foreground: "#ffffff",
        },
        surface: {
          DEFAULT: "#f8f9fa",
          dim: "#d9dadb",
          bright: "#f8f9fa",
          "container-lowest": "#ffffff",
          "container-low": "#f3f4f5",
          "container": "#edeeef",
          "container-high": "#e7e8e9",
          "container-highest": "#e1e3e4",
        },
        "on-surface": {
          DEFAULT: "#191c1d",
          variant: "#3e4949",
        },
        outline: {
          DEFAULT: "#6e7979",
          variant: "#bdc9c8",
        },
        error: {
          DEFAULT: "#ba1a1a",
          foreground: "#ffffff",
          container: "#ffdad6",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0px 4px 20px rgba(0,0,0,0.04)",
        "card-hover": "0px 8px 32px rgba(0,0,0,0.08)",
      },
      spacing: {
        "stack-sm": "12px",
        "stack-md": "24px",
        "stack-lg": "48px",
        "gutter": "24px",
        "margin-mobile": "20px",
        "margin-desktop": "64px",
        "container-max": "1280px",
      },
      maxWidth: {
        "container-max": "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
