
"use client";

import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "قلب تزئینی",
    description: "محصولی زیبا با حال‌وهوای ایرانی",
    price: 850000,
    category: "محصولات دکوراتیو",
    image: "/products/product1.jpg",
    href: "/product/heart",
    badge: "محبوب",
  },
  {
    id: 2,
    name: "تابلو هنری",
    description: "اثری الهام‌گرفته از هنر و فرهنگ ایرانی",
    price: 1200000,
    category: "محصولات دکوراتیو",
    image: "/products/product4.jpg",
    href: "/product/painting",
    badge: "هنری",
  },
  {
    id: 3,
    name: "مگنت ایرانی",
    description: "یادگاری کوچک با طرح ایرانی",
    price: 350000,
    category: "مگنت عکس",
    image: "/products/product3.jpg",
    href: "/product/magnet",
    badge: "خاص",
  },
  {
    id: 4,
    name: "یادگاری میراث",
    description: "هدیه‌ای با الهام از فرهنگ و هنر ایران",
    price: 650000,
    category: "هدیه‌های خاص",
    image: "/products/product2.jpg",
    href: "/product/souvenir",
    badge: "منتخب",
  },
];

const shopCategories = [
  {
    title: "چاپ عکس",
    description: "چاپ عکس در ابعاد مختلف و عکس با حاشیه سفید",
    image: "/products/product4.jpg",
  },
  {
    title: "قاب عکس",
    description: "قاب چوبی، قاب چندعکسی و قاب موزیکال",
    image: "/products/product2.jpg",
  },
  {
    title: "شاسی عکس",
    description: "چاپ عکس روی شاسی با جلوه‌ای ماندگار",
    image: "/products/product4.jpg",
  },
  {
    title: "مگنت عکس",
    description: "مگنت یخچال و مگنت پلکسی",
    image: "/products/product3.jpg",
  },
  {
    title: "عکس پشت گوشی",
    description: "عکس‌های مناسب قرار گرفتن پشت قاب گوشی",
    image: "/products/product1.jpg",
  },
  {
    title: "محصولات کاغذی",
    description: "بوکمارک، کارت پستال و پوستر",
    image: "/products/product4.jpg",
  },
  {
    title: "هدیه‌های خاص",
    description: "پک هدیه، پوستر و محصولات مناسبتی",
    image: "/products/product2.jpg",
  },
  {
    title: "محصولات دکوراتیو",
    description: "قاب اتاق کودک، قاب متن و شعر",
    image: "/products/product1.jpg",
  },
  {
    title: "تقویم و آلبوم",
    description: "تقویم چاپی و آلبوم عکس",
    image: "/products/product3.jpg",
  },
];

