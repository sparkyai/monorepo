const defaultTheme = require("tailwindcss/defaultTheme");

const screens = defaultTheme.screens;
screens["2xl"] = "1440px";

function fontSize(size, height, letter) {
  function toFixed(value) {
    return value.toFixed(4).replace(/\.?0+$/, "");
  }

  const lineHeight = toFixed(height / size);

  return [`${toFixed(size / 16)}rem`, letter ? { lineHeight, letterSpacing: `${letter}em` } : lineHeight];
}

/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@sparky/config/tailwind")],

  theme: {
    screens,
    container: {
      center: true,
      padding: "1.25rem",
    },

    colors: {
      red: {
        25: "#FFFBFA",
        50: "#FEF3F2",
        100: "#FEE4E2",
        200: "#FECDCA",
        300: "#FDA29B",
        400: "#F97066",
        500: "#F04438",
        600: "#D92D20",
        700: "#B42318",
        800: "#912018",
        900: "#7A271A",
      },
      gray: {
        25: "#E4E4E4",
        50: "#C9C9C9",
        100: "#AEAEAE",
        200: "#939393",
        300: "#5D5D5D",
        400: "#424242",
        500: "#272727",
        600: "#222222",
        700: "#1D1D1D",
        800: "#181818",
        900: "#1E1E1E",
      },
      blue: {
        25: "#F9FAFF",
        50: "#E7EDFD",
        100: "#CED9FB",
        200: "#9DB4F6",
        300: "#6C8EF2",
        400: "#3B69ED",
        500: "#0A43E9",
        600: "#0832AF",
        700: "#052275",
        800: "#03113A",
        900: "#010717",
      },
      green: {
        25: "#F6FEF9",
        50: "#ECFDF3",
        100: "#D1FADF",
        200: "#A6F4C5",
        300: "#6CE9A6",
        400: "#32D583",
        500: "#12B76A",
        600: "#039855",
        700: "#027A48",
        800: "#05603A",
        900: "#054F31",
      },
      yellow: {
        25: "#FFFCF5",
        50: "#FFFAEB",
        100: "#FEF0C7",
        200: "#FEDF89",
        300: "#FEC84B",
        400: "#FDB022",
        500: "#F79009",
        600: "#DC6803",
        700: "#B54708",
        800: "#93370D",
        900: "#7A2E0E",
      },
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
    },

    fontSize: {
      xs: fontSize(12, 20),
      sm: fontSize(14, 20),
      md: fontSize(16, 20),
      lg: fontSize(18, 28),
      xl: fontSize(20, 30),
      "2xl": fontSize(24, 32),
      "3xl": fontSize(28, 34),
      "4xl": fontSize(36, 44, -0.01),
      "5xl": fontSize(42, 50, -0.02),
      "6xl": fontSize(48, 58, -0.03),
      "7xl": fontSize(60, 72),
    },

    borderRadius: {
      none: "0",
      sm: "0.5rem",
      md: "0.625rem",
      lg: "1rem",
      xl: "1.25rem",
      full: "9999rem",
    },

    extend: {
      typography({ theme }) {
        return {
          legal: {
            css: {
              "--tw-prose-body": theme("colors.blue[50]"),
              "--tw-prose-headings": theme("colors.blue[50]"),
              // "--tw-prose-lead": colors.neutral[600],
              "--tw-prose-links": theme("colors.blue[400]"),
              "--tw-prose-bold": theme("colors.blue[50]"),
              "--tw-prose-counters": theme("colors.blue[50]"),
              "--tw-prose-bullets": theme("colors.blue[50]"),
              // "--tw-prose-hr": colors.neutral[200],
              // "--tw-prose-quotes": colors.neutral[900],
              // "--tw-prose-quote-borders": colors.neutral[200],
              // "--tw-prose-captions": colors.neutral[500],
              // "--tw-prose-code": colors.neutral[900],
              // "--tw-prose-pre-code": colors.neutral[200],
              // "--tw-prose-pre-bg": colors.neutral[800],
              // "--tw-prose-th-borders": colors.neutral[300],
              // "--tw-prose-td-borders": colors.neutral[200],

              h1: {
                fontWeight: theme("fontWeight.semibold"),
              },

              "h2, h3, h4, h5, h6": {
                fontWeight: theme("fontWeight.medium"),
              },

              a: {
                textDecoration: "none",

                "&:hover": {
                  textDecoration: "underline",
                },
              },
            },
          },
        };
      },
    },
  },

  plugins: [require("tailwindcss-radix")(), require("@tailwindcss/typography")],
};
