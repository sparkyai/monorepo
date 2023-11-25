const { withSentryConfig } = require("@sentry/nextjs");
const env = require("@sparky/env").env;
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: env.boolean("ANALYZE") && env("NODE_ENV") === "production",
  openAnalyzer: false,
});

module.exports = withSentryConfig(
  withBundleAnalyzer({
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**.amazonaws.com",
        },
      ],
      minimumCacheTTL: 604800,
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      contentDispositionType: "attachment",
    },
    experimental: {
      serverActions: true,
    },
    reactStrictMode: true,
  }),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "sparky-ai",
    project: "www",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
