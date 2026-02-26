'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import jsPDF from 'jspdf';
import * as domtoimage from 'dom-to-image';
import { templates, getTemplateById, defaultFormData, defaultPreviewData } from '../lib/templates';
import type { BiodataFormData } from '../lib/templates';
import { BiodataTemplate, TemplatePreview } from '../lib/templateRenderers';

function CreateBiodataInner() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template');

  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(
    templateParam ? parseInt(templateParam, 10) : null
  );
  const [formData, setFormData] = useState<BiodataFormData>({ ...defaultFormData });
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Update selection when URL param changes
  useEffect(() => {
    if (templateParam) {
      const id = parseInt(templateParam, 10);
      if (getTemplateById(id)) {
        setSelectedTemplate(id);
      }
    }
  }, [templateParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedTemplateData = selectedTemplate ? getTemplateById(selectedTemplate) : null;

  const generatePDF = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    try {
      // Capture the preview as an image
      const dataUrl = await (domtoimage as any).toPng(previewRef.current, {
        quality: 1,
        bgcolor: '#ffffff',
        width: previewRef.current.scrollWidth * 2,
        height: previewRef.current.scrollHeight * 2,
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left',
        },
      });

      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Add the captured image to PDF
      const imgWidth = pageWidth - 20; // 10mm margins
      const imgHeight = (pageHeight - 20);
      doc.addImage(dataUrl, 'PNG', 10, 10, imgWidth, imgHeight);

      doc.save(`biodata-${formData.name || 'profile'}.pdf`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Step 1: Template Selection
  if (selectedTemplate === null) {
    return (
      <div className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Create Your Marriage Biodata</h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Start by selecting a template. You can always change it later.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12 max-w-md mx-auto">
            {['Template', 'Details', 'Download'].map((label, i) => (
              <div key={label} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === 0 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i + 1}
                </div>
                <span className={`ml-2 text-sm font-medium ${i === 0 ? 'text-pink-600' : 'text-gray-400'}`}>
                  {label}
                </span>
                {i < 2 && <div className="w-12 h-0.5 bg-gray-200 mx-3" />}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-pink-300 cursor-pointer group"
              >
                <div className="w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                  <TemplatePreview templateId={template.id} />
                </div>
                <div className="p-5 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">{template.category}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-pink-500 group-hover:bg-pink-500 transition-colors flex items-center justify-center">
                      <svg className="w-4 h-4 text-transparent group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Steps 2 & 3: Form + Preview
  const formSteps = [
    {
      title: 'Personal Information',
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your full name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
              <input type="text" name="religion" value={formData.religion} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="e.g., Hindu, Muslim, Christian" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
              <input type="text" name="caste" value={formData.caste} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Your caste / community" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
              <input type="text" name="height" value={formData.height} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="e.g., 5'6&quot;" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complexion</label>
              <input type="text" name="complexion" value={formData.complexion} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="e.g., Fair, Wheatish" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
            <textarea name="about" value={formData.about} onChange={handleChange} rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Brief introduction about yourself..." />
          </div>
        </div>
      ),
    },
    {
      title: 'Education & Career',
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Education *</label>
            <input type="text" name="education" value={formData.education} onChange={handleChange} required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="e.g., B.Tech, MBA, MBBS" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profession *</label>
            <input type="text" name="profession" value={formData.profession} onChange={handleChange} required
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="e.g., Software Engineer at Google" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
            <input type="text" name="income" value={formData.income} onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="e.g., 10-15 LPA" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="your.email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="+91 XXXXXXXXXX" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Family & Preferences',
      fields: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Father&apos;s Name</label>
              <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Father's name & occupation" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mother&apos;s Name</label>
              <input type="text" name="motherName" value={formData.motherName} onChange={handleChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Mother's name & occupation" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Siblings</label>
            <input type="text" name="siblings" value={formData.siblings} onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="e.g., 1 Brother (Married), 1 Sister" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="City, State" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Partner Expectations</label>
            <textarea name="partnerExpectations" value={formData.partnerExpectations} onChange={handleChange} rows={3}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Describe your expectations from your partner..." />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-right flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            PDF downloaded successfully!
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 max-w-md mx-auto">
          {['Template', 'Details', 'Download'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i === 0 ? 'bg-green-500 text-white' : i === 1 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i === 0 ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                i === 0 ? 'text-green-600' : i === 1 ? 'text-pink-600' : 'text-gray-400'
              }`}>
                {label}
              </span>
              {i < 2 && <div className={`w-12 h-0.5 mx-3 ${i === 0 ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Editor Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Form Step Tabs */}
              <div className="flex border-b border-gray-100">
                {formSteps.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => setStep(i + 1)}
                    className={`flex-1 py-3.5 text-sm font-medium transition-colors border-b-2 ${
                      step === i + 1
                        ? 'text-pink-600 border-pink-600 bg-pink-50/50'
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {formSteps[step - 1].title}
                </h2>
                {formSteps[step - 1].fields}

                <div className="flex justify-between pt-6 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1) {
                        setSelectedTemplate(null);
                      } else {
                        setStep(prev => prev - 1);
                      }
                    }}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {step === 1 ? 'Change Template' : 'Previous'}
                  </button>
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(prev => prev + 1)}
                      className="px-5 py-2.5 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={generatePDF}
                      disabled={isGenerating}
                      className={`px-6 py-2.5 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2 ${
                        isGenerating ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download PDF
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800">Live Preview</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  {selectedTemplateData?.name}
                </span>
              </div>
              <div className="p-4 bg-gray-50">
                <div ref={previewRef} className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-inner">
                  <BiodataTemplate
                    templateId={selectedTemplate}
                    data={{
                      ...Object.fromEntries(
                        Object.entries(formData).map(([k, val]) => [k, val || defaultPreviewData[k as keyof BiodataFormData]])
                      ) as BiodataFormData,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateBiodata() {
  return (
    <Suspense fallback={
      <div className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <CreateBiodataInner />
    </Suspense>
  );
}
