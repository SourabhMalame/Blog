"use client";

import Link from "next/link";
import { Lightbulb } from "lucide-react";

export default function DiscoverMore() {
  // Static data for categories and articles
  const categories = [
    {
      name: "Startup",
      articles: [
        "How Speedata Is Powering Next Gen AI and Big Data With APU Chips",
        "SGA marks 15 years of redefining communications consulting in India",
        "From Hackathon to Lifesaving: How EmerReady Prepares Kids for...",
        "Woven by tradition: How Taavi is bringing India's craft heritage into the...",
      ],
    },
    {
      name: "Just In",
      articles: [
        "[Exclusive] Endiya Partners launches sports tournaments for India's startup...",
        "Startup news and updates: Daily roundup (April 29, 2025)",
        "Women's Day: PM Modi salutes \"Nari Shakti\", hands over social media...",
        "Startup news and updates: Daily roundup (January 21, 2025)",
      ],
    },
    {
      name: "Technology",
      articles: [
        "Outlook 2026: India's semiconductor push clears capacity hurdle; next phas...",
        "India launches DHRUV64, first indigenously designed 1.0 GHz 64-bit...",
        "Build an AI-powered business with 40% off on Salesforce's core platforms",
        "Tata, Intel sign MoU to build India centred silicon and compute ecosystem",
      ],
    },
    {
      name: "Business Ideas",
      articles: [
        "5 Profitable small business ideas for new founders",
        "This Indian Tree Can Make You Richer Than Sugarcane or Wheat",
        "The Day KFC Ran Out of Chicken - And Turned Crisis into a Comeback: A Geni...",
        "Meet the 10 entrepreneurs set to drive change in 2025",
      ],
    },
    {
      name: "Books",
      articles: [
        "7 Books that bring clarity and purpose to your new year",
        "Reading trends in 2026: Genres shaping modern readers",
        "2026 Reading goals: How to create a lasting book habit",
        "2026's most anticipated books that redefine storytelling",
      ],
    },
    {
      name: "Campaign",
      articles: [
        "BharatPe's 'Hai Yakeen' campaign celebrates the indomitable spirit of...",
        "SMB Week: How OTT has changed the face of India's media and entertainmen...",
        "SMB Week: Here's how SMBs in the manufacturing sector can find...",
        "SMB Week: How COVID-19 catalysed efforts to build a stronger healthcare...",
      ],
    },
    {
      name: "Story",
      articles: [
        "Spoken word artist Nayab Midha on power of poetry and a programme to...",
        "Beyond assumptions: What persons with disabilities wish you understood",
        "SheSparks at TechSparks, women Kho Kho World Cup champions and a...",
        "These new age beverage brands are reinventing India's chai and coffee...",
      ],
    },
    {
      name: "Sports",
      articles: [
        "Pranavi Urs becomes first Indian woman to win a pro golf title in a mixed gende...",
        "Boxing champion Preeti Pawar on fighting her way back into the ring aft...",
        "How India's women Kho Kho World Cup champions are redefining the game",
        "Women in blue bring home World Cup, script history",
      ],
    },
    {
      name: "Resources",
      articles: [
        "These businesses are turning traditional Indian sweets into health conscious...",
        "How brands are blending tech with tradition this Ganesh Chaturthi 2025",
        "What to consider before taking a business loan?",
        "Must read business newsletters: An entrepreneur's secret weapon",
      ],
    },
    {
      name: "Marketing & Sales",
      articles: [
        "Get started with affiliate marketing with these basic steps",
        "Want to ace affiliate marketing? Try and avoid these rookie mistakes",
        "Building a brand: 10 tips for creating outstanding video ads",
        "Content marketing is not just writing blogs",
      ],
    },
    {
      name: "Funding",
      articles: [
        "NBFC Varthana bags $6M loan from WaterEquity for school sanitation...",
        "Marketing automation platform Nitro Commerce raises $5M in Series A roun...",
        "Elon Musk's xAI raises $20B in Series E",
        "Agritech startup Arya.ag raises Rs 725 Cr in a Series D funding",
      ],
    },
    {
      name: "Social & Green News",
      articles: [
        "Strong network of MSMEs being developed; only India can buttress...",
        "PM launches Rs 24,000 Cr scheme for vulnerable tribal groups' welfare",
        "Aiming to reduce plastic, The Body Shop to launch refill stations in India by year...",
        "Five new animal species discovered in Tibet",
      ],
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white inline-flex items-center">
            Discover M
            <span className="relative inline-block">
              <span className="relative z-10">o</span>
              <Lightbulb className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 text-yellow-500 dark:text-yellow-400" fill="currentColor" />
            </span>
            re
          </h2>
        </div>

        {/* Categories Grid - 3 rows, 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="space-y-4">
              {/* Category Header */}
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {category.name}
                </h3>
                <div className="h-px bg-gray-300 dark:bg-slate-700"></div>
              </div>

              {/* Articles List */}
              <ul className="space-y-3">
                {category.articles.map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <Link
                      href={`/?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-relaxed"
                    >
                      {article}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
