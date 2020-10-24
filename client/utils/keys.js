const env = process.env.NEXT_PUBLIC_ENV || "development";

const keys = {
    development: {
        API_PROXY: "http://localhost:8000/api/v1",
        FROM_EMAIL: "contact@nxtdoordeals.com",
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "6Ld-xtoZAAAAAB2FrlEY9pGNl69GlPEW_0YKYitH"
    },
    production: {
        API_PROXY: "https://api.nxtdoordeals.com/api/v1",
        FROM_EMAIL: "contact@nxtdoordeals.com",
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "6Ld-xtoZAAAAAB2FrlEY9pGNl69GlPEW_0YKYitH"
    }
}[env];

export default keys;