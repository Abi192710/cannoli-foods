import { UtensilsCrossed } from "lucide-react";
import type { MenuItem } from "@/lib/menu-data";
import { Reveal } from "./Reveal";

export function MenuItemCard({
  item,
  category,
  delay,
}: {
  item: MenuItem;
  category: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="card-lift group flex h-full gap-4 rounded-2xl border border-border bg-card p-3 sm:flex-col sm:gap-3 sm:p-4">
        <div
          data-photo-placeholder={`${category}/${item.name}`}
          className="flex aspect-square w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border bg-muted text-muted-foreground sm:aspect-[4/3] sm:w-full"
          aria-label={`Photo placeholder for ${item.name}`}
        >
          <UtensilsCrossed className="size-6 opacity-70" aria-hidden />
          <span className="px-2 text-center text-[10px] leading-tight tracking-wide uppercase">
            Photo soon
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center sm:justify-start">
          <h3 className="text-lg leading-tight font-semibold">{item.name}</h3>
          <p className="mt-1 font-display text-xl text-gradient-warm">
            {item.price.toLocaleString()} ETB
          </p>
        </div>
      </article>
    </Reveal>
  );
}