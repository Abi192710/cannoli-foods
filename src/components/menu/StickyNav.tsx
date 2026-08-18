import { useEffect, useRef, useState } from "react";
import { categories } from "@/lib/menu-data";
import { useLang } from "@/lib/i18n";

const firstId = categories[0]!.id;

export function StickyNav() {
  const [active, setActive] = useState(firstId);
  const barRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang, setLang } = useLang();

  useEffect(() => {
    const visible = new Set<string>();
    const pick = () => {
      if (lockRef.current) return;
      let current: string | null = null;
      for (const c of categories) if (visible.has(c.id)) { current = c.id; break; }
      if (current) setActive(current);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        pick();
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );
    for (const c of categories) {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    const btn = bar?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!bar || !btn) return;
    const target = btn.offsetLeft - bar.clientWidth / 2 + btn.offsetWidth / 2;
    const max = bar.scrollWidth - bar.clientWidth;
    const left = Math.max(0, Math.min(target, max));
    if (Math.abs(left - bar.scrollLeft) < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bar.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    lockRef.current = true;
    setActive(id);
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      lockRef.current = false;
    }, 900);
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