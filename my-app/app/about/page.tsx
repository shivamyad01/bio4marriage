import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Bio4Marriage',
  description: 'Learn about Bio4Marriage and our mission to help you create beautiful marriage biodatas.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Bio4Marriage</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Welcome to Bio4Marriage, where we help individuals create professional and impressive marriage biodatas that stand out. 
          Our mission is to simplify the process of creating a biodata while ensuring it reflects your unique personality and values.
        </p>
        
        <div className="bg-pink-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2023, Bio4Marriage was born out of a simple idea: to make the process of creating marriage biodatas 
            more accessible, beautiful, and effective. We understand the importance of first impressions, especially when 
            it comes to finding a life partner.
          </p>
          <p className="text-gray-700">
            Our team of designers and developers have worked tirelessly to create templates that are not only visually 
            appealing but also highlight the most important aspects of your personality and background.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted platform for creating professional marriage biodatas worldwide, helping millions 
              find their perfect life partners through beautifully presented, authentic profiles.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Values</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Authenticity in every profile</li>
              <li>User-friendly experience</li>
              <li>Respect for privacy and security</li>
              <li>Continuous innovation</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-pink-600">Professional Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professionally designed templates that are modern, clean, and customizable.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-pink-600">Easy to Use</h3>
              <p className="text-gray-600">
                Our intuitive interface makes it simple to create a stunning biodata in minutes, no design skills required.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-pink-600">Privacy Focused</h3>
              <p className="text-gray-600">
                We take your privacy seriously. Your information is secure and you control who sees your biodata.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/create"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
          >
            Create Your Biodata Now
          </Link>
        </div>
      </div>
    </div>
  );
}
