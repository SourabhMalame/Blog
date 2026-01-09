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
            Maharashtra Startup Organisation - A platform focused on technology, startups,
            business insights, and supporting the startup ecosystem in Maharashtra.
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
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/?category=startups" className="hover:text-white transition-colors">Startup Resources</Link>
            </li>
            <li>
              <Link href="/?category=incubators" className="hover:text-white transition-colors">Incubators & Accelerators</Link>
            </li>
            <li>
              <Link href="/?category=funding" className="hover:text-white transition-colors">Funding Opportunities</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
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
              <Link href="/?category=technology" className="hover:text-white transition-colors">Technology Startups</Link>
            </li>
            <li>
              <Link href="/?category=business" className="hover:text-white transition-colors">Business & Strategy</Link>
            </li>
            <li>
              <Link href="/?category=funding" className="hover:text-white transition-colors">Funding & Investment</Link>
            </li>
            <li>
              <Link href="/?category=innovation" className="hover:text-white transition-colors">Innovation & Ideas</Link>
            </li>
            <li>
              <Link href="/?category=entrepreneurship" className="hover:text-white transition-colors">Entrepreneurship</Link>
            </li>
            <li>
              <Link href="/?category=success-stories" className="hover:text-white transition-colors">Success Stories</Link>
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
          <p>© {new Date().getFullYear()} Maharashtra Startup Organisation. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
