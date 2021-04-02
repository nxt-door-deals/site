const sellerFaqs = [
  {
    question:
      'Are there any best practices for selling on <span class="text-brand-purple font-semibold">nxtdoordeals.com</span>?',
    answer:
      'Please read our <a class="font-semibold text-purple-500 underline focus-within:outline-none" href="/guidelines#seller">Seller Guidelines</a>.',
  },
  {
    question: "How many ads can I post at a time?",
    answer:
      "You may post a maximum of seven ads across all categories at any given point in time. ",
  },
  {
    question: "How long will my ad remain active?",
    answer:
      "All ads remain active for a period of 30 days unless they are deleted by seller.",
  },
  {
    question: "Can an ad be auto-renewed?",
    answer:
      "No. At the moment, an ad will need to be posted again after 30 days if you would like it to remain active.",
  },
  {
    question: "How do I edit/delete my ad?",
    answer:
      "Edit and delete options are available when viewing the full ad or on your account page under the 'Ads' tab.",
  },
  {
    question: "Where can I see all my ads?",
    answer: "All ads are listed on your account page under the 'Ads' tab.",
  },
  {
    question: "Are any personal details displayed on my ad?",
    answer:
      'Only your name is displayed. Your apartment/house number will be displayed only if you provide consent at the time of posting the ad. Please read our <a class="font-semibold text-purple-500 focus-within:outline-none underline" href="/policies#privacy">Privacy Policy</a> for more details.',
  },
  {
    question: "Where can I see the list of prohibited ad categories?",
    answer:
      'Please see <a class="font-semibold text-purple-500 focus-within:outline-none underline" href="/guidelines#banned">prohibited ads</a> for more details.',
  },
  {
    question: "Can I share my ad with friends?",
    answer:
      'Yes. The url of the full ad is public and can be shared. Typically it will look something like <span class="text-purple-500 font-semibold underline">nxtdoordeals.com/ads/(numeric_id)</span>',
  },
  {
    question:
      'Does <span class="text-brand-purple font-semibold">nxtdoordeals.com</span> handle payments for a transaction?',
    answer:
      "No. A payment transaction is left to the discretion of the seller and buyer. We do not and will not have any say in the final amount or the mode of payment. The seller and the buyer can choose any mode of payment that is convenient to them.",
  },
  {
    question:
      'Does <span class="text-brand-purple font-semibold">nxtdoordeals.com</span> get any portion of the final payment amount?',
    answer:
      "No. The full amount belongs to the seller. We do not get any share of the proceeds from a transaction.",
  },
  {
    question: "How do I chat with a buyer?",
    answer:
      "Visitors to your ad, will see a 'Chat With Seller' button which they can use to contact you. All such chats will be dispayed on your account page under the 'Chats' tab.",
  },
  {
    question: "Can anyone who see's my ad, chat with me?",
    answer:
      "Only registered users who have verified their emails can use the `Chat With Seller' feature to contact you.",
  },
  {
    question: "Can I be contacted by buyers from other neighbourhoods?",
    answer:
      "Yes, there is no restriction imposed by the platform. Any registred user can express interest in your ad. However, we strongly recommend that you keep your transactions limited to your neighbourhood or ones in the immediate vicinity.",
  },
  {
    question: "What happens if my ad is reported?",
    answer:
      "Each time your ad is reported, you will receive an email containing the reason for the complaint. We will conduct a parallel review to ascertain the legitimacy of the complaint. You will have a week to take the appropriate action, failing which the ad will be removed. If your ad is reported by five different users (even while the review is in progress), it will automatically be removed from the platform.",
  },
  {
    question: "Can one person report my ad multiple times?",
    answer: "No. Every buyer can report any particular ad only once.",
  },
  {
    question: "How do I report a buyer?",
    answer:
      'You can write to us at <a class="font-semibold text-purple-500 underline focus-within:outline-none" href="mailto:contact@nxtdoordeals.com">contact@nxtdoordeals.com</a>.',
  },
];

