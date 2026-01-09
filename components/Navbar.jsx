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
import Image from "next/image";
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
    <header className="w-full relative z-50">
      {/* ───────── Top Bar ───────── */}
      <div className="hidden md:block border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 relative z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10 text-sm">
          <div className="flex gap-6 text-gray-700 dark:text-gray-300">
            <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-red-500 transition-colors">About</Link>
            <Link href="/?category=resources" className="hover:text-red-500 transition-colors">Resources</Link>
            <Link href="/?category=events" className="hover:text-red-500 transition-colors">Events</Link>
            <Link href="/contact" className="hover:text-red-500 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Welcome, {user.name}</span>
                  </div>
                ) : (
                  <Link href="/login" className="hover:text-red-500">
                    Login
                  </Link>
                )}
              </>
            )}
            <Facebook size={16} />
            <Twitter size={16} />
            <Youtube size={16} />
            <Rss size={16} />
          </div>
        </div>
      </div>

      {/* ───────── Logo Row ───────── */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between bg-white dark:bg-gray-900 relative z-50">
        <Link href="/">
          <Image src="/logo.jpeg" alt="Logo" width={160} height={30} priority />
        </Link>

        <div className="hidden md:flex w-[90%] h-[60px] bg-gray-100 dark:bg-gray-800 items-center justify-center border dark:border-gray-700 text-sm text-gray-400 dark:text-gray-500">
          Advertisement
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <Search size={20} />
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ───────── Main Menu ───────── */}
      <nav className="bg-[#0f172a] dark:bg-gray-900 relative z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 hidden md:flex items-center justify-between">
          <ul className="flex items-center text-white font-semibold text-sm">
            <li className="px-6 h-14 flex items-center hover:bg-red-500">
              <Link href="/">HOME</Link>
            </li>

            {/* STARTUPS */}
            <li className="relative group px-6 h-14 flex items-center hover:bg-red-500 cursor-pointer z-50">
              STARTUPS <ChevronDown size={14} className="ml-1" />
              {/* Dropdown */}
              <ul className="absolute left-0 top-full hidden group-hover:block bg-[#111827] w-56 z-50 shadow-lg">
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=startups" className="block">Startup Stories</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=success-stories" className="block">Success Stories</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=funding" className="block">Funding & Investment</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=incubators" className="block">Incubators & Accelerators</Link>
                </li>
              </ul>
            </li>

            {/* RESOURCES */}
            <li className="relative group px-6 h-14 flex items-center hover:bg-red-500 cursor-pointer z-50">
              RESOURCES <ChevronDown size={14} className="ml-1" />
              {/* Dropdown */}
              <ul className="absolute left-0 top-full hidden group-hover:block bg-[#111827] w-56 z-50 shadow-lg">
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=guides" className="block">Startup Guides</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=tools" className="block">Tools & Templates</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=legal" className="block">Legal & Compliance</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=marketing" className="block">Marketing & Growth</Link>
                </li>
              </ul>
            </li>

            {/* EVENTS */}
            <li className="relative group px-6 h-14 flex items-center hover:bg-red-500 cursor-pointer z-50">
              EVENTS <ChevronDown size={14} className="ml-1" />
              {/* Dropdown */}
              <ul className="absolute left-0 top-full hidden group-hover:block bg-[#111827] w-56 z-50 shadow-lg">
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=workshops" className="block">Workshops</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=conferences" className="block">Conferences</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=networking" className="block">Networking Events</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=webinars" className="block">Webinars</Link>
                </li>
              </ul>
            </li>

            {/* COMMUNITY */}
            <li className="relative group px-6 h-14 flex items-center hover:bg-red-500 cursor-pointer z-50">
              COMMUNITY <ChevronDown size={14} className="ml-1" />
              {/* Dropdown */}
              <ul className="absolute left-0 top-full hidden group-hover:block bg-[#111827] w-56 z-50 shadow-lg">
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=mentorship" className="block">Mentorship</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=partnerships" className="block">Partnerships</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/?category=forums" className="block">Forums & Discussions</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937] relative z-50">
                  <Link href="/contact" className="block">Contact Us</Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWritePost}
              className="text-white px-4 py-2 hover:bg-red-500 transition flex items-center gap-2"
            >
              <Edit size={18} />
              <span className="hidden lg:inline">Write a Post</span>
            </button>
            {!loading && (
              <>
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="text-white px-4 py-2 hover:bg-red-500 transition flex items-center gap-2"
                    >
                      <User size={18} />
                      <span className="hidden lg:inline">{user.name}</span>
                      <ChevronDown size={14} />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-[#111827] rounded shadow-lg z-[60]">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-white text-sm font-semibold">
                            {user.name}
                          </p>
                          <p className="text-gray-400 text-xs">{user.email}</p>
                        </div>
                        <Link
                          href={user.role === "ADMIN" ? "/admin" : "/user"}
                          className="block px-4 py-3 text-white hover:bg-[#1f2937] text-sm"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          {user.role === "ADMIN" ? "Admin Panel" : "User Panel"}
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-white hover:bg-[#1f2937] text-sm flex items-center gap-2"
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
                    className="text-white px-4 py-2 hover:bg-red-500 transition"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
            <button
              onClick={toggleTheme}
              className="text-white px-4 hover:bg-red-500 transition rounded"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="bg-red-500 h-14 w-14 flex items-center justify-center">
              <Search size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-[#0f172a] dark:bg-gray-900 text-white">
            <div className="px-4 py-4 space-y-0">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block py-3 border-b border-white/10 text-white hover:text-red-500 font-semibold"
              >
                HOME
              </Link>

              {/* STARTUPS Dropdown */}
              <div>
                <button
                  onClick={() => setMobileMenuOpen(mobileMenuOpen === "STARTUPS" ? null : "STARTUPS")}
                  className="w-full flex justify-between items-center py-3 border-b border-white/10 text-white hover:text-red-500 font-semibold"
                >
                  <span>STARTUPS</span>
                  <ChevronDown size={16} className={mobileMenuOpen === "STARTUPS" ? "rotate-180" : ""} />
                </button>
                {mobileMenuOpen === "STARTUPS" && (
                  <div className="bg-[#111827] pl-4 space-y-0">
                    <Link
                      href="/?category=startups"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Startup Stories
                    </Link>
                    <Link
                      href="/?category=success-stories"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Success Stories
                    </Link>
                    <Link
                      href="/?category=funding"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Funding & Investment
                    </Link>
                    <Link
                      href="/?category=incubators"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Incubators & Accelerators
                    </Link>
                  </div>
                )}
              </div>

              {/* RESOURCES Dropdown */}
              <div>
                <button
                  onClick={() => setMobileMenuOpen(mobileMenuOpen === "RESOURCES" ? null : "RESOURCES")}
                  className="w-full flex justify-between items-center py-3 border-b border-white/10 text-white hover:text-red-500 font-semibold"
                >
                  <span>RESOURCES</span>
                  <ChevronDown size={16} className={mobileMenuOpen === "RESOURCES" ? "rotate-180" : ""} />
                </button>
                {mobileMenuOpen === "RESOURCES" && (
                  <div className="bg-[#111827] pl-4 space-y-0">
                    <Link
                      href="/?category=guides"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Startup Guides
                    </Link>
                    <Link
                      href="/?category=tools"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Tools & Templates
                    </Link>
                    <Link
                      href="/?category=legal"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Legal & Compliance
                    </Link>
                    <Link
                      href="/?category=marketing"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Marketing & Growth
                    </Link>
                  </div>
                )}
              </div>

              {/* EVENTS Dropdown */}
              <div>
                <button
                  onClick={() => setMobileMenuOpen(mobileMenuOpen === "EVENTS" ? null : "EVENTS")}
                  className="w-full flex justify-between items-center py-3 border-b border-white/10 text-white hover:text-red-500 font-semibold"
                >
                  <span>EVENTS</span>
                  <ChevronDown size={16} className={mobileMenuOpen === "EVENTS" ? "rotate-180" : ""} />
                </button>
                {mobileMenuOpen === "EVENTS" && (
                  <div className="bg-[#111827] pl-4 space-y-0">
                    <Link
                      href="/?category=workshops"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Workshops
                    </Link>
                    <Link
                      href="/?category=conferences"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Conferences
                    </Link>
                    <Link
                      href="/?category=networking"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Networking Events
                    </Link>
                    <Link
                      href="/?category=webinars"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Webinars
                    </Link>
                  </div>
                )}
              </div>

              {/* COMMUNITY Dropdown */}
              <div>
                <button
                  onClick={() => setMobileMenuOpen(mobileMenuOpen === "COMMUNITY" ? null : "COMMUNITY")}
                  className="w-full flex justify-between items-center py-3 border-b border-white/10 text-white hover:text-red-500 font-semibold"
                >
                  <span>COMMUNITY</span>
                  <ChevronDown size={16} className={mobileMenuOpen === "COMMUNITY" ? "rotate-180" : ""} />
                </button>
                {mobileMenuOpen === "COMMUNITY" && (
                  <div className="bg-[#111827] pl-4 space-y-0">
                    <Link
                      href="/?category=mentorship"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Mentorship
                    </Link>
                    <Link
                      href="/?category=partnerships"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Partnerships
                    </Link>
                    <Link
                      href="/?category=forums"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Forums & Discussions
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="block py-2 border-b border-white/5 text-gray-300 hover:text-red-500"
                    >
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="block py-3 border-b border-white/10 text-white hover:text-red-500 font-semibold"
              >
                ABOUT
              </Link>

              <button
                onClick={() => {
                  handleWritePost();
                  setOpen(false);
                }}
                className="block py-3 border-b border-white/10 text-white hover:text-red-500 font-semibold w-full text-left flex items-center gap-2"
              >
                <Edit size={18} />
                Write a Post
              </button>

              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="py-3 border-b border-white/10">
                        <p className="text-red-500 font-semibold">{user.name}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </div>
                      <Link
                        href={user.role === "ADMIN" ? "/admin" : "/user"}
                        onClick={() => setOpen(false)}
                        className="block py-3 border-b border-white/10 text-white hover:text-red-500"
                      >
                        {user.role === "ADMIN" ? "Admin Panel" : "User Panel"}
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="block py-3 border-b border-white/10 text-red-500 font-semibold w-full text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="block py-3 border-b border-white/10 text-red-500 font-semibold"
                    >
                      Login
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
