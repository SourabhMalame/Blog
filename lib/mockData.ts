export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishDate: string;
  category: string;
  readingTime: string;
}

export interface Category {
  name: string;
  slug: string;
  postCount: number;
}

export const categories: Category[] = [
  { name: 'Technology', slug: 'technology', postCount: 12 },
  { name: 'Web Development', slug: 'web-development', postCount: 8 },
  { name: 'React', slug: 'react', postCount: 15 },
  { name: 'Next.js', slug: 'nextjs', postCount: 10 },
  { name: 'JavaScript', slug: 'javascript', postCount: 20 },
  { name: 'TypeScript', slug: 'typescript', postCount: 7 },
  { name: 'CSS', slug: 'css', postCount: 9 },
  { name: 'Design', slug: 'design', postCount: 6 },
  { name: 'Tutorials', slug: 'tutorials', postCount: 18 },
  { name: 'Tips & Tricks', slug: 'tips-tricks', postCount: 14 },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14: A Complete Guide',
    excerpt: 'Learn how to build modern web applications with Next.js 14, including App Router, Server Components, and more.',
    content: `# Getting Started with Next.js 14

Next.js 14 represents a significant leap forward in the React ecosystem, introducing powerful features that make building production-ready applications easier than ever.

## What's New in Next.js 14?

### App Router
The new App Router provides a more intuitive file-based routing system that supports layouts, loading states, and error handling out of the box.

### Server Components
By default, all components in the App Router are Server Components, which means they render on the server, improving performance and reducing client-side JavaScript.

### Enhanced Data Fetching
Next.js 14 introduces improved data fetching patterns that make it easier to work with APIs and databases.

## Getting Started

To create a new Next.js 14 project, run:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will guide you through setting up your project with the latest features.

## Conclusion

Next.js 14 makes it easier than ever to build fast, scalable web applications. Start exploring today!`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
    author: {
      name: 'John Doe',
      bio: 'Full-stack developer passionate about React and Next.js',
    },
    publishDate: 'March 15, 2024',
    category: 'Next.js',
    readingTime: '5',
  },
  {
    slug: 'mastering-react-hooks',
    title: 'Mastering React Hooks: useState and useEffect Deep Dive',
    excerpt: 'A comprehensive guide to understanding and mastering the most commonly used React hooks.',
    content: `# Mastering React Hooks

React Hooks revolutionized how we write React components, allowing us to use state and lifecycle features in functional components.

## useState Hook

The \`useState\` hook lets you add state to functional components:

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The \`useEffect\` hook lets you perform side effects in functional components:

> "useEffect is the perfect place to handle side effects like data fetching, subscriptions, or manually changing the DOM." - React Documentation

\`\`\`javascript
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data && <p>{data.message}</p>}</div>;
}
\`\`\`

Understanding these hooks is fundamental to modern React development.`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
    author: {
      name: 'Jane Smith',
      bio: 'Senior React Developer and technical writer',
    },
    publishDate: 'March 10, 2024',
    category: 'React',
    readingTime: '8',
  },
  {
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques for 2024',
    excerpt: 'Explore the latest CSS features including Grid, Flexbox, Container Queries, and more.',
    content: `# Modern CSS Techniques for 2024

CSS has evolved tremendously over the years. Let's explore some of the most powerful modern techniques.

## CSS Grid Layout

CSS Grid provides a two-dimensional layout system:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

## Container Queries

Container queries allow you to style elements based on their container's size:

\`\`\`css
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    display: flex;
  }
}
\`\`\`

## CSS Custom Properties

Custom properties enable dynamic theming:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
}
\`\`\`

These techniques will help you build more flexible and maintainable stylesheets.`,
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    author: {
      name: 'Mike Johnson',
      bio: 'Frontend designer and CSS enthusiast',
    },
    publishDate: 'March 5, 2024',
    category: 'CSS',
    readingTime: '6',
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for React Developers',
    excerpt: 'Learn how to write type-safe React applications with TypeScript.',
    content: `# TypeScript Best Practices for React Developers

TypeScript brings type safety to JavaScript, making your React applications more robust and maintainable.

## Type Definitions for Props

Always define types for your component props:

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
\`\`\`

## Generic Components

Use generics for reusable components:

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
\`\`\`

These practices will help you leverage TypeScript's power in your React projects.`,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
    author: {
      name: 'Sarah Williams',
      bio: 'TypeScript expert and React consultant',
    },
    publishDate: 'February 28, 2024',
    category: 'TypeScript',
    readingTime: '7',
  },
  {
    slug: 'responsive-design-principles',
    title: 'Responsive Design Principles for Modern Web',
    excerpt: 'Master the art of building websites that look great on all devices.',
    content: `# Responsive Design Principles

Responsive design is no longer optional—it's essential for modern web development.

## Mobile-First Approach

Start with mobile styles and progressively enhance for larger screens:

\`\`\`css
/* Mobile styles (default) */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
\`\`\`

## Flexible Images

Ensure images scale properly:

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

## Breakpoint Strategy

Use consistent breakpoints throughout your design system:

- Mobile: 0-767px
- Tablet: 768-1023px
- Desktop: 1024px+

These principles ensure your designs work beautifully across all devices.`,
    coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop',
    author: {
      name: 'Emily Chen',
      bio: 'UI/UX designer focused on responsive layouts',
    },
    publishDate: 'February 20, 2024',
    category: 'Design',
    readingTime: '5',
  },
  {
    slug: 'javascript-async-patterns',
    title: 'Modern JavaScript Async Patterns',
    excerpt: 'Understanding Promises, async/await, and modern asynchronous JavaScript patterns.',
    content: `# Modern JavaScript Async Patterns

Asynchronous programming is fundamental to JavaScript. Let's explore modern patterns.

## Promises

Promises provide a cleaner way to handle asynchronous operations:

\`\`\`javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

## Async/Await

Async/await makes asynchronous code look synchronous:

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Promise.all

Execute multiple promises in parallel:

\`\`\`javascript
const [user, posts] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
\`\`\`

Mastering these patterns is crucial for modern JavaScript development.`,
    coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1200&h=600&fit=crop',
    author: {
      name: 'David Brown',
      bio: 'JavaScript engineer and educator',
    },
    publishDate: 'February 15, 2024',
    category: 'JavaScript',
    readingTime: '6',
  },
];