const buyerFaqs = [
  {
    question:
      'Are there any best practices for buying on <span class="text-brand-purple font-semibold">nxtdoordeals.com</span>?',
    answer:
      'Please read our <a class="font-semibold text-purple-500 focus-within:outline-none underline" href="/guidelines#buyer">Buyer Guidelines</a>.',
  },
  {
    question: "How do I know whether a seller is legitimate?",
    answer:
      'Unless sellers verify their email addresses, they will not be able to post ad\'s. Chatting with the seller (fellow resident), will help you further gauge legitimacy. Check our <a class="font-semibold text-purple-500 focus-within:outline-none underline" href="/guidelines#buyer">buyer guidelines</a> for further information',
  },
  {
    question: "How do I chat with a seller?",
    answer:
      "You may use the 'Chat With Seller' feature on all the ads. Remember, you will need to register and verify your email before you can initiate a chat.",
  },
  {
    question:
      "Is there a limit to the number of sellers I can chat with at any time?",
    answer:
      "No. As long as you have registered and verified your email address, you may chat with any number of sellers.",
  },
  {
    question: "Where do I see my chats?",
    answer:
      "All your chats will be displayed on your account page under the 'Chats' tab.",
  },
  {
    question: "Can I chat with sellers from other neighbourhoods?",
    answer:
      "Yes, one may chat with any seller irrespective of the neighbourhood. However, we strongly recommend that you keep transactions limited to your neighbourhood or neighbourhoods in the immediate vicinity.",
  },
  {
    question: "How do I report a fraud or a fake ad?",
    answer: "Please use the 'Report This Ad' feature at the bottom the ad.",
  },
  {
    question: "How do I report a seller?",
    answer:
      "Please use the 'Report This Ad' feature at the bottom the ad and select the reason for complaint as 'Seller'.",
  },
  {
    question:
      'Does <span class="text-brand-purple font-semibold">nxtdoordeals.com</span> handle payments for a transaction?',
    answer:
      "No. A payment transaction is left to the discretion of the seller and buyer. We do not and will not have any say in the final amount or the mode of payment. The seller and the buyer can choose any mode of payment that is convenient to them.",
  },
];

const genericFaqs = [
  {
    question: "What is your definition of a neighbourhood?",
    answer:
      "A neighbourhood can be an apartment, a gated community or a cooperative housing society. For instance, if one creates their user account for an apartment named ABC, then ABC becomes their neighbourhood.",
  },
  {
    question:
      'How do I register my apartment or gated community on <span class="text-brand-purple font-semibold">nxtdoordeals.com</span>?',
    answer:
      'When you search for an apartment/gated community, you will immediately see a link to register it in case it is not found. Alternately, you may visit <a class="font-semibold text-purple-500 focus-within:outline-none underline" href="/register/neighbourhood">nxtdoordeals.com/register/neighbourhood</a> to get your apartment on the map!',
  },
  {
    question: "How long does a neighbourhood registration take?",
    answer:
      "Typically 24-48 hours. This could be longer in case more information is needed.",
  },
  {
    question:
      "Does my account automatically get created if the neighbourhood I registered is approved?",
    answer:
      "No. Once the registration is approved, you will need to register yourself separately as a user.",
  },
  {
    question:
      "Since I initiated the registration for my neighbourhood, will my account have any additional privileges?",
    answer: "No. All accounts when created have the same set of privileges.",
  },
  {
    question: "Should I verify my email?",
    answer:
      "Only accounts with verified emails can post new ads and chat with sellers. You may continue to browse ads without verifying your email.",
  },
  {
    question:
      "I no longer have the original email verification link. What now?",
    answer:
      "The link can be regenerated using the 'Resend Link' feature under the 'Profile' tab on your account page.",
  },
  {
    question: "Can I change my account information?",
    answer:
      "Yes. Acoount information (except for email) can be updated on the account page under the 'Profile' tab.",
  },
  {
    question: "Can I change my email address?",
    answer:
      "No, the registered email address cannot be changed. To use a diffefrent email address, you will need to delete your account and register with a new email address.",
  },
  {
    question:
      "Can I use the same email address for multiple properties that I own?",
    answer:
      "No, at the moment, one email address can be used for one flat/house only. So, whether you own multiple flats in a single apartment complex or two houses in different gated communities, you will need to use a different email address for each propery that you own.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Use the 'Delete Account' feature under the 'Profile' tab on your account page.",
  },
  {
    question: "How do I unsubscribe from the marketing emails?",
    answer: "Use the 'Unsubscribe' link at the bottom of the email.",
  },
  {
    question: "What do I do in case I don't see a valid category for my ad?",
    answer:
      'Please write to us at <a class="font-semibold text-purple-500 underline focus-within:outline-none" href="mailto:contact@nxtdoordeals.com">contact@nxtdoordeals.com</a>.',
  },
  {
    question: "Where can I see the list of prohibited ad categories?",
    answer:
      'Please see <a class="font-semibold text-purple-500 focus-within:outline-none underline" href="/guidelines#banned">prohibited ads</a> for more details.',
  },
  {
    question: "My ad was posted under a wrong category. What can I do?",
    answer:
      "Category changes are allowed only at the time of ad creation. If the category needs to be changed after the ad has been posted, the ad will need to be deleted and created again.",
  },

  {
    question:
      'Does <span class="text-brand-purple font-semibold">nxtdoordeals.com</span> handle payments for a transaction?',
    answer:
      "No. A payment transaction is left to the discretion of the seller and buyer. We do not and will not have any say in the final amount or the mode of payment. The seller and the buyer can choose any mode of payment that is convenient to them.",
  },
  {
    question:
      'Does <span class="text-brand-purple font-semibold">nxtdoordeals.com</span> get any portion of the final payment amount?',
    answer:
      "No. The full amount belongs to the seller. We do not get any share of the proceeds from a transaction.",
  },
];

export { sellerFaqs, buyerFaqs, genericFaqs };
