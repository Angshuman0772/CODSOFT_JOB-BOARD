import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://89cbfc53f1922a09fa819573ef7b74a4@o4511902796939264.ingest.de.sentry.io/4511902871191632",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
  integrations: [Sentry.mongooseIntegration()],
});
