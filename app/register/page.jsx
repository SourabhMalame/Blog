"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState("individual"); // 'individual' or 'organization'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationWebsite: "",
    organizationDescription: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          accountType: accountType,
          organizationName: accountType === "organization" ? formData.organizationName : null,
          organizationWebsite: accountType === "organization" ? formData.organizationWebsite : null,
          organizationDescription: accountType === "organization" ? formData.organizationDescription : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      // Redirect to login page on success
      router.push("/login");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-sm border dark:border-gray-700 rounded-lg p-8 space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold dark:text-white">Create Your Account</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Join Maharashtra Startup Organisation to get the latest posts and insights.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Account Type Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    value="individual"
                    checked={accountType === "individual"}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="h-4 w-4 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Individual</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="accountType"
                    value="organization"
                    checked={accountType === "organization"}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="h-4 w-4 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Organization</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {accountType === "organization" ? "Contact Person Name" : "Full name"}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={accountType === "organization" ? "John Doe" : "Jane Doe"}
                className="w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {accountType === "organization" && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Maharashtra Startup Inc."
                    className="w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    required={accountType === "organization"}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Organization Website
                  </label>
                  <input
                    type="url"
                    name="organizationWebsite"
                    value={formData.organizationWebsite}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Organization Description
                  </label>
                  <textarea
                    name="organizationDescription"
                    value={formData.organizationDescription}
                    onChange={handleChange}
                    placeholder="Brief description of your organization..."
                    rows={3}
                    className="w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <input type="checkbox" className="h-4 w-4" required />
              <span>
                I agree to the{" "}
                <Link href="#" className="text-red-500">
                  Terms & Privacy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-red-500 font-semibold">
              Sign in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}


