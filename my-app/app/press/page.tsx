import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Download, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Press - Bio4Marriage',
  description: 'Latest news, press releases, and media resources about Bio4Marriage.',
};

const pressReleases = [
  {
    id: 1,
    title: 'Bio4Marriage Launches Revolutionary Biodata Creation Platform',
    date: 'March 15, 2023',
    excerpt: 'New platform makes it easier than ever to create professional marriage biodatas with beautiful templates and intuitive design tools.',
    link: '/press/releases/biodata-platform-launch'
  },
  {
    id: 2,
    title: 'Bio4Marriage Secures $5M in Series A Funding',
    date: 'January 28, 2023',
    excerpt: 'Funding will be used to expand platform features and grow the team to meet increasing demand.',
    link: '/press/releases/series-a-funding'
  },
  {
    id: 3,
    title: 'Bio4Marriage Partners with Leading Matrimonial Services',
    date: 'November 5, 2022',
    excerpt: 'New partnerships will bring Bio4Marriage\'s innovative biodata solutions to thousands of users across the country.',
    link: '/press/releases/matrimonial-partnerships'
  }
];

const mediaCoverage = [
  {
    outlet: 'TechCrunch',
    title: 'Bio4Marriage is Modernizing the Way People Create Marriage Biodatas',
    date: 'April 2, 2023',
    link: '#'
  },
  {
    outlet: 'Forbes',
    title: 'How Bio4Marriage is Bringing Digital Innovation to Traditional Matchmaking',
    date: 'February 18, 2023',
    link: '#'
  },
  {
    outlet: 'The Times of India',
    title: 'The Digital Transformation of Marriage Biodatas: A Look at Bio4Marriage',
    date: 'December 10, 2022',
    link: '#'
  }
];

const pressKit = {
  logo: {
    light: '/images/logo-light.svg',
    dark: '/images/logo-dark.svg',
    icon: '/favicon.ico'
  },
  brandColors: {
    primary: '#EC4899',
    secondary: '#8B5CF6',
    dark: '#111827',
    light: '#F9FAFB'
  },
  team: [
    {
      name: 'Rahul Sharma',
      title: 'Founder & CEO',
      bio: 'Rahul founded Bio4Marriage in 2022 with a vision to modernize the way people create and share marriage biodatas.',
      image: '/images/team/rahul-sharma.jpg'
    },
    {
      name: 'Priya Patel',
      title: 'Head of Design',
      bio: 'Priya leads our design team, creating beautiful and intuitive templates that help users make great first impressions.',
      image: '/images/team/priya-patel.jpg'
    }
  ]
};

export default function PressPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Press & Media</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Latest news, press releases, and media resources about Bio4Marriage.
        </p>
      </div>

      {/* Press Releases */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Press Releases</h2>
          <Link 
            href="/press/releases" 
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium mt-4 md:mt-0"
          >
            View all releases
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pressReleases.map((release) => (
            <div key={release.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {release.date}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link href={release.link} className="hover:text-pink-600">
                    {release.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">{release.excerpt}</p>
                <Link 
                  href={release.link} 
                  className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Media Coverage */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Media Coverage</h2>
        
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {mediaCoverage.map((item, index) => (
              <li key={index} className="hover:bg-gray-50 transition-colors">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-900">{item.outlet}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <h3 className="text-gray-700 hover:text-pink-600">{item.title}</h3>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                        Read Article
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Press Kit */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Press Kit</h2>
        
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Brand Assets</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Logo</h4>
              <div className="space-y-6">
                <div className="p-6 bg-gray-900 rounded-lg flex items-center justify-center">
                  <img 
                    src={pressKit.logo.light} 
                    alt="Bio4Marriage Logo - Light" 
                    className="h-12"
                  />
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <img 
                    src={pressKit.logo.dark} 
                    alt="Bio4Marriage Logo - Dark" 
                    className="h-12"
                  />
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                  <img 
                    src={pressKit.logo.icon} 
                    alt="Bio4Marriage Icon" 
                    className="h-10"
                  />
                </div>
                <div className="mt-4">
                  <a 
                    href="/downloads/bio4marriage-brand-assets.zip" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download All Assets
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Brand Colors</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(pressKit.brandColors).map(([name, color]) => (
                  <div key={name}>
                    <div 
                      className="h-20 rounded-lg mb-2 border border-gray-200" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <p className="text-xs text-gray-500 capitalize">{name}</p>
                    <p className="text-sm font-mono">{color}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Team</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {pressKit.team.map((member, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mr-6">
                  <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{member.name}</h4>
                  <p className="text-pink-600 mb-2">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Inquiries */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Media Inquiries</h2>
          <p className="text-pink-100 mb-6 text-lg">
            Members of the press can contact us for interviews, statements, or additional information.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="mailto:press@bio4marriage.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-pink-600 font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Press Team
            </a>
            <a 
              href="tel:+11234567890" 
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              +1 (123) 456-7890
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}