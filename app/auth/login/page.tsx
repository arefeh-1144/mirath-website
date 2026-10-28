"use client";

import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!phone.trim()) {
      setMessage("لطفاً شماره موبایل خود را وارد کنید.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "خطا در ورود به حساب کاربری");
        return;
      }

      setMessage("ورود موفق بود ✅");
    } catch {
      setMessage("ارتباط با سرور برقرار نشد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#0B1728] px-5 py-14 text-[#F3EBDD] md:py-20"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#C6A15B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-400/5 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#C6A15B]/25 bg-gradient-to-b from-[#192E46] to-[#14243A] shadow-2xl shadow-black/30">
        <div className="h-1 w-full bg-gradient-to-l from-transparent via-[#C6A15B] to-transparent" />

        <div className="p-6 sm:p-9">
          <a
            href="/"
            aria-label="بازگشت به صفحه اصلی میراث"
            className="mx-auto flex w-fit flex-col items-center"
          >
            <Image
              src="/LOGO.png"
              alt="لوگوی میراث"
              width={160}
              height={100}
              priority
              className="h-auto w-36 object-contain"
            />

            <span className="mt-2 text-xs text-[#D8B873]">
              روایت هنر و اصالت ایرانی
            </span>
          </a>

          <div className="mt-8 text-center">
            <h1 className="text-2xl font-extrabold md:text-3xl">
              ورود به حساب کاربری
            </h1>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#C6A15B]" />

            <p className="mt-4 text-sm leading-7 text-slate-300">
              برای ادامه‌ی خرید و همراهی با میراث وارد حساب خود شوید.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8">
            <label
              htmlFor="phone"
              className="mb-3 block text-sm font-semibold text-[#F3EBDD]"
            >
              شماره موبایل
            </label>

            <div className="group flex h-14 items-center gap-3 rounded-xl border border-slate-600/70 bg-[#0B1728]/70 px-4 transition duration-300 focus-within:border-[#C6A15B] focus-within:ring-4 focus-within:ring-[#C6A15B]/10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5 shrink-0 text-[#C6A15B]"
                aria-hidden="true"
              >
                <rect x="6" y="2" width="12" height="20" rx="2" />
                <path d="M10 18h4" strokeLinecap="round" />
              </svg>

              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
                className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#B18A49] to-[#D9B773] px-6 py-4 text-base font-extrabold text-[#14243A] shadow-lg shadow-black/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-[#E7C989] focus:ring-offset-2 focus:ring-offset-[#14243A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "در حال بررسی..." : "ورود به حساب"}
              {!loading && <span aria-hidden="true">←</span>}
            </button>

            {message && (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 rounded-xl border border-[#C6A15B]/25 bg-[#0B1728]/70 px-4 py-3 text-center text-sm leading-7 text-[#F3EBDD]"
              >
                {message}
              </div>
            )}
          </form>

          <div className="mt-7 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-slate-300">
              حساب کاربری ندارید؟
              <a
                href="/auth/register"
                className="mr-2 font-bold text-[#E7C989] underline decoration-[#C6A15B]/50 underline-offset-4 transition hover:text-[#F3D79B]"
              >
                ثبت‌نام کنید
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}