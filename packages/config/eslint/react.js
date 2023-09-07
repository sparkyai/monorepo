module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("./library"),
  ],
  ignorePatterns: [".eslintrc.js", "**/*.css"],
  // add rules configurations here
  rules: {
    "import/no-default-export": "off",
    "react/jsx-no-leaked-render": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
