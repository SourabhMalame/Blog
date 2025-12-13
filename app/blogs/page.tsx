import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import { blogPosts } from '@/lib/mockData';

export default function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">All Blog Posts</h1>
            <p className="text-lg text-gray-600">
              Discover our latest articles and tutorials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                coverImage={post.coverImage}
                author={post.author}
                publishDate={post.publishDate}
                category={post.category}
                readingTime={post.readingTime}
              />
            ))}
          </div>

          <Pagination currentPage={1} totalPages={3} basePath="/blogs" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

