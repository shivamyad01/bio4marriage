'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import marriageTemplate1 from "./assets/image.webp";
import marriageTemplate2 from './assets/image (2).webp';
import marriageTemplate3 from './assets/image (1).webp';

const templates = [
  {
    id: 1,
    name: 'Classic Green & Gold',
    preview: marriageTemplate1,
    description: 'Elegant design with traditional green and gold accents',
    image: '/images/marriage-template-1.jpg'
  },
  {
    id: 2,
    name: 'Modern Minimalist',
    preview: marriageTemplate2,
    description: 'Clean and professional look with ample white space',
    image: '/images/marriage-template-2.jpg'
  },
  {
    id: 3,
    name: 'Royal Blue',
    preview: marriageTemplate3,
    description: 'Rich blue tones with a regal appearance',
    image: '/images/marriage-template-3.jpg'
  },
];

const features = [
  {
    name: 'Beautiful Templates',
    description: 'Choose from our professionally designed templates to create a stunning marriage biodata.',
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    name: 'Easy to Use',
    description: 'Create your biodata in minutes with our intuitive interface.',
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    name: 'Download & Share',
    description: 'Download your biodata as PDF or share it directly with potential matches.',
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder, TechStart',
    content: 'Bio4Marriage helped me create a professional biodata that impressed my potential matches. Found my life partner within weeks!',
    image: '/images/avatar-1.jpg', // Moved to public/images directory
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Executive',
    content: 'The templates are beautiful and easy to customize. Highly recommended for anyone looking to create a marriage biodata.',
    image: '/images/avatar-2.jpg', // Moved to public/images directory
  },
];

// Add proper types for better type safety
interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    about: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Memoize the testimonial update function
  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
    } else if (e.key === 'ArrowRight') {
      nextTestimonial();
    }
  }, [nextTestimonial]);

  // Set up auto-rotation and keyboard navigation
  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextTestimonial, handleKeyDown]);

  // Don't render anything on the server
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Column - Text Content */}
            <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Your Perfect Match with{" "}
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Beautiful Biodata
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Create an impressive marriage biodata that stands out. Our
                professionally designed templates help you present your best
                self to potential life partners.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/create"
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-center"
                >
                  Create Your Biodata - It's Free
                </Link>
                <Link
                  href="/templates"
                  className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 rounded-full border border-gray-200 transition-colors duration-300 text-center"
                >
                  View Templates
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-pink-600">10K+</div>
                  <div className="text-sm text-gray-500">Happy Couples</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-pink-600">50+</div>
                  <div className="text-sm text-gray-500">Templates</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-pink-600">24/7</div>
                  <div className="text-sm text-gray-500">Support</div>
                </div>
              </div>
            </div>

            {/* Right Column - Image Carousel */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                {/* Main Image */}
                <div className="relative w-[400px] h-[500px] mx-auto rounded-2xl overflow-hidden shadow-2xl transform rotate-1">
                  <Image
                    src={marriageTemplate2}
                    alt="Marriage Template 1"
                    width={400}
                    height={500}
                    className="w-full h-full object-cover rounded-2xl"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
                </div>

                {/* Small Image 1 */}
                <div className="absolute -bottom-8 -left-8 w-40 h-48 rounded-xl overflow-hidden shadow-lg transform -rotate-6">
                  <Image
                    src={marriageTemplate1}
                    alt="Marriage Template 2"
                    width={200}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Small Image 2 */}
                <div className="absolute -top-8 -right-8 w-40 h-48 rounded-xl overflow-hidden shadow-lg transform rotate-6">
                  <Image
                    src={marriageTemplate3}
                    alt="Marriage Template 3"
                    width={200}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 w-32 h-32 bg-pink-100 rounded-full -bottom-10 -right-10"></div>
                <div className="absolute -z-10 w-20 h-20 bg-purple-100 rounded-full -top-5 left-20"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Templates Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="inline-block bg-pink-100 text-pink-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Featured Templates
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stunning Templates for Your Biodata
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose from our collection of professionally designed templates to create an impressive biodata
            </p>
            <div className="w-20 h-1 bg-pink-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-pink-200 w-full max-w-sm mx-auto"
              >
                <div className="relative w-full aspect-[3/4] bg-gray-50">
                  <Image
                    src={template.preview}
                    alt={template.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <button
                      onClick={() => setSelectedTemplate(template.id)}
                      className="w-full bg-white text-pink-600 font-medium py-2 px-4 rounded-md text-center hover:bg-pink-50 transition-colors duration-200"
                    >
                      Use This Template
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{template.name}</h3>
                      <p className="text-gray-600 text-sm">{template.description}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      Popular
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/templates"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 transition-colors duration-200"
            >
              View All Templates
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Editor Section - Only shown when a template is selected */}
      {templates.some(t => t.id === selectedTemplate) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Edit Your Biodata
              </h2>
              <p className="text-xl text-gray-600">
                Customize your biodata with our easy-to-use editor
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {templates.find(t => t.id === selectedTemplate)?.name} Template
                  </h3>
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select 
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
                      <textarea
                        name="about"
                        rows={3}
                        value={formData.about}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="pt-4">
                      <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                        Save & Continue
                      </button>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="relative w-full aspect-[3/4] bg-white rounded-lg overflow-hidden">
                    <Image
                      src={templates.find(t => t.id === selectedTemplate)?.preview || ''}
                      alt="Template Preview"
                      fill
                      className="object-contain"
                    />
                    {/* Overlay text on the template */}
                    <div className="absolute inset-0 p-8 text-black">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <h1 className="text-2xl font-bold">{formData.name || 'Your Name'}</h1>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p className="text-sm">{formData.dob || 'DD/MM/YYYY'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Gender</p>
                            <p className="text-sm">{formData.gender || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-sm break-all">{formData.email || 'your.email@example.com'}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="font-semibold mb-1 text-sm">About Me</h3>
                          <p className="text-xs">{formData.about || 'A brief introduction about yourself...'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Bio4Marriage?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create a professional marriage biodata
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Create your perfect biodata in just a few simple steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-500 transform -translate-x-1/2"></div>

              {[
                {
                  step: "1",
                  title: "Choose a Template",
                  description:
                    "Select from our beautiful, professionally designed templates.",
                },
                {
                  step: "2",
                  title: "Fill in Your Details",
                  description:
                    "Add your personal, educational, and professional information.",
                },
                {
                  step: "3",
                  title: "Customize & Download",
                  description:
                    "Personalize your biodata and download it in PDF format.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative mb-12 md:flex items-center"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-2xl font-bold flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0">
                    {item.step}
                  </div>
                  <div className="md:ml-8 text-center md:text-left">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/create"
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of happy couples who found their perfect match
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative h-96">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-center ${
                    currentTestimonial === index
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-6 overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-lg text-gray-700 italic mb-6">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 mb-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                      currentTestimonial === index
                        ? "bg-pink-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`View testimonial from ${testimonials[index].name}`}
                    aria-current={
                      currentTestimonial === index ? "true" : "false"
                    }
                  >
                    <span className="sr-only">
                      View testimonial from {testimonials[index].name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Biodata?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users who found their perfect match with a
            professional biodata.
          </p>
          <Link
            href="/create"
            className="inline-block bg-white text-pink-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors duration-300"
          >
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
