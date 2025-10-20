import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help Center - Bio4Marriage',
  description: 'Get help with using Bio4Marriage. Find answers to common questions and learn how to create the perfect marriage biodata.',
};

const faqs = [
  {
    question: 'How do I create a biodata?',
    answer: 'Creating a biodata is easy! Simply click on the "Create Biodata" button, choose a template, and follow the step-by-step process to add your information.',
  },
  {
    question: 'Can I edit my biodata after creating it?',
    answer: 'Yes, you can edit your biodata at any time. Just log in to your account, go to your dashboard, and select the biodata you want to edit.',
  },
  {
    question: 'How do I download my biodata?',
    answer: 'After completing your biodata, click the "Download" button to save it as a PDF. You can then print it or share it digitally.',
  },
  {
    question: 'Is my personal information secure?',
    answer: 'We take your privacy seriously. Your information is encrypted and stored securely. We never share your personal data with third parties without your consent.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and other popular payment methods. All transactions are secure and encrypted.',
  },
];

const helpTopics = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of creating your first biodata',
    icon: '🚀',
    link: '/help/getting-started',
  },
  {
    title: 'Templates',
    description: 'Explore our collection of beautiful templates',
    icon: '🎨',
    link: '/templates',
  },
  {
    title: 'Account Settings',
    description: 'Manage your account and preferences',
    icon: '⚙️',
    link: '/account/settings',
  },
  {
    title: 'Billing & Payments',
    description: 'Information about subscriptions and payments',
    icon: '💳',
    link: '/help/billing',
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions or get in touch with our support team.
        </p>
        
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {helpTopics.map((topic, index) => (
          <Link 
            href={topic.link} 
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:border-pink-100"
          >
            <div className="text-3xl mb-4">{topic.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
            <p className="text-gray-600 text-sm">{topic.description}</p>
          </Link>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Still need help?</h2>
        <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
          Our support team is here to help you with any questions or issues you might have.
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
  );
}
