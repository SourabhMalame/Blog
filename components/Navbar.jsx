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
      router.push("/admin/add-post");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="w-full">
      {/* ───────── Top Bar ───────── */}
      <div className="hidden md:block border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10 text-sm">
          <div className="flex gap-6 text-gray-700 dark:text-gray-300">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact Us</Link>
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
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between bg-white dark:bg-gray-900">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={160} height={30} priority />
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
      <nav className="bg-[#0f172a] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 h-14 hidden md:flex items-center justify-between">
          <ul className="flex items-center text-white font-semibold text-sm">
            <li className="px-6 h-14 flex items-center hover:bg-red-500">
              <Link href="/">HOME</Link>
            </li>

            {/* FEATURES */}
            <li className="relative group px-6 h-14 flex items-center hover:bg-red-500 cursor-pointer">
              STORIES <ChevronDown size={14} className="ml-1" />
              {/* Dropdown */}
              <ul className="absolute left-0 top-full hidden group-hover:block bg-[#111827] w-56">
                {/* Multi dropdown */}
                <li className="relative group/item px-5 py-4 hover:bg-[#1f2937] flex justify-between items-center">
                  Multi DropDown
                  <ChevronRight size={14} />
                  {/* Submenu */}
                  <ul className="absolute left-full top-0 hidden group-hover/item:block bg-[#1f2937] w-56">
                    <li className="px-5 py-4 hover:bg-[#374151]">
                      <Link href="#">DropDown 1</Link>
                    </li>
                    <li className="px-5 py-4 hover:bg-[#374151]">
                      <Link href="#">DropDown 2</Link>
                    </li>
                    <li className="px-5 py-4 hover:bg-[#374151]">
                      <Link href="#">DropDown 3</Link>
                    </li>
                  </ul>
                </li>

                <li className="px-5 py-4 hover:bg-[#1f2937]">
                  <Link href="#">Events</Link>
                </li>
                <li className="px-5 py-4 hover:bg-[#1f2937]">
                  <Link href="#">Bisness</Link>
                </li>
              </ul>
            </li>

            <li className="px-6 h-14 flex items-center hover:bg-red-500">
              EVENTS <ChevronDown size={14} className="ml-1" />
            </li>

            <li className="px-6 h-14 flex items-center hover:bg-red-500">
              BISNESS <ChevronDown size={14} className="ml-1" />
            </li>

            <li className="px-6 h-14 flex items-center hover:bg-red-500">
              DOCUMENTATION <ChevronDown size={14} className="ml-1" />
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
                      <div className="absolute right-0 top-full mt-2 w-48 bg-[#111827] rounded shadow-lg z-50">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-white text-sm font-semibold">
                            {user.name}
                          </p>
                          <p className="text-gray-400 text-xs">{user.email}</p>
                        </div>
                        <Link
                          href="/admin"
                          className="block px-4 py-3 text-white hover:bg-[#1f2937] text-sm"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Dashboard
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
          <div className="md:hidden bg-[#0f172a] dark:bg-gray-900 text-white px-4 py-4 space-y-4">
            <button
              onClick={handleWritePost}
              className="block py-2 border-b border-white/10 text-white hover:text-red-500 font-semibold w-full text-left flex items-center gap-2"
            >
              <Edit size={18} />
              Write a Post
            </button>
            {!loading && (
              <>
                {user ? (
                  <>
                    <div className="py-2 border-b border-white/10">
                      <p className="text-red-500 font-semibold">{user.name}</p>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                    <Link
                      href="/admin"
                      className="block py-2 border-b border-white/10"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block py-2 border-b border-white/10 text-red-500 font-semibold w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block py-2 border-b border-white/10 text-red-500 font-semibold"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
            {["HOME", "FEATURES", "MEGA", "MEGA TABS", "DOCUMENTATION"].map(
              (item) => (
                <div
                  key={item}
                  className="flex justify-between items-center border-b border-white/10 pb-2"
                >
                  <span>{item}</span>
                  <ChevronDown size={16} />
                </div>
              )
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
