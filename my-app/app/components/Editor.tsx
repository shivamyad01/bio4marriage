'use client';

import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import * as domtoimage from 'dom-to-image';
import type { Template, BiodataFormData } from '../lib/templates';
import { defaultFormData, defaultPreviewData } from '../lib/templates';
import { BiodataTemplate } from '../lib/templateRenderers';

interface EditorProps {
  template: Template;
  onClose: () => void;
}

export default function Editor({ template, onClose }: EditorProps) {
  const [formData, setFormData] = useState<BiodataFormData>({ ...defaultFormData });
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getVal = (key: keyof BiodataFormData): string => formData[key] || defaultPreviewData[key];

  const generatePDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await (domtoimage as any).toPng(previewRef.current, {
        quality: 1,
        bgcolor: '#ffffff',
      });
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.addImage(dataUrl, 'PNG', 10, 10, pageWidth - 20, pageHeight - 20);
      doc.save(`biodata-${formData.name || 'profile'}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      alert('Error generating PDF.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Editor Form */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Edit Your Biodata</h2>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="your.email@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="+91 XXXXXXXXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                      <input type="text" name="education" value={formData.education} onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Your highest degree" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                    <input type="text" name="profession" value={formData.profession} onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Your current profession" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                    <textarea name="about" value={formData.about} onChange={handleInputChange} rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Tell us about yourself..." />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partner Expectations</label>
                    <textarea name="partnerExpectations" value={formData.partnerExpectations} onChange={handleInputChange} rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Describe your ideal partner..." />
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <button type="button" onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                      Cancel
                    </button>
                    <button type="button" onClick={generatePDF} disabled={isGenerating}
                      className={`px-6 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}>
                      {isGenerating ? 'Generating...' : 'Download PDF'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Preview */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-800">Live Preview</h2>
                </div>
                <div className="p-4 bg-gray-50">
                  <div ref={previewRef} className="aspect-[3/4] bg-white rounded-lg overflow-hidden">
                    <BiodataTemplate
                      templateId={template.id}
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
    </section>
  );
}
