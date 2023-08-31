module.exports = {
  extends: [
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
    "./react",
  ].map(require.resolve),
};
