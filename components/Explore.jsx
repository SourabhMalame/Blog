"use client";

import Image from "next/image";
import Link from "next/link";

export default function Explore() {
  // Dummy data for 16 startups
  const startups = [
    {
      id: 1,
      title: "Segwise.Ai",
      category: "SAAS",
      slug: "segwise-ai",
      featuredImage: "/demo.png",
    },
    {
      id: 2,
      title: "Ongil.Ai",
      category: "AI/ML",
      slug: "ongil-ai",
      featuredImage: "/demo.png",
    },
    {
      id: 3,
      title: "NexStem",
      category: "Health-Tech",
      slug: "nexstem",
      featuredImage: "/demo.png",
    },
    {
      id: 4,
      title: "Farmonaut",
      category: "Agritech",
      slug: "farmonaut",
      featuredImage: "/demo.png",
    },
    {
      id: 5,
      title: "Recircle",
      category: "Cleantech",
      slug: "recircle",
      featuredImage: "/demo.png",
    },
    {
      id: 6,
      title: "Fabrik Space",
      category: "SAAS",
      slug: "fabrik-space",
      featuredImage: "/demo.png",
    },
    {
      id: 7,
      title: "Verdant Impact",
      category: "Agritech",
      slug: "verdant-impact",
      featuredImage: "/demo.png",
    },
    {
      id: 8,
      title: "The EPlane Company",
      category: "Mobility",
      slug: "eplane-company",
      featuredImage: "/demo.png",
    },
    {
      id: 9,
      title: "Nawgati",
      category: "Enterprise-Tech",
      slug: "nawgati",
      featuredImage: "/demo.png",
    },
    {
      id: 10,
      title: "Kshana AI",
      category: "AI/ML",
      slug: "kshana-ai",
      featuredImage: "/demo.png",
    },
    {
      id: 11,
      title: "Marut Drones",
      category: "Dronetech",
      slug: "marut-drones",
      featuredImage: "/demo.png",
    },
    {
      id: 12,
      title: "Anatomech",
      category: "Health-Tech",
      slug: "anatomech",
      featuredImage: "/demo.png",
    },
    {
      id: 13,
      title: "Naam",
      category: "AI/ML",
      slug: "naam",
      featuredImage: "/demo.png",
    },
    {
      id: 14,
      title: "NeuralGarage",
      category: "AI/ML",
      slug: "neuralgarage",
      featuredImage: "/demo.png",
    },
    {
      id: 15,
      title: "Monet Work",
      category: "Web3",
      slug: "monet-work",
      featuredImage: "/demo.png",
    },
    {
      id: 16,
      title: "Evate Technologies",
      category: "Mobility",
      slug: "evate-technologies",
      featuredImage: "/demo.png",
    },
  ];

  return (
    <section className="bg-slate-900 dark:bg-black border-b border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white relative">
              EXPLO
              <span className="relative inline-block mx-1">
                <span className="relative z-10">R</span>
                {/* Circular text around R */}
                <span className="absolute -top-6 -left-12 text-[10px] md:text-xs font-normal text-white/70 whitespace-nowrap transform -rotate-12">
                  YOURSTORY PREDICTS
                </span>
                <span className="absolute -bottom-6 -right-12 text-[10px] md:text-xs font-normal text-white/70 whitespace-nowrap transform rotate-12">
                  YOURSTORY
                </span>
              </span>
              E
            </h2>
          </div>
          <p className="text-white/80 text-lg md:text-xl mt-4">
            Upcoming startups of 2026 and browse them on YourStory
          </p>
        </div>

        {/* Startup Grid - 4x4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {startups.map((startup) => (
            <Link
              key={startup.id}
              href={`/?category=${startup.category.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative overflow-hidden rounded-lg bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 dark:hover:bg-slate-800 transition-all duration-300 aspect-square"
            >
              {/* Image/Visual */}
              <div className="absolute inset-0">
                {startup.featuredImage ? (
                  <Image
                    src={startup.featuredImage}
                    alt={startup.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-40"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-sm md:text-base mb-1 group-hover:text-blue-300 transition-colors line-clamp-2">
                  {startup.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-white/70">
                  <span>•</span>
                  <span className="uppercase tracking-wide">{startup.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/?category=startups"
            className="inline-block px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-slate-900 transition-all duration-300"
          >
            View All Companies
          </Link>
        </div>
      </div>
    </section>
  );
}
