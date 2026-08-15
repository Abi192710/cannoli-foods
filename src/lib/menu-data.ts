import b1 from "@/assets/burger-1.jpg.asset.json";
import b2 from "@/assets/burger-2.jpg.asset.json";
import b3 from "@/assets/burger-3.jpg.asset.json";
import b4 from "@/assets/burger-4.jpg.asset.json";
import b5 from "@/assets/burger-5.jpg.asset.json";
import b6 from "@/assets/burger-6.jpg.asset.json";
import b7 from "@/assets/burger-7.jpg.asset.json";
import b8 from "@/assets/burger-8.jpg.asset.json";

export type MenuItem = { name: string; price: number; image?: string };
export type MenuCategory = {
  id: string;
  label: string;
  emoji: string;
  items: MenuItem[];
};

export const categories: MenuCategory[] = [
  {
    id: "burger",
    label: "Burger",
    emoji: "🍔",
    items: [
      { name: "Addiction Burger", price: 913, image: b2.url },
      { name: "Triple Cheese Burger", price: 1304, image: b3.url },
      { name: "Double Cheeseburger", price: 1087, image: b4.url },
      { name: "Cheese Burger", price: 739, image: b1.url },
      { name: "Beef Burger", price: 687, image: b1.url },
      { name: "BBQ Burger", price: 774, image: b5.url },
      { name: "Chicken Burger", price: 783, image: b7.url },
      { name: "Chicken Cheese Burger", price: 826, image: b6.url },
      { name: "Double Chicken Cheese Burger", price: 1174, image: b8.url },
    ],
  },
  {
    id: "pizza",
    label: "Pizza",
    emoji: "🍕",
    items: [
      { name: "Cannoli Pizza", price: 1087 },
      { name: "Meat Lovers Pizza", price: 939 },
      { name: "Margarita Pizza", price: 713 },
      { name: "Chicken Pizza", price: 983 },
      { name: "Al Tuna Pizza", price: 913 },
      { name: "Vegetable Pizza", price: 565 },
      { name: "BBQ Chicken Pizza", price: 1026 },
      { name: "Tuna Pizza", price: 896 },
    ],
  },
  {
    id: "sandwich",
    label: "Sandwich",
    emoji: "🥪",
    items: [
      { name: "Beef Sandwich", price: 800 },
      { name: "Chicken Sandwich", price: 817 },
      { name: "Vegetable Sandwich", price: 487 },
      { name: "Tuna Sandwich", price: 748 },
      { name: "French Fries", price: 391 },
    ],
  },
  {
    id: "wrap",
    label: "Wrap",
    emoji: "🌯",
    items: [
      { name: "Beef Wrap", price: 817 },
      { name: "Chicken Wrap", price: 835 },
      { name: "Tuna Wrap", price: 765 },
      { name: "Vegetable Wrap", price: 470 },
    ],
  },
  {
    id: "soft-drinks",
    label: "Soft Drinks",
    emoji: "🥤",
    items: [
      { name: "Coca-Cola", price: 80 },
      { name: "Sprite", price: 80 },
      { name: "Fanta", price: 80 },
      { name: "Mineral Water", price: 50 },
      { name: "Fresh Juice (Avocado/Mango/Mixed)", price: 150 },
      { name: "Ambo Water", price: 60 },
    ],
  },
  {
    id: "hot-drinks",
    label: "Hot Drinks",
    emoji: "☕",
    items: [
      { name: "Macchiato", price: 60 },
      { name: "Espresso", price: 55 },
      { name: "Cappuccino", price: 70 },
      { name: "Ethiopian Coffee (Buna)", price: 45 },
      { name: "Hot Tea", price: 40 },
      { name: "Hot Chocolate", price: 90 },
    ],
  },
];

export const contact = {
  phone: "0922322507",
  phoneHref: "tel:+251922322507",
  whatsapp: "https://wa.me/251922322507",
  telegram: "https://t.me/Abi27j",
  address: "In Front of CMC Michael Church, Addis Ababa",
  hours: "08:00 AM – 10:00 PM daily",
  lat: 9.021162,
  lng: 38.841813,
};