const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  images: {
    domains: [
      "images.ctfassets.net",
      "nxt-door-deals.s3.ap-south-1.amazonaws.com",
      "nxt-door-deals-test.s3.ap-south-1.amazonaws.com",
      "ik.imagekit.io",
      "nxt-door-deals-common.s3.ap-south-1.amazonaws.com",
    ],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    // if (!isServer) {
    //   config.node = {
    //     fs: "empty",
    //   };
    // }

    if (!isServer) config.resolve.fallback.fs = false;

    return config;
  },
};

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
