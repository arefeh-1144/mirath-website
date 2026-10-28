
"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type TrackedItem = {
    productName: string;
    quantity: number;
    unitPrice: number;
};

type TrackedOrder = {
    id: number;
    status: string;
    total: number;
    createdAt: string;
    items: TrackedItem[];
};

const statusDetails: Record<string, { label: string; description: string }> = {
    pending: {
        label: "در انتظار بررسی",
        description: "سفارش شما ثبت شده و منتظر بررسی است.",
    },
    processing: {
        label: "در حال آماده‌سازی",
        description: "سفارش شما در حال آماده‌سازی است.",
    },
    shipped: {
        label: "ارسال‌شده",
        description: "سفارش شما ارسال شده است.",
    },
    delivered: {
        label: "تحویل‌شده",
        description: "سفارش شما تحویل‌شده ثبت شده است.",
    },
    cancelled: {
        label: "لغوشده",
        description: "وضعیت سفارش شما لغوشده است.",
    },
};

function toEnglishDigits(value: string) {
    return value
        .replace(/[۰-۹]/g, (digit) =>
            String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
        )
        .replace(/[٠-٩]/g, (digit) =>
            String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
        );
}

function formatPrice(value: number) {
    return `${value.toLocaleString("fa-IR")} تومان`;
}

