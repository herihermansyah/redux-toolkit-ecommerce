import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectFilteredProducts,
} from "../features/product/productSlice";
import type { RootState, AppDispatch } from "../app/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Pastikan Swiper CSS diimpor
import Button from "../components/ui/Button";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector((state: RootState) => state.product.status);
  const [categories, setCategories] = useState<string[]>([]);

  // Menggunakan useRef untuk mengelola referensi elemen navigasi Swiper
  const prevRefMain = useRef<HTMLDivElement>(null);
  const nextRefMain = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    // Memastikan products tidak kosong sebelum memproses kategori
    if (products.length > 0) {
      const cats = Array.from(new Set(products.map((p) => p.category)));
      setCategories(cats);
    }
  }, [products]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="ml-4 text-lg text-gray-700">Loading products...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <p className="text-xl text-red-700 font-semibold">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 space-y-12 bg-gray-50 min-h-screen">
      {/* Slider Utama */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 3500,
            disableOnInteraction: false, // Membiarkan autoplay setelah interaksi pengguna
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            prevEl: prevRefMain.current,
            nextEl: nextRefMain.current,
          }}
          // Penting: Memperbarui navigasi setelah Swiper diinisialisasi dan refs siap
          onBeforeInit={(swiper) => {
            // Pastikan refs telah terpasang ke DOM sebelum menetapkannya
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              const navigation = swiper.params.navigation as {
                prevEl: HTMLElement | null;
                nextEl: HTMLElement | null;
              };
              navigation.prevEl = prevRefMain.current;
              navigation.nextEl = nextRefMain.current;
            }
          }}
          className="rounded-2xl overflow-hidden shadow-xl h-64 md:h-96 lg:h-[450px]"
        >
          {products.slice(0, 5).map((p) => (
            <SwiperSlide key={p.id}>
              <div className="relative w-full h-full">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover brightness-75" // Sedikit gelap untuk teks
                />
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="text-white text-2xl md:text-4xl font-extrabold leading-tight drop-shadow-lg">
                    {p.title}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Tombol Navigasi Utama */}
        <div
          ref={prevRefMain}
          className="absolute top-1/2 left-4 z-10 w-10 h-10 bg-white/70 text-gray-800 items-center justify-center rounded-full cursor-pointer transform -translate-y-1/2 shadow-md transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hidden sm:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div
          ref={nextRefMain}
          className="absolute top-1/2 right-4 z-10 w-10 h-10 bg-white/70 text-gray-800  items-center justify-center rounded-full cursor-pointer transform -translate-y-1/2 shadow-md transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hidden sm:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </section>

      {/* Produk Pilihan */}
      <section>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2  pb-2">
          Produk Pilihan
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {products.slice(0, 12).map((p) => (
            <div
              key={p.id}
              className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <div className="relative w-full h-40 flex items-center justify-center bg-gray-100 rounded-t-xl overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-auto h-3/4 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-800 truncate mb-1">
                  {p.title}
                </h3>
                <p className="text-lg font-bold text-indigo-700">
                  ${p.price.toLocaleString()}
                </p>
                <Button
                  variant="primary"
                  size="md"
                  className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Lihat Detail
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Produk Per Kategori */}
      {categories.map((cat) => (
        <section key={cat}>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 pb-2 capitalize">
            {cat}
          </h2>
          <Swiper
            modules={[Pagination]}
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 24 },
              1024: { slidesPerView: 5, spaceBetween: 28 },
              1280: { slidesPerView: 6, spaceBetween: 32 },
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="rounded-2xl overflow-hidden py-4" // Menambah padding vertikal
          >
            {products
              .filter((p) => p.category === cat)
              .map((p) => (
                <SwiperSlide key={p.id}>
                  <div
                    className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200"
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    <div className="relative w-full h-32 flex items-center justify-center bg-gray-100 rounded-t-xl overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-auto h-3/4 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-800 truncate mb-1">
                        {p.title}
                      </h3>
                      <p className="text-base font-bold text-indigo-700">
                        ${p.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </section>
      ))}
    </div>
  );
}
