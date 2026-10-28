
"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type OrderItem = {
  id: number;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
};

type AdminOrder = {
  id: number;
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  note: string | null;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

const orderStatuses = [
  { value: "pending", label: "در انتظار بررسی" },
  { value: "processing", label: "در حال آماده‌سازی" },
  { value: "shipped", label: "ارسال‌شده" },
  { value: "delivered", label: "تحویل‌شده" },
  { value: "cancelled", label: "لغوشده" },
] as const;

function formatPrice(price: number) {
  return `${price.toLocaleString("fa-IR")} تومان`;
}

function statusLabel(status: string) {
  return (
    orderStatuses.find((item) => item.value === status)?.label ?? status
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [ordersMessage, setOrdersMessage] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);

  // دریافت سفارش‌ها از API امن مدیریت
  async function loadOrders() {
    setLoadingOrders(true);
    setOrdersError("");
    setOrdersMessage("");

    try {
      const response = await fetch("/api/admin/orders", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "دریافت سفارش‌ها ناموفق بود."
        );
      }

      if (!Array.isArray(data.orders)) {
        throw new Error("ساختار پاسخ سفارش‌ها معتبر نیست.");
      }

      setOrders(data.orders as AdminOrder[]);
    } catch (error) {
      setOrdersError(
        error instanceof Error
          ? error.message
          : "خطا در دریافت سفارش‌ها."
      );
    } finally {
      setLoadingOrders(false);
    }
  }

  // تغییر وضعیت سفارش و ذخیره در دیتابیس
  async function updateOrderStatus(
    orderId: number,
    status: string
  ) {
    if (updatingOrderId !== null) return;

    setOrdersError("");
    setOrdersMessage("");
    setUpdatingOrderId(orderId);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "تغییر وضعیت سفارش ناموفق بود."
        );
      }

      const savedStatus =
        typeof data.order?.status === "string"
          ? data.order.status
          : status;

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: savedStatus }
            : order
        )
      );

      setOrdersMessage(
        `وضعیت سفارش شماره ${orderId.toLocaleString("fa-IR")} به «${statusLabel(savedStatus)}» تغییر کرد.`
      );
    } catch (error) {
      setOrdersError(
        error instanceof Error
          ? error.message
          : "ارتباط با سرور برقرار نشد."
      );
    } finally {
      setUpdatingOrderId(null);
    }
  }


  async function handleLogout() {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        setOrdersError("خروج از پنل انجام نشد. دوباره تلاش کنید.");
        return;
      }

      setLoggedIn(false);
      setOrders([]);
      setOrdersError("");
      setOrdersMessage("");
      setMessage("");
      setPassword("");
    } catch {
      setOrdersError("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    }
  }
  // ورود مدیر
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "ورود مدیر ناموفق بود.");
        return;
      }

      setPassword("");
      setLoggedIn(true);

      await loadOrders();
    } catch {
      setMessage("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0B1728] px-5 py-12 text-[#F3EBDD] md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-7xl">

        {!loggedIn ? (
          /* فرم ورود مدیر */
          <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-[#C6A15B]/25 bg-gradient-to-b from-[#192E46] to-[#14243A] shadow-2xl shadow-black/20">

            <div className="h-1 bg-gradient-to-l from-transparent via-[#C6A15B] to-transparent" />

            <div className="p-7 sm:p-9">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C6A15B]/30 bg-[#0B1728]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-10 w-10 text-[#D8B873]"
                    aria-hidden="true"
                  >
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </div>

                <h1 className="mt-5 text-2xl font-extrabold">
                  پنل مدیریت میراث
                </h1>

                <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#C6A15B]" />

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  برای مشاهده و مدیریت سفارش‌ها، رمز مدیر را وارد کنید.
                </p>
              </div>

              <form onSubmit={handleLogin} className="mt-8">
                <label
                  htmlFor="admin-password"
                  className="mb-3 block text-sm font-semibold"
                >
                  رمز عبور مدیر
                </label>

                <input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="رمز مدیر را وارد کنید"
                  className="w-full rounded-xl border border-slate-600/70 bg-[#0B1728] px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#C6A15B] focus:ring-4 focus:ring-[#C6A15B]/10"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full rounded-xl bg-gradient-to-l from-[#B18A49] to-[#D9B773] px-6 py-4 font-extrabold text-[#14243A] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "در حال بررسی..." : "ورود به پنل مدیریت"}
                </button>

                {message && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-center text-sm leading-6 text-rose-200"
                  >
                    {message}
                  </p>
                )}
              </form>

              <a
                href="/"
                className="mt-7 block text-center text-sm text-slate-400 transition hover:text-[#E7C989]"
              >
                بازگشت به فروشگاه میراث
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* سربرگ پنل */}
            <div className="mb-8 flex flex-col justify-between gap-5 rounded-2xl border border-[#C6A15B]/20 bg-[#14243A] p-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-[#C6A15B]">
                  مدیریت فروشگاه
                </p>

                <h1 className="mt-2 text-2xl font-extrabold md:text-3xl">
                  سفارش‌های میراث
                </h1>

                <p className="mt-3 text-sm text-slate-300">
                  مشاهده سفارش‌ها و مدیریت وضعیت آن‌ها
                </p>
              </div>


              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={loadOrders}
                  disabled={loadingOrders || updatingOrderId !== null}
                  className="rounded-xl border border-[#C6A15B]/40 px-5 py-3 text-sm font-bold text-[#E7C989] transition hover:bg-[#C6A15B]/10 disabled:opacity-50"
                >
                  {loadingOrders ? "در حال بارگذاری..." : "تازه‌سازی سفارش‌ها"}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loading || loadingOrders || updatingOrderId !== null}
                  className="rounded-xl border border-rose-400/40 px-5 py-3 text-sm font-bold text-rose-200 transition hover:bg-rose-500/10 disabled:opacity-50"
                >
                  خروج از پنل مدیریت
                </button>
              </div>
            </div>

            {/* پیام موفقیت یا خطا */}
            {ordersMessage && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm leading-7 text-emerald-200"
              >
                {ordersMessage}
              </div>
            )}

            {ordersError && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm leading-7 text-rose-200"
              >
                {ordersError}
              </div>
            )}

            {/* آمار سفارش‌ها */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#14243A] p-5">
                <p className="text-sm text-slate-400">
                  تعداد سفارش‌ها
                </p>

                <p className="mt-3 text-3xl font-extrabold text-[#E7C989]">
                  {orders.length.toLocaleString("fa-IR")}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#14243A] p-5">
                <p className="text-sm text-slate-400">
                  مجموع مبالغ سفارش‌ها
                </p>

                <p className="mt-3 text-2xl font-extrabold text-[#E7C989]">
                  {formatPrice(
                    orders.reduce((sum, order) => sum + order.total, 0)
                  )}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  شامل همه وضعیت‌ها؛ نه لزوماً پرداخت‌شده
                </p>
              </div>
            </div>

            {/* وضعیت بارگذاری */}
            {loadingOrders ? (
              <div className="rounded-2xl border border-white/10 bg-[#14243A] p-10 text-center text-slate-300">
                در حال دریافت سفارش‌ها...
              </div>
            ) : ordersError && orders.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#14243A] p-8 text-center">
                <p className="text-slate-300">
                  سفارش‌ها بارگذاری نشدند. پس از بررسی خطا، دوباره تلاش کنید.
                </p>

                <button
                  type="button"
                  onClick={loadOrders}
                  className="mt-5 rounded-xl bg-[#C6A15B] px-5 py-3 text-sm font-bold text-[#14243A]"
                >
                  تلاش مجدد
                </button>
              </div>
            ) : orders.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#14243A] p-10 text-center">
                <h2 className="text-xl font-bold">
                  هنوز سفارشی ثبت نشده است
                </h2>

                <p className="mt-3 text-sm text-slate-300">
                  سفارش‌های جدید پس از ثبت موفق در این بخش نمایش داده می‌شوند.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {orders.map((order) => (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#14243A]"
                  >
                    {/* سربرگ کارت سفارش */}
                    <div className="flex flex-col justify-between gap-5 border-b border-white/10 p-5 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-xs text-[#C6A15B]">
                          شماره سفارش
                        </p>

                        <h2 className="mt-1 text-xl font-extrabold">
                          #{order.id.toLocaleString("fa-IR")}
                        </h2>

                        <p className="mt-2 text-xs text-slate-400">
                          وضعیت فعلی: {statusLabel(order.status)}
                        </p>
                      </div>

                      {/* منوی تغییر وضعیت */}
                      <div className="w-full sm:max-w-xs">
                        <label
                          htmlFor={`order-status-${order.id}`}
                          className="mb-2 block text-xs text-slate-400"
                        >
                          تغییر وضعیت سفارش
                        </label>

                        <select
                          id={`order-status-${order.id}`}
                          value={order.status}
                          disabled={updatingOrderId !== null}
                          onChange={(event) =>
                            updateOrderStatus(order.id, event.target.value)
                          }
                          className="w-full rounded-xl border border-[#C6A15B]/30 bg-[#0B1728] px-3 py-3 text-sm text-[#E7C989] outline-none transition focus:border-[#C6A15B] disabled:cursor-wait disabled:opacity-50"
                        >
                          {orderStatuses.map((status) => (
                            <option
                              key={status.value}
                              value={status.value}
                            >
                              {status.label}
                            </option>
                          ))}
                        </select>

                        {updatingOrderId === order.id && (
                          <p className="mt-2 text-xs text-slate-400">
                            در حال ذخیره تغییرات...
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          مبلغ سفارش
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#E7C989]">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>

                    {/* جزئیات سفارش */}
                    <div className="grid gap-6 p-5 md:grid-cols-2">
                      {/* اطلاعات گیرنده */}
                      <div>
                        <h3 className="mb-4 font-bold">
                          اطلاعات گیرنده
                        </h3>

                        <div className="space-y-3 text-sm leading-7">
                          <p>
                            <span className="text-slate-400">نام: </span>
                            {order.fullName}
                          </p>

                          <p>
                            <span className="text-slate-400">موبایل: </span>
                            {order.phone}
                          </p>

                          <p>
                            <span className="text-slate-400">
                              استان و شهر:{" "}
                            </span>
                            {order.province}، {order.city}
                          </p>

                          <p>
                            <span className="text-slate-400">آدرس: </span>
                            {order.address}
                          </p>

                          <p>
                            <span className="text-slate-400">کد پستی: </span>
                            {order.postalCode}
                          </p>

                          {order.note && (
                            <p>
                              <span className="text-slate-400">
                                توضیحات:{" "}
                              </span>
                              {order.note}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* اقلام سفارش */}
                      <div>
                        <h3 className="mb-4 font-bold">
                          اقلام سفارش
                        </h3>

                        <div className="space-y-3">
                          {(order.items || []).map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between gap-4 rounded-xl border border-white/10 bg-[#0B1728]/50 p-3 text-sm"
                            >
                              <div>
                                <p className="font-semibold">
                                  {item.productName}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  تعداد:{" "}
                                  {item.quantity.toLocaleString("fa-IR")}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                  قیمت هر عدد: {formatPrice(item.unitPrice)}
                                </p>
                              </div>

                              <p className="shrink-0 text-left text-sm font-bold text-[#E7C989]">
                                {formatPrice(item.unitPrice * item.quantity)}
                              </p>
                            </div>
                          ))}

                          {(!order.items || order.items.length === 0) && (
                            <p className="text-sm text-slate-400">
                              اقلامی برای این سفارش دریافت نشد.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}