"use client";

import Image from "next/image";
import Link from "next/link";
import { User, ArrowRight } from "lucide-react";

export default function Featured() {
  // Static data for SMB Story
  const smbStories = [
    {
      id: 1,
      title: "How Sawariya Group built a $230M distribution engine for India's fragmented consumer economy",
      excerpt: "Founded in 1990, Sawariya Group is a leading distribution and brand management company. It advises brands on what to stock, where to stock it, and how to localise products for different markets across India's diverse consumer landscape.",
      author: "Pooja Malik",
      slug: "sawariya-group-distribution",
      featuredImage: "/demo.png",
    },
    {
      id: 2,
      title: "How Volks Energie carved its space in India's energy EPC market",
      author: "Trisha Medhi",
      slug: "volks-energie-epc-market",
    },
    {
      id: 3,
      title: "How Nova Dairy built a vast supply network and modern processing units with a focus on sustainable practices",
      author: "Pooja Malik",
      slug: "nova-dairy-supply-network",
    },
  ];

  // Static data for Her Story
  const herStories = [
    {
      id: 1,
      title: "Meet the women working to protect India's wildlife",
      author: "Rekha Balakrishnan",
      slug: "women-protecting-wildlife",
      featuredImage: "/demo.png",
    },
    {
      id: 2,
      title: "How a village craft became a livelihood for hundreds of women across generations",
      author: "Saranya Chakrapani",
      slug: "village-craft-women-livelihood",
      featuredImage: "/demo.png",
    },
    {
      id: 3,
      title: "The canvas of resilience: How former IRS officer Neena Singh found her calling in art",
      author: "Rekha Balakrishnan",
      slug: "neena-singh-art-resilience",
      featuredImage: "/demo.png",
    },
    {
      id: 4,
      title: "Auto Queens captures life beyond the spectacle of women's auto-rickshaw driving",
      author: "Saranya Chakrapani",
      slug: "auto-queens-women-drivers",
      featuredImage: "/demo.png",
    },
    {
      id: 5,
      title: "Why women's malnutrition in India is not just about hunger",
      author: "Saranya Chakrapani",
      slug: "women-malnutrition-india",
      featuredImage: "/demo.png",
    },
  ];

  // Static data for Social Story
  const socialStories = [
    {
      id: 1,
      title: "How Aspiring Leaders India Foundation is building leadership for first-generation students",
      author: "Editorial Team",
      slug: "aspiring-leaders-foundation",
      featuredImage: "/demo.png",
    },
    {
      id: 2,
      title: "How Launch Girls is helping girls in 16 countries own their economic futures",
      author: "Editorial Team",
      slug: "launch-girls-economic-futures",
    },
    {
      id: 3,
      title: "How Connecting the Dots is transforming science and math learning in rural schools",
      author: "Editorial Team",
      slug: "connecting-dots-rural-education",
    },
    {
      id: 4,
      title: "Alok Menon on comedy, collapse, and queer survival",
      author: "Editorial Team",
      slug: "alok-menon-comedy-queer",
    },
    {
      id: 5,
      title: "How an Indian RUTF manufacturer is supporting Sudan's emergency nutrition needs",
      author: "Editorial Team",
      slug: "rutf-manufacturer-sudan",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Header - More Attractive */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-shrink-0 relative">
            {/* Enhanced Silhouette of person pulling rope */}
            <div className="relative">
              <svg className="w-24 h-24 text-black dark:text-white" viewBox="0 0 100 100" fill="currentColor">
                {/* Person silhouette */}
                <circle cx="30" cy="25" r="8" />
                <rect x="22" y="33" width="16" height="30" rx="2" />
                <rect x="18" y="50" width="8" height="20" rx="2" />
                <rect x="34" y="50" width="8" height="20" rx="2" />
                {/* Rope with curve */}
                <path d="M38,40 Q50,45 70,50 Q85,52 90,45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
              {/* Decorative circle */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 dark:bg-blue-600 rounded-full opacity-60"></div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-2">
              Featured
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-transparent"></div>
          </div>
        </div>

        {/* Three Columns - Enhanced Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: SMB Story */}
          <div className="space-y-6">
            <div className="bg-black dark:bg-white px-5 py-4 rounded-t-lg shadow-lg">
              <h3 className="text-white dark:text-black font-bold text-lg uppercase tracking-wider">SMB Story</h3>
            </div>

            {/* Main Article - Enhanced Black Box */}
            <Link href={`/post?slug=${smbStories[0].slug}`} className="group block">
              <div className="bg-black dark:bg-slate-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
                
                <h4 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 relative z-10 text-white dark:text-white">
                  {smbStories[0].title}
                </h4>
                {smbStories[0].excerpt && (
                  <p className="text-sm text-gray-300 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed relative z-10">
                    {smbStories[0].excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between relative z-10">
                  <div className="text-sm text-gray-400 dark:text-gray-400">
                    {smbStories[0].author}
                  </div>
                  <ArrowRight size={16} className="text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>

            {/* Other Articles - Enhanced */}
            {smbStories.slice(1).map((story) => (
              <Link
                key={story.id}
                href={`/post?slug=${story.slug}`}
                className="group block pb-6 border-b border-gray-200 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50 p-3 rounded-lg transition-colors"
              >
                <h4 className="text-base font-bold text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {story.title}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {story.author}
                  </div>
                  <ArrowRight size={14} className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* Column 2: Her Story - Enhanced */}
          <div className="space-y-6">
            <div className="bg-black dark:bg-white px-5 py-4 rounded-t-lg shadow-lg">
              <h3 className="text-white dark:text-black font-bold text-lg uppercase tracking-wider">Her Story</h3>
            </div>

            {herStories.map((story) => (
              <Link
                key={story.id}
                href={`/post?slug=${story.slug}`}
                className="group flex gap-4 pb-6 border-b border-gray-200 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50 p-3 rounded-lg transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-bold text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {story.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <User size={14} />
                    <span>{story.author}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800 shadow-md group-hover:shadow-lg transition-shadow">
                  {story.featuredImage ? (
                    <Image
                      src={story.featuredImage}
                      alt={story.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-500 dark:from-pink-600 dark:to-pink-700"></div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Column 3: Social Story - Enhanced */}
          <div className="space-y-6">
            <div className="bg-black dark:bg-white px-5 py-4 rounded-t-lg shadow-lg">
              <h3 className="text-white dark:text-black font-bold text-lg uppercase tracking-wider">Social Story</h3>
            </div>

            {/* Main Article with Large Image - Enhanced */}
            <Link href={`/post?slug=${socialStories[0].slug}`} className="group block">
              <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-slate-800 rounded-lg shadow-lg mb-3 group-hover:shadow-xl transition-shadow">
                {socialStories[0].featuredImage ? (
                  <Image
                    src={socialStories[0].featuredImage}
                    alt={socialStories[0].title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-500 dark:from-green-600 dark:to-green-700"></div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-red-600 dark:bg-red-500 text-white font-bold rounded-full text-sm shadow-lg">
                    1
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-5">
                  <h4 className="text-white font-bold text-lg line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {socialStories[0].title}
                  </h4>
                </div>
              </div>
            </Link>

            {/* Other Articles with Numbers - Enhanced */}
            {socialStories.slice(1).map((story, index) => (
              <Link
                key={story.id}
                href={`/post?slug=${story.slug}`}
                className="group flex gap-3 pb-6 border-b border-gray-200 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50 p-3 rounded-lg transition-all duration-300"
              >
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 bg-red-600 dark:bg-red-500 text-white font-bold rounded-full text-xs shadow-md group-hover:scale-110 transition-transform">
                  {index + 2}
                </span>
                <h4 className="text-base font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 flex-1">
                  {story.title}
                </h4>
                <ArrowRight size={14} className="text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
