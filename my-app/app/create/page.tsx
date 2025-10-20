'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import marriageTemplate1 from "../assets/image.webp";
import marriageTemplate2 from '../assets/image (2).webp';
import marriageTemplate3 from '../assets/image (1).webp';

const templates = [
  {
    id: 1,
    name: 'Classic Green & Gold',
    preview: marriageTemplate1,
    description: 'Elegant design with traditional green and gold accents',
  },
  {
    id: 2,
    name: 'Modern Minimalist',
    preview: marriageTemplate2,
    description: 'Clean and professional look with ample white space',
  },
  {
    id: 3,
    name: 'Royal Blue',
    preview: marriageTemplate3,
    description: 'Rich blue tones with a regal appearance',
  },
];

export default function CreateBiodata() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
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
  
  const [previewData, setPreviewData] = useState({
    name: 'Your Name',
    dob: 'DD/MM/YYYY',
    gender: 'Gender',
    email: 'your.email@example.com',
    phone: '+91 XXXXXXXXXX',
    education: 'Your Education',
    profession: 'Your Profession',
    about: 'A brief introduction about yourself...',
    partnerExpectations: 'Your expectations from your partner...',
  });
  
  const [step, setStep] = useState(1);
  
  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };
  
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Update preview data when form data changes
  useEffect(() => {
    const newPreviewData = { ...previewData };
    Object.keys(formData).forEach(key => {
      if (formData[key as keyof typeof formData]) {
        newPreviewData[key as keyof typeof previewData] = formData[key as keyof typeof formData];
      }
    });
    setPreviewData(newPreviewData);
  }, [formData]);

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


  if (selectedTemplate === null) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Select a Template</h1>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {templates.map((template) => (
              <div 
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-pink-200 w-full max-w-xs mx-auto cursor-pointer"
              >
                <div className="relative w-full aspect-[3/4] bg-gray-50">
                  <Image
                    src={template.preview}
                    alt={template.name}
                    fill
                    className="object-contain p-3"
                    priority
                  />
                </div>
                <div className="p-4 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 text-sm">{template.name}</h3>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2 h-10">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Editor Form */}
          <div className="w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
              <h1 className="text-2xl font-bold mb-6">Edit Your Biodata</h1>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your highest degree/education"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your current profession"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Expectations</label>
                <textarea
                  name="partnerExpectations"
                  value={formData.partnerExpectations}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your expectations from your partner..."
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  Back to Templates
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  Save & Continue
                </button>
              </div>
            </form>
          </div>

          {/* Template Preview */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
              </div>
              <div className="relative aspect-[3/4] bg-gray-50">
                <Image
                  src={templates[selectedTemplate - 1].preview}
                  alt={templates[selectedTemplate - 1].name}
                  fill
                  className="object-contain p-4"
                />
                {/* Overlay text on the template */}
                <div className="absolute inset-0 p-8 text-black">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <h1 className="text-2xl font-bold">{previewData.name}</h1>
                      <p className="text-gray-600">{previewData.profession}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p>{previewData.dob}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Gender</p>
                        <p>{previewData.gender}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-sm break-all">{previewData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{previewData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Education</p>
                        <p>{previewData.education}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold mb-1">About Me</h3>
                      <p className="text-sm">{previewData.about}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <h3 className="font-semibold mb-1">Partner Expectations</h3>
                      <p className="text-sm">{previewData.partnerExpectations}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
