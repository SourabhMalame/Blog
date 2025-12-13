import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryBadge from '@/components/CategoryBadge';
import AuthorCard from '@/components/AuthorCard';
import { blogPosts } from '@/lib/mockData';
import { Twitter, Facebook, Linkedin, Link as LinkIcon } from 'lucide-react';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Simple markdown-like content parser for demo
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentCodeBlock = '';
    let inCodeBlock = false;
    let codeLanguage = '';

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End code block
          elements.push(
            <pre key={`code-${index}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
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
          <h1 key={index} className="text-4xl font-bold text-gray-900 mt-8 mb-4">
            {line.substring(2)}
          </h1>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-3xl font-bold text-gray-900 mt-6 mb-3">
            {line.substring(3)}
          </h2>
        );
        return;
      }
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-2xl font-semibold text-gray-900 mt-4 mb-2">
            {line.substring(4)}
          </h3>
        );
        return;
      }

      // Quotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-700">
            {line.substring(2)}
          </blockquote>
        );
        return;
      }

      // Inline code
      if (line.includes('`')) {
        const parts = line.split('`');
        const jsxParts: (string | JSX.Element)[] = [];
        parts.forEach((part, i) => {
          if (i % 2 === 0) {
            jsxParts.push(part);
          } else {
            jsxParts.push(
              <code key={i} className="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">
                {part}
              </code>
            );
          }
        });
        if (line.trim()) {
          elements.push(
            <p key={index} className="text-lg text-gray-700 leading-relaxed my-4">
              {jsxParts}
            </p>
          );
        }
        return;
      }

      // Regular paragraphs
      if (line.trim()) {
        elements.push(
          <p key={index} className="text-lg text-gray-700 leading-relaxed my-4">
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Banner Image */}
        {post.coverImage && (
          <div className="relative w-full h-96 bg-gradient-to-r from-blue-600 to-purple-600">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4">
              <CategoryBadge name={post.category} variant="large" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <AuthorCard
                name={post.author.name}
                avatar={post.author.avatar}
              />
              <span>{post.publishDate}</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-200">
            <span className="text-gray-700 font-medium">Share:</span>
            <button className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors" aria-label="Share on Twitter">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" aria-label="Share on Facebook">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors" aria-label="Share on LinkedIn">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors" aria-label="Copy link">
              <LinkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>

          {/* Author Card */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <AuthorCard
              name={post.author.name}
              avatar={post.author.avatar}
              bio={post.author.bio}
              variant="card"
            />
          </div>

          {/* Back to Blogs */}
          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to all blogs
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

