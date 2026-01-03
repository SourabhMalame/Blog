import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";

export default function CategoryBlock({ title, posts }) {
  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 mb-6">
        <h3 className="bg-[#111827] dark:bg-gray-800 text-white px-4 py-2 text-sm font-bold uppercase">
          {title}
        </h3>
        <Link href="/post" className="text-sm text-gray-400 dark:text-gray-500 hover:text-red-500">
          View all
        </Link>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT BIG POST */}
        <Link
          href="/post"
          className="relative lg:col-span-2 h-[360px] group overflow-hidden"
        >
          <Image
            src={posts[0].image}
            alt={posts[0].title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Badge */}
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded">
            Learn
          </span>

          {/* Content */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <h4 className="text-xl font-bold leading-snug mb-3">
              {posts[0].title}
            </h4>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <User size={14} /> Sora Blogging Tips
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {posts[0].date}
              </span>
            </div>
          </div>
        </Link>

        {/* RIGHT LIST */}
        <div className="space-y-5">
          {posts.slice(1, 5).map((post, i) => (
          <Link key={i} href="/post" className="flex gap-4 group">
              <Image
                src={post.image}
                alt={post.title}
                width={90}
                height={70}
                className="object-cover shrink-0"
              />
              <div>
                <p className="font-medium text-sm leading-snug text-gray-900 dark:text-gray-100 group-hover:text-red-500 transition">
                  {post.title}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-1">
                  <Clock size={12} /> {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
