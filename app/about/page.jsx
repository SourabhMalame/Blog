import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Us
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Welcome to Maharashtra Startup Organisation
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Maharashtra Startup Organisation is a comprehensive platform dedicated to empowering
                entrepreneurs and startups across Maharashtra. We provide the latest insights on
                technology startups, business strategies, funding opportunities, innovation, and
                entrepreneurship. Our mission is to support the startup ecosystem by delivering
                high-quality resources, news, and networking opportunities.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We connect entrepreneurs with mentors, investors, incubators, and fellow founders.
                Through our platform, startups can access valuable resources, stay updated with industry
                trends, attend events, and build meaningful partnerships that drive growth and success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Our Vision
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  To become the leading platform for startups and entrepreneurs in Maharashtra,
                  providing comprehensive support, resources, and networking opportunities that
                  drive innovation and business success.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Our Values
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We believe in empowering entrepreneurs, fostering innovation, building strong
                  communities, and providing authentic, quality resources that support startup
                  growth and success.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">Join Our Startup Community</h3>
              <p className="mb-4">
                Whether you're a startup founder, entrepreneur, investor, mentor, or aspiring
                business owner, we welcome you to be part of our growing community. Share your
                startup journey, contribute insights, access resources, and connect with like-minded
                individuals who are building the future.
              </p>
              <p className="text-red-100">
                Together, we can build a thriving startup ecosystem in Maharashtra.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

