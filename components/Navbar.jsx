"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Rss,
  Moon,
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      {/* ───────── Top Bar ───────── */}
      <div className="hidden md:block border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10 text-sm">
          <div className="flex gap-6 text-gray-700">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <Facebook size={16} />
            <Twitter size={16} />
            <Youtube size={16} />
            <Rss size={16} />
          </div>
        </div>
      </div>

      {/* ───────── Logo Row ───────── */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={160} height={30} priority />
        </Link>

        <div className="hidden md:flex w-[90%] h-[60px] bg-gray-100 items-center justify-center border text-sm text-gray-400">
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
      <nav className="bg-[#0f172a]">
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

          <div className="flex items-center">
            <button className="text-white px-4">
              <Moon size={18} />
            </button>
            <button className="bg-red-500 h-14 w-14 flex items-center justify-center">
              <Search size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Menu (unchanged) */}
        {open && (
          <div className="md:hidden bg-[#0f172a] text-white px-4 py-4 space-y-4">
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
