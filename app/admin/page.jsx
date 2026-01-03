import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Eye, PlusCircle } from "lucide-react";

export default function AdminPosts() {
  // Mock posts data
  const posts = [
    {
      id: 1,
      title: "How a good team can positively influence your business",
      category: "Business",
      date: "March 05, 2020",
      status: "Published",
      image: "/demo.png",
    },
    {
      id: 2,
      title: "Drones an indispensable tool for professionals",
      category: "Technology",
      date: "March 04, 2020",
      status: "Published",
      image: "/demo.png",
    },
    {
      id: 3,
      title: "Top reasons why Microsoft discontinued Windows Phone",
      category: "Technology",
      date: "March 03, 2020",
      status: "Draft",
      image: "/demo.png",
    },
    {
      id: 4,
      title: "Smartphone battery tips to improve performance",
      category: "Technology",
      date: "March 02, 2020",
      status: "Published",
      image: "/demo.png",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/add-post"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-200 font-medium"
        >
          <PlusCircle size={20} />
          Add New Post
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/25">
          <div className="text-sm font-medium opacity-90">Total Posts</div>
          <div className="text-3xl font-bold mt-2">{posts.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg shadow-green-500/25">
          <div className="text-sm font-medium opacity-90">Published</div>
          <div className="text-3xl font-bold mt-2">
            {posts.filter((p) => p.status === "Published").length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg shadow-yellow-500/25">
          <div className="text-sm font-medium opacity-90">Drafts</div>
          <div className="text-3xl font-bold mt-2">
            {posts.filter((p) => p.status === "Draft").length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-500/25">
          <div className="text-sm font-medium opacity-90">Categories</div>
          <div className="text-3xl font-bold mt-2">
            {new Set(posts.map((p) => p.category)).size}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="w-20 h-14 relative rounded-lg overflow-hidden shadow-md ring-1 ring-gray-200">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900 max-w-md">
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{post.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href="/post"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

