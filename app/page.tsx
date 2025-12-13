import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedBlogCard from '@/components/FeaturedBlogCard';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import { blogPosts } from '@/lib/mockData';

export default function Home() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Featured Post */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FeaturedBlogCard
            slug={featuredPost.slug}
            title={featuredPost.title}
            excerpt={featuredPost.excerpt}
            coverImage={featuredPost.coverImage}
            author={featuredPost.author}
            publishDate={featuredPost.publishDate}
            category={featuredPost.category}
            readingTime={featuredPost.readingTime}
          />
        </section>

        {/* Blog Listing Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
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
          
          <Pagination currentPage={1} totalPages={3} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
