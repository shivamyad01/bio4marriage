import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Partnerships - Bio4Marriage',
  description: 'Explore partnership opportunities with Bio4Marriage. Join us in helping people create meaningful connections through beautiful biodatas.',
};

const partnershipTypes = [
  {
    title: 'Matrimonial Services',
    description: 'Partner with us to offer enhanced biodata creation services to your clients.',
    icon: (
      <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: 'Wedding Planners',
    description: 'Integrate our biodata solutions into your wedding planning services.',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    title: 'Photographers',
    description: 'Offer professional photography services to our users creating biodatas.',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'Event Organizers',
    description: 'Collaborate on singles events and matchmaking activities.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Content Creators',
    description: 'Create content that helps people with their marriage biodata journey.',
    icon: (
      <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    )
  },
  {
    title: 'Corporate Partners',
    description: 'Explore B2B opportunities and employee benefits programs.',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

const benefits = [
  'Access to our premium features for your clients',
  'Marketing support and co-branded materials',
  'Revenue sharing opportunities',
  'Dedicated account manager',
  'Early access to new features',
  'Networking opportunities with other partners'
];

export default function PartnershipsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Partner with Bio4Marriage</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join us in our mission to help people create meaningful connections through beautiful, professional biodatas.
        </p>
      </div>

      <div className="mb-20">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Partner With Us?</h2>
            <p className="text-pink-100 mb-8 text-lg">
              At Bio4Marriage, we believe in the power of partnerships. Together, we can create better experiences for 
              people looking to find their life partners through well-crafted biodatas.
            </p>
            <Link 
              href="#partner-form"
              className="inline-block px-8 py-3 bg-white text-pink-600 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
            >
              Become a Partner
            </Link>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Partnership Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipTypes.map((partner, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-50 rounded-lg flex items-center justify-center mb-4">
                  {partner.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{partner.title}</h3>
                <p className="text-gray-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Benefits of Partnering With Us</h2>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-pink-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Success Story</h3>
            <blockquote className="text-gray-600 italic mb-4">
              "Partnering with Bio4Marriage has allowed us to offer our clients a premium biodata creation service 
              that complements our matchmaking expertise. The results have been outstanding."
            </blockquote>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-semibold text-lg mr-4">
                AS
              </div>
              <div>
                <p className="font-medium text-gray-900">Amit Sharma</p>
                <p className="text-sm text-gray-500">Founder, Elite Matrimony</p>
              </div>
            </div>
          </div>
        </div>

        <div id="partner-form" className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Become a Partner</h2>
            <p className="text-gray-600 mb-8">Fill out the form below and our partnership team will get in touch with you shortly.</p>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Business Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="partnership-type" className="block text-sm font-medium text-gray-700 mb-1">Partnership Type</label>
                <select
                  id="partnership-type"
                  name="partnership-type"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="">Select partnership type</option>
                  <option value="matrimonial">Matrimonial Services</option>
                  <option value="wedding-planner">Wedding Planner</option>
                  <option value="photographer">Photographer</option>
                  <option value="event-organizer">Event Organizer</option>
                  <option value="content-creator">Content Creator</option>
                  <option value="corporate">Corporate Partner</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tell us about your business and how you'd like to partner with us</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the <a href="/terms" className="text-pink-600 hover:underline">Terms of Service</a> and 
                    <a href="/privacy" className="text-pink-600 hover:underline ml-1">Privacy Policy</a>.
                  </label>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Submit Partnership Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>For any partnership inquiries, please email us at <a href="mailto:partnerships@bio4marriage.com" className="text-pink-600 hover:underline">partnerships@bio4marriage.com</a></p>
      </div>
    </div>
  );
}
