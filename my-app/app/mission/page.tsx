import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Mission - Bio4Marriage',
  description: 'Learn about our mission to help you create the perfect marriage biodata and find your life partner.',
};

export default function MissionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h1>
      
      <div className="prose max-w-none">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-xl mb-12">
          <p className="text-xl text-gray-700 italic text-center">
            "To empower individuals in their journey to find a life partner by providing beautiful, professional, 
            and effective tools to showcase their true selves."
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">The Challenge</h2>
            <p className="text-gray-600 mb-4">
              In today's digital age, first impressions are often made online. A marriage biodata is frequently the first 
              thing potential partners and their families see. Yet, creating a biodata that truly represents you can be 
              challenging, time-consuming, and often results in generic, uninspiring documents.
            </p>
            <p className="text-gray-600">
              Many people struggle with formatting, design, and knowing what information to include. This can lead to 
              missed connections and opportunities to make a meaningful first impression.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Approach</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-4 mt-1">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Beautiful Design</h3>
                  <p className="text-gray-600">
                    We've created elegant, professional templates that make your biodata visually appealing and easy to read.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-4 mt-1">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Guided Process</h3>
                  <p className="text-gray-600">
                    Our step-by-step process helps you include all the right information in the right way.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mr-4 mt-1">
                  <span className="text-lg font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Customization</h3>
                  <p className="text-gray-600">
                    Personalize your biodata to reflect your unique personality and preferences.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h2>
            <p className="text-gray-600 mb-4">
              We are committed to making the process of creating a marriage biodata as simple, effective, and enjoyable as possible. 
              We believe that everyone deserves to present their best self when looking for a life partner.
            </p>
            <p className="text-gray-600">
              Our team continuously works on improving our platform based on user feedback and the latest design trends to ensure 
              that your biodata makes the best possible impression.
            </p>
          </section>

          <div className="pt-8 text-center">
            <Link 
              href="/create"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
            >
              Start Creating Your Biodata
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
