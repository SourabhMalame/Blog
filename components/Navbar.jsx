"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Rss,
  Moon,
  Sun,
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  User,
  LogOut,
  Edit,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(null);
  const router = useRouter();
  const userMenuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      setUserMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleWritePost = () => {
    if (user) {
      if (user.role === "ADMIN") {
        router.push("/admin/add-post");
      } else {
        router.push("/user/create-post");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="w-full relative z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* Top Bar - Full Width */}
      <div className="w-full bg-orange-600 dark:bg-orange-700 py-2 sm:py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center justify-center">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-white text-center leading-tight">
              Maharashtra Startup Organisation
            </h1>
          </Link>
        </div>
      </div>

      {/* Navigation Bar - Full Width */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Left Side (Desktop) */}
            {/* <Link href="/" className="hidden lg:flex flex-shrink-0 mr-6">
              <div className="flex flex-col gap-0">
                <span className="text-base font-extrabold text-orange-600 dark:text-orange-500">
                  MSO
                </span>
              </div>
            </Link> */}

            {/* Logo - Left Side (Mobile) */}
            <Link href="/" className="flex lg:hidden flex-shrink-0">
              <div className="flex flex-col gap-0">
                <span className="text-base font-extrabold text-orange-600 dark:text-orange-500">
                  MSO
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Left Aligned */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-start">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>

              {/* STARTUPS */}
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                  Startups
                  <ChevronDown size={14} />
                </button>
                <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 min-w-[200px] z-50">
                  <Link
                    href="/?category=startups"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Startup Stories
                  </Link>
                  <Link
                    href="/?category=success-stories"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Success Stories
                  </Link>
                  <Link
                    href="/?category=funding"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Funding & Investment
                  </Link>
                  <Link
                    href="/?category=incubators"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Incubators & Accelerators
                  </Link>
                </div>
              </div>

              {/* RESOURCES */}
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                  Resources
                  <ChevronDown size={14} />
                </button>
                <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 min-w-[200px] z-50">
                  <Link
                    href="/?category=guides"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Startup Guides
                  </Link>
                  <Link
                    href="/?category=tools"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Tools & Templates
                  </Link>
                  <Link
                    href="/?category=legal"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Legal & Compliance
                  </Link>
                  <Link
                    href="/?category=marketing"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Marketing & Growth
                  </Link>
                </div>
              </div>

              {/* EVENTS */}
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                  Events
                  <ChevronDown size={14} />
                </button>
                <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 min-w-[200px] z-50">
                  <Link
                    href="/?category=workshops"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Workshops
                  </Link>
                  <Link
                    href="/?category=conferences"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Conferences
                  </Link>
                  <Link
                    href="/?category=networking"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Networking Events
                  </Link>
                  <Link
                    href="/?category=webinars"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Webinars
                  </Link>
                </div>
              </div>

              {/* COMMUNITY */}
              <div className="relative group">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                  Community
                  <ChevronDown size={14} />
                </button>
                <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 min-w-[200px] z-50">
                  <Link
                    href="/?category=mentorship"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Mentorship
                  </Link>
                  <Link
                    href="/?category=partnerships"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Partnerships
                  </Link>
                  <Link
                    href="/?category=forums"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Forums & Discussions
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search - Hidden on mobile */}
              <button className="hidden sm:flex p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Search size={20} />
              </button>

              {/* Write Post Button - Hidden on mobile */}
              <button
                onClick={handleWritePost}
                className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
              >
                <Edit size={16} />
                <span className="hidden lg:inline">Write</span>
              </button>

              {/* User Menu */}
              {!loading && (
                <>
                  {user ? (
                    <div className="relative" ref={userMenuRef}>
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <User size={18} className="sm:w-5 sm:h-5" />
                        <span className="hidden lg:inline">{user.name}</span>
                        <ChevronDown size={14} className="hidden sm:block" />
                      </button>
                      {userMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                          <Link
                            href={user.role === "ADMIN" ? "/admin" : "/user"}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            {user.role === "ADMIN"
                              ? "Admin Panel"
                              : "User Panel"}
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      Login
                    </Link>
                  )}
                </>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Social Icons - Hidden on mobile */}
              <div className="hidden lg:flex items-center gap-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 animate-in slide-in-from-top duration-200">
          <div className="px-4 sm:px-6 py-4 space-y-2 max-h-[calc(100vh-72px)] overflow-y-auto">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              Home
            </Link>

            {/* STARTUPS Dropdown */}
            <div>
              <button
                onClick={() =>
                  setMobileMenuOpen(
                    mobileMenuOpen === "STARTUPS" ? null : "STARTUPS"
                  )
                }
                className="w-full flex justify-between items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <span>Startups</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileMenuOpen === "STARTUPS" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileMenuOpen === "STARTUPS" && (
                <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-top duration-200">
                  <Link
                    href="/?category=startups"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Startup Stories
                  </Link>
                  <Link
                    href="/?category=success-stories"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Success Stories
                  </Link>
                  <Link
                    href="/?category=funding"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Funding & Investment
                  </Link>
                  <Link
                    href="/?category=incubators"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Incubators & Accelerators
                  </Link>
                </div>
              )}
            </div>

            {/* RESOURCES Dropdown */}
            <div>
              <button
                onClick={() =>
                  setMobileMenuOpen(
                    mobileMenuOpen === "RESOURCES" ? null : "RESOURCES"
                  )
                }
                className="w-full flex justify-between items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <span>Resources</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileMenuOpen === "RESOURCES" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileMenuOpen === "RESOURCES" && (
                <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-top duration-200">
                  <Link
                    href="/?category=guides"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Startup Guides
                  </Link>
                  <Link
                    href="/?category=tools"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Tools & Templates
                  </Link>
                  <Link
                    href="/?category=legal"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Legal & Compliance
                  </Link>
                  <Link
                    href="/?category=marketing"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Marketing & Growth
                  </Link>
                </div>
              )}
            </div>

            {/* EVENTS Dropdown */}
            <div>
              <button
                onClick={() =>
                  setMobileMenuOpen(
                    mobileMenuOpen === "EVENTS" ? null : "EVENTS"
                  )
                }
                className="w-full flex justify-between items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <span>Events</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileMenuOpen === "EVENTS" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileMenuOpen === "EVENTS" && (
                <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-top duration-200">
                  <Link
                    href="/?category=workshops"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Workshops
                  </Link>
                  <Link
                    href="/?category=conferences"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Conferences
                  </Link>
                  <Link
                    href="/?category=networking"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Networking Events
                  </Link>
                  <Link
                    href="/?category=webinars"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Webinars
                  </Link>
                </div>
              )}
            </div>

            {/* COMMUNITY Dropdown */}
            <div>
              <button
                onClick={() =>
                  setMobileMenuOpen(
                    mobileMenuOpen === "COMMUNITY" ? null : "COMMUNITY"
                  )
                }
                className="w-full flex justify-between items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <span>Community</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileMenuOpen === "COMMUNITY" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileMenuOpen === "COMMUNITY" && (
                <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-top duration-200">
                  <Link
                    href="/?category=mentorship"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Mentorship
                  </Link>
                  <Link
                    href="/?category=partnerships"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Partnerships
                  </Link>
                  <Link
                    href="/?category=forums"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Forums & Discussions
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            >
              About
            </Link>

            <button
              onClick={() => {
                handleWritePost();
                setOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-md mt-4 transition-colors"
            >
              <Edit size={20} />
              Write a Post
            </button>

            {!loading && (
              <>
                {user ? (
                  <>
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 mt-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href={user.role === "ADMIN" ? "/admin" : "/user"}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {user.role === "ADMIN" ? "Admin Panel" : "User Panel"}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-base text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md mt-4 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
