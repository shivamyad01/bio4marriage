'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

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
      <section className="relative bg-gradient-to-r from-pink-50 to-purple-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Beautiful <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Marriage Biodata</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Design a professional and impressive biodata to help you find your perfect life partner.
              Simple, elegant, and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300"
              >
                Create Your Biodata - It's Free
              </Link>
              <Link
                href="/templates"
                className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 rounded-full border border-gray-200 transition-colors duration-300"
              >
                View Templates
              </Link>
            </div>
          </div>
          
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎨</div>
                  <p className="text-gray-500">Preview of biodata template</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Bio4Marriage?</h2>
            <p className="text-xl text-gray-600">
              Everything you need to create a professional marriage biodata
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Create your perfect biodata in just a few simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-pink-500 to-purple-500 transform -translate-x-1/2"></div>
              
              {[
                {
                  step: '1',
                  title: 'Choose a Template',
                  description: 'Select from our beautiful, professionally designed templates.',
                },
                {
                  step: '2',
                  title: 'Fill in Your Details',
                  description: 'Add your personal, educational, and professional information.',
                },
                {
                  step: '3',
                  title: 'Customize & Download',
                  description: 'Personalize your biodata and download it in PDF format.',
                },
              ].map((item, index) => (
                <div key={index} className="relative mb-12 md:flex items-center">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
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
                    currentTestimonial === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
                    <p className="text-lg text-gray-700 italic mb-6">"{testimonial.content}"</p>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
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
                      currentTestimonial === index ? 'bg-pink-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`View testimonial from ${testimonials[index].name}`}
                    aria-current={currentTestimonial === index ? 'true' : 'false'}
                  >
                    <span className="sr-only">View testimonial from {testimonials[index].name}</span>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Biodata?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users who found their perfect match with a professional biodata.
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
