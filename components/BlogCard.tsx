import Link from 'next/link';
import Image from 'next/image';
import CategoryBadge from './CategoryBadge';
import AuthorCard from './AuthorCard';

interface BlogCardProps {
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

export default function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  author,
  publishDate,
  category,
  readingTime,
}: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      {coverImage && (
        <Link href={`/blog/${slug}`}>
          <div className="relative w-full h-48 bg-gray-200">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      <div className="p-6">
        <div className="mb-3">
          <CategoryBadge name={category} href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`} />
        </div>
        <Link href={`/blog/${slug}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <AuthorCard name={author.name} avatar={author.avatar} />
          <div className="flex items-center space-x-4">
            <span>{publishDate}</span>
            {readingTime && <span>{readingTime} min read</span>}
          </div>
        </div>
      </div>
    </article>
  );
}

