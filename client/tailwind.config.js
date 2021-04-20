module.exports = {
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
      boxShadow: {
        buttonshadow: "0px 8px 15px rgba(270, 90, 56, 0.15)",
        buttonShadowPurple: "0 10px 25px rgba(123,104,238,.5)",
        buttonShadowBlue: "0 10px 25px rgba(96,165,250,.5)",
        cancelButtonShadow: "0 10px 25px rgba(248,113,113,.3)",
        boxshadowlogin: "1px -5px 8px 2px rgba(207, 139, 207, 0.2)",
        navshadow: "0px 1px 3px 2px rgba(221, 214, 254, 0.3)",
        altNavShadow: "0px 1px 5px rgba(48, 136, 237, 0.36)",
        boxshadowregister: "0 25px 75px rgba(16, 30, 54, .25)",
        boxshadowemail: "0px -5px 8px 2px rgba(76, 150, 224, 0.15)",
        categorycardshadow: "0 5px 30px 3px rgba(102, 21, 182, 0.12)",
        postadshadow: "0px 7px 29px 3px rgba(204, 179, 235, 0.4)",
        adcardshadow:
          "rgba(241, 192, 234, 0.2) 0px 1px 0px, rgba(241, 192, 234, 0.3) 0px 8px 36px, rgba(241, 192, 234, 0.3) 0px -2px 15px",
        chatListShadow:
          "0px 8px 12px rgba(222, 175, 232, 0.3), 0px -8px 8px rgba(222, 175, 232,0.2)",
        chatListShadowAlt:
          "0px 2px 4px 0px rgba(139, 92, 246, 0.12), 0px 2px 16px 0px rgba(139, 92, 246, 0.32)",
        modalShadow: "0px -6px 22px 8px rgba(33, 33, 33, 0.1)",
        chatWindowShadow: "0 6px 22px 6px rgba(139, 92, 246, 0.12)",
        userAccountShadow:
          "rgba(223, 170, 225, 0.2) 0px 8px 24px, rgba(223, 170, 225, 0.2) 0px 16px 56px, rgba(223, 170, 225, 0.2) 0px 24px 80px",
        scrollToTopShadow: "rgba(0, 0, 0, 0.2) 0px 20px 20px 5px",
        giveawayButtonShadow:
          "rgba(241, 192, 234, 0.2) 0px 1px 0px, rgba(241, 192, 234, 0.3) 0px 8px 24px, rgba(241, 192, 234, 0.2) 0px 16px 48px, rgba(241, 192, 234, 0.2) 0px 32px 96px",
        footerShadow: "rgba(206, 133, 213, 0.1) 0px -10px 7px 2px",
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
        "footer-gradient-from": "#997BC0",
        "footer-gradient-to": "#996EC5",
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
        "login-background": "url(/images/login/user-login.svg)",
        "user-registration-background":
          "url(/images/user_registration/user-registration.svg)",
        "email-verification-background":
          "url(/images/email/email-verification.svg)",
        "forgot-password-background":
          "url(/images/forgotpassword/fp-background.svg)",
        "howitworks-background": "url(/images/howitworks/howitworks-bg.svg)",
        "browseads-background": "url(/images/browseads/bg-browseads.svg)",
        "ads-background": "url(/images/browseads/bg-ads.svg)",
        "ads-mobile-background": "url(/images/browseads/bg-ads-mobile.svg)",
        "ads-tablet-background": "url(/images/browseads/bg-ads-tablet.svg)",
        "create-neighbourhood-background":
          "url(/images/neighbourhood/bg-create-neighbourhood.svg)",
        "create-neighbourhood-background-mobile":
          "url(/images/neighbourhood/bg-create-neighbourhood-mobile.svg)",
        "create-neighbourhood-background-tablet":
          "url(/images/neighbourhood/bg-create-neighbourhood-tablet.svg)",
        "post-ad-mobile-background":
          "url(/images/postad/bg-post-ads-mobile.svg)",
        "post-ad-background": "url(/images/postad/bg-post-ads.svg)",
        "user-account-background":
          "url(/images/user_account/user-account-background.svg)",
        "user-account-mobile-background":
          "url(/images/user_account/user-account-mobile-background.svg)",
        "fpa-background": "url(/images/fpa/fpa-background.svg)",
        "chat-background": "url(/images/chat/bg-chat.svg)",
        "chat-mobile-background": "url(/images/chat/bg-chat-mobile.svg)",
        "our-story-background": "url(/images/our-story/bg-our-story.svg)",
        "our-story-background-mobile":
          "url(/images/our-story/bg-our-story-mobile.svg)",
        "our-story-background-tablet":
          "url(/images/our-story/bg-our-story-tablet.svg)",
        "reported-ad-background": "url(/images/reported-ad/bg-reported-ad.svg)",
        "faq-background": "url(/images/policy/faq.svg)",
        "faq2-background": "url(/images/policy/faq-2.svg)",
        "faq-main-background": "url(/images/policy/faq-bg.svg)",
        "blog-background": "url(/images/blog/blog-bg.svg)",
        "blog-background-mobile": "url(/images/blog/blog-bg-mobile.svg)",
        "covid-background": "url(/images/covid/bg-covid.svg)",
        "covid-background-mobile": "url(/images/covid/bg-covid-mobile.svg)",
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
        navText: ".8125rem",
      },
      borderRadius: {
        "half-full": "4000px",
        "large-mobile": "150px",
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
