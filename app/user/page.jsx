"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Eye, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      // Fetch posts by current user (the API automatically filters by authenticated user)
      const postsResponse = await fetch("/api/posts");
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setPosts(postsData.posts || []);
      } else {
        // If not authenticated, redirect to login
        const errorData = await postsResponse.json();
        if (postsResponse.status === 401 || postsResponse.status === 403) {
          router.push("/login");
          return;
        }
        console.error("Failed to fetch posts:", errorData.error);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // If it's an auth error, redirect to login
      if (error.message?.includes("401") || error.message?.includes("403")) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your blog posts</p>
        </div>
        <Link
          href="/user/create-post"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 font-medium"
        >
          <PlusCircle size={20} />
          Create New Post
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
            {posts.filter((p) => p.status === "published").length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg shadow-yellow-500/25">
          <div className="text-sm font-medium opacity-90">Drafts</div>
          <div className="text-3xl font-bold mt-2">
            {posts.filter((p) => p.status === "draft").length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-500/25">
          <div className="text-sm font-medium opacity-90">Categories</div>
          <div className="text-3xl font-bold mt-2">
            {new Set(posts.map((p) => p.category)).size}
          </div>
        </div>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500 mb-4">You haven't created any posts yet.</p>
          <Link
            href="/user/create-post"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
          >
            <PlusCircle size={20} />
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                <tr>
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
                    key={post._id}
                    className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-colors"
                  >
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
                      <span className="text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          post.status === "published"
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
                          href={`/post/${post.slug}`}
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
      )}
    </div>
  );
}

