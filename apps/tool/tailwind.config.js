/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@sparky/config/tailwind")],
  theme: {
    extend: {
      gridTemplateColumns: {
        400: "repeat(auto-fill, minmax(25rem, 1fr))",
      },
    },
  },
};
