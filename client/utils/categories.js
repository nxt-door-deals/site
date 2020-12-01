// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCar,
//   faTabletAlt,
//   faDesktop,
//   faCouch,
//   faUtensils,
//   faBaby,
//   faBook,
//   faGuitar,
//   faDumbbell,
//   faTshirt,
//   faPaw,
//   faSeedling,
// } from "@fortawesome/free-solid-svg-icons";

const categories = [
  {
    name: "Cars & Bikes",
    icon: "/images/categories/cars_and_bikes.svg",
    subCategories: [
      "Bikes & Scooters",
      "Cars",
      "Accessories",
      "Other Vehicles",
    ],
  },
  {
    name: "Mobiles & Tablets",
    icon: "/images/categories/mobiles_and_tablets.svg",
    subCategories: ["Mobile Phones", "Tablets", "Accessories", "Wearables"],
  },
  {
    name: "Electronics & Appliances",
    icon: "/images/categories/appliances.svg",
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
    icon: "/images/categories/decor.svg",
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
    icon: "/images/categories/kitchen.svg",
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
    icon: "/images/categories/baby.svg",
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
    icon: "/images/categories/books.svg",
    subCategories: ["Books", "Magazines", "Text Books", "Stationery"],
  },
  {
    name: "Hobbies",
    icon: "/images/categories/hobbies.svg",
    subCategories: [
      "Musical Instruments",
      "Art",
      "Art Supplies",
      "Collectibles",
      "Music & Movies",
      "Dance costumes & accessories",
      "Props",
    ],
  },
  {
    name: "Sports & Fitness",
    icon: "/images/categories/sports.svg",
    subCategories: [
      "Bicycles & Accessories",
      "Fitness Euipment",
      "Sports Goods & Accessories",
    ],
  },
  {
    name: "Travel & Fashion",
    icon: "/images/categories/fashion.svg",
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
    icon: "/images/categories/pets.svg",
    subCategories: [
      "Pets",
      "Pet Adoption",
      "Pet Care",
      "Pet Food",
      "Pet Toys & Accessories",
    ],
  },
  {
    name: "Garden",
    icon: "/images/categories/environment.svg",
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
    value: "Cars & Bikes",
    label: "Cars & Bikes",
  },
];

const conditionOptions = [
  { value: "New", label: "New" },
  { value: "Almost New", label: "Almost New" },
  { value: "Gently Used", label: "Gently Used" },
  { value: "Heavily Used", label: "Heavily Used" },
];

export { categories, categoryListOptions, conditionOptions };
