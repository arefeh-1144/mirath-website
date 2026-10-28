
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="relative mt-16 overflow-hidden border-t border-[#C6A15B]/30 bg-[#0B1728] text-[#F3EBDD]"
    >
      {/* خط طلایی بالای فوتر */}
      <div className="h-1 w-full bg-gradient-to-l from-transparent via-[#C6A15B] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">

        {/* بخش اصلی فوتر */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">

          {/* معرفی میراث */}
          <div>
            <a
              href="/"
              aria-label="صفحه اصلی میراث"
              className="group mb-5 inline-flex items-center gap-3"
            >
              <Image
                src="/logo.png"
                alt="لوگوی میراث"
                width={72}
                height={72}
                className="h-16 w-16 object-contain transition duration-300 group-hover:scale-105"
              />

              <div>
                <h3 className="text-2xl font-extrabold text-[#F3EBDD]">
                  میراث
                </h3>
                <p className="mt-1 text-xs text-[#C6A15B]">
                  روایت هنر و اصالت ایرانی
                </p>
              </div>
            </a>

            <p className="max-w-sm text-sm leading-8 text-slate-300">
              میراث، روایت‌گر هنر، فرهنگ و اصالت ایرانی است.
              ما با چاپ تصاویر و خلق محصولات هنری، زیبایی خاطرات
              و ریشه‌های فرهنگی‌مان را ماندگار می‌کنیم.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span className="h-px w-10 bg-[#C6A15B]" />
              <span className="text-xs text-[#C6A15B]">
                هنر دیروز، برای زندگی امروز
              </span>
            </div>
          </div>

          {/* دسترسی سریع */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-[#F3EBDD]">
              دسترسی سریع
            </h3>

            <div className="mb-6 h-0.5 w-10 rounded-full bg-[#C6A15B]" />


            <nav className="flex flex-col items-start gap-4 text-sm text-slate-300">
              <a
                href="/"
                className="transition duration-200 hover:translate-x-[-3px] hover:text-[#E7C989]"
              >
                صفحه اصلی
              </a>

              <a
                href="/shop"
                className="transition duration-200 hover:translate-x-[-3px] hover:text-[#E7C989]"
              >
                فروشگاه محصولات
              </a>

              <a
                href="/#journal"
                className="transition duration-200 hover:translate-x-[-3px] hover:text-[#E7C989]"
              >
                مجله میراث
              </a>

              <a
                href="/track-order"
                className="transition duration-200 hover:translate-x-[-3px] hover:text-[#E7C989]"
              >
                پیگیری سفارش
              </a>
            </nav>
          </div>

          {/* ارتباط با ما */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-[#F3EBDD]">
              همراه میراث باشید
            </h3>

            <div className="mb-6 h-0.5 w-10 rounded-full bg-[#C6A15B]" />

            <p className="mb-5 text-sm leading-7 text-slate-300">
              برای آشنایی با محصولات هنری و آثار الهام‌گرفته از فرهنگ ایرانی،
              به فروشگاه میراث سر بزنید.
            </p>

            <a
              href="/shop"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#C6A15B]/60 bg-[#C6A15B]/10 px-5 py-3 text-sm font-bold text-[#E7C989] transition duration-300 hover:border-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0B1728]"
            >
              مشاهده فروشگاه
              <span aria-hidden="true">←</span>
            </a>
          </div>

        </div>

        {/* جداکننده */}
        <div className="mt-12 border-t border-white/10" />

        {/* نوار پایانی */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-center sm:flex-row sm:text-right">
          <p className="text-xs leading-6 text-slate-400">
            © تمامی حقوق برای میراث محفوظ است.
          </p>

          <a
            href="/"
            className="text-xs text-slate-400 transition hover:text-[#E7C989]"
          >
            ساخته‌شده با عشق به هنر و فرهنگ ایرانی
            <span className="mr-1 text-[#C6A15B]">✦</span>
          </a>
        </div>

      </div>
    </footer>
  );
}