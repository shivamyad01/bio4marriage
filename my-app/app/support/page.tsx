import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support - Bio4Marriage',
  description: 'Get help and support for any issues you may be experiencing with Bio4Marriage.',
};

const supportTopics = [
  {
    id: 'account',
    title: 'Account & Login',
    description: 'Issues with signing in, account recovery, or profile management',
    icon: (
      <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
    ),
    link: '/support/account'
  },
  {
    id: 'biodata',
    title: 'Biodata Creation',
    description: 'Help with creating, editing, or formatting your biodata',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
    ),
    link: '/support/biodata'
  },
  {
    id: 'templates',
    title: 'Templates',
    description: 'Questions about our biodata templates and customization options',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
      </svg>
    ),
    link: '/support/templates'
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    description: 'Questions about subscriptions, payments, and refunds',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
      </svg>
    ),
    link: '/support/billing'
  },
  {
    id: 'technical',
    title: 'Technical Issues',
    description: 'Problems with the website, app, or technical difficulties',
    icon: (
      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    link: '/support/technical'
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    description: 'Questions about data protection and account security',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
      </svg>
    ),
    link: '/support/privacy'
  }
];

const popularArticles = [
  {
    title: 'How to reset your password',
    link: '/help/reset-password'
  },
  {
    title: 'How to download your biodata as PDF',
    link: '/help/download-biodata'
  },
  {
    title: 'How to update your profile information',
    link: '/help/update-profile'
  },
  {
    title: 'Understanding our pricing plans',
    link: '/pricing'
  },
  {
    title: 'How to delete your account',
    link: '/help/delete-account'
  }
];

export default function SupportPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you today?</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions or get in touch with our support team.
        </p>
        
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Describe your issue..."
              className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent pl-12"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportTopics.map((topic) => (
            <Link 
              href={topic.link}
              key={topic.id}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                {topic.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{topic.title}</h3>
                <p className="text-gray-600 text-sm">{topic.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular help articles</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {popularArticles.map((article, index) => (
              <li key={index} className="hover:bg-gray-50">
                <Link href={article.link} className="block px-6 py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700 hover:text-pink-600">{article.title}</p>
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-pink-100 mb-8">
            Our support team is available 24/7 to help you with any questions or issues you might have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-white text-pink-600 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
            >
              Contact Support
            </Link>
            <a 
              href="mailto:support@bio4marriage.com" 
              className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
