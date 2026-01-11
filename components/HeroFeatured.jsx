"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Mail } from "lucide-react";

export default function HeroFeatured() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  // Dummy data for Top Picks
  const dummyTopPicks = [
    {
      _id: "dummy-1",
      title: "How India's Tech Startups Are Scaling Globally",
      slug: "india-tech-startups-scaling",
      featuredImage: "/demo.png",
      category: "Technology",
    },
    {
      _id: "dummy-2",
      title: "The Future of Fintech: Digital Banking Revolution",
      slug: "fintech-digital-banking",
      featuredImage: "/demo.png",
      category: "Finance",
    },
    {
      _id: "dummy-3",
      title: "Sustainable Energy: India's Green Tech Movement",
      slug: "sustainable-energy-green-tech",
      featuredImage: "/demo.png",
      category: "Innovation",
    },
    {
      _id: "dummy-4",
      title: "AI and Machine Learning: Transforming Businesses",
      slug: "ai-machine-learning-business",
      featuredImage: "/demo.png",
      category: "Technology",
    },
  ];

  const dummyMainArticle = {
    _id: "dummy-main",
    title: "UPI transactions capture how Indians spent, saved, and speculated in 2025",
    slug: "upi-transactions-2025",
    excerpt: "From the end of real-money gaming to the rise of digital gold, YourStory decodes the 228 billion transactions that shaped 2025.",
    author: { name: "Sayan Sen" },
    category: "News",
    featuredImage: "/demo.png",
    publishedAt: new Date().toISOString(),
  };

  const dummyCapTable = [
    {
      _id: "dummy-cap-1",
      title: "Code to cricket: OpenAI's India push extends to the biggest consumer touchpoint",
      slug: "openai-india-cricket",
      author: { name: "Sohini Mitter" },
      featuredImage: "/demo.png",
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "dummy-cap-2",
      title: "Historically wealthiest old cities are its weakest online shoppers",
      slug: "cities-online-shopping",
      author: { name: "Parvathi Benu" },
      featuredImage: "/demo.png",
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "dummy-cap-3",
      title: "The botanical extracts sector is getting its M&A moment",
      slug: "botanical-extracts-ma",
      author: { name: "Anuj Suvarna" },
      featuredImage: "/demo.png",
      publishedAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/public/posts?limit=10");
      if (!response.ok) throw new Error("Failed to fetch");
      
      const data = await response.json();
      setFeaturedPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching featured posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  const getAuthorName = (author) => {
    if (!author) return "Editorial Team";
    if (typeof author === "object" && author?.name) {
      return author.name;
    }
    return author;
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const { topPicks, mainArticle, capTableArticles } = useMemo(() => {
    // Use API data if available, otherwise use dummy data
    const picks = featuredPosts.length > 0 
      ? featuredPosts.slice(0, 4) 
      : dummyTopPicks;
    
    const main = featuredPosts.length > 4 
      ? featuredPosts[4] 
      : dummyMainArticle;
    
    const capTable = featuredPosts.length > 5 
      ? featuredPosts.slice(5, 8) 
      : dummyCapTable;

    return {
      topPicks: picks,
      mainArticle: main,
      capTableArticles: capTable,
    };
  }, [featuredPosts]);

  if (loading) {
    return (
      <section className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-8 bg-gray-200 dark:bg-slate-700 w-32 rounded"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
                ))}
              </div>
              <div className="h-64 bg-gray-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <div className="h-8 bg-gray-200 dark:bg-slate-700 w-40 rounded"></div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Top Picks Section */}
          <div className="lg:col-span-8">
            {/* Top Picks Header */}
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-bold text-black dark:text-white">Top Picks</h2>
              <div className="relative">
                <span className="text-red-600 dark:text-red-500 text-2xl font-bold">★</span>
                <span className="absolute -top-1 -right-1 text-red-600 dark:text-red-500 text-xs">Picks</span>
              </div>
            </div>

            {/* Top Picks - 4 Small Previews */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {topPicks.map((post, index) => (
                <Link
                  key={post._id || index}
                  href={`/post?slug=${post.slug}`}
                  className="group"
                >
                  <div className="mb-2">
                    <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-slate-800 rounded">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:opacity-90 transition-opacity"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700"></div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-black dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>

            {/* Main Featured Article */}
            {mainArticle && (
              <Link href={`/post?slug=${mainArticle.slug}`} className="group block">
                <div className="mb-2">
                  <span className="inline-block text-xs text-gray-600 dark:text-gray-400 font-medium">■ {mainArticle.category || "News"}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {mainArticle.title}
                </h1>
                {mainArticle.excerpt && (
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {mainArticle.excerpt}
                  </p>
                )}
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span>{getAuthorName(mainArticle.author)}</span>
                </div>
              </Link>
            )}
          </div>

          {/* Right Column - The CapTable Section */}
          <div className="lg:col-span-4">
            {/* The CapTable Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-black dark:text-white relative inline-block">
                The CapTable
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 dark:bg-green-600"></span>
              </h2>
            </div>

            {/* CapTable Articles List */}
            <div className="space-y-6 mb-8">
              {capTableArticles.map((post, index) => (
                <Link
                  key={post._id || index}
                  href={`/post?slug=${post.slug}`}
                  className="group flex gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-black dark:text-white leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span>{getAuthorName(post.author)}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-20 h-20 rounded overflow-hidden bg-gray-100 dark:bg-slate-800">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-600 dark:to-blue-700"></div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="border-t border-gray-200 dark:border-slate-800 pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Mail size={18} className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Newsletter</span>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div>
                  <label htmlFor="newsletter-email" className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Enter your Email
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-medium py-2 px-4 rounded-md transition-colors text-sm"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
