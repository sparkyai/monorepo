module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("eslint-config-turbo"),
    require.resolve("./react"),
  ],
};
