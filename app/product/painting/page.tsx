
"use client";

import Image from "next/image";
import { useState } from "react";
import { addToCart } from "@/lib/cart";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    addToCart({
      id: "painting",
      name: "تابلو هنری",
      price: 1200000,
      quantity,
    });

    window.location.href = "/cart";
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#0B1728] text-[#F3EBDD]">

      {/* مسیر صفحه */}
      <div className="border-b border-white/10 bg-[#14243A]">
        <div className="mx-auto max-w-7xl px-5 py-4 text-sm text-slate-400 md:px-8">
          <a href="/" className="transition hover:text-[#E7C989]">
            صفحه اصلی
          </a>
          <span className="mx-2 text-[#C6A15B]">/</span>
          <a href="/shop" className="transition hover:text-[#E7C989]">
            فروشگاه
          </a>
          <span className="mx-2 text-[#C6A15B]">/</span>
          <span className="text-[#F3EBDD]">تابلو هنری</span>
        </div>
      </div>

      {/* اطلاعات محصول */}
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* تصویر تابلو */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-[#C6A15B]/5 blur-xl" />

            <div className="relative overflow-hidden rounded-3xl border border-[#C6A15B]/20 bg-[#14243A] p-3 shadow-2xl shadow-black/20">
              <div className="relative h-[350px] overflow-hidden rounded-2xl bg-[#203751] sm:h-[450px]">
                <Image
                  src="/products/product4.jpg"
                  alt="تابلو هنری با الهام از فرهنگ ایرانی"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-3 transition-transform duration-500 hover:scale-105"
                />

                <span className="absolute right-4 top-4 rounded-full border border-[#C6A15B]/30 bg-[#0B1728]/90 px-4 py-2 text-xs font-medium text-[#E7C989] backdrop-blur">
                  انتخاب هنری میراث
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-400">
              <span className="h-2 w-2 rounded-full bg-[#C6A15B]" />
              جلوه‌ای از هنر و فرهنگ ایرانی
            </div>
          </div>

          {/* اطلاعات و خرید */}
          <div className="flex flex-col">
            <p className="text-sm font-medium text-[#C6A15B]">
              تابلو و آثار هنری
            </p>

            <h1 className="mt-4 text-3xl font-extrabold leading-relaxed text-[#F3EBDD] md:text-5xl">
              تابلو هنری
            </h1>

            <p className="mt-4 text-base leading-8 text-slate-300">
              تابلویی با الهام از هنر و فرهنگ ایرانی؛ مناسب برای
              دکوراسیون منزل و هدیه دادن به علاقه‌مندان هنر.
            </p>

            {/* قیمت */}
            <div className="mt-7 rounded-2xl border border-[#C6A15B]/20 bg-[#14243A] p-5">
              <p className="text-sm text-slate-400">
                قیمت محصول
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#E7C989]">
                  ۱,۲۰۰,۰۰۰
                </span>
                <span className="text-sm text-slate-300">
                  تومان
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C6A15B]" />
                محصول منتخب فروشگاه میراث
              </div>
            </div>

            {/* انتخاب تعداد */}
            <div className="mt-7">
              <label
                htmlFor="quantity"
                className="mb-3 block text-sm font-semibold text-[#F3EBDD]"
              >
                تعداد محصول
              </label>

              <div className="inline-flex items-center overflow-hidden rounded-xl border border-slate-600/70 bg-[#14243A]">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label="کاهش تعداد"
                  className="px-4 py-3 text-lg text-[#E7C989] transition hover:bg-white/5"
                >
                  −
                </button>

                <input
                  id="quantity"
                  type="number"
                  min={1}
                  max={99}
                  value={quantity}
                  onChange={(event) => {
                    const value = Number(event.target.value);

                    if (
                      Number.isInteger(value) &&
                      value >= 1 &&
                      value <= 99
                    ) {
                      setQuantity(value);
                    }
                  }}
                  className="w-16 border-x border-slate-600/70 bg-transparent py-3 text-center text-sm text-white outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.min(99, current + 1))
                  }
                  aria-label="افزایش تعداد"
                  className="px-4 py-3 text-lg text-[#E7C989] transition hover:bg-white/5"
                >
                  +
                </button>
              </div>
            </div>

            {/* مجموع قیمت */}
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-sm text-slate-300">
                مجموع قیمت
              </span>

              <span className="text-lg font-bold text-[#E7C989]">
                {(1200000 * quantity).toLocaleString("fa-IR")} تومان
              </span>
            </div>

            {/* دکمه افزودن به سبد خرید */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-l from-[#B18A49] to-[#D9B773] px-6 py-4 text-base font-extrabold text-[#14243A] shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#E7C989] focus:ring-offset-2 focus:ring-offset-[#0B1728]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 9H6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>

              افزودن به سبد خرید
            </button>

            <p className="mt-4 text-center text-xs leading-6 text-slate-400">
              با انتخاب این محصول، آن را به سبد خرید خود اضافه می‌کنید.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}