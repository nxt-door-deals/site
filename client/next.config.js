module.exports = {
  images: {
    domains: [
      "images.ctfassets.net",
      "nxt-door-deals.s3.ap-south-1.amazonaws.com",
      "nxt-door-deals-test.s3.ap-south-1.amazonaws.com",
      "68.183.94.49",
      "beta.nxtdoordeals.com",
      "nxtdoordeals.com",
      "ik.imagekit.io",
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
