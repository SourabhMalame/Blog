import Navbar from "@/components/Navbar";
import MainLayout from "@/components/MainLayout";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Clock,
  Facebook,
  MessageCircle,
  Share2,
  ThumbsUp,
  Twitter,
  User,
} from "lucide-react";

export default function PostPage() {
  const related = [
    {
      title: "How a good team can positively influence your business",
      date: "March 05, 2020",
      comments: 12,
      image: "/demo.png",
    },
    {
      title: "Successful analysts can evaluate any place easily",
      date: "March 03, 2020",
      comments: 8,
      image: "/demo.png",
    },
    {
      title: "Good partnerships can help your company achieve better",
      date: "March 02, 2020",
      comments: 5,
      image: "/demo.png",
    },
  ];

  const comments = [
    {
      author: "Sora Blogging Tips",
      date: "August 24, 2020",
      text: "This is a basic comment area.",
    },
    {
      author: "Sora Blogging Tips",
      date: "August 24, 2020",
      text: "This is a second testing comment.",
    },
    {
      author: "Sora Blogging Tips",
      date: "August 24, 2020",
      text: "This is a third testing comment.",
    },
    {
      author: "Sora Blogging Tips",
      date: "August 24, 2020",
      text: "This is a fourth testing comment.",
    },
  ];

  return (
    <>
      <Navbar />

      <MainLayout
        left={
          <article className="space-y-8">
            {/* Breadcrumbs */}
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <Link href="/" className="hover:text-red-500">
                Home
              </Link>
              <span>/</span>
              <span>Business</span>
            </div>

            {/* Title + Meta */}
            <header className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                How a good team can positively influence your business
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <User size={16} />
                  Sora Blogging Tips
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  March 05, 2020
                </span>
                <span className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  2 Comments
                </span>
                <div className="flex items-center gap-3 ml-auto text-gray-600">
                  <button className="flex items-center gap-1 hover:text-red-500">
                    <Share2 size={16} /> Share
                  </button>
                  <button className="flex items-center gap-1 hover:text-red-500">
                    <Bookmark size={16} /> Save
                  </button>
                </div>
              </div>
            </header>

            {/* Hero Image */}
            <div className="border rounded overflow-hidden">
              <Image
                src="/demo.png"
                alt="Featured post"
                width={1200}
                height={720}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Lorem ipsum is simply dummy text of the printing and
                typesetting industry. Lorem ipsum has been the industry&apos;s
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book.
              </p>
              <blockquote className="border-l-4 border-red-500 bg-gray-50 p-4 text-gray-800">
                Lorem ipsum has been the industry&apos;s standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </blockquote>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem ipsum.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Lorem ipsum has been the industry.</li>
                <li>Lorem ipsum is dummy text of the printing industry.</li>
                <li>
                  Lorem ipsum has been the industry standard dummy text ever
                  since the 1500s.
                </li>
              </ul>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using &apos;Content
                here, content here&apos;, making it look like readable English.
              </p>
              <div className="border rounded overflow-hidden">
                <Image
                  src="/demo.png"
                  alt="Team collaboration"
                  width={1200}
                  height={720}
                  className="w-full h-auto object-cover"
                />
              </div>
              <p>
                Many desktop publishing packages and web page editors now use
                Lorem ipsum as their default model text, and a search for
                &apos;lorem ipsum&apos; will uncover many web sites still in their
                infancy. Various versions have evolved over the years, sometimes
                by accident, sometimes on purpose.
              </p>
            </div>

            {/* Share / Reactions */}
            <div className="flex flex-wrap items-center gap-4 border-y py-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ThumbsUp size={16} /> 20 Reactions
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} /> 2 Comments
              </div>
              <div className="flex items-center gap-2">
                <Bookmark size={16} /> Save for Later
              </div>
              <div className="flex items-center gap-2">
                <Share2 size={16} /> Share This Post
              </div>
              <div className="flex items-center gap-2 text-blue-600 ml-auto">
                <Facebook size={16} /> Facebook
              </div>
              <div className="flex items-center gap-2 text-sky-500">
                <Twitter size={16} /> Twitter
              </div>
            </div>

            {/* Author Box */}
            <div className="border p-4 flex gap-4 items-center bg-gray-50">
              <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                SBT
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Sora Blogging Tips</h4>
                <p className="text-sm text-gray-600">
                  Sora Blogging Tips is a site where you find unique and
                  high-quality professional blogger templates for free.
                </p>
                <div className="flex gap-3 text-xs text-gray-500 mt-2">
                  <span>Facebook</span>
                  <span>Twitter</span>
                  <span>Google+</span>
                  <span>Pinterest</span>
                </div>
              </div>
            </div>

            {/* You Might Also Like */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">You Might Also Like</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((item, i) => (
                  <Link
                    key={i}
                    href="/post"
                    className="border rounded overflow-hidden group"
                  >
                    <div className="relative h-36 w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div className="p-3 space-y-2">
                      <p className="text-sm font-semibold leading-snug group-hover:text-red-500">
                        {item.title}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{item.date}</span>
                        <span>{item.comments} comments</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">4 Comments</h3>
              <p className="text-xs text-gray-500">
                Note: Only a member of this blog may post a comment.
              </p>
              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="border-b pb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">{c.author}</span>
                      <span className="text-[10px] text-red-500">❤</span>
                      <span className="text-xs text-gray-500">{c.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{c.text}</p>
                    <button className="text-xs text-red-500 mt-2 hover:underline">
                      Reply
                    </button>
                  </div>
                ))}
              </div>

              <div className="border p-4 bg-gray-50 space-y-3">
                <p className="text-sm">
                  To leave a comment, click the button below to sign in with
                  Google.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold">
                  Sign in with Google
                </button>
              </div>
            </div>
          </article>
        }
        right={<Sidebar />}
      />

      <Footer />
    </>
  );
}

