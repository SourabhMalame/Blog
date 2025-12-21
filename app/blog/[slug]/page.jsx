import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryBadge from '@/components/CategoryBadge';
import AuthorCard from '@/components/AuthorCard';
import { blogPosts } from '@/lib/mockData';
import { Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';

export default async function BlogDetailPage({ params }) {
  // Verify blogPosts is loaded
  if (!blogPosts || blogPosts.length === 0) {
    console.error('blogPosts is empty or not loaded!');
    notFound();
  }
  
  // Handle params - in Next.js 16, params might be a Promise
  let slug;
  
  if (params instanceof Promise) {
    const resolvedParams = await params;
    slug = resolvedParams.slug;
  } else {
    slug = params.slug;
  }
  
  // Decode URL-encoded slug and trim any whitespace
  slug = decodeURIComponent(slug).trim();
  
  // Debug: Log the received slug and available slugs
  console.log('=== DEBUG INFO ===');
  console.log('Received slug:', slug);
  console.log('Slug length:', slug.length);
  console.log('Type of slug:', typeof slug);
  console.log('blogPosts count:', blogPosts.length);
  console.log('Available slugs:', blogPosts.map(p => p.slug));
  console.log('==================');
  
  // Find the post by slug
  const post = blogPosts.find((p) => {
    const match = p.slug === slug;
    if (!match) {
      console.log(`❌ "${p.slug}" !== "${slug}"`);
    } else {
      console.log(`✅ MATCH FOUND: "${p.slug}" === "${slug}"`);
    }
    return match;
  });

  if (!post) {
    console.error('❌ Post not found for slug:', slug);
    console.error('Available slugs:', blogPosts.map(p => `"${p.slug}"`));
    notFound();
  }
  
  console.log('✅ Post found:', post.title);

  // Simple markdown-like content parser for demo
  const renderContent = (content) => {
    const lines = content.split('\n');
    const elements = [];
    let currentCodeBlock = '';
    let inCodeBlock = false;
    let codeLanguage = '';

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <pre key={`code-${index}`} className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-8 font-mono text-sm leading-relaxed">
              <code>{currentCodeBlock.trim()}</code>
            </pre>
          );
          currentCodeBlock = '';
          inCodeBlock = false;
          codeLanguage = '';
        } else {
          // Start code block
          inCodeBlock = true;
          codeLanguage = line.substring(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock += line + '\n';
        return;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-4xl font-bold text-gray-900 mt-16 mb-6 leading-tight">
            {line.substring(2)}
          </h1>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-3xl font-bold text-gray-900 mt-12 mb-4 leading-tight">
            {line.substring(3)}
          </h2>
        );
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-2xl font-semibold text-gray-900 mt-10 mb-3 leading-tight">
            {line.substring(4)}
          </h3>
        );
        return;
      }

      // Quotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-gray-300 pl-6 my-8 italic text-gray-600 text-lg leading-relaxed">
            {line.substring(2)}
          </blockquote>
        );
        return;
      }

      // Inline code
      if (line.includes('`')) {
        const parts = line.split('`');
        const jsxParts = [];
        parts.forEach((part, i) => {
          if (i % 2 === 0) {
            jsxParts.push(part);
          } else {
            jsxParts.push(
              <code key={i} className="bg-gray-100 text-pink-600 px-2 py-0.5 rounded text-sm font-mono">
                {part}
              </code>
            );
          }
        });
        if (line.trim()) {
          elements.push(
            <p key={index} className="text-xl text-gray-700 leading-relaxed my-6">
              {jsxParts}
            </p>
          );
        }
        return;
      }

      // Regular paragraphs
      if (line.trim()) {
        elements.push(
          <p key={index} className="text-xl text-gray-700 leading-relaxed my-6">
            {line}
          </p>
        );
      } else {
        elements.push(<br key={index} />);
      }
    });

    return elements;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Article Header */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          {/* Header */}
          <header className="mb-12">
            <div className="mb-6">
              <CategoryBadge name={post.category} variant="large" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium text-lg">
                  {post.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{post.author.name}</div>
                  <div className="text-sm text-gray-500">{post.publishDate}</div>
                </div>
              </div>
              <div className="flex-1"></div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-3 mb-12">
              <span className="text-sm text-gray-500 font-medium">Share</span>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" aria-label="Share on Twitter">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" aria-label="Share on Facebook">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" aria-label="Copy link">
                  <LinkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Banner Image */}
          {post.coverImage && (
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 bg-gray-100">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-lg prose-gray max-w-none">
            <div className="text-xl text-gray-700 leading-relaxed space-y-6">
              {renderContent(post.content)}
            </div>
          </div>

          {/* Author Card */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <AuthorCard
              name={post.author.name}
              avatar={post.author.avatar}
              bio={post.author.bio}
              variant="card"
            />
          </div>

          {/* Back to Blogs */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

