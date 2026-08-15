import { useEffect, useRef, useState } from "react";
import { categories } from "@/lib/menu-data";
import { useLang } from "@/lib/i18n";

const firstId = categories[0]!.id;

export function StickyNav() {
  const [active, setActive] = useState(firstId);
  const barRef = useRef<HTMLDivElement>(null);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const onScroll = () => {
      let current = firstId;
      for (const c of categories) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= 160) current = c.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const btn = barRef.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 112;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-3">
        <div
        ref={barRef}
        className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
        {categories.map((c) => (
          <button
            key={c.id}
            data-tab={c.id}
            onClick={() => go(c.id)}
            aria-current={active === c.id}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              active === c.id
                ? "bg-gradient-warm border-transparent text-primary-foreground shadow-[var(--shadow-lift)]"
                : "border-border bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span aria-hidden>{c.emoji}</span>
            {lang === "am" ? c.labelAm : c.label}
          </button>
        ))}
        </div>
        <button
          onClick={() => setLang(lang === "en" ? "am" : "en")}
          aria-label="Switch language"
          className="border-border bg-secondary text-foreground hover:border-primary shrink-0 rounded-full border px-3 py-2 text-sm font-bold transition-colors"
        >
          {lang === "en" ? "አማ" : "EN"}
        </button>
      </div>
    </div>
  );
}