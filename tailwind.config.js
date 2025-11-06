module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "backgroundbackground-0": "var(--backgroundbackground-0)",
        "backgroundbackground-2": "var(--backgroundbackground-2)",
        "neutralneutral-0": "var(--neutralneutral-0)",
        "neutralneutral-1": "var(--neutralneutral-1)",
        "primaryprimary-2": "var(--primaryprimary-2)",
        "tertiarytertiary-0": "var(--tertiarytertiary-0)",
        "textinverse-text": "var(--textinverse-text)",
        "textprimary-text": "var(--textprimary-text)",
        "textsecondary-text": "var(--textsecondary-text)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "bold-title-medium": "var(--bold-title-medium-font-family)",
        "medium-body-large": "var(--medium-body-large-font-family)",
        "medium-body-small": "var(--medium-body-small-font-family)",
        "medium-heading-small": "var(--medium-heading-small-font-family)",
        "regular-title-large": "var(--regular-title-large-font-family)",
        "semi-bold-display-large": "var(--semi-bold-display-large-font-family)",
        "semi-bold-display-medium":
          "var(--semi-bold-display-medium-font-family)",
        "semi-bold-heading-large": "var(--semi-bold-heading-large-font-family)",
        "semi-bold-title-large": "var(--semi-bold-title-large-font-family)",
        "semi-bold-title-medium": "var(--semi-bold-title-medium-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
