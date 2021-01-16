module.exports = {
  images: {
    domains: [
      "nxt-door-deals.s3.ap-south-1.amazonaws.com",
      "nxt-door-deals-test.s3.ap-south-1.amazonaws.com",
      "68.183.94.49",
    ],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
