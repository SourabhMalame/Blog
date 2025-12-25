import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white shadow-sm border rounded-lg p-8 space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-gray-500">
              Sign in to continue to NNBlog
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                <label>Password</label>
                <Link href="#" className="text-red-500 hover:underline">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                Remember me
              </label>
              <span>Need an account?</span>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
            >
              Sign In
            </button>
          </form>

          <div className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-red-500 font-semibold">
              Create one
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}


