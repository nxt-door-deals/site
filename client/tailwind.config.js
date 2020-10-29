module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        axiforma: ["Axiforma"],
        gotham: ["Gothan Pro"],
        fontAwesome: ["FontAwesome"],
      },
      boxShadow: {
        buttonshadow: "0px 8px 15px rgba(270, 90, 56, 0.15)",
        boxshadowlogin: "0px -5px 8px 2px rgba(207, 139, 207, 0.2)",
        navshadow: "0px 1px 5px rgba(255, 0, 255, 0.3)",
        altNavShadow: "0px 1px 5px rgba(48, 136, 237, 0.36)",
        boxshadowregister: "0px -5px 8px 2px rgba(151, 201, 251, 0.2)",
        boxshadowemail: "0px -5px 8px 2px rgba(76, 150, 224, 0.15)",
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
      inset: {
        100: "100%",
        50: "50%",
      },
      opacity: {
        90: "0.9",
        93: "0.93",
        95: "0.95",
        98: "0.98",
      },
      colors: {
        "brand-purple": "#550052",
        "brand-gray": "#292d34",
        "footer-gradient-from": "#834d9b",
        "footer-gradient-to": "#d04ed6",
      },
      screens: {
        tablet: "1366",
        xxl: "1500",
      },
      minWidth: {
        "1/2": "50%",
      },
      spacing: {
        28: "7rem",
      },
      width: {
        80: "20rem",
        100: "25rem",
        128: "32rem",
      },
      height: {
        80: "20rem",
        100: "25rem",
        128: "32rem",
      },
      backgroundImage: (theme) => ({
        "login-background": "url(/images/login/background.svg)",
        "user-registration-background":
          "url(/images/user_registration/user-registration.svg)",
        "email-verification-background":
          "url(/images/email/email-verification.svg)",
        "forgot-password-background":
          "url(/images/forgotpassword/fp-background.svg)",
        "howitworks-background":
          "url(/images/howitworks/howitworks-bg.svg)"
      }),
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
