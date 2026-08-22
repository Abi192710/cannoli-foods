import { UtensilsCrossed, MessageCircle, Send } from "lucide-react";
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
  const orderText = `Hi, I'd like to order: ${item.name} - ${item.price.toLocaleString()} ETB`;
  const encoded = encodeURIComponent(orderText);
  const whatsappUrl = `https://wa.me/251922322507?text=${encoded}`;
  const telegramUrl = `https://t.me/Abi27j?text=${encoded}`;

  return (
    <Reveal delay={delay}>
      <article className="card-lift group relative flex h-full gap-4 rounded-2xl border border-border bg-card p-3 sm:flex-col sm:gap-3 sm:p-4">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="aspect-square w-24 shrink-0 rounded-xl object-cover sm:aspect-[4/3] sm:w-full"
          />
        ) : (
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
        )}
        <div className="flex min-w-0 flex-1 flex-col justify-center sm:justify-start">
          <h3 className="text-lg leading-tight font-semibold">{item.name}</h3>
          <p className="mt-1 font-display text-xl text-gradient-warm">
            {item.price.toLocaleString()} ETB
          </p>
          <div className="mt-2 flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${item.name} on WhatsApp`}
              title="Order on WhatsApp"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-warm px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="size-3.5" aria-hidden />
              Order
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${item.name} on Telegram`}
              title="Order on Telegram"
              className="inline-flex items-center justify-center rounded-full border border-border bg-secondary p-1.5 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Send className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}