const { withSentryConfig } = require("@sentry/nextjs");
const { env } = require("@sparky/env");

module.exports = withSentryConfig(
  {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**.amazonaws.com",
        },
      ],
    },
    experimental: {
      serverActions: true,
    },
    reactStrictMode: true,
  },
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: env("SENTRY_ORG", ""),
    project: env("SENTRY_PROJECT", ""),
    authToken: env("SENTRY_AUTH_TOKEN", ""),
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
