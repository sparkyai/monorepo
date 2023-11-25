// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { env } from "@sparky/env";

Sentry.init({
  dsn: "https://2e0c3780faabd6bc4ebe089b8afebb1a@o4505285422415872.ingest.sentry.io/4506185188376576",

  enabled: env("NODE_ENV") === "production",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
