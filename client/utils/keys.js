const env = process.env.ENV || "development";

const keys = {
    development: {
        API_PROXY: "http://localhost:8000/api/v1",
        FROM_EMAIL: "contact@nxtdoordeals.com"
    },
    production: {
        API_PROXY: "https://api.nxtdoordeals.com/api/v1",
        FROM_EMAIL: "contact@nxtdoordeals.com"
    }
}[env];

export default keys;