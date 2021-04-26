const env = process.env.NEXT_PUBLIC_ENV || "development";

const keys = {
  development: {
    API_PROXY: "http://localhost:8000/api/v1",
    WS_PROXY: "ws://localhost:8000",
    FROM_EMAIL: "contact@nxtdoordeals.com",
    DOMAIN: "",
    SERVER: "http://localhost:3001",
    SECURE_COOKIE: false,
    SAME_SITE_COOKIE_SETTING: "Lax",
    ICON:
      "https://nxt-door-deals-test.s3.ap-south-1.amazonaws.com/site-images/icon.png",
    DEFAULT_IMAGE:
      "https://nxt-door-deals-test.s3.ap-south-1.amazonaws.com/site-images/default.png",
    AD_QUOTA: 7,
  },
  production: {
    API_PROXY: "https://api.nxtdoordeals.com/api/v1",
    WS_PROXY: "wss://api.nxtdoordeals.com",
    FROM_EMAIL: "contact@nxtdoordeals.com",
    DOMAIN: ".nxtdoordeals.com",
    SERVER: "https://beta.nxtdoordeals.com",
    SECURE_COOKIE: true,
    SAME_SITE_COOKIE_SETTING: "Strict",
    ICON:
      "https://nxt-door-deals.s3.ap-south-1.amazonaws.com/site-images/icon.png",
    DEFAULT_IMAGE:
      "https://nxt-door-deals.s3.ap-south-1.amazonaws.com/site-images/default.png",
    AD_QUOTA: 7,
  },
}[env];

export default keys;
