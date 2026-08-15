import b1 from "@/assets/burger-1.jpg.asset.json";
import b2 from "@/assets/burger-2.jpg.asset.json";
import b3 from "@/assets/burger-3.jpg.asset.json";
import b4 from "@/assets/burger-4.jpg.asset.json";
import b5 from "@/assets/burger-5.jpg.asset.json";
import b6 from "@/assets/burger-6.jpg.asset.json";
import b7 from "@/assets/burger-7.jpg.asset.json";
import b8 from "@/assets/burger-8.jpg.asset.json";
import pizzaCannoli from "@/assets/pizza-cannoli.jpg";
import pizzaMeat from "@/assets/pizza-meat.jpg";
import pizzaMargarita from "@/assets/pizza-margarita.jpg";
import pizzaChicken from "@/assets/pizza-chicken.jpg";
import pizzaAlTuna from "@/assets/pizza-altuna.jpg";
import pizzaVegetable from "@/assets/pizza-vegetable.jpg";
import pizzaBbqChicken from "@/assets/pizza-bbq-chicken.jpg";
import pizzaTuna from "@/assets/pizza-tuna.jpg";
import sandwichBeef from "@/assets/sandwich-beef.jpg";
import sandwichChicken from "@/assets/sandwich-chicken.jpg";
import sandwichVegetable from "@/assets/sandwich-vegetable.jpg";
import sandwichTuna from "@/assets/sandwich-tuna.jpg";
import fries from "@/assets/fries.jpg";
import wrapBeef from "@/assets/wrap-beef.jpg";
import wrapChicken from "@/assets/wrap-chicken.jpg";
import wrapTuna from "@/assets/wrap-tuna.jpg";
import wrapVegetable from "@/assets/wrap-vegetable.jpg";
import drinkCola from "@/assets/drink-cola.jpg";
import drinkSprite from "@/assets/drink-sprite.jpg";
import drinkFanta from "@/assets/drink-fanta.jpg";
import drinkWater from "@/assets/drink-water.jpg";
import drinkJuice from "@/assets/drink-juice.jpg";
import drinkSparkling from "@/assets/drink-sparkling.jpg";
import hotMacchiato from "@/assets/hot-macchiato.jpg";
import hotEspresso from "@/assets/hot-espresso.jpg";
import hotCappuccino from "@/assets/hot-cappuccino.jpg";
import hotBuna from "@/assets/hot-buna.jpg";
import hotTea from "@/assets/hot-tea.jpg";
import hotChocolate from "@/assets/hot-chocolate.jpg";

export type MenuItem = { name: string; price: number; image?: string };
export type MenuCategory = {
  id: string;
  label: string;
  labelAm: string;
  emoji: string;
  items: MenuItem[];
};

export const categories: MenuCategory[] = [
  {
    id: "burger",
    label: "Burger",
    labelAm: "በርገር",
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
    labelAm: "ፒዛ",
    emoji: "🍕",
    items: [
      { name: "Cannoli Pizza", price: 1087, image: pizzaCannoli },
      { name: "Meat Lovers Pizza", price: 939, image: pizzaMeat },
      { name: "Margarita Pizza", price: 713, image: pizzaMargarita },
      { name: "Chicken Pizza", price: 983, image: pizzaChicken },
      { name: "Al Tuna Pizza", price: 913, image: pizzaAlTuna },
      { name: "Vegetable Pizza", price: 565, image: pizzaVegetable },
      { name: "BBQ Chicken Pizza", price: 1026, image: pizzaBbqChicken },
      { name: "Tuna Pizza", price: 896, image: pizzaTuna },
    ],
  },
  {
    id: "sandwich",
    label: "Sandwich",
    labelAm: "ሳንድዊች",
    emoji: "🥪",
    items: [
      { name: "Beef Sandwich", price: 800, image: sandwichBeef },
      { name: "Chicken Sandwich", price: 817, image: sandwichChicken },
      { name: "Vegetable Sandwich", price: 487, image: sandwichVegetable },
      { name: "Tuna Sandwich", price: 748, image: sandwichTuna },
      { name: "French Fries", price: 391, image: fries },
    ],
  },
  {
    id: "wrap",
    label: "Wrap",
    labelAm: "ራፕ",
    emoji: "🌯",
    items: [
      { name: "Beef Wrap", price: 817, image: wrapBeef },
      { name: "Chicken Wrap", price: 835, image: wrapChicken },
      { name: "Tuna Wrap", price: 765, image: wrapTuna },
      { name: "Vegetable Wrap", price: 470, image: wrapVegetable },
    ],
  },
  {
    id: "soft-drinks",
    label: "Soft Drinks",
    labelAm: "ለስላሳ መጠጥ",
    emoji: "🥤",
    items: [
      { name: "Coca-Cola", price: 80, image: drinkCola },
      { name: "Sprite", price: 80, image: drinkSprite },
      { name: "Fanta", price: 80, image: drinkFanta },
      { name: "Mineral Water", price: 50, image: drinkWater },
      { name: "Fresh Juice (Avocado/Mango/Mixed)", price: 150, image: drinkJuice },
      { name: "Ambo Water", price: 60, image: drinkSparkling },
    ],
  },
  {
    id: "hot-drinks",
    label: "Hot Drinks",
    labelAm: "ትኩስ መጠጥ",
    emoji: "☕",
    items: [
      { name: "Macchiato", price: 60, image: hotMacchiato },
      { name: "Espresso", price: 55, image: hotEspresso },
      { name: "Cappuccino", price: 70, image: hotCappuccino },
      { name: "Ethiopian Coffee (Buna)", price: 45, image: hotBuna },
      { name: "Hot Tea", price: 40, image: hotTea },
      { name: "Hot Chocolate", price: 90, image: hotChocolate },
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