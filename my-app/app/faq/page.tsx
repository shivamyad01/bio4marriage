import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Bio4Marriage',
  description: 'Find answers to common questions about creating and managing your marriage biodata on Bio4Marriage.',
};

const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    questions: [
      {
        question: 'How do I create an account?',
        answer: 'Creating an account is easy! Click on the "Sign Up" button in the top-right corner, fill in your details, and verify your email address to get started.'
      },
      {
        question: 'Is there a free trial available?',
        answer: 'Yes, we offer a free plan with basic features. You can upgrade to a premium plan at any time to access additional templates and features.'
      },
      {
        question: 'What information do I need to create a biodata?',
        answer: 'You\'ll need basic personal information, education and career details, family background, and partner preferences. Our step-by-step process will guide you through each section.'
      }
    ]
  },
  {
    id: 'biodata-creation',
    title: 'Biodata Creation',
    questions: [
      {
        question: 'How do I choose the right template?',
        answer: 'Browse our template gallery and select one that matches your style and needs. You can preview each template before making your selection.'
      },
      {
        question: 'Can I customize my biodata?',
        answer: 'Yes, you can customize colors, fonts, and layout. You can also add or remove sections to best represent yourself.'
      },
      {
        question: 'How do I add photos to my biodata?',
        answer: 'You can upload photos from your device or import them from cloud storage. We recommend using high-quality, professional-looking photos.'
      }
    ]
  },
  {
    id: 'account-management',
    title: 'Account & Billing',
    questions: [
      {
        question: 'How do I update my payment information?',
        answer: 'Go to your account settings, select "Billing," and update your payment method. Your changes will be saved for future transactions.'
      },
      {
        question: 'Can I cancel my subscription at any time?',
        answer: 'Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your current billing period.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'You can delete your account in the account settings. Please note that this action is irreversible and all your data will be permanently removed.'
      }
    ]
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    questions: [
      {
        question: 'Is my personal information secure?',
        answer: 'We take your privacy seriously. All your data is encrypted and stored securely. We never share your information with third parties without your consent.'
      },
      {
        question: 'Who can see my biodata?',
        answer: 'Your biodata is private by default. You control who can see it by sharing a private link or making it public in your account settings.'
      },
      {
        question: 'How can I report inappropriate content?',
        answer: 'If you come across any inappropriate content, please report it using the "Report" button or contact our support team immediately.'
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    questions: [
      {
        question: 'I forgot my password. How can I reset it?',
        answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email to reset your password.'
      },
      {
        question: 'Why can\'t I upload my photo?',
        answer: 'Please ensure your photo meets our requirements (JPG/PNG format, max 5MB). If you\'re still having trouble, try using a different browser or contact support.'
      },
      {
        question: 'My download isn\'t working. What should I do?',
        answer: 'Try refreshing the page and downloading again. If the issue persists, check your internet connection or try using a different browser.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about creating and managing your marriage biodata.
        </p>
        
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
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
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button className="px-4 py-2 bg-pink-600 text-white rounded-full text-sm font-medium">
            All Categories
          </button>
          {faqCategories.map((category) => (
            <button 
              key={category.id}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {faqCategories.map((category) => (
            <section key={category.id} className="mb-12">
              <h2 id={category.id} className="text-2xl font-semibold text-gray-900 mb-6">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, index) => (
                  <details key={index} className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <summary className="flex justify-between items-center cursor-pointer">
                      <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                      <span className="ml-4 flex-shrink-0 text-gray-400 group-open:text-pink-600 transform group-open:rotate-180 transition-transform">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </summary>
                    <div className="mt-4 text-gray-600">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
        <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
          Our support team is here to help you with any questions you might have.
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
