"use client"

import Link from 'next/link';
import { Search, User, Bookmark, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    { name: 'Technology', href: '/category/technology' },
    { name: 'Startups', href: '/category/startups' },
    { name: 'Business', href: '/category/business' },
    { name: 'Health', href: '/category/health' },
    { name: 'Lifestyle', href: '/category/lifestyle' },
    { name: 'Finance', href: '/category/finance' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Navigation */}
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                NN<span className="text-blue-600">Blog</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/blogs" 
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors relative group"
              >
                All Blogs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors flex items-center">
                  Categories
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {categories.slice(0, 6).map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link 
                href="/trending" 
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors relative group"
              >
                Trending
                <span className="absolute -top-1 -right-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">🔥</span>
              </Link>
              <Link 
                href="/write" 
                className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Write
              </Link>
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Button */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Notification */}
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Bookmarks */}
              <Link 
                href="/bookmarks" 
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bookmark className="w-5 h-5" />
              </Link>

              {/* User Profile */}
              <Link 
                href="/profile" 
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search Bar (Full Width) */}
          {isSearchOpen && (
            <div className="hidden lg:block py-4 border-t border-gray-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for articles, topics, or authors..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Category Strip (Desktop) */}
          <div className="hidden lg:flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-xs font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link 
              href="/categories" 
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all →
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Mobile Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              <Link 
                href="/" 
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/blogs" 
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Blogs
              </Link>
              <Link 
                href="/trending" 
                className="block px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Trending 🔥
              </Link>
              <Link 
                href="/write" 
                className="block px-4 py-3 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Write Story
              </Link>
            </div>

            {/* Mobile Categories */}
            <div className="mt-8">
              <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile User Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-around">
                <Link 
                  href="/bookmarks" 
                  className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bookmark className="w-5 h-5 mb-1" />
                  <span className="text-xs">Saved</span>
                </Link>
                <Link 
                  href="/notifications" 
                  className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell className="w-5 h-5 mb-1" />
                  <span className="text-xs">Notifications</span>
                </Link>
                <Link 
                  href="/profile" 
                  className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mb-1" />
                  <span className="text-xs">Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}