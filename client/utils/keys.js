const env = process.env.NEXT_PUBLIC_ENV || "development";

const keys = {
  development: {
    API_PROXY: "http://localhost:8000/api/v1",
    WS_PROXY: "ws://localhost:8000/api/v1",
    FROM_EMAIL: "contact@nxtdoordeals.com",
    SERVER: "localhost:3001",
    ICON:
      "https://nxt-door-deals-test.s3.ap-south-1.amazonaws.com/site-images/icon.png",
    DEFAULT_IMAGE:
      "https://nxt-door-deals-test.s3.ap-south-1.amazonaws.com/site-images/default.png",
  },
  production: {
    API_PROXY: "http://api.nxtdoordeals.com/api/v1",
    WS_PROXY: "ws://api.nxtdoordeals.com/api/v1",
    FROM_EMAIL: "contact@nxtdoordeals.com",
    SERVER: "68.183.94.49",
    ICON:
      "https://nxt-door-deals.s3.ap-south-1.amazonaws.com/site-images/icon.png",
    DEFAULT_IMAGE:
      "https://nxt-door-deals.s3.ap-south-1.amazonaws.com/site-images/default.png",
  },
}[env];

export default keys;
