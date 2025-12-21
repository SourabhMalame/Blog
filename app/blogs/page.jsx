import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import { blogPosts } from '@/lib/mockData';

export default function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">All Stories</h1>
            <p className="text-lg text-gray-600">
              Discover our latest articles and tutorials
            </p>
          </div>

          <div className="space-y-0">
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

          <div className="mt-12">
            <Pagination currentPage={1} totalPages={3} basePath="/blogs" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