function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "تاریخ ثبت نامشخص";
    }

    return date.toLocaleString("fa-IR");
}

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [phone, setPhone] = useState("");
    const [order, setOrder] = useState<TrackedOrder | null>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleTrack(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setMessage("");
        setOrder(null);

        const normalizedOrderId = toEnglishDigits(orderId.trim())
            .replace(/[^0-9]/g, "");

        const normalizedPhone = phone.trim();

        if (!normalizedOrderId) {
            setMessage("لطفاً شماره سفارش معتبر را وارد کنید.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/orders/track", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId: Number(normalizedOrderId),
                    phone: normalizedPhone,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(
                    data.error || "سفارشی با اطلاعات واردشده پیدا نشد."
                );
                return;
            }

            setOrder(data.order as TrackedOrder);
        } catch {
            setMessage("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
        } finally {
            setLoading(false);
        }
    }

    const currentStatus = order
        ? statusDetails[order.status] ?? {
            label: order.status,
            description: "وضعیت سفارش دریافت شد.",
        }
        : null;

    return (
        <main
            dir="rtl"
            className="min-h-screen bg-[#0B1728] text-[#F3EBDD]"
        >
            {/* عنوان صفحه */}
            <section className="relative overflow-hidden border-b border-[#C6A15B]/20 bg-gradient-to-bl from-[#203751] via-[#14243A] to-[#0B1728] px-5 py-14 md:py-20">
                <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#C6A15B]/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl text-center">
                    <p className="mb-3 text-sm font-medium text-[#C6A15B]">
                        همراه شما تا رسیدن سفارش
                    </p>

                    <h1 className="text-3xl font-extrabold md:text-5xl">
                        پیگیری سفارش
                    </h1>

                    <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C6A15B]" />

                    <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-slate-300 md:text-base">
                        شماره سفارش و شماره موبایلی را که هنگام خرید وارد کرده‌اید
                        بنویسید تا وضعیت سفارش خود را مشاهده کنید.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
                {/* فرم پیگیری */}
                <div className="rounded-3xl border border-[#C6A15B]/25 bg-gradient-to-b from-[#192E46] to-[#14243A] p-6 shadow-2xl shadow-black/20 sm:p-9">
                    <div className="mb-7">
                        <h2 className="text-xl font-bold">
                            اطلاعات سفارش
                        </h2>

                        <p className="mt-2 text-sm leading-7 text-slate-400">
                            برای حفظ حریم خصوصی، هر دو مشخصه باید با اطلاعات سفارش مطابقت داشته باشند.
                        </p>
                    </div>

                    <form onSubmit={handleTrack} className="space-y-5">
                        <div>
                            <label
                                htmlFor="orderId"
                                className="mb-2 block text-sm font-semibold"
                            >
                                شماره سفارش
                            </label>

                            <input
                                id="orderId"
                                type="text"
                                inputMode="numeric"
                                autoComplete="off"
                                required
                                value={orderId}
                                onChange={(event) => setOrderId(event.target.value)}
                                placeholder="مثلاً ۱۲۳"
                                className="w-full rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#C6A15B] focus:ring-4 focus:ring-[#C6A15B]/10"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="trackingPhone"
                                className="mb-2 block text-sm font-semibold"
                            >
                                شماره موبایل ثبت‌شده در سفارش
                            </label>

                            <input
                                id="trackingPhone"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                required
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
                                className="w-full rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#C6A15B] focus:ring-4 focus:ring-[#C6A15B]/10"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-l from-[#B18A49] to-[#D9B773] px-6 py-4 font-extrabold text-[#14243A] transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "در حال بررسی سفارش..." : "پیگیری سفارش"}
                            {!loading && <span aria-hidden="true">←</span>}
                        </button>
                    </form>

                    {message && (
                        <div
                            role="alert"
                            aria-live="polite"
                            className="mt-5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm leading-7 text-rose-200"
                        >
                            {message}
                        </div>
                    )}
                </div>

                {/* نتیجه پیگیری */}
                {order && currentStatus && (
                    <div className="mt-7 overflow-hidden rounded-3xl border border-[#C6A15B]/25 bg-[#14243A]">
                        <div className="border-b border-white/10 p-6 sm:p-8">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <p className="text-sm text-slate-400">
                                        شماره سفارش
                                    </p>

                                    <h2 className="mt-2 text-2xl font-extrabold">
                                        #{order.id.toLocaleString("fa-IR")}
                                    </h2>
                                </div>

                                <span className="inline-flex w-fit items-center rounded-full border border-[#C6A15B]/35 bg-[#C6A15B]/10 px-4 py-2 text-sm font-semibold text-[#E7C989]">
                                    {currentStatus.label}
                                </span>
                            </div>

                            <p className="mt-5 text-sm leading-7 text-slate-300">
                                {currentStatus.description}
                            </p>
                        </div>

                        <div className="space-y-5 p-6 sm:p-8">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <span className="text-sm text-slate-400">
                                    تاریخ ثبت سفارش
                                </span>

                                <span className="text-sm">
                                    {formatDate(order.createdAt)}
                                </span>
                            </div>

                            <div>
                                <h3 className="mb-4 font-bold">
                                    محصولات سفارش
                                </h3>

                                <div className="space-y-3">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={`${item.productName}-${index}`}
                                            className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-[#0B1728]/50 p-4"
                                        >
                                            <div>
                                                <p className="text-sm font-semibold">
                                                    {item.productName}
                                                </p>

                                                <p className="mt-2 text-xs text-slate-400">
                                                    تعداد: {item.quantity.toLocaleString("fa-IR")}
                                                </p>
                                            </div>

                                            <p className="shrink-0 text-left text-sm font-bold text-[#E7C989]">
                                                {formatPrice(item.unitPrice * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                                <span className="text-sm text-slate-300">
                                    جمع محصولات
                                </span>

                                <span className="text-lg font-extrabold text-[#E7C989]">
                                    {formatPrice(order.total)}
                                </span>
                            </div>

                            <p className="text-xs leading-6 text-slate-400">
                                این مبلغ مربوط به محصولات است و ممکن است هزینه‌ی ارسال در آن لحاظ نشده باشد.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setOrder(null);
                                    setMessage("");
                                    setOrderId("");
                                    setPhone("");
                                }}
                                className="w-full rounded-xl border border-[#C6A15B]/40 px-5 py-3 text-sm font-semibold text-[#E7C989] transition hover:bg-[#C6A15B]/10"
                            >
                                پیگیری سفارش دیگر
                            </button>
                        </div>
                    </div>
                )}

                <p className="mt-7 text-center text-sm text-slate-400">
                    هنوز محصولی انتخاب نکرده‌اید؟{" "}
                    <a
                        href="/shop"
                        className="font-semibold text-[#E7C989] underline underline-offset-4 transition hover:text-[#F3D79B]"
                    >
                        ورود به فروشگاه میراث
                    </a>
                </p>
            </section>
        </main>
    );
}