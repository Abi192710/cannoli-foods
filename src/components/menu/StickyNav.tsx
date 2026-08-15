import { useEffect, useRef, useState } from "react";
import { categories } from "@/lib/menu-data";

export function StickyNav() {
  const [active, setActive] = useState(categories[0].id);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      let current = categories[0].id;
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
      <div
        ref={barRef}
        className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}