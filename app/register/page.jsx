import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-white shadow-sm border rounded-lg p-8 space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-sm text-gray-500">
              Join NNBlog to get the latest posts and insights.
            </p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

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
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
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
              className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
            >
              Create Account
            </button>
          </form>

          <div className="text-sm text-center text-gray-600">
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


