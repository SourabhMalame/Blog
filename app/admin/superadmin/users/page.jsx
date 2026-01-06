"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Shield, User, ToggleLeft, ToggleRight, Eye } from "lucide-react";

export default function SuperAdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "user",
    autoShareEnabled: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/superadmin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role || "user",
      autoShareEnabled: user.autoShareEnabled || false,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/superadmin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: editingUser,
          ...editForm,
        }),
      });

      if (response.ok) {
        await fetchUsers();
        setEditingUser(null);
        alert("User updated successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/superadmin/users?userId=${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchUsers();
        alert("User deleted successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const toggleAutoShare = async (userId, currentValue) => {
    try {
      const response = await fetch("/api/superadmin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          autoShareEnabled: !currentValue,
        }),
      });

      if (response.ok) {
        await fetchUsers();
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Users</h1>
        <p className="text-sm text-gray-500 mt-1">Manage users and their permissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90">Total Users</div>
          <div className="text-3xl font-bold mt-2">{users.length}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90">Administrators</div>
          <div className="text-3xl font-bold mt-2">
            {users.filter((u) => u.role === "superadmin").length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90">Auto-Share Enabled</div>
          <div className="text-3xl font-bold mt-2">
            {users.filter((u) => u.autoShareEnabled).length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90">Regular Users</div>
          <div className="text-3xl font-bold mt-2">
            {users.filter((u) => u.role === "user").length}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                  Auto-Share
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-colors cursor-pointer"
                  onClick={() => router.push(`/admin/superadmin/users/${user._id}`)}
                >
                  <td className="px-6 py-4">
                    {editingUser === user._id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        {user.role === "superadmin" ? (
                          <Shield size={18} className="text-purple-600" />
                        ) : (
                          <User size={18} className="text-gray-400" />
                        )}
                        <span className="font-semibold text-gray-900">{user.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingUser === user._id ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-600">{user.email}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingUser === user._id ? (
                      <select
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      >
                        <option value="user">User</option>
                        <option value="superadmin">Administrator</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "superadmin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role === "superadmin" ? "Administrator" : "User"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingUser === user._id ? (
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
                        onClick={() => toggleAutoShare(user._id, user.autoShareEnabled)}
                        className="flex items-center gap-2"
                      >
                        {user.autoShareEnabled ? (
                          <ToggleRight size={24} className="text-green-600" />
                        ) : (
                          <ToggleLeft size={24} className="text-gray-400" />
                        )}
                        <span className="text-sm">
                          {user.autoShareEnabled ? "Enabled" : "Disabled"}
                        </span>
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {editingUser === user._id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Save"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/admin/superadmin/users/${user._id}`);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(user);
                            }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(user._id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
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

