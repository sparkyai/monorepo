/** @type {import("next").NextConfig} */
module.exports = {
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
};
