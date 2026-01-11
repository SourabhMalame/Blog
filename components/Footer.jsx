import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-300 border-t border-slate-700/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image src="/demo.png" alt="Maharashtra Startup Organisation" width={180} height={40} className="brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-md">
              Maharashtra Startup Organisation - Empowering entrepreneurs and startups across Maharashtra with resources, funding opportunities, mentorship, and a thriving ecosystem for innovation and growth.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-red-500 flex items-center justify-center transition-colors group">
                <Facebook size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-red-500 flex items-center justify-center transition-colors group">
                <Twitter size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-red-500 flex items-center justify-center transition-colors group">
                <Youtube size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-red-500 flex items-center justify-center transition-colors group">
                <Instagram size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-red-500 flex items-center justify-center transition-colors group">
                <Linkedin size={18} className="text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Mail size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                <a href="mailto:contact@maharashtrastartup.org" className="text-gray-400 hover:text-white transition-colors">
                  contact@maharashtrastartup.org
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Phone size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-gray-400 hover:text-white transition-colors">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/?category=startup-stories" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Startup Stories</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=success-stories" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Success Stories</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=funding" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Funding & Investment</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=incubators" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Incubators</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=technology" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Technology</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=business" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Business Strategy</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=innovation" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Innovation</span>
                </Link>
              </li>
              <li>
                <Link href="/?category=entrepreneurship" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Entrepreneurship</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Our Mission</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Team</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Partners</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Events</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">
              Legal & Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Support</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>FAQs</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Cookie Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>GDPR</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Accessibility</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-slate-700/50">
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Startup Programs</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-red-400 transition-colors">Accelerator Program</Link></li>
              <li><Link href="/" className="hover:text-red-400 transition-colors">Mentorship Network</Link></li>
              <li><Link href="/" className="hover:text-red-400 transition-colors">Workshops & Training</Link></li>
              <li><Link href="/" className="hover:text-red-400 transition-colors">Investor Connect</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Community</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-red-400 transition-colors">Forums</Link></li>
              <li><Link href="/" className="hover:text-red-400 transition-colors">Networking Events</Link></li>
              <li><Link href="/" className="hover:text-red-400 transition-colors">Startup Directory</Link></li>
              <li><Link href="/" className="hover:text-red-400 transition-colors">Success Metrics</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Access</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-red-400 transition-colors">Apply for Funding</Link></li>
              <li><Link href="/" className="hover:text-red-400 transition-colors">Join as Mentor</Link></li>
              <li><Link href="/" className="hover:text-red-400 transition-colors">Partner With Us</Link></li>
              <li><Link href="/" className="hover:text-red-400 transition-colors">Media Kit</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Maharashtra Startup Organisation. All rights reserved.</p>
              <p className="mt-1 text-xs text-gray-500">Empowering Maharashtra's startup ecosystem since 2024</p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-red-400 transition-colors">Privacy</Link>
              <Link href="/privacy-policy" className="text-gray-400 hover:text-red-400 transition-colors">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-red-400 transition-colors">Support</Link>
              <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
