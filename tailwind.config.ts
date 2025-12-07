import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "instagram-gradient":
          "url('/placeholder/instagram-gradient-small.jpg')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        red: "#DC3545",
        blue: {
          100: "#529AD6",
          200: "#0D6EFD",
          300: "#3B6E97",
          400: "#0F6AFB",
        },
        orange: {
          100: "#FF6A6A",
          200: "#FF783E",
        },
        dark: {
          100: "#495057",
          200: "#212529",
          300: "#6C757D",
          400: "#1E1E1E",
          500: "#303030",
        },
        shade: {
          100: "#F8F9FA",
          200: "#F1F3F5",
          300: "#CED4DA",
          400: "#DEE2E6",
          500: "#DCDFE2",
          600: "#90979D",
          700: "#9AA4AC",
        },
        green: {
          100: "#06C755",
        },
        yellow: {
          100: "#FDDB5E",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        open: ["var(--font-opensans)"],
        noto: ["var(--font-notosans)"],
        zenkaku: ["var(--font-zenkaku)"],
      },
      fontSize: {
        xxs: [".75rem", "1.125rem"],
        xs: [".875rem", "1.3125rem"],
      },
      boxShadow: {
        button: "0px 4px 4px 0px #00000040",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
