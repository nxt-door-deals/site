module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        axiforma: ["Axiforma"],
        fontAwesome: ["FontAwesome"],
      },
      boxShadow: {
        buttonshadow: "0px 8px 15px rgba(270, 90, 56, 0.15)",
        boxshadowlogin: "0px -5px 8px 2px rgba(207, 139, 207, 0.2)",
        navshadow: "0px 1px 5px rgba(255, 0, 255, 0.3)",
        altNavShadow: "0px 1px 5px rgba(48, 136, 237, 0.36)",
        boxshadowregister: "1px 5px 8px 3px rgba(151, 201, 251, 0.2)",
        boxshadowemail: "0px -5px 8px 2px rgba(76, 150, 224, 0.15)",
        categorycardshadow:
          "0 20px 25px -5px rgba(102, 21, 182, 0.1), 0 10px 10px -5px rgba(102, 21, 182, 0.1)",
        postadshadow: "0px 5px 8px 2px rgba(196, 148, 244, 0.3)",
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
        "alt-footer-gradient-from": "#457fca",
        "alt-footer-gradient-to": "#5691c8",
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
        88: "22rem",
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
        "howitworks-background": "url(/images/howitworks/howitworks-bg.svg)",
        "postad-background": "url(/images/postad/bg-postad.svg)",
        "postad-background-mobile": "url(/images/postad/bg-postad-mobile.svg)",
        "create-neighbourhood-background":
          "url(/images/neighbourhood/bg-create-neighbourhood.svg)",
        "create-neighbourhood-background-mobile":
          "url(/images/neighbourhood/bg-create-neighbourhood-mobile.svg)",
      }),
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      keyframes: {
        bouncingBalls: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-8px)" },
        },
        flippingSquares: {
          "0%": { transform: "rotateX(0) rotateY(0)" },
          "25%": { transform: "rotateX(0) rotateY(180deg)" },
          "50%": { transform: "rotateX(180deg) rotateY(180deg)" },
          "75%": { transform: "rotateX(180deg) rotateY(0)" },
          "100%": { transform: "rotateX(0) rotateY(0)" },
        },
      },
      animation: {
        bouncingBalls1:
          "bouncingBalls 0.5s cubic-bezier(.19,.57,.3,.98) infinite alternate",
        bouncingBalls2:
          "bouncingBalls 0.5s cubic-bezier(.19,.57,.3,.98) 0.1s infinite alternate",
        bouncingBalls3:
          "bouncingBalls 0.5s cubic-bezier(.19,.57,.3,.98) 0.2s infinite alternate",
        bouncingBalls4:
          "bouncingBalls 0.5s cubic-bezier(.19,.57,.3,.98) 0.3s infinite alternate",
        flippingSquares1: "flippingSquares 2s linear infinite",
        flippingSquares2: "flippingSquares 2s 1s linear infinite",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
      fontSize: {
        tiny: ".8rem",
      },
    },
  },
  variants: {
    ringColor: ["focus"],
    ringWidth: ["focus"],
    textColor: ["focus-within"],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
