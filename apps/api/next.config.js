const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  {
    async redirects() {
      return [
        {
          source: "/v1/:path*",
          permanent: false,
          destination: `${process.env.TOOL_URL}/api/v1/:path*`,
        },
        {
          source: "/categories",
          permanent: false,
          destination: `${process.env.TOOL_URL}/api/categories`,
        },
        {
          source: "/templates/:path*",
          permanent: false,
          destination: `${process.env.TOOL_URL}/api/templates/:path*`,
        },
      ];
    },

    reactStrictMode: true,
  },
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "sparky-ai",
    project: "api",
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
