'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { templates } from './lib/templates';
import { TemplatePreview } from './lib/templateRenderers';

const features = [
  {
    name: 'Beautiful Templates',
    description: 'Choose from professionally designed templates that blend traditional elegance with modern aesthetics.',
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    name: 'Easy Customization',
    description: 'Fill in your details with our intuitive form and see your biodata come to life in real-time.',
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    name: 'Instant PDF Download',
    description: 'Download your polished biodata as a high-quality PDF ready to share with prospective matches.',
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    name: 'Privacy First',
    description: 'Your personal data stays secure. We never share your information with third parties.',
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    name: 'Multiple Formats',
    description: 'Create biodatas for different communities and traditions with region-specific templates.',
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    name: '24/7 Support',
    description: 'Our dedicated support team is always available to help you create the perfect biodata.',
    icon: (
      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer, Bangalore',
    content: 'Bio4Marriage helped me create a professional biodata that truly represented me. The templates are stunning and I found my life partner within weeks!',
    initials: 'RK',
    color: 'bg-blue-500',
  },
  {
    name: 'Priya Sharma',
    role: 'Doctor, Mumbai',
    content: 'The templates are beautiful and incredibly easy to customize. I recommended Bio4Marriage to all my friends looking for marriage biodata solutions.',
    initials: 'PS',
    color: 'bg-purple-500',
  },
  {
    name: 'Arun & Meera',
    role: 'Found each other on Bio4Marriage',
    content: 'We both created our biodatas here. The professional presentation made all the difference. Now happily married for 2 years!',
    initials: 'AM',
    color: 'bg-pink-500',
  },
];

const steps = [
  {
    step: '1',
    title: 'Choose a Template',
    description: 'Browse our collection of beautifully designed templates. Pick one that matches your style and tradition.',
  },
  {
    step: '2',
    title: 'Fill in Your Details',
    description: 'Enter your personal, educational, family, and professional information with our easy-to-use form.',
  },
  {
    step: '3',
    title: 'Preview & Download',
    description: 'See your biodata come to life with a real-time preview, then download it as a high-quality PDF.',
  },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 -z-10" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center bg-pink-100 text-pink-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Trusted by 10,000+ Happy Couples
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Create Your Perfect{' '}
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Marriage Biodata
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Design an impressive marriage biodata with our professionally crafted templates. 
                Easy to customize, instant PDF download, and ready to share with prospective matches.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/create"
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 text-center shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300"
                >
                  Create Your Biodata — Free
                </Link>
                <Link
                  href="/templates"
                  className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3.5 px-8 rounded-full border border-gray-200 transition-colors duration-300 text-center"
                >
                  Browse Templates
                </Link>
              </div>

              {/* Trust Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                  <div className="text-2xl font-bold text-pink-600">10K+</div>
                  <div className="text-xs text-gray-500 mt-1">Happy Couples</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                  <div className="text-2xl font-bold text-pink-600">50+</div>
                  <div className="text-xs text-gray-500 mt-1">Templates</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                  <div className="text-2xl font-bold text-pink-600">4.9★</div>
                  <div className="text-xs text-gray-500 mt-1">User Rating</div>
                </div>
              </div>
            </div>

            {/* Right Column - Template Showcase */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <div className="relative w-[340px] mx-auto rounded-2xl overflow-hidden shadow-2xl transform rotate-1 border border-gray-200 aspect-[3/4]">
                  <TemplatePreview templateId={2} />
                </div>
                <div className="absolute -bottom-6 -left-6 w-[150px] aspect-[3/4] rounded-xl overflow-hidden shadow-lg transform -rotate-6 border-4 border-white">
                  <TemplatePreview templateId={1} />
                </div>
                <div className="absolute -top-6 -right-6 w-[150px] aspect-[3/4] rounded-xl overflow-hidden shadow-lg transform rotate-6 border-4 border-white">
                  <TemplatePreview templateId={3} />
                </div>
                <div className="absolute -z-10 w-32 h-32 bg-pink-100 rounded-full -bottom-10 -right-10" />
                <div className="absolute -z-10 w-20 h-20 bg-purple-100 rounded-full -top-5 left-20" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Templates Showcase */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-block bg-pink-100 text-pink-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Featured Templates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stunning Biodata Templates
            </h2>
            <p className="text-lg text-gray-600">
              Professionally designed to make the perfect first impression
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-pink-200"
              >
                <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                  <TemplatePreview templateId={template.id} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Link
                      href={`/create?template=${template.id}`}
                      className="w-full bg-white text-pink-600 font-medium py-2.5 px-4 rounded-lg text-center hover:bg-pink-50 transition-colors duration-200 shadow-sm"
                    >
                      Use This Template
                    </Link>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{template.name}</h3>
                      <p className="text-gray-500 text-sm">{template.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {template.category}
                    </span>
                    {template.popular && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                        Popular
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/templates"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-pink-600 hover:bg-pink-700 transition-colors duration-200 shadow-sm"
            >
              View All Templates
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Bio4Marriage?
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to create a professional marriage biodata
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.name}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Create your perfect biodata in three simple steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-0 left-8 w-0.5 h-full bg-gradient-to-b from-pink-500 to-purple-500" />

              {steps.map((item, index) => (
                <div key={index} className="relative mb-12 last:mb-0 md:flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-2xl font-bold flex items-center justify-center mx-auto md:mx-0 mb-4 md:mb-0 relative z-10 shadow-lg">
                    {item.step}
                  </div>
                  <div className="md:ml-8 text-center md:text-left bg-white md:p-6 md:rounded-xl md:shadow-sm md:border md:border-gray-100 md:flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Link
                href="/create"
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-pink-200 hover:shadow-xl"
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of happy couples who found their perfect match
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative min-h-[280px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 flex flex-col items-center justify-center ${
                    currentTestimonial === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full ${testimonial.color} flex items-center justify-center mb-6 text-white text-xl font-bold`}>
                      {testimonial.initials}
                    </div>
                    <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-pink-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial from ${testimonials[index].name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Your Marriage Biodata?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Join over 10,000 users who impressed their prospective matches with a professional biodata.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="inline-block bg-white text-pink-600 hover:bg-gray-100 font-semibold py-3.5 px-8 rounded-full transition-colors duration-300 shadow-lg"
            >
              Get Started for Free
            </Link>
            <Link
              href="/pricing"
              className="inline-block border-2 border-white/50 text-white hover:bg-white/10 font-semibold py-3.5 px-8 rounded-full transition-colors duration-300"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
