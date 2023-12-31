const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
  ],
  parserOptions: {
    project,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
    "import/extensions": [".ts", ".js", ".tsx", ".jsx"],
  },
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
  },
};
