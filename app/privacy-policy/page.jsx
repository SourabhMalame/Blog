import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                At Maharashtra Startup Organisation, we take your privacy seriously. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you
                visit our website. Please read this privacy policy carefully. If you do
                not agree with the terms of this privacy policy, please do not access
                the site.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Information We Collect
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-3">
                  <p>
                    We may collect information about you in a variety of ways. The
                    information we may collect on the site includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>Personal Data:</strong> Personally identifiable
                      information, such as your name, email address, and demographic
                      information that you voluntarily give to us when you register
                      with the site or when you choose to participate in various
                      activities related to the site.
                    </li>
                    <li>
                      <strong>Derivative Data:</strong> Information our servers
                      automatically collect when you access the site, such as your IP
                      address, browser type, operating system, access times, and the
                      pages you have viewed directly before and after accessing the
                      site.
                    </li>
                    <li>
                      <strong>Financial Data:</strong> Financial information, such as
                      data related to your payment method (e.g., valid credit card
                      number, card brand, expiration date) that we may collect when
                      you purchase, order, return, exchange, or request information
                      about our services from the site.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  How We Use Your Information
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-3">
                  <p>Having accurate information about you permits us to provide you
                  with a smooth, efficient, and customized experience. Specifically, we
                  may use information collected about you via the site to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Create and manage your account</li>
                    <li>Process your transactions and send you related information</li>
                    <li>Email you regarding your account or order</li>
                    <li>Fulfill and manage purchases, orders, payments, and other
                    transactions related to the site</li>
                    <li>Generate a personal profile about you to make future visits
                    more personalized</li>
                    <li>Increase the efficiency and operation of the site</li>
                    <li>Monitor and analyze usage and trends to improve your
                    experience</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Disclosure of Your Information
                </h2>
                <div className="text-gray-700 dark:text-gray-300 space-y-3">
                  <p>
                    We may share information we have collected about you in certain
                    situations. Your information may be disclosed as follows:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      <strong>By Law or to Protect Rights:</strong> If we believe the
                      release of information about you is necessary to respond to legal
                      process, to investigate or remedy potential violations of our
                      policies, or to protect the rights, property, and safety of
                      others.
                    </li>
                    <li>
                      <strong>Third-Party Service Providers:</strong> We may share your
                      information with third parties that perform services for us or
                      on our behalf, including payment processing, data analysis, email
                      delivery, hosting services, customer service, and marketing
                      assistance.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Security of Your Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We use administrative, technical, and physical security measures to
                  help protect your personal information. While we have taken
                  reasonable steps to secure the personal information you provide to
                  us, please be aware that despite our efforts, no security measures are
                  perfect or impenetrable, and no method of data transmission can be
                  guaranteed against any interception or other type of misuse.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  If you have questions or comments about this Privacy Policy, please
                  contact us at:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> privacy@maharashtrastartup.org<br />
                    <strong>Address:</strong> 123 Tech Street, Innovation City, IC 12345
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

