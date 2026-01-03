import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] dark:bg-gray-900 text-gray-300 dark:text-gray-400 mt-16 border-t dark:border-gray-800">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block mb-4">
            <Image src="/demo.png" alt="Logo" width={150} height={30} />
          </Link>
          <p className="text-sm leading-relaxed">
            A modern news & magazine platform focused on technology, startups,
            business insights, and trending topics.
          </p>
          <div className="flex gap-3 mt-4">
            <Facebook size={18} className="hover:text-white cursor-pointer" />
            <Twitter size={18} className="hover:text-white cursor-pointer" />
            <Youtube size={18} className="hover:text-white cursor-pointer" />
            <Instagram size={18} className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Blog</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm">
            Categories
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Technology</Link>
            </li>
            <li>
              <Link href="#">Business</Link>
            </li>
            <li>
              <Link href="#">Startups</Link>
            </li>
            <li>
              <Link href="#">Music</Link>
            </li>
            <li>
              <Link href="#">Crypto</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-sm">
            Newsletter
          </h4>
          <p className="text-sm mb-4">
            Subscribe to get the latest updates directly in your inbox.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-700 outline-none"
            />
            <button
              type="submit"
              className="bg-red-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} NNBlog. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#">Terms</Link>
            <Link href="#">Privacy</Link>
            <Link href="#">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
