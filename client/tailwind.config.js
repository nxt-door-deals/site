module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.js", "./components/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        axiforma: ["Axiforma", "sans", "Arial"],
        fontAwesome: ["FontAwesome"],
      },
      padding: {
        1.75: "0.4375rem",
      },
      fontWeight: {
        nav: 590,
      },
      boxShadow: {
        buttonshadow: "0px 8px 15px rgba(270, 90, 56, 0.15)",
        buttonShadowPurple: "0 10px 25px rgba(123,104,238,.5)",
        buttonShadowBlue: "0 10px 25px rgba(96,165,250,.5)",
        cancelButtonShadow: "0 10px 25px rgba(248,113,113,.3)",
        boxshadowlogin: "1px -5px 8px 2px rgba(207, 139, 207, 0.2)",
        navshadow: "0px 1px 3px 2px rgba(221, 214, 254, 0.3)",
        altNavShadow: "0px 1px 5px rgba(48, 136, 237, 0.36)",
        boxshadowregister: "0 10px 25px rgba(30, 64, 175, .2)",
        boxshadowemail: "0px -5px 8px 2px rgba(76, 150, 224, 0.15)",
        categorycardshadow: "0 5px 30px 3px rgba(102, 21, 182, 0.12)",
        postadshadow: "0px 7px 19px rgba(204, 179, 235, 0.6)",
        // adcardshadow:
        //   "rgba(241, 192, 234, 0.2) 0px 1px 0px, rgba(241, 192, 234, 0.3) 0px 8px 36px, rgba(241, 192, 234, 0.3) 0px -2px 15px",
        adcardshadow: "0 12px 27px rgba(102, 0, 102, 0.2)",
        chatListShadow:
          "0px 8px 12px rgba(222, 175, 232, 0.3), 0px -8px 8px rgba(222, 175, 232,0.2)",
        chatListShadowAlt:
          "0px 2px 4px 0px rgba(139, 92, 246, 0.12), 0px 2px 16px 0px rgba(139, 92, 246, 0.32)",
        modalShadow: "0px -6px 22px 8px rgba(33, 33, 33, 0.1)",
        chatWindowShadow: "0 6px 22px 6px rgba(139, 92, 246, 0.12)",
        userAccountShadow:
          "rgba(223, 170, 225, 0.2) 0px 8px 24px, rgba(223, 170, 225, 0.2) 0px 16px 56px",
        scrollToTopShadow: "rgba(0, 0, 0, 0.2) 0px 20px 20px 5px",
        giveawayButtonShadow:
          "rgba(241, 192, 234, 0.2) 0px 1px 0px, rgba(241, 192, 234, 0.3) 0px 8px 24px, rgba(241, 192, 234, 0.2) 0px 16px 48px, rgba(241, 192, 234, 0.2) 0px 32px 96px",
        footerShadow: "rgba(206, 133, 213, 0.1) 0px -10px 7px 2px",
        postFreeAdShadow:
          "rgb(204, 153, 255) 0px 0px 0px 2px, rgb(153, 51, 255) 0px 0px 0px 4px",
      },
      zIndex: {
        "-10": "-10",
        "-20": "-20",
      },
      inset: {
        100: "100%",
        50: "50%",
        0.5: "0.15rem",
      },
      opacity: {
        90: "0.9",
        93: "0.93",
        95: "0.95",
        98: "0.98",
      },
      colors: {
        "banner-color": "#333333",
        "ghost-white": "#F8F8FF",
        "brand-purple": "#550052",
        "brand-gray": "#292d34",
        "notification-red": "#FF3B30",
        // "footer-gradient-from": "#902393",
        // "footer-gradient-to": "#d04ed6",
        "footer-gradient-from": "#A855F7",
        "footer-gradient-via": "#A855F7",
        "footer-gradient-to": "#9333EA",
        "footer-alt-gradient-from": "#CC87F5",
        "footer-alt-gradient-via": "#CB80F5",
        "footer-alt-gradient-to": "#E09DF8",
        "alt-footer-gradient-from": "#457fca",
        "alt-footer-gradient-to": "#5691c8",
        "browseads-gradient-from": "#c471f5",
        "browseads-gradient-to": "#fa71cd",
        "create-ad-gradient-from": "#da9ff9",
        "create-ad-gradient-to": "#b088f9",
        "create-nbh-gradient-from": "#36D1DC",
        "create-nbh-gradient-to": "#5B86E5",
        "ad-purple": "#902393",
        "ad-tab-purple": "#DC6BE0",
        "alt-gray": "#FAFBFC",
      },
      screens: {
        lg: "1125px",
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
        88: "22rem",
        100: "25rem",
        128: "32rem",
      },
      borderWidth: {
        3: "3px",
      },
      backgroundImage: (theme) => ({
        "login-background": "var(--login-background)",
        "forgot-password-background": "var(--forgot-password-background)",
        "ads-background": "var(--browse-ads)",
        "ads-mobile-background": "var(--browse-ads-mobile)",
        "ads-tablet-background": "var(--browse-ads-tablet)",
        "post-ad-mobile-background": "var(--post-ads-mobile)",
        "post-ad-background": "var(--post-ads)",
        "user-account-background": "var(--user-account)",
        "user-account-mobile-background": "var(--user-account-mobile)",
        "chat-background": "var(--chat-background)",
        "chat-mobile-background": "var(--chat-background-mobile)",
        "chat-window-background-1": "var(--chat-background-1)",
        "chat-window-background-2": "var(--chat-background-2)",
        "chat-window-background-3": "var(--chat-background-3)",
        "our-story-background": "var(--our-story-background)",
        "our-story-background-mobile": "var(--our-story-background-mobile)",
        "our-story-background-tablet": "var(--our-story-background-tablet)",
        "faq-background": "var(--faq-answer)",
        "faq2-background": "var(--faq-question) ",
        "faq-main-background": "var(--faq-background)",
        "covid-background": "var(--covid-background)",
        "covid-background-mobile": "var(--covid-background-mobile)",
        "brush-stroke": "url(/brush-stroke.jpg)",
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
        xxs: ".6875rem",
        tiny: ".8rem",
        navText: "13px",
      },
      borderRadius: {
        "half-full": "4000px",
        "large-mobile": "150px",
      },
      translate: {
        "off-screen": "500%",
      },
    },
  },
  variants: {
    animation: ["responsive", "motion-safe", "motion-reduce"],
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
