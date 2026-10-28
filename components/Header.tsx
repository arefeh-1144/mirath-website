
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const links = [
  { label: "صفحه اصلی", href: "/" },
  { label: "فروشگاه", href: "/shop" },
  { label: "چاپ عکس", href: "/photo-print" },
  { label: "هدیه‌های خاص", href: "/gifts" },
  { label: "درباره ما", href: "/#about" },
];

const productCategories = [
  { label: "چاپ عکس", emoji: "🖼️", slug: "photo-print" },
  { label: "قاب عکس", emoji: "🪵", slug: "photo-frame" },
  { label: "مگنت عکس", emoji: "🧲", slug: "photo-magnet" },
  {
    label: "هدایای شخصی‌سازی‌شده",
    emoji: "🎁",
    slug: "personalized-gifts",
  },
  { label: "محصولات چاپی", emoji: "🖨️", slug: "printed-products" },
  {
    label: "تقویم و کارت‌پستال",
    emoji: "📅",
    slug: "calendar-postcard",
  },
  { label: "آلبوم عکس", emoji: "📚", slug: "photo-album" },
  { label: "شاسی عکس", emoji: "🖼️", slug: "photo-canvas" },
];

export default function Header() {
  const [productsOpen, setProductsOpen] = useState(false);
  const productsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(event.target as Node)
      ) {
        setProductsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProductsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b border-[#C6A15B]/25 bg-[#14243A] shadow-lg shadow-black/20"
    >
      <div className="border-b border-[#C6A15B]/20 bg-gradient-to-l from-[#0B1728] via-[#203751] to-[#0B1728] px-2 py-2 text-center sm:px-4 sm:py-2.5">
        <p className="text-[11px] font-medium tracking-wide text-[#F3EBDD] sm:text-sm">
          <span className="mx-1 text-[#C6A15B] sm:mx-2">✦</span>
          میراث؛ جایی که خاطره‌ها ماندگار می‌شوند
          <span className="mx-1 text-[#C6A15B] sm:mx-2">✦</span>
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 px-3 py-3 sm:gap-5 sm:px-5 sm:py-5 md:grid-cols-[auto_minmax(180px,1fr)_auto] md:gap-6 md:px-8">
        <a
          href="/"
          aria-label="صفحه اصلی میراث"
          className="group flex items-center justify-self-center gap-2 sm:gap-3 md:justify-self-start"
        >
          <Image
            src="/LOGO.png"
            alt="لوگوی میراث"
            width={72}
            height={72}
            priority
            className="h-12 w-12 object-contain transition duration-300 group-hover:scale-105 sm:h-14 sm:w-14 md:h-16 md:w-16"
          />

          <div className="flex flex-col gap-0.5 sm:gap-1">
            <span className="text-xl font-extrabold tracking-tight text-[#F3EBDD] sm:text-2xl md:text-3xl">
              میراث
            </span>
            <span className="text-[10px] text-[#D2D9E2] sm:text-xs">
              جایی که خاطره‌ها ماندگار می‌شوند
            </span>
            <span className="h-0.5 w-8 rounded-full bg-[#C6A15B] transition-all duration-300 group-hover:w-full sm:w-10" />
          </div>
        </a>

        <form action="/shop" method="get" className="w-full min-w-0">
          <div className="flex h-11 items-center gap-2 rounded-xl border border-slate-500/50 bg-[#20344B] px-3 transition duration-300 focus-within:border-[#C6A15B] focus-within:ring-4 focus-within:ring-[#C6A15B]/10 sm:h-12 sm:gap-3 sm:rounded-2xl sm:px-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 shrink-0 text-[#C6A15B]"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" strokeLinecap="round" />
            </svg>

            <input
              type="search"
              name="q"
              placeholder="جست‌وجوی آثار و محصولات هنری..."
              aria-label="جست‌وجوی محصولات"
              className="w-full min-w-0 bg-transparent text-right text-sm text-[#F3EBDD] outline-none placeholder:text-xs placeholder:text-slate-400 sm:placeholder:text-sm"
            />
          </div>
        </form>

        <div className="grid grid-cols-3 gap-2 md:flex md:flex-wrap md:items-center md:justify-center md:gap-2 md:justify-self-end">
          <a
            href="/auth/login"
            className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-lg border border-slate-500/60 bg-[#20344B] px-1.5 py-2 text-center text-[11px] font-semibold leading-5 text-[#F3EBDD] transition hover:border-[#C6A15B] hover:text-[#E7C989] sm:rounded-xl sm:px-3 sm:text-sm"
          >
            ورود / ثبت‌نام
          </a>

          <a
            href="/cart"
            className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-lg bg-gradient-to-l from-[#B18A49] to-[#D9B773] px-1.5 py-2 text-center text-[11px] font-bold leading-5 text-[#14243A] transition hover:-translate-y-0.5 sm:rounded-xl sm:px-3 sm:text-sm"
          >
            سبد خرید
          </a>

          <a
            href="/track-order"
            className="inline-flex min-h-10 min-w-0 items-center justify-center rounded-lg border border-[#C6A15B]/50 bg-[#20344B] px-1.5 py-2 text-center text-[11px] font-bold leading-5 text-[#E7C989] transition hover:bg-[#29415B] sm:rounded-xl sm:px-3 sm:text-sm"
          >
            پیگیری سفارش
          </a>
        </div>
      </div>

      <nav
        aria-label="منوی اصلی"
        className="border-t border-slate-600/40 bg-[#0B1728]"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-start gap-x-1 overflow-x-auto px-2 py-1.5 sm:justify-center sm:gap-x-2 sm:px-4 sm:py-2 md:gap-x-3 md:px-8">
          {links.slice(0, 2).map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={index === 0 ? "page" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs transition duration-300 hover:bg-white/5 hover:text-[#E7C989] sm:px-4 sm:py-3 sm:text-sm ${
                index === 0
                  ? "font-bold text-[#E7C989]"
                  : "font-medium text-[#E4E8EE]"
              }`}
            >
              {link.label}
            </a>
          ))}

          <div ref={productsMenuRef} className="relative shrink-0">
            <button
              type="button"
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={() => setProductsOpen((open) => !open)}
              className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium transition duration-200 hover:bg-white/5 hover:text-[#E7C989] sm:gap-2 sm:px-4 sm:py-3 sm:text-sm ${
                productsOpen ? "text-[#E7C989]" : "text-[#E4E8EE]"
              }`}
            >
              محصولات

              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-4 w-4 transition-transform duration-200 ${
                  productsOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <path
                  d="m5 7 5 5 5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {productsOpen && (
              <div
                className="absolute right-0 top-full z-[100] mt-2 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-[#C6A15B]/30 bg-white p-2 text-right shadow-2xl shadow-black/25"
                role="group"
                aria-label="دسته‌بندی محصولات"
              >
                <div className="border-b border-[#14243A]/10 px-4 py-3">
                  <p className="text-sm font-extrabold text-[#14243A]">
                    دسته‌بندی محصولات
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    دسته‌ی موردنظرت را انتخاب کن
                  </p>
                </div>

                <div className="max-h-[60vh] overflow-y-auto py-1">
                  {productCategories.map((category) => (
                    <a
                      key={category.slug}
                      href={`/shop?category=${category.slug}`}
                      onClick={() => setProductsOpen(false)}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#14243A] transition-colors duration-200 hover:bg-[#C6A15B]/15 hover:text-[#94702E] focus:bg-[#C6A15B]/15 focus:outline-none"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#14243A]/5 text-lg transition-colors group-hover:bg-[#C6A15B]/20">
                        {category.emoji}
                      </span>

                      <span className="flex-1">{category.label}</span>

                      <span className="text-[#C6A15B] opacity-0 transition-opacity group-hover:opacity-100">
                        ←
                      </span>
                    </a>
                  ))}
                </div>

                <div className="border-t border-[#14243A]/10 p-2">
                  <a
                    href="/shop"
                    onClick={() => setProductsOpen(false)}
                    className="flex items-center justify-center rounded-xl bg-[#14243A] px-4 py-3 text-sm font-bold text-[#D8B873] transition-colors hover:bg-[#203751]"
                  >
                    مشاهده همه محصولات فروشگاه
                  </a>
                </div>
              </div>
            )}
          </div>

          {links.slice(2).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-medium text-[#E4E8EE] transition duration-300 hover:bg-white/5 hover:text-[#E7C989] sm:px-4 sm:py-3 sm:text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
