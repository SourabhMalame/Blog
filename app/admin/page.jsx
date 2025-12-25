import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Eye } from "lucide-react";

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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
        <Link
          href="/admin/add-post"
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Add New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-16 h-12 relative rounded overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-md">
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{post.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{post.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
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
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="View"
                      >
                        <Eye size={16} />
                      </Link>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 size={16} />
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

