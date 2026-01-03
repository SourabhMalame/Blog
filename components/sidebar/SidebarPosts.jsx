import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

const posts = [
  {
    title: "Top Reasons Why Microsoft Discontinued Windows Phone",
    image: "/demo.png",
    date: "March 05, 2020",
  },
  {
    title: "Check out some security tips to protect your data",
    image: "/demo.png",
    date: "March 04, 2020",
  },
  {
    title: "Improve the performance of your smartphone battery",
    image: "/demo.png",
    date: "March 03, 2020",
  },
];

export default function SidebarPosts({ title }) {
  return (
    <div className="border dark:border-gray-700 bg-white dark:bg-gray-800">
      <h4 className="font-bold text-sm px-4 py-3 border-b dark:border-gray-700 uppercase text-gray-900 dark:text-gray-100">
        {title}
      </h4>

      <div className="p-4 space-y-4">
        {posts.map((post, i) => (
          <Link key={i} href="/post" className="flex gap-3 group">
            <Image
              src={post.image}
              alt={post.title}
              width={80}
              height={60}
              className="object-cover"
            />
            <div>
              <p className="text-sm font-medium leading-snug text-gray-900 dark:text-gray-100 group-hover:text-red-500 transition">
                {post.title}
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                <Clock size={12} /> {post.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
