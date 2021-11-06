const env = process.env.NEXT_PUBLIC_ENV || "development";

const keys = {
  development: {
    API_PROXY: process.env.NEXT_PUBLIC_API_URL,
    WS_PROXY: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
    FROM_EMAIL: "contact@nxtdoordeals.com",
    DOMAIN: process.env.DOMAIN,
    SERVER: process.env.NEXT_PUBLIC_SERVER,
    SECURE_COOKIE: false,
    SAME_SITE_COOKIE_SETTING: "Lax",
    ICON: "https://ik.imagekit.io/nxtdoordeals/nddtest/site-images/icon.png",
    DEFAULT_IMAGE:
      "https://ik.imagekit.io/nxtdoordeals/nddtest/site-images/default.png",
    AD_QUOTA: 5,
  },
  production: {
    API_PROXY: process.env.NEXT_PUBLIC_API_URL,
    WS_PROXY: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
    FROM_EMAIL: "contact@nxtdoordeals.com",
    DOMAIN: process.env.DOMAIN,
    SERVER: process.env.NEXT_PUBLIC_SERVER,
    SECURE_COOKIE: true,
    SAME_SITE_COOKIE_SETTING: "Strict",
    ICON: "https://ik.imagekit.io/nxtdoordeals/ndd/site-images/icon.png",
    DEFAULT_IMAGE:
      "https://ik.imagekit.io/nxtdoordeals/ndd/site-images/default.png",
    AD_QUOTA: 5,
  },
}[env];

export default keys;
