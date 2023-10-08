/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@sparky/config/tailwind")],

  theme: {
    extend: {
      keyframes: {
        "bounce-1": {
          "0%, 100%": {
            transform: "translateY(-25%)",
            // "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(0)",
            // "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "bounce-2": {
          "33%": {
            transform: "translateY(-25%)",
            // "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "83%": {
            transform: "translateY(0)",
            // "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "bounce-3": {
          "50%": {
            transform: "translateY(-25%)",
            // "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "0%, 100%": {
            transform: "translateY(0)",
            // "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "bounce-4": {
          "83%": {
            transform: "translateY(-25%)",
            // "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "33%": {
            transform: "translateY(0)",
            // "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
    },
  },
};
