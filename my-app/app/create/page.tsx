'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBiodata() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    education: '',
    profession: '',
    about: '',
    partnerExpectations: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log('Form submitted:', formData);
    // Redirect to preview or success page
    router.push('/preview');
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Create Your Marriage Biodata</h1>
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i <= step ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {i}
                  </div>
                  <span className="text-xs mt-2">
                    {i === 1 ? 'Personal' : i === 2 ? 'Education' : 'Preferences'}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pink-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Education & Career</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Highest Education</label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., B.Tech Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Software Engineer at Tech Company"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">About & Preferences</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Tell us about yourself, your family, interests, etc."
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partner Expectations</label>
                  <textarea
                    name="partnerExpectations"
                    value={formData.partnerExpectations}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="What are you looking for in a partner?"
                  ></textarea>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-2 rounded-md ${
                  step === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                >
                  Create Biodata
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
