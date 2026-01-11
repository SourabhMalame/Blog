"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Edit, Trash2, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    status: "draft",
    autoShareEnabled: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/superadmin/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditForm({
      title: post.title,
      category: post.category,
      status: post.status,
      autoShareEnabled: post.autoShareEnabled || false,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/superadmin/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: editingPost,
          ...editForm,
        }),
      });

      if (response.ok) {
        await fetchPosts();
        setEditingPost(null);
        alert("Post updated successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/superadmin/posts?postId=${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchPosts();
        alert("Post deleted successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const toggleAutoShare = async (postId, currentValue) => {
    try {
      const response = await fetch("/api/superadmin/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          autoShareEnabled: !currentValue,
        }),
      });

      if (response.ok) {
        await fetchPosts();
      }
    } catch (error) {
      console.error("Error toggling auto-share:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">All Posts</h1>
        <p className="text-xs text-gray-500 mt-0.5">Manage all posts and auto-sharing settings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-3 text-white shadow-md">
          <div className="text-xs font-medium opacity-90">Total Posts</div>
          <div className="text-2xl font-bold mt-1">{posts.length}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-3 text-white shadow-md">
          <div className="text-xs font-medium opacity-90">Published</div>
          <div className="text-2xl font-bold mt-1">
            {posts.filter((p) => p.status === "published").length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-3 text-white shadow-md">
          <div className="text-xs font-medium opacity-90">Drafts</div>
          <div className="text-2xl font-bold mt-1">
            {posts.filter((p) => p.status === "draft").length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-3 text-white shadow-md">
          <div className="text-xs font-medium opacity-90">Auto-Share Enabled</div>
          <div className="text-2xl font-bold mt-1">
            {posts.filter((p) => p.autoShareEnabled).length}
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">
                  Image
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">
                  Title
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">
                  Author
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">
                  Category
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">
                  Auto-Share
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">
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
                  <td className="px-3 py-2">
                    <div className="w-16 h-10 relative rounded overflow-hidden shadow-sm ring-1 ring-gray-200">
                      <Image
                        src={post.featuredImage || "/demo.png"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    {editingPost === post._id ? (
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    ) : (
                      <div className="text-xs font-semibold text-gray-900 max-w-md line-clamp-2">
                        {post.title}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2">
                      <span className="text-xs text-gray-600">
                      {post.author?.name || "Unknown"}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {editingPost === post._id ? (
                      <input
                        type="text"
                        value={editForm.category}
                        onChange={(e) =>
                          setEditForm({ ...editForm, category: e.target.value })
                        }
                        className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      />
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editingPost === post._id ? (
                      <select
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm({ ...editForm, status: e.target.value })
                        }
                        className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {editingPost === post._id ? (
                      <button
                        onClick={() =>
                          setEditForm({
                            ...editForm,
                            autoShareEnabled: !editForm.autoShareEnabled,
                          })
                        }
                        className="flex items-center gap-2"
                      >
                        {editForm.autoShareEnabled ? (
                          <ToggleRight size={24} className="text-green-600" />
                        ) : (
                          <ToggleLeft size={24} className="text-gray-400" />
                        )}
                        <span className="text-sm">
                          {editForm.autoShareEnabled ? "Enabled" : "Disabled"}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleAutoShare(post._id, post.autoShareEnabled)}
                        className="flex items-center gap-2"
                      >
                        {post.autoShareEnabled ? (
                          <ToggleRight size={24} className="text-green-600" />
                        ) : (
                          <ToggleLeft size={24} className="text-gray-400" />
                        )}
                        <span className="text-sm">
                          {post.autoShareEnabled ? "Enabled" : "Disabled"}
                        </span>
                      </button>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      {editingPost === post._id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition"
                            title="Save"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => setEditingPost(null)}
                            className="p-1.5 text-gray-600 hover:bg-gray-50 rounded transition"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/post?slug=${post.slug}`}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="View"
                          >
                            <Eye size={14} />
                          </Link>
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
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
