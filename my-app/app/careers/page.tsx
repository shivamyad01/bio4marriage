import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers - Join Our Team | Bio4Marriage',
  description: 'Explore career opportunities at Bio4Marriage. Join our team and help us create better ways to connect people through beautiful biodatas.',
};

const jobOpenings = [
  {
    id: 1,
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    description: 'We are looking for a skilled Frontend Developer to join our team and help us build beautiful, responsive user interfaces for our biodata platform.'
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Design',
    description: 'Join our design team to create intuitive and beautiful user experiences for our biodata creation platform.'
  },
  {
    id: 3,
    title: 'Customer Success Manager',
    type: 'Full-time',
    location: 'Remote',
    department: 'Customer Success',
    description: 'Help our users get the most out of Bio4Marriage by providing exceptional support and guidance.'
  },
];

export default function CareersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Help us build the future of marriage biodatas. Work with a passionate team that values creativity, innovation, and making a real difference.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Meaningful Work</h3>
          <p className="text-gray-600">Help people create meaningful connections and find their life partners through beautiful biodatas.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Hours</h3>
          <p className="text-gray-600">We believe in work-life balance and offer flexible working hours to all our team members.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Remote First</h3>
          <p className="text-gray-600">Work from anywhere in the world. We're a fully remote team with members across multiple time zones.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Current Openings</h2>
        
        <div className="space-y-6">
          {jobOpenings.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-sm bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">{job.type}</span>
                    <span className="text-sm bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">{job.location}</span>
                    <span className="text-sm bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">{job.department}</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                  Apply Now
                </button>
              </div>
              <p className="text-gray-600">{job.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Don't see a role that fits?</h3>
          <p className="text-gray-600 mb-6">We're always looking for talented individuals to join our team. Send us your resume!</p>
          <a 
            href="mailto:careers@bio4marriage.com" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
