const env = process.env.NEXT_PUBLIC_ENV || "development";

const keys = {
  development: {
    API_PROXY: "http://localhost:8000/api/v1",
    FROM_EMAIL: "contact@nxtdoordeals.com",
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "6Ld-xtoZAAAAAB2FrlEY9pGNl69GlPEW_0YKYitH",
    SERVER: "localhost:3001",
    DEFAULT_IMAGE:
      "https://nxt-door-deals.s3.ap-south-1.amazonaws.com/site-images/default.png",
  },
  production: {
    API_PROXY: "https://api.nxtdoordeals.com/api/v1",
    FROM_EMAIL: "contact@nxtdoordeals.com",
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "6Ld-xtoZAAAAAB2FrlEY9pGNl69GlPEW_0YKYitH",
    SERVER: "68.183.94.49",
    DEFAULT_IMAGE:
      "https://nxt-door-deals.s3.ap-south-1.amazonaws.com/site-images/default.png",
  },
}[env];

export default keys;
