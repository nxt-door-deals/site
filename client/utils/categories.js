import {
  categoryAppliances,
  categoryBaby,
  categoryBooks,
  categoryCars,
  categoryDecor,
  categoryEnvironment,
  categoryFashion,
  categoryHobbies,
  categoryKitchen,
  categoryMobile,
  categoryPets,
  categorySports,
} from "./siteImages";

const categories = [
  {
    name: "Cars & Bikes",
    icon: categoryCars,
    subCategories: [
      "Bikes & Scooters",
      "Cars",
      "Accessories",
      "Other Vehicles",
    ],
  },
  {
    name: "Mobiles & Tablets",
    icon: categoryMobile,
    subCategories: ["Mobile Phones", "Tablets", "Accessories", "Wearables"],
  },
  {
    name: "Electronics & Appliances",
    icon: categoryAppliances,
    subCategories: [
      "Home Appliances",
      "Kitchen Appliances",
      "Laptops",
      "Computers & Accessories",
      "Audio, Video & Gaming",
      "Cameras",
      "Tools & Other Appliances",
    ],
  },
  {
    name: "Furniture, Decor & Lighting",
    icon: categoryDecor,
    subCategories: [
      "Home Furniture",
      "Kids Furniture",
      "Office Furniture",
      "Home Decor",
      "Lighting",
    ],
  },
  {
    name: "Kitchen & Tableware",
    icon: categoryKitchen,
    subCategories: [
      "Bakeware",
      "Cookware",
      "Organizers",
      "Barware",
      "Serveware",
      "Linen",
    ],
  },
  {
    name: "Babies & Kids",
    icon: categoryBaby,
    subCategories: [
      "Toys & Games",
      "Baby Gear",
      "Nursery",
      "Feeding",
      "Kids Learning",
    ],
  },
  {
    name: "Books",
    icon: categoryBooks,
    subCategories: ["Books", "Magazines", "Text Books", "Stationery"],
  },
  {
    name: "Hobbies",
    icon: categoryHobbies,
    subCategories: [
      "Musical Instruments",
      "Art",
      "Art Supplies",
      "Collectibles",
      "Dance costumes & accessories",
      "Props",
    ],
  },
  {
    name: "Sports & Fitness",
    icon: categorySports,
    subCategories: [
      "Bicycles & Accessories",
      "Fitness Euipment",
      "Sports Goods & Accessories",
    ],
  },
  {
    name: "Travel & Fashion",
    icon: categoryFashion,
    subCategories: [
      "Garments",
      "Watches",
      "Jewellery",
      "Bags & Luggage",
      "Footware",
      "Fashion Accessories",
      "Beauty Products",
    ],
  },
  {
    name: "Pets",
    icon: categoryPets,
    subCategories: ["Pet Care", "Pet Food", "Pet Toys & Accessories"],
  },
  {
    name: "Garden",
    icon: categoryEnvironment,
    subCategories: ["Plants", "Planters", "Gardening Tools & Accessories"],
  },
];

const categoryListOptions = [
  {
    value: "Cars & Bikes",
    label: "Cars & Bikes",
  },
  {
    value: "Mobiles & Tablets",
    label: "Mobiles & Tablets",
  },
  {
    value: "Electronics & Appliances",
    label: "Electronics & Appliances",
  },
  {
    value: "Furniture, Decor & Lighting",
    label: "Furniture, Decor & Lighting",
  },
  {
    value: "Kitchen & Tableware",
    label: "Kitchen & Tableware",
  },
  {
    value: "Babies & Kids",
    label: "Babies & Kids",
  },
  {
    value: "Books",
    label: "Books",
  },
  {
    value: "Hobbies",
    label: "Hobbies",
  },
  {
    value: "Sports & Fitness",
    label: "Sports & Fitness",
  },
  {
    value: "Travel & Fashion",
    label: "Travel & Fashion",
  },
  {
    value: "Pets",
    label: "Pets",
  },
  {
    value: "Garden",
    label: "Garden",
  },
];

let extendedCategoryListOptions = categoryListOptions.slice();

extendedCategoryListOptions.unshift({
  value: "All Categories",
  label: "All Categories",
});

const conditionOptions = [
  { value: "New", label: "New" },
  { value: "Almost New", label: "Almost New" },
  { value: "Gently Used", label: "Gently Used" },
  { value: "Heavily Used", label: "Heavily Used" },
];

const reportAdReasons = [
  { value: "seller", label: "Seller" },
  { value: "offensive content", label: "Offensive Content" },
  { value: "fraud", label: "Fraud" },
  { value: "others", label: "Others" },
];

export {
  categories,
  categoryListOptions,
  extendedCategoryListOptions,
  conditionOptions,
  reportAdReasons,
};
