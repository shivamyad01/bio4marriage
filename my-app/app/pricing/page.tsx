'use client';

import { useState } from 'react';

const pricingPlans = [
  {
    name: 'Basic',
    price: 0,
    period: 'Free',
    features: [
      '1 Biodata Template',
      'Basic Customization',
      'PDF Download',
      'Email Support',
    ],
    buttonText: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    price: 9.99,
    period: 'per month',
    features: [
      'All Templates',
      'Advanced Customization',
      'PDF & Image Download',
      'Priority Support',
      'Unlimited Edits',
      'No Watermark',
    ],
    buttonText: 'Choose Premium',
    popular: true,
  },
  {
    name: 'Lifetime',
    price: 199,
    period: 'one-time',
    features: [
      'All Premium Features',
      'Lifetime Access',
      'All Future Templates',
      'Priority Support',
      'Unlimited Biodatas',
      'Early Access to New Features',
    ],
    buttonText: 'Get Lifetime Access',
    popular: false,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  // Adjust prices for yearly billing
  const getAdjustedPrice = (price: number) => {
    if (billingCycle === 'yearly' && price > 0) {
      return (price * 10).toFixed(2); // 2 months free for yearly
    }
    return price.toFixed(2);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan that fits your needs. Start for free or unlock premium features.
          </p>
          
          <div className="mt-8 inline-flex items-center bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-colors ${
                billingCycle === 'monthly' 
                  ? 'bg-white shadow-sm text-pink-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-white shadow-sm text-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly <span className="text-xs bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full ml-1">2 months free</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative bg-white rounded-xl shadow-md overflow-hidden ${
                plan.popular ? 'ring-2 ring-pink-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-extrabold">
                    ${getAdjustedPrice(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="ml-2 text-gray-500">
                      / {billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-pink-600 text-white hover:bg-pink-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Your billing will be prorated accordingly."
              },
              {
                question: "Do you offer refunds?",
                answer: "We offer a 14-day money-back guarantee for all paid plans. No questions asked."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely! We use bank-level encryption to protect your personal information and biodata."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
              },
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
