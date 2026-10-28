
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { CartItem } from "@/lib/cart";

type PaymentDetails = {
  cardNumber: string;
  accountName: string;
  bankName: string;
};

type CreatedOrder = {
  id: number;
  total: number;
  status: string;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [createdOrder, setCreatedOrder] =
    useState<CreatedOrder | null>(null);

  const [orderPhone, setOrderPhone] = useState("");
  const [paymentDetails, setPaymentDetails] =
    useState<PaymentDetails | null>(null);
  const [paymentDetailsError, setPaymentDetailsError] = useState("");

  const [paymentReference, setPaymentReference] = useState("");
  const [referenceSubmitting, setReferenceSubmitting] = useState(false);
  const [referenceMessage, setReferenceMessage] = useState("");
  const [referenceSaved, setReferenceSaved] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("miras-cart");

      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsed)) {
          setCart(parsed as CartItem[]);
        }
      }
    } catch {
      setCart([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ثبت سفارش در دیتابیس
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (cart.length === 0) {
      setMessage("سبد خرید شما خالی است.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      const orderData = {
        fullName: String(formData.get("fullName") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        province: String(formData.get("province") || "").trim(),
        city: String(formData.get("city") || "").trim(),
        address: String(formData.get("address") || "").trim(),
        postalCode: String(formData.get("postalCode") || "").trim(),
        note: String(formData.get("note") || "").trim(),
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "ثبت سفارش انجام نشد.");
        return;
      }

      const newOrder: CreatedOrder = {
        id: data.order.id,
        total: data.order.total,
        status: data.order.status,
      };

      // سفارش ثبت‌شده را در همین صفحه نگه می‌داریم.
      setCreatedOrder(newOrder);
      setOrderPhone(orderData.phone);
      setCart([]);
      localStorage.removeItem("miras-cart");

      // دریافت اطلاعات کارت مقصد
      try {
        const paymentResponse = await fetch("/api/payment-details", {
          method: "GET",
          cache: "no-store",
        });

        const paymentData = await paymentResponse.json();

        if (!paymentResponse.ok) {
          setPaymentDetailsError(
            paymentData.error || "اطلاعات حساب مقصد دریافت نشد."
          );
        } else {
          setPaymentDetails(paymentData as PaymentDetails);
        }
      } catch {
        setPaymentDetailsError(
          "دریافت اطلاعات حساب مقصد ممکن نشد. لطفاً بعداً دوباره تلاش کنید."
        );
      }
    } catch {
      setMessage("ارتباط با سرور برقرار نشد. وضعیت سفارش را بررسی کنید.");
    } finally {
      setSubmitting(false);
    }
  }

  // ارسال شماره پیگیری واریز
  async function handlePaymentReference(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setReferenceMessage("");

    if (!createdOrder) {
      setReferenceMessage("سفارش ثبت‌شده‌ای برای این پرداخت پیدا نشد.");
      return;
    }

    setReferenceSubmitting(true);

    try {
      const response = await fetch("/api/orders/payment-reference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: createdOrder.id,
          phone: orderPhone,
          paymentReference: paymentReference.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setReferenceMessage(
          data.error || "ثبت شماره پیگیری انجام نشد."
        );
        return;
      }

      setReferenceSaved(true);
      setReferenceMessage(
        data.message || "شماره پیگیری ثبت شد و منتظر بررسی مدیر است."
      );
    } catch {
      setReferenceMessage(
        "ارتباط با سرور برقرار نشد. دوباره تلاش کنید."
      );
    } finally {
      setReferenceSubmitting(false);
    }
  }

  if (!loaded) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#0B1728] p-10 text-center text-[#F3EBDD]"
      >
        در حال بارگذاری اطلاعات سفارش...
      </main>
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
            یک قدم تا تکمیل سفارش
          </p>

          <h1 className="text-3xl font-extrabold md:text-4xl">
            تسویه‌حساب
          </h1>

          <div className="mt-4 h-1 w-16 rounded-full bg-[#C6A15B]" />

          <p className="mt-4 text-sm leading-7 text-slate-300">
            خریدی آسان و مطمئن در فروشگاه میراث
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">

        {/* مرحله پرداخت: پس از ثبت سفارش */}
        {createdOrder ? (
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-[#14243A] p-6 sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-2xl text-emerald-300">
                ✓
              </div>

              <h2 className="mt-5 text-2xl font-extrabold">
                سفارش شما ثبت شد
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                شماره سفارش:
                <strong className="mr-2 text-[#E7C989]">
                  #{createdOrder.id.toLocaleString("fa-IR")}
                </strong>
              </p>

              <p className="mt-2 text-sm text-slate-300">
                مبلغ قابل پرداخت:
                <strong className="mr-2 text-[#E7C989]">
                  {createdOrder.total.toLocaleString("fa-IR")} تومان
                </strong>
              </p>
            </div>

            <div className="rounded-2xl border border-[#C6A15B]/25 bg-[#14243A] p-6 sm:p-8">
              <h2 className="text-xl font-bold">
                پرداخت کارت‌به‌کارت
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                مبلغ سفارش را به حساب زیر واریز کنید. پس از واریز،
                شماره پیگیری تراکنش را در فرم پایین ثبت کنید.
              </p>

              {paymentDetails ? (
                <div className="mt-6 space-y-4 rounded-xl border border-[#C6A15B]/30 bg-[#0B1728] p-5">
                  <div>
                    <p className="text-xs text-slate-400">
                      بانک مقصد
                    </p>
                    <p className="mt-1 font-semibold">
                      {paymentDetails.bankName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      شماره کارت مقصد
                    </p>
                    <p
                      dir="ltr"
                      className="mt-1 break-all text-lg font-bold tracking-wider text-[#E7C989]"
                    >
                      {paymentDetails.cardNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      نام صاحب حساب
                    </p>
                    <p className="mt-1 font-semibold">
                      {paymentDetails.accountName}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-slate-400">
                      مبلغ دقیق واریز
                    </p>
                    <p className="mt-2 text-2xl font-extrabold text-[#E7C989]">
                      {createdOrder.total.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  role="alert"
                  className="mt-5 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm leading-7 text-amber-200"
                >
                  {paymentDetailsError ||
                    "در حال دریافت اطلاعات حساب مقصد..."}
                  <p className="mt-2">
                    سفارش ثبت شده است؛ پیش از واریز، اطلاعات حساب مقصد را از
                    مدیر فروشگاه دریافت کنید.
                  </p>
                </div>
              )}

              {!referenceSaved ? (
                <form
                  onSubmit={handlePaymentReference}
                  className="mt-8 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="paymentReference"
                      className="mb-2 block text-sm font-semibold"
                    >
                      شماره پیگیری واریز
                    </label>

                    <input
                      id="paymentReference"
                      name="paymentReference"
                      type="text"
                      required
                      minLength={3}
                      maxLength={100}
                      value={paymentReference}
                      onChange={(event) =>
                        setPaymentReference(event.target.value)
                      }
                      placeholder="شماره پیگیری درج‌شده در رسید بانکی"
                      className="w-full rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#C6A15B] disabled:opacity-60"
                    />
                  </div>

                  {referenceMessage && (
                    <p
                      role="alert"
                      className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm leading-7 text-rose-200"
                    >
                      {referenceMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={referenceSubmitting}
                    className="w-full rounded-xl bg-gradient-to-l from-[#B18A49] to-[#D9B773] px-6 py-4 font-extrabold text-[#14243A] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {referenceSubmitting
                      ? "در حال ثبت شماره پیگیری..."
                      : "ارسال شماره پیگیری"}
                  </button>
                </form>
              ) : (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5"
                >
                  <p className="font-bold text-emerald-200">
                    شماره پیگیری ثبت شد
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {referenceMessage}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    تا زمانی که مدیر واریز را بررسی نکند، پرداخت تأییدشده
                    محسوب نمی‌شود.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/track-order"
                className="rounded-xl border border-[#C6A15B]/40 px-5 py-3 text-sm font-semibold text-[#E7C989] transition hover:bg-[#C6A15B]/10"
              >
                پیگیری وضعیت سفارش
              </a>

              <a
                href="/shop"
                className="rounded-xl bg-[#C6A15B] px-5 py-3 text-sm font-bold text-[#14243A] transition hover:bg-[#E0C17C]"
              >
                بازگشت به فروشگاه
              </a>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* سبد خالی */
          <div className="rounded-2xl border border-white/10 bg-[#14243A] p-8 text-center">
            <h2 className="text-xl font-bold">
              سبد خرید شما خالی است
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              ابتدا محصول موردنظرتان را از فروشگاه انتخاب کنید.
            </p>

            <a
              href="/shop"
              className="mt-6 inline-flex rounded-xl bg-[#C6A15B] px-6 py-3 font-bold text-[#14243A] transition hover:bg-[#E0C17C]"
            >
              مشاهده فروشگاه
            </a>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-3">
            {/* فرم اطلاعات گیرنده */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-white/10 bg-[#14243A] p-5 sm:p-7 lg:col-span-2"
            >
              <div>
                <h2 className="text-xl font-bold">
                  اطلاعات گیرنده
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  اطلاعات را با دقت وارد کنید.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium"
                  >
                    نام و نام خانوادگی *
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={100}
                    placeholder="نام گیرنده"
                    className="w-full rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    شماره موبایل *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[0-9۰-۹٠-٩+\-\s]{10,15}"
                    title="شماره تماس را با ارقام فارسی یا انگلیسی وارد کنید."
                    placeholder="مثلاً 09123456789"
                    className="w-full rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="province"
                    className="mb-2 block text-sm font-medium"
                  >
                    استان *
                  </label>

                  <input
                    id="province"
                    name="province"
                    type="text"
                    required
                    autoComplete="address-level1"
                    maxLength={70}
                    placeholder="نام استان"
                    className="w-full rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#C6A15B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium"
                  >
                    شهر *
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    autoComplete="address-level2"
                    maxLength={70}
                    placeholder="نام شهر"
                    className="w-full rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#C6A15B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-medium"
                  >
                    نشانی کامل *
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    required
                    autoComplete="street-address"
                    minLength={10}
                    maxLength={500}
                    rows={3}
                    placeholder="خیابان، کوچه، پلاک، واحد و جزئیات نشانی"
                    className="w-full resize-y rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-[#C6A15B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postalCode"
                    className="mb-2 block text-sm font-medium"
                  >
                    کد پستی *
                  </label>

                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    required
                    inputMode="numeric"
                    autoComplete="postal-code"
                    pattern="[0-9۰-۹٠-٩]{10}"
                    title="کد پستی باید ۱۰ رقم باشد."
                    placeholder="کد پستی ۱۰ رقمی"
                    className="w-full rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#C6A15B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="note"
                    className="mb-2 block text-sm font-medium"
                  >
                    توضیحات سفارش (اختیاری)
                  </label>

                  <textarea
                    id="note"
                    name="note"
                    maxLength={500}
                    rows={2}
                    placeholder="توضیحات تکمیلی برای تحویل سفارش"
                    className="w-full resize-y rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              {message && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm leading-7 text-rose-200"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-l from-[#B18A49] to-[#D9B773] px-6 py-4 font-extrabold text-[#14243A] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "در حال ثبت سفارش..." : "ثبت سفارش و ادامه پرداخت"}
              </button>
            </form>

            {/* خلاصه سفارش */}
            <aside className="rounded-2xl border border-[#C6A15B]/25 bg-[#14243A] p-5 sm:p-6 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold">
                خلاصه سفارش
              </h2>

              <div className="mt-6 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 border-b border-white/10 pb-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        تعداد: {item.quantity.toLocaleString("fa-IR")}
                      </p>
                    </div>

                    <span className="shrink-0 text-left text-sm font-bold text-[#E7C989]">
                      {(item.price * item.quantity).toLocaleString("fa-IR")}
                      <span className="mr-1 text-xs font-normal">
                        تومان
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-sm text-slate-300">
                  جمع محصولات
                </span>

                <span className="text-left font-bold">
                  {total.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-sm text-slate-300">
                  هزینه ارسال
                </span>

                <span className="text-xs text-slate-400">
                  هنوز محاسبه نشده
                </span>
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400">
                  جمع محصولات، بدون هزینه ارسال
                </p>

                <p className="mt-2 text-2xl font-extrabold text-[#E7C989]">
                  {total.toLocaleString("fa-IR")} تومان
                </p>
              </div>

              <a
                href="/cart"
                className="mt-6 block rounded-xl border border-[#C6A15B]/40 px-5 py-3 text-center text-sm font-semibold text-[#E7C989] transition hover:bg-[#C6A15B]/10"
              >
                بازگشت به سبد خرید
              </a>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}