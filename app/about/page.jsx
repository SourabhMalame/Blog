import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthorCard from '@/components/AuthorCard';

const teamMembers = [
  {
    name: 'John Doe',
    bio: 'Full-stack developer passionate about React and Next.js. Loves sharing knowledge with the community.',
    role: 'Founder & Lead Developer',
  },
  {
    name: 'Jane Smith',
    bio: 'Senior React Developer and technical writer. Specializes in creating engaging educational content.',
    role: 'Content Lead',
  },
  {
    name: 'Mike Johnson',
    bio: 'Frontend designer and CSS enthusiast. Passionate about creating beautiful and accessible user interfaces.',
    role: 'Design Lead',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">About NNBlog</h1>
            <div className="w-20 h-1 bg-gray-900 mb-8"></div>
          </div>

          {/* Mission Statement */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                At NNBlog, we believe in the power of knowledge sharing and continuous learning. 
                Our mission is to create a platform where developers, designers, and tech enthusiasts 
                can come together to learn, share, and grow.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                We're committed to providing high-quality, practical content that helps you stay 
                up-to-date with the latest technologies, best practices, and industry trends. 
                Whether you're a beginner just starting your journey or an experienced professional 
                looking to expand your skills, we've got something for you.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Join us on this journey as we explore the ever-evolving world of web development 
                and technology together.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Focus</h3>
                <p className="text-gray-600 leading-relaxed">
                  We focus on creating content that matters and provides real value to our readers.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  We believe in building a supportive community where everyone can learn and grow together.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  We're committed to maintaining high standards in everything we create and share.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <AuthorCard
                    name={member.name}
                    variant="card"
                  />
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-50 rounded-2xl p-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Have questions, suggestions, or want to contribute? We'd love to hear from you!
            </p>
            <a
              href="mailto:contact@nnblog.com"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

