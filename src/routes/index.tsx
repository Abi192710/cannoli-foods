import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { categories, contact } from "@/lib/menu-data";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { StickyNav } from "@/components/menu/StickyNav";
import { Reveal } from "@/components/menu/Reveal";
import { useLang } from "@/lib/i18n";

const title = "Cannoli Foods — Burgers, Pizza & Coffee in Addis Ababa";
const description =
  "Cannoli Foods digital menu: burgers, pizza, sandwiches, wraps and drinks. Order on WhatsApp or Telegram. CMC Michael Church, Addis Ababa. Open 8AM–10PM daily.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "restaurant.menu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang, t } = useLang();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${contact.lat},${contact.lng}`;
  return (
    <div className="min-h-screen pb-28 sm:pb-16">
      <header className="relative overflow-hidden px-5 pt-14 pb-12 text-center">
        <div
          aria-hidden
          className="bg-gradient-warm pointer-events-none absolute -top-40 left-1/2 size-[26rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        />
        <Reveal>
          <p className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
            Addis Ababa · CMC
          </p>
          <h1 className="text-gradient-warm font-display mt-3 text-6xl leading-none sm:text-8xl">
            Cannoli Foods
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-base">
            Flame-grilled burgers, stone-baked pizza and real Ethiopian coffee — made fresh,
            served hot.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-warm text-primary-foreground card-lift inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
            >
              <MessageCircle className="size-4" aria-hidden /> {t("orderWhatsApp")}
            </a>
            <a
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-secondary card-lift inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold"
            >
              <Send className="size-4" aria-hidden /> {t("orderTelegram")}
            </a>
          </div>
        </Reveal>
        <Reveal delay={220}>
          <div className="text-muted-foreground mt-7 flex flex-col items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <Clock className="text-primary size-4" aria-hidden /> {t("openingHours")}: {contact.hours}
            </span>
            <span className="inline-flex items-center gap-2 text-center">
              <MapPin className="text-primary size-4 shrink-0" aria-hidden /> {contact.address}
            </span>
            <a href={contact.phoneHref} className="hover:text-foreground inline-flex items-center gap-2">
              <Phone className="text-primary size-4" aria-hidden /> {t("callNow")}: {contact.phone}
            </a>
          </div>
        </Reveal>
      </header>

      <StickyNav />

      <main className="mx-auto max-w-5xl px-4 pt-8">
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-28 py-8">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-3xl" aria-hidden>
                  {cat.emoji}
                </span>
                <h2 className="font-display text-4xl">
                  {lang === "am" ? cat.labelAm : cat.label}
                </h2>
                <span className="bg-border h-px flex-1" />
              </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {cat.items.map((item, i) => (
                <MenuItemCard
                  key={item.name}
                  item={item}
                  category={cat.label}
                  delay={Math.min(i, 5) * 70}
                />
              ))}
            </div>
          </section>
        ))}

        <section className="scroll-mt-28 py-10">
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-4xl">{t("contactUs")}</h2>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-secondary card-lift inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold"
              >
                <MapPin className="size-4" aria-hidden /> {t("viewOnMap")}
              </a>
            </div>
            <div className="border-border overflow-hidden rounded-2xl border">
              <iframe
                title="Cannoli Foods location map"
                src={`https://www.google.com/maps?q=${contact.lat},${contact.lng}&hl=en&z=17&output=embed`}
                className="h-72 w-full sm:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="text-muted-foreground border-border mt-4 border-t px-5 py-8 text-center text-sm">
        <p className="font-display text-gradient-warm text-2xl">Cannoli Foods</p>
        <p className="mt-2">
          {t("address")}: {contact.address}
        </p>
        <p>
          {t("openingHours")}: {contact.hours}
        </p>
        <a href={contact.phoneHref} className="hover:text-foreground mt-2 inline-block">
          {t("phone")}: {contact.phone}
        </a>
        <p className="mt-4 text-xs">
          © {new Date().getFullYear()} Cannoli Foods — {t("rights")}
        </p>
      </footer>

      <div className="from-background pointer-events-none fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t to-transparent p-4 pt-8 sm:hidden">
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-warm text-primary-foreground pointer-events-auto flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold shadow-[var(--shadow-lift)]"
        >
          <MessageCircle className="size-5" aria-hidden /> {t("order")}
        </a>
      </div>
    </div>
  );
}
