/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@sparky/config/tailwind")],
  theme: {
    extend: {
      gridTemplateColumns: {
        400: "repeat(auto-fit, minmax(25rem, 1fr))",
      },
    },
  },
};
