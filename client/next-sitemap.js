module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SERVER || "https://nxtdoordeals.com",
  generateRobotsTxt: true,
  exclude: ["/404", "/verifyemail", "/alreadyloggedin", "/goodbye", "/logout"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: [
          "/404",
          "/verifyemail",
          "/alreadyloggedin",
          "/goodbye",
          "/logout",
        ],
      },
    ],
    additionalSitemaps: [process.env.NEXT_PUBLIC_SERVER + "/sitemap.xml"],
  },
};
