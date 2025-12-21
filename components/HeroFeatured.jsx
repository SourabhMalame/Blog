import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function HeroFeatured() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT BIG CARD */}
        <Link
          href="#"
          className="relative lg:col-span-2 h-[420px] overflow-hidden group"
        >
          <Image
            src="/images/business.jpg"
            alt="Business"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block bg-red-500 text-xs font-semibold px-3 py-1 rounded mb-3">
              Business
            </span>

            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              How a good team can positively influence your business
            </h2>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>Sora Blogging Tips</span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> March 05, 2020
              </span>
            </div>
          </div>
        </Link>

        {/* RIGHT COLUMN */}
        <div className="grid grid-rows-2 gap-4">
          {/* TOP RIGHT */}
          <Link href="#" className="relative h-[200px] overflow-hidden group">
            <Image
              src="/images/drones.jpg"
              alt="Drones"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="inline-block bg-red-500 text-xs font-semibold px-3 py-1 rounded mb-2">
                Drones
              </span>

              <h3 className="text-lg font-bold leading-snug">
                Drones an indispensable tool for professionals
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-300 mt-2">
                <Clock size={12} /> March 05, 2020
              </div>
            </div>
          </Link>

          {/* BOTTOM RIGHT */}
          <Link href="#" className="relative h-[200px] overflow-hidden group">
            <Image
              src="/images/smartphone.jpg"
              alt="Smartphones"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="inline-block bg-red-500 text-xs font-semibold px-3 py-1 rounded mb-2">
                Smartphones
              </span>

              <h3 className="text-lg font-bold leading-snug">
                Top Reasons Why Microsoft Discontinued Windows Phone
              </h3>

              <div className="flex items-center gap-2 text-xs text-gray-300 mt-2">
                <Clock size={12} /> March 05, 2020
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