const categories = [
  "همه محصولات",
  ...shopCategories.map((item) => item.title),
];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه محصولات");
  const [sort, setSort] = useState("featured");

  function selectCategory(selectedCategory: string) {
    setCategory(selectedCategory);
    setSearch("");

    window.setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        category === "همه محصولات" || product.category === category;

      const searchTerm = search.trim();

      const matchesSearch =
        product.name.includes(searchTerm) ||
        product.description.includes(searchTerm) ||
        product.category.includes(searchTerm);

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return a.id - b.id;
    });

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#0B1728] text-[#F3EBDD]"
    >
      {/* معرفی فروشگاه */}
      <section className="relative overflow-hidden border-b border-[#C6A15B]/20 bg-gradient-to-bl from-[#203751] via-[#14243A] to-[#0B1728] px-5 py-16 md:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#C6A15B]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#C6A15B]/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium tracking-wide text-[#D8B873]">
            هنر، خاطره و اصالت
          </p>

          <h1 className="text-3xl font-extrabold leading-relaxed text-[#F3EBDD] sm:text-4xl md:text-5xl">
            فروشگاه میراث
          </h1>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C6A15B]" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base sm:leading-9">
            از خاطره‌های ماندگار تا هدیه‌های خاص؛ محصول موردنظرت رو انتخاب کن
            و خاطره‌هات رو ماندگار کن.
          </p>

          <a
            href="#categories"
            className="mt-7 inline-flex items-center gap-3 rounded-xl border border-[#C6A15B] bg-[#C6A15B] px-7 py-3.5 text-sm font-bold text-[#0B1728] transition duration-300 hover:bg-[#0B1728] hover:text-[#E7C989]"
          >
            انتخاب دسته‌بندی
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      {/* دسته‌بندی‌های تصویری */}
      <section
        id="categories"
        className="scroll-mt-24 bg-[#0B1728] px-5 py-14 sm:py-16 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-medium text-[#C6A15B]">
              دنیایی از انتخاب‌های خاص
            </p>

            <h2 className="text-2xl font-extrabold text-[#F3EBDD] sm:text-3xl">
              دسته‌بندی محصولات
            </h2>

            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-[#C6A15B]" />

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
              دسته‌ی موردنظرت رو انتخاب کن و محصولات میراث رو ببین.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shopCategories.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => selectCategory(item.title)}
                className="group overflow-hidden rounded-2xl border border-[#C6A15B]/20 bg-[#14243A] text-right transition duration-300 hover:-translate-y-1 hover:border-[#C6A15B]/70 hover:shadow-xl hover:shadow-black/20 focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
              >
                <div className="relative h-56 overflow-hidden sm:h-60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071522]/90 via-[#071522]/10 to-transparent" />

                  <span className="absolute bottom-4 right-4 rounded-full border border-[#D8B873]/50 bg-[#0B1728]/85 px-3 py-1 text-xs font-medium text-[#E7C989] backdrop-blur">
                    فروشگاه میراث
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#F3EBDD] transition-colors group-hover:text-[#E7C989]">
                    {item.title}
                  </h3>

                  <p className="mt-3 min-h-12 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-[#D8B873]">
                    <span>مشاهده محصولات</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-x-1"
                    >
                      ←
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* جست‌وجو، فیلتر و فهرست محصولات */}
      <section
        id="products"
        className="scroll-mt-6 mx-auto max-w-7xl px-5 py-12 md:px-8"
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="h-9 w-1 rounded-full bg-[#C6A15B]" />
          <div>
            <h2 className="text-2xl font-extrabold text-[#F3EBDD]">
              محصولات میراث
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              آثار منتخب با الهام از هنر و خاطره‌های ماندگار
            </p>
          </div>
        </div>

        {/* جست‌وجو و مرتب‌سازی */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-slate-600/60 bg-[#14243A] px-4 transition focus-within:border-[#C6A15B] lg:max-w-md">
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
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="نام محصول را جست‌وجو کنید..."
              aria-label="جست‌وجوی محصولات"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="product-sort"
              className="shrink-0 text-sm text-slate-300"
            >
              مرتب‌سازی:
            </label>

            <select
              id="product-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full rounded-xl border border-slate-600/60 bg-[#14243A] px-3 py-3 text-sm text-[#F3EBDD] outline-none focus:border-[#C6A15B] sm:w-auto"
            >
              <option value="featured">محصولات منتخب</option>
              <option value="low">ارزان‌ترین</option>
              <option value="high">گران‌ترین</option>
            </select>
          </div>
        </div>

        {/* فیلتر دسته‌بندی‌ها */}
        <div className="mt-7 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition duration-300 ${
                category === item
                  ? "border-[#C6A15B] bg-[#C6A15B] text-[#14243A]"
                  : "border-slate-600/60 bg-[#14243A] text-slate-300 hover:border-[#C6A15B]/60 hover:text-[#E7C989]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* تعداد نتایج */}
        <div className="mb-6 mt-8 flex items-center justify-between gap-3 border-b border-white/10 pb-5">
          <div>
            <h3 className="text-lg font-bold text-[#F3EBDD]">
              {category === "همه محصولات" ? "همه محصولات" : category}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              محصولات متناسب با انتخاب شما
            </p>
          </div>

          <span className="shrink-0 rounded-lg border border-[#C6A15B]/30 bg-[#C6A15B]/10 px-3 py-2 text-xs text-[#E7C989]">
            {filteredProducts.length.toLocaleString("fa-IR")} محصول
          </span>
        </div>

        {/* کارت‌های محصولات */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#14243A] transition-all duration-300 hover:-translate-y-2 hover:border-[#C6A15B]/60 hover:shadow-xl hover:shadow-black/20"
              >
                <a
                  href={product.href}
                  aria-label={`مشاهده ${product.name}`}
                  className="relative block h-64 overflow-hidden bg-[#203751]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute right-3 top-3 rounded-full border border-[#C6A15B]/30 bg-[#0B1728]/90 px-3 py-1.5 text-xs text-[#E7C989] backdrop-blur">
                    {product.badge}
                  </span>
                </a>

                <div className="p-5">
                  <p className="text-xs text-[#C6A15B]">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-[#F3EBDD] transition group-hover:text-[#E7C989]">
                    {product.name}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-300">
                    {product.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <div>
                      <p className="mb-1 text-xs text-slate-400">
                        قیمت محصول
                      </p>
                      <span className="text-sm font-bold text-[#E7C989]">
                        {product.price.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>

                    <a
                      href={product.href}
                      className="rounded-lg bg-[#C6A15B] px-4 py-2.5 text-sm font-bold text-[#14243A] transition hover:bg-[#E0C17C]"
                    >
                      مشاهده
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#14243A] px-5 py-16 text-center">
            <p className="text-lg font-bold text-[#F3EBDD]">
              هنوز محصولی در این دسته ثبت نشده
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-300">
              به‌زودی محصولات این دسته به فروشگاه میراث اضافه می‌شوند.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("همه محصولات");
                setSort("featured");
              }}
              className="mt-6 rounded-xl bg-[#C6A15B] px-5 py-3 text-sm font-bold text-[#14243A] transition hover:bg-[#E0C17C]"
            >
              نمایش همه محصولات
            </button>
          </div>
        )}
      </section>
    </main>
  );
}