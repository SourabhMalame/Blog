"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  User,
  Mail,
  Calendar,
  ToggleLeft,
  ToggleRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/api/superadmin/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setPosts(data.posts || []);
      } else {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        console.error("Failed to load user details:", errorData);
        alert(errorData.error || "Failed to load user details");
        router.push("/admin/users");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Failed to load user details. Please try again.");
      router.push("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  const toggleSocialMedia = async (platform) => {
    if (!user) return;

    setSaving(true);
    const currentSettings = user.socialMediaSettings || {};
    const newSettings = {
      ...currentSettings,
      [platform]: !currentSettings[platform],
    };

    try {
      const response = await fetch(`/api/superadmin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          socialMediaSettings: newSettings,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        alert("Failed to update social media settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("Failed to update social media settings");
    } finally {
      setSaving(false);
    }
  };

  const toggleAutoShare = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/superadmin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          autoShareEnabled: !user.autoShareEnabled,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        alert("Failed to update auto-share setting");
      }
    } catch (error) {
      console.error("Error updating auto-share:", error);
      alert("Failed to update auto-share setting");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">User not found</p>
        <button
          onClick={() => router.push("/admin/users")}
          className="mt-4 text-red-500 hover:text-red-600"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const socialMediaSettings = user.socialMediaSettings || {};
  const socialPlatforms = [
    { key: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { key: "twitter", name: "Twitter", icon: Twitter, color: "text-blue-400" },
    { key: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { key: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
    { key: "youtube", name: "YouTube", icon: Youtube, color: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/admin/users")}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage user information</p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl">
            {user.role === "ADMIN" ? (
              <Shield size={32} className="text-white" />
            ) : (
              <User size={32} className="text-white" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === "ADMIN"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {user.role === "ADMIN" ? "Administrator" : "Normal User"}
              </span>
            </div>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100">
                  {user.accountType === "organization" ? "Organization" : "Individual"}
                </span>
              </div>
              {user.accountType === "organization" && user.organizationName && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {user.organizationName}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Information */}
      {user.accountType === "organization" && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Organization Information
          </h3>
          <div className="space-y-4">
            {user.organizationName && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name
                </label>
                <div className="text-gray-900 font-semibold">{user.organizationName}</div>
              </div>
            )}
            {user.organizationWebsite && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <a
                  href={user.organizationWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.organizationWebsite}
                </a>
              </div>
            )}
            {user.organizationDescription && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <div className="text-gray-700">{user.organizationDescription}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auto-Share Toggle */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Auto-Share Content
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Enable automatic sharing of user's posts to social media
            </p>
          </div>
          <button
            onClick={toggleAutoShare}
            disabled={saving}
            className="flex items-center gap-3"
          >
            {user.autoShareEnabled ? (
              <>
                <ToggleRight size={32} className="text-green-600" />
                <span className="text-sm font-medium text-green-600">Enabled</span>
              </>
            ) : (
              <>
                <ToggleLeft size={32} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-400">Disabled</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Social Media Settings */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Social Media Auto-Sharing Settings
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Select which social media platforms should receive automatic posts from this user
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            const isEnabled = socialMediaSettings[platform.key] || false;

            return (
              <div
                key={platform.key}
                className={`border-2 rounded-xl p-4 transition-all ${
                  isEnabled
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Icon size={24} className={platform.color} />
                    <span className="font-semibold text-gray-900">
                      {platform.name}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSocialMedia(platform.key)}
                    disabled={saving || !user.autoShareEnabled}
                    className="flex items-center"
                    title={
                      !user.autoShareEnabled
                        ? "Enable auto-share first"
                        : isEnabled
                        ? "Disable"
                        : "Enable"
                    }
                  >
                    {isEnabled ? (
                      <ToggleRight size={24} className="text-green-600" />
                    ) : (
                      <ToggleLeft size={24} className="text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {isEnabled
                    ? "Auto-sharing enabled"
                    : "Auto-sharing disabled"}
                </p>
              </div>
            );
          })}
        </div>

        {!user.autoShareEnabled && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Auto-share must be enabled first before configuring individual social media platforms.
            </p>
          </div>
        )}
      </div>

      {/* User Posts */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText size={20} />
            User Posts ({posts.length})
          </h3>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText size={48} className="mx-auto mb-2 opacity-50" />
            <p>This user hasn't created any posts yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Auto-Share
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{post.title}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {post.autoShareEnabled ? (
                        <span className="text-green-600 text-sm">✓ Enabled</span>
                      ) : (
                        <span className="text-gray-400 text-sm">✗ Disabled</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

