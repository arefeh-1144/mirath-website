import Image from "next/image";
export default function Home() {
  return (
    <main>

      <section className="relative isolate min-h-[460px] overflow-hidden sm:min-h-[500px]">

        <Image
          src="/hero.jpg"
          alt="میراث؛ هنر و چاپ و نمایش عکس"
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover"
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#071522]/80 via-[#071522]/45 to-[#071522]/10" />

        <div
          dir="ltr"
          className="relative z-20 flex min-h-[460px] items-center justify-start px-5 py-5 sm:min-h-[500px] sm:px-10 sm:py-6 lg:px-16"
        >
          <div
            dir="rtl"
            className="flex w-full max-w-2xl flex-col items-center text-center text-white md:w-[65%] lg:w-[60%]"
          >
            
            <Image
              src="/LOGO.png"
              alt="لوگوی میراث"
              width={500}
              height={500}
              priority
              className="mb-3 h-36 w-36 object-contain sm:mb-4 sm:h-44 sm:w-44"
            />

            <h1 className="mb-3 text-xl font-extrabold leading-relaxed text-[#D8B873] sm:text-2xl md:text-3xl">
              جایی که خاطره‌ها ماندگار می‌شوند
            </h1>

            <p className="mb-5 max-w-xl text-sm leading-7 text-white sm:mb-6 sm:text-base sm:leading-8">
              میراث، بازتابی از نگاه ما به زیبایی و هنر است؛ پیوندی میان گذشته و امروز،
              میان احساس و تصویر. جایی که سادگی معنا پیدا می‌کند و هر جزئیات،
              داستانی برای گفتن دارد. 🤍
            </p>

            <a
              href="/shop"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#D8B873] bg-[#C6A15B] px-7 py-3 text-sm font-bold text-[#0B1728] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#0B1728] hover:text-[#E7C989] sm:px-8 sm:py-3.5 sm:text-base"
            >
              مشاهده محصولات
              <span aria-hidden="true">←</span>
            </a>
          </div>
        </div>
        
      </section>

  <section
    id="categories"
    dir="rtl"
    className="relative overflow-hidden bg-[#0B1728] py-16 md:py-20"
  >
    <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#C6A15B]/5 blur-3xl" />

    <div className="relative mx-auto max-w-7xl px-5 md:px-8">

      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-medium tracking-wide text-[#C6A15B]">
          میراث؛ جایی که خاطره‌ها ماندگار می‌شوند
        </p>

        <h2 className="text-2xl font-extrabold text-[#F3EBDD] md:text-4xl">
          دسته‌بندی محصولات
        </h2>

        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C6A15B]" />

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
          میراث؛ جایی برای ماندگار کردن تصاویر شما
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {[
          {
            title: "چاپ عکس",
            description: "خاطرات شیرین خود را با کیفیتی زیبا و ماندگار چاپ کنید.",
            image: "/categories/photo-print.jpg",
            slug: "photo-print",
            emoji: "🖼️",
          },
          {
            title: "هدایای شخصی‌سازی‌شده",
            description: "هدیه‌ای متفاوت با عکس‌ها و خاطرات خاص شما.",
            image: "/categories/personalized-gifts.jpg",
            slug: "personalized-gifts",
            emoji: "🎁",
          },
          {
            title: "تقویم و کارت‌پستال",
            description: "روزهای مهم و پیام‌های دوست‌داشتنی را ماندگار کنید.",
            image: "/categories/calendar-postcard.jpg",
            slug: "calendar-postcard",
            emoji: "📅",
          },
          {
            title: "مگنت عکس",
            description: "تصاویر خاطره‌انگیز خود را به یادگاری‌های کوچک تبدیل کنید.",
            image: "/categories/photo-magnet.jpg",
            slug: "photo-magnet",
            emoji: "🧲",
          },
          {
            title: "قاب عکس",
            description: "عکس‌های عزیزتان را در قابی زیبا به نمایش بگذارید.",
            image: "/categories/photo-frame.jpg",
            slug: "photo-frame",
            emoji: "🖼️",
          },
          {
            title: "قاب موزیکال",
            description: "ترکیبی جذاب از تصویر، خاطره و موسیقی برای هدیه‌ای خاص.",
            image: "/categories/music-frame.jpg",
            slug: "music-frame",
            emoji: "🎵",
          },
          {
            title: "بوکمارک",
            description: "نشانک‌هایی زیبا برای همراهی با لحظه‌های کتاب‌خوانی.",
            image: "/categories/bookmark.jpg",
            slug: "bookmark",
            emoji: "📚",
          },
          {
            title: "پوستر",
            description: "تصاویر و طرح‌های دلخواهتان را به اثری چشم‌نواز تبدیل کنید.",
            image: "/categories/poster.jpg",
            slug: "poster",
            emoji: "🖼️",
          },
        ].map((category) => (
          <a
            key={category.slug}
            href={`/shop?category=${category.slug}`}
            className="group overflow-hidden rounded-2xl border border-[#C6A15B]/20 bg-gradient-to-b from-[#203751] to-[#14243A] transition duration-300 hover:-translate-y-1.5 hover:border-[#C6A15B]/70 hover:shadow-xl hover:shadow-black/20"
          >
            
            <div className="relative h-48 overflow-hidden bg-[#1B3048]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1728]/75 via-transparent to-transparent" />

              <span className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#D8B873]/40 bg-[#0B1728]/80 text-xl backdrop-blur-sm">
                {category.emoji}
              </span>
            </div>

            <div className="p-5 text-center">
              <h3 className="text-lg font-bold text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                {category.title}
              </h3>

              <p className="mt-3 min-h-[56px] text-sm leading-7 text-slate-300">
                {category.description}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#C6A15B]">
                مشاهده محصولات
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
              </div>
            </div>
          </a>
        ))}

      </div>
    </div>
  </section>

      <section dir="rtl" className="relative overflow-hidden bg-[#0B1728] py-16 md:py-20">
        <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#C6A15B]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 text-sm font-medium text-[#C6A15B]">
              انتخاب‌های ویژه میراث
            </p>

            <h2 className="text-3xl font-extrabold text-[#F3EBDD] md:text-4xl">
              محصولات منتخب
            </h2>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C6A15B]" />

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              مجموعه‌ای از آثار و محصولات هنری با الهام از فرهنگ و اصالت ایرانی
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14243A] transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/60 hover:shadow-xl hover:shadow-black/20">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/products/product2.jpg"
                  alt="محصول منتخب میراث"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-[#0B1728]/90 px-3 py-1 text-xs text-[#E7C989] backdrop-blur">
                  منتخب
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                  محصول اول
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  محصولی خاص برای دوستداران هنر ایرانی
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="text-sm font-bold text-[#E7C989]">
                    ۱,۵۰۰,۰۰۰ تومان
                  </span>
                  <a
                    href="/shop"
                    className="rounded-lg bg-[#C6A15B] px-4 py-2 text-sm font-bold text-[#14243A] transition hover:bg-[#E0C17C]"
                  >
                    مشاهده
                  </a>
                </div>
              </div>
            </article>

            <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14243A] transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/60 hover:shadow-xl hover:shadow-black/20">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/products/product1.jpg"
                  alt="قلب تزئینی"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                  قلب تزئینی
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  محصولی زیبا با حال‌وهوای ایرانی
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="text-sm font-bold text-[#E7C989]">
                    ۸۵۰,۰۰۰ تومان
                  </span>
                  <a
                    href="/shop"
                    className="rounded-lg bg-[#C6A15B] px-4 py-2 text-sm font-bold text-[#14243A] transition hover:bg-[#E0C17C]"
                  >
                    مشاهده
                  </a>
                </div>
              </div>
            </article>

            <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14243A] transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/60 hover:shadow-xl hover:shadow-black/20">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/products/product4.jpg"
                  alt="تابلو هنری"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                  تابلو هنری
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  تابلویی با الهام از هنر و چاپ و نمایش عکس
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="text-sm font-bold text-[#E7C989]">
                    ۱,۲۰۰,۰۰۰ تومان
                  </span>
                  <a
                    href="/shop"
                    className="rounded-lg bg-[#C6A15B] px-4 py-2 text-sm font-bold text-[#14243A] transition hover:bg-[#E0C17C]"
                  >
                    مشاهده
                  </a>
                </div>
              </div>
            </article>

            <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14243A] transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/60 hover:shadow-xl hover:shadow-black/20">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/products/product3.jpg"
                  alt="مگنت ایرانی"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                  مگنت ایرانی
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  یادگاری کوچک با طرح ایرانی
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="text-sm font-bold text-[#E7C989]">
                    ۳۵۰,۰۰۰ تومان
                  </span>
                  <a
                    href="/shop"
                    className="rounded-lg bg-[#C6A15B] px-4 py-2 text-sm font-bold text-[#14243A] transition hover:bg-[#E0C17C]"
                  >
                    مشاهده
                  </a>
                </div>
              </div>
            </article>

          </div>

          <div className="mt-10 text-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#C6A15B]/60 px-7 py-3 text-sm font-bold text-[#F3EBDD] transition duration-300 hover:border-[#C6A15B] hover:bg-[#C6A15B]/10 hover:text-[#E7C989]"
            >
              مشاهده همه محصولات
              <span aria-hidden="true">←</span>
            </a>
          </div>

        </div>
      </section>

      <section dir="rtl" className="relative overflow-hidden bg-[#14243A] py-16 md:py-20">
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#C6A15B]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium text-[#C6A15B]">
              تجربه‌ای مطمئن از خرید
            </p>

            <h2 className="text-3xl font-extrabold text-[#F3EBDD] md:text-4xl">
              خدمات میراث
            </h2>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C6A15B]" />

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              از انتخاب محصول تا دریافت سفارش، در کنار شما هستیم.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="group rounded-2xl border border-white/10 bg-[#1B3048] p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/50 hover:shadow-xl hover:shadow-black/20 md:p-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C6A15B]/25 bg-[#C6A15B]/10 text-[#E7C989] transition duration-300 group-hover:scale-110 group-hover:bg-[#C6A15B]/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8" aria-hidden="true">
                  <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" strokeLinejoin="round" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="18" cy="18" r="2" />
                  <path d="M6 10h5M6 13h3" strokeLinecap="round" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                ارسال سریع
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                سفارش شما با بسته‌بندی مناسب آماده می‌شود تا با دقت به دستتان برسد.
              </p>

              <div className="mx-auto mt-6 h-px w-12 bg-[#C6A15B]/50 transition-all duration-300 group-hover:w-20" />
            </div>

            <div className="group rounded-2xl border border-white/10 bg-[#1B3048] p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/50 hover:shadow-xl hover:shadow-black/20 md:p-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C6A15B]/25 bg-[#C6A15B]/10 text-[#E7C989] transition duration-300 group-hover:scale-110 group-hover:bg-[#C6A15B]/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8" aria-hidden="true">
                  <path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" strokeLinejoin="round" />
                  <path d="m8.5 12 2.3 2.3 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                توجه به کیفیت
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                تلاش می‌کنیم محصولات را با دقت در انتخاب، ساخت و جزئیات به شما ارائه کنیم.
              </p>

              <div className="mx-auto mt-6 h-px w-12 bg-[#C6A15B]/50 transition-all duration-300 group-hover:w-20" />
            </div>

            <div className="group rounded-2xl border border-white/10 bg-[#1B3048] p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/50 hover:shadow-xl hover:shadow-black/20 md:p-8">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#C6A15B]/25 bg-[#C6A15B]/10 text-[#E7C989] transition duration-300 group-hover:scale-110 group-hover:bg-[#C6A15B]/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8" aria-hidden="true">
                  <path d="M4 13v-2a8 8 0 0 1 16 0v2" strokeLinecap="round" />
                  <rect x="3" y="12" width="4" height="6" rx="2" />
                  <rect x="17" y="12" width="4" height="6" rx="2" />
                  <path d="M19 18c0 2-2 3-5 3h-2" strokeLinecap="round" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                پشتیبانی مشتریان
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-300">
                برای پرسش‌های مربوط به محصولات و سفارش‌ها، همراه شما هستیم.
              </p>

              <div className="mx-auto mt-6 h-px w-12 bg-[#C6A15B]/50 transition-all duration-300 group-hover:w-20" />
            </div>

          </div>
        </div>
      </section>

      <section
        id="journal"
        dir="rtl"
        className="relative overflow-hidden bg-[#0B1728] py-16 md:py-20"
      >
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#C6A15B]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">

          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium text-[#C6A15B]">
              راهنمایی و الهام برای انتخاب یادگاری‌های میراث
            </p>

            <h2 className="text-3xl font-extrabold text-[#F3EBDD] md:text-4xl">
              مجله میراث
            </h2>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C6A15B]" />

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              در مجله میراث، ایده‌های چاپ عکس، ساخت هدیه‌های شخصی‌سازی‌شده و راه‌های نگهداری خاطره‌ها را کشف کنید.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14243A] transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/50 hover:shadow-xl hover:shadow-black/20">
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#29445D] to-[#14243A]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.13),transparent_65%)]" />

                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.4" className="relative h-20 w-20 text-[#D8B873] transition duration-500 group-hover:scale-110" aria-hidden="true">
                  <path d="M50 10 59 32 82 22 72 44 94 50 72 58 82 80 59 69 50 92 41 69 18 80 28 58 6 50 28 44 18 22 41 32Z" />
                  <circle cx="50" cy="50" r="16" />
                  <circle cx="50" cy="50" r="7" />
                </svg>

                <span className="absolute right-4 top-4 rounded-full border border-[#C6A15B]/30 bg-[#0B1728]/80 px-3 py-1 text-xs text-[#E7C989]">
                  ایده‌های هدیه
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold leading-8 text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                  از عکس تا هدیه؛ خاطره‌ات را به میراث تبدیل کن
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  در میراث می‌توانی عکس‌های محبوبت را به هدیه‌هایی شخصی تبدیل کنی؛ از چاپ عکس تا مگنت و قاب‌های خاطره‌انگیز.
                </p>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <a
                    href="#journal"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#D8B873] transition hover:text-[#F3D79B]"
                  >
                    ادامه مطلب
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  </a>
                </div>
              </div>
            </article>

            <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14243A] transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/50 hover:shadow-xl hover:shadow-black/20">
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#344251] to-[#172638]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.13),transparent_65%)]" />

                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative h-20 w-20 text-[#D8B873] transition duration-500 group-hover:scale-110" aria-hidden="true">
                  <path d="M23 18h54v64H23z" />
                  <path d="M31 27h38M31 35h26" strokeLinecap="round" />
                  <path d="M50 43c-15 0-21 14-21 22h42c0-8-6-22-21-22Z" />
                  <path d="M40 56c5-8 15-8 20 0M50 43v22" strokeLinecap="round" />
                </svg>

                <span className="absolute right-4 top-4 rounded-full border border-[#C6A15B]/30 bg-[#0B1728]/80 px-3 py-1 text-xs text-[#E7C989]">
                  راهنمای انتخاب
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold leading-8 text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                  چطور محصول مناسب خاطره‌ات را انتخاب کنی؟
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  برای هدیه تولد، سالگرد یا یادگاری روزمره، میان چاپ عکس، مگنت، قاب موزیکال و هدایای شخصی‌سازی‌شده میراث انتخاب کن.
                </p>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <a
                    href="#journal"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#D8B873] transition hover:text-[#F3D79B]"
                  >
                    ادامه مطلب
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  </a>
                </div>
              </div>
            </article>

            <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14243A] transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/50 hover:shadow-xl hover:shadow-black/20">
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#283D53] to-[#14243A]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,161,91,0.13),transparent_65%)]" />

                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative h-20 w-20 text-[#D8B873] transition duration-500 group-hover:scale-110" aria-hidden="true">
                  <circle cx="50" cy="50" r="35" />
                  <circle cx="50" cy="50" r="25" />
                  <path d="M50 18 58 38 78 30 66 48 86 56 64 61 66 82 50 67 34 82 36 61 14 56 34 48 22 30 42 38Z" />
                  <circle cx="50" cy="50" r="7" />
                </svg>

                <span className="absolute right-4 top-4 rounded-full border border-[#C6A15B]/30 bg-[#0B1728]/80 px-3 py-1 text-xs text-[#E7C989]">
                  چاپ و نمایش عکس
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold leading-8 text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                  چطور عکس‌های محبوبت را در خانه ماندگار کنی؟
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  با چاپ عکس، قاب، پوستر و تقویم تصویری میراث، لحظه‌های دوست‌داشتنی را به بخشی از فضای زندگی‌ات تبدیل کن.
                </p>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <a
                    href="#journal"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#D8B873] transition hover:text-[#F3D79B]"
                  >
                    ادامه مطلب
                    <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                  </a>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

    </main>
  );
}