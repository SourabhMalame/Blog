import Link from 'next/link';
import Image from 'next/image';
import CategoryBadge from './CategoryBadge';

interface FeaturedBlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishDate: string;
  category: string;
  readingTime?: string;
}

export default function FeaturedBlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  author,
  publishDate,
  category,
  readingTime,
}: FeaturedBlogCardProps) {
  return (
    <article className="relative bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
      {coverImage && (
        <div className="relative w-full h-96 bg-gradient-to-r from-blue-600 to-purple-600">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="mb-4">
          <CategoryBadge name={category} variant="large" dark />
        </div>
        <Link href={`/blog/${slug}`}>
          <h1 className="text-4xl font-bold mb-4 hover:text-blue-300 transition-colors">
            {title}
          </h1>
        </Link>
        <p className="text-lg mb-6 text-gray-200 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
              {author.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-white">{author.name}</span>
          </div>
          <div className="flex items-center space-x-4 text-gray-300">
            <span>{publishDate}</span>
            {readingTime && <span>{readingTime} min read</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

