import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "am";

export const strings = {
  home: { en: "Home", am: "መነሻ" },
  menu: { en: "Menu", am: "ምግብ ዝርዝር" },
  orderNow: { en: "Order Now", am: "አሁን ይዘዙ" },
  callNow: { en: "Call Now", am: "አሁን ይደውሉ" },
  openingHours: { en: "Opening Hours", am: "የስራ ሰዓት" },
  contactUs: { en: "Contact Us", am: "ያግኙን" },
  orderWhatsApp: { en: "Order on WhatsApp", am: "በዋትሳፕ ይዘዙ" },
  orderTelegram: { en: "Order on Telegram", am: "በቴሌግራም ይዘዙ" },
  viewOnMap: { en: "View on Map", am: "በካርታ ይመልከቱ" },
  address: { en: "Address", am: "አድራሻ" },
  phone: { en: "Phone", am: "ስልክ" },
  rights: { en: "All rights reserved", am: "መብቱ በህግ የተጠበቀ ነው" },
} as const;

export type StringKey = keyof typeof strings;

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: StringKey) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => strings[k].en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("cannoli-lang");
    if (saved === "am" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("cannoli-lang", lang);
    document.documentElement.lang = lang === "am" ? "am" : "en";
  }, [lang]);

  const t = (k: StringKey) => strings[k][lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}