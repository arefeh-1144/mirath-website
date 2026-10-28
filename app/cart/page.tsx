
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  removeFromCart,
  updateCartQuantity,
  type CartItem,
} from "@/lib/cart";

const productImages: Record<string, string> = {
  heart: "/products/product1.jpg",
  painting: "/products/product4.jpg",
  magnet: "/products/product3.jpg",
  souvenir: "/products/product2.jpg",
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("miras-cart");

      if (savedCart) {
        const parsedCart: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart as CartItem[]);
        }
      }
    } catch {
      setCart([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function changeQuantity(id: string, quantity: number) {
    if (quantity < 1 || quantity > 99) return;

    updateCartQuantity(id, quantity);

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  function deleteProduct(id: string) {
    removeFromCart(id);

    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0B1728] text-[#F3EBDD]"
    >
      {/* عنوان صفحه */}
      <section className="border-b border-[#C6A15B]/20 bg-gradient-to-bl from-[#203751] via-[#14243A] to-[#0B1728] px-5 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-medium text-[#C6A15B]">
            انتخاب‌های شما
          </p>

          <h1 className="text-3xl font-extrabold md:text-4xl">
            سبد خرید
          </h1>

          <div className="mt-4 h-1 w-16 rounded-full bg-[#C6A15B]" />

          <p className="mt-4 text-sm leading-7 text-slate-300">
            محصولات منتخب خود را بررسی کنید و سفارش خود را آماده کنید.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        {!isLoaded ? (
          <div className="rounded-2xl border border-white/10 bg-[#14243A] p-10 text-center text-slate-300">
            در حال بارگذاری سبد خرید...
          </div>
        ) : cart.length === 0 ? (
          /* سبد خرید خالی */
          <div className="mx-auto max-w-xl rounded-3xl border border-[#C6A15B]/20 bg-[#14243A] px-6 py-14 text-center shadow-xl shadow-black/10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-[#C6A15B]/25 bg-[#C6A15B]/10 text-[#E7C989]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-10 w-10"
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
            </div>

            <h2 className="mt-6 text-xl font-bold">
              سبد خرید شما خالی است
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              از فروشگاه میراث دیدن کنید و محصول موردعلاقه‌تان را انتخاب کنید.
            </p>

            <a
              href="/shop"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-gradient-to-l from-[#B18A49] to-[#D9B773] px-7 py-3.5 text-sm font-extrabold text-[#14243A] transition hover:-translate-y-0.5"
            >
              مشاهده فروشگاه
            </a>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-3">
            {/* فهرست محصولات */}
            <div className="space-y-4 lg:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  محصولات انتخاب‌شده
                </h2>

                <span className="rounded-lg border border-[#C6A15B]/25 bg-[#C6A15B]/10 px-3 py-2 text-xs text-[#E7C989]">
                  {itemCount.toLocaleString("fa-IR")} عدد محصول
                </span>
              </div>

              {cart.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-[#14243A] p-4 transition duration-300 hover:border-[#C6A15B]/40 sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* تصویر */}
                    <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#203751] sm:h-32 sm:w-32">
                      {productImages[item.id] ? (
                        <Image
                          src={productImages[item.id]}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 128px"
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          تصویر محصول
                        </div>
                      )}
                    </div>

                    {/* مشخصات و قیمت */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-[#F3EBDD]">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        قیمت هر عدد:{" "}
                        {item.price.toLocaleString("fa-IR")} تومان
                      </p>

                      <p className="mt-3 text-lg font-extrabold text-[#E7C989]">
                        {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                      </p>

                      {/* کنترل تعداد و حذف */}
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-600/70 bg-[#0B1728]">
                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            aria-label={`کاهش تعداد ${item.name}`}
                            className="px-3 py-2 text-lg text-[#E7C989] transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            −
                          </button>

                          <span className="min-w-10 border-x border-slate-600/70 px-2 py-2 text-center text-sm">
                            {item.quantity.toLocaleString("fa-IR")}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              changeQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity >= 99}
                            aria-label={`افزایش تعداد ${item.name}`}
                            className="px-3 py-2 text-lg text-[#E7C989] transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteProduct(item.id)}
                          className="inline-flex items-center gap-2 text-sm text-rose-300 transition hover:text-rose-200"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path
                              d="M3 6h18M9 6V4h6v2m-9 0 1 14h10l1-14M10 10v6m4-6v6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          حذف محصول
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <div className="pt-3">
                <a
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#D8B873] transition hover:text-[#F3D79B]"
                >
                  <span aria-hidden="true">→</span>
                  ادامه خرید از فروشگاه
                </a>
              </div>
            </div>

            {/* خلاصه سفارش */}
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-[#C6A15B]/25 bg-[#14243A] p-6 shadow-xl shadow-black/10">
                <h2 className="text-xl font-bold">
                  خلاصه سفارش
                </h2>

                <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-300">
                  <span>تعداد محصولات</span>
                  <span>{itemCount.toLocaleString("fa-IR")} عدد</span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-300">
                  <span>جمع محصولات</span>
                  <span className="text-left">
                    {total.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-300">
                  <span>هزینه ارسال</span>
                  <span className="text-xs text-slate-400">
                    در مرحله بعد
                  </span>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-sm text-slate-400">
                    مبلغ محصولات
                  </p>

                  <p className="mt-2 text-2xl font-extrabold text-[#E7C989]">
                    {total.toLocaleString("fa-IR")} تومان
                  </p>

                  <p className="mt-3 text-xs leading-6 text-slate-400">
                    هزینه ارسال هنوز محاسبه نشده است و در مبلغ بالا لحاظ نشده.
                  </p>
                </div>


                <a
                  href="/checkout"
                  className="mt-6 block w-full rounded-xl bg-gradient-to-l from-[#B18A49] to-[#D9B773] px-5 py-4 text-center text-sm font-extrabold text-[#14243A] transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
                >
                  ادامه فرایند خرید
                </a>

                <p className="mt-3 text-center text-xs leading-6 text-slate-400">
                  مرحله پرداخت را در گام بعدی پیاده‌سازی می‌کنیم.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}