import Image from "next/image";
import { Clock } from "lucide-react";

const posts = [
  {
    title: "Top Reasons Why Microsoft Discontinued Windows Phone",
    image: "/images/tech-3.jpg",
    date: "March 05, 2020",
  },
  {
    title: "Check out some security tips to protect your data",
    image: "/images/tech-4.jpg",
    date: "March 04, 2020",
  },
  {
    title: "Improve the performance of your smartphone battery",
    image: "/images/tech-2.jpg",
    date: "March 03, 2020",
  },
];

export default function SidebarPosts({ title }) {
  return (
    <div className="border">
      <h4 className="font-bold text-sm px-4 py-3 border-b uppercase">
        {title}
      </h4>

      <div className="p-4 space-y-4">
        {posts.map((post, i) => (
          <div key={i} className="flex gap-3">
            <Image
              src={post.image}
              alt={post.title}
              width={80}
              height={60}
              className="object-cover"
            />
            <div>
              <p className="text-sm font-medium leading-snug">{post.title}</p>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={12} /> {post.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
