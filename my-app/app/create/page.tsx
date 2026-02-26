'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import jsPDF from 'jspdf';
import * as domtoimage from 'dom-to-image';
import { templates, getTemplateById, defaultFormData, defaultPreviewData, religions } from '../lib/templates';
import type { BiodataFormData } from '../lib/templates';
import { BiodataTemplate, WatermarkedBiodataTemplate, WatermarkOverlay, TemplatePreview } from '../lib/templateRenderers';

declare global {
  interface Window {
    Razorpay: any;
  }
}

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
  const [isPaid, setIsPaid] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const cleanPreviewRef = useRef<HTMLDivElement>(null);

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
    if (!cleanPreviewRef.current) return;

    setIsGenerating(true);
    try {
      const el = cleanPreviewRef.current;
      const dataUrl = await (domtoimage as any).toPng(el, {
        quality: 1,
        bgcolor: '#ffffff',
        width: el.scrollWidth * 2,
        height: el.scrollHeight * 2,
        style: { transform: 'scale(2)', transformOrigin: 'top left' },
      });

      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.addImage(dataUrl, 'PNG', 10, 10, pageWidth - 20, pageHeight - 20);
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

  const handlePayAndDownload = async () => {
    if (isPaid) {
      return generatePDF();
    }

    setIsPaymentLoading(true);
    try {
      // Create order on backend
      const res = await fetch('/api/create-order', { method: 'POST' });
      const orderData = await res.json();
      if (!orderData.orderId) throw new Error('Failed to create order');

      // Open Razorpay Checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Bio4Marriage',
        description: 'Marriage Biodata PDF Download',
        order_id: orderData.orderId,
        handler: async (response: any) => {
          // Verify payment on backend
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.verified) {
            setIsPaid(true);
            // Auto-generate PDF after successful payment
            setTimeout(() => generatePDF(), 500);
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: formData.name || '',
          email: formData.email || '',
          contact: formData.phone || '',
        },
        theme: { color: '#db2777' },
        modal: {
          ondismiss: () => setIsPaymentLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsPaymentLoading(false);
    }
  };

  // Step 1: Template Selection
  if (selectedTemplate === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-10 animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 sm:mb-3">Create Your Marriage Biodata</h1>
            <p className="text-gray-600 max-w-lg mx-auto text-sm sm:text-base">
              Start by selecting a template. You can always change it later.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-10 sm:mb-12 max-w-md mx-auto">
            {['Template', 'Details', 'Download'].map((label, i) => (
              <div key={label} className="flex items-center">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                  i === 0 ? 'bg-gradient-to-br from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20' : 'bg-gray-100 text-gray-400'
                }`}>
                  {i + 1}
                </div>
                <span className={`ml-1.5 sm:ml-2 text-xs sm:text-sm font-medium ${i === 0 ? 'text-pink-600' : 'text-gray-400'}`}>
                  {label}
                </span>
                {i < 2 && <div className="w-8 sm:w-12 h-px bg-gray-200 mx-2 sm:mx-3" />}
              </div>
            ))}
          </div>

          {/* Religion-grouped templates */}
          <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
            {religions.map((religion) => {
              const religionTemplates = templates.filter(t => t.religion === religion);
              const icons: Record<string, string> = { Hindu: '\u0950', Muslim: '\u262a', Christian: '\u271d', Sikh: '\u0a74', Buddhist: '\u2638', Jain: '\u5350' };
              return (
                <div key={religion}>
                  <div className="flex items-center gap-3 mb-5 sm:mb-6">
                    <span className="text-xl sm:text-2xl">{icons[religion]}</span>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">{religion} Templates</h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {religionTemplates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-pink-300 cursor-pointer group hover:-translate-y-1"
                      >
                        <div className="w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                          <TemplatePreview templateId={template.id} />
                        </div>
                        <div className="p-4 sm:p-5 border-t border-gray-100/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{template.name}</h3>
                              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{template.category}</p>
                            </div>
                            <div className="w-8 h-8 rounded-xl border-2 border-gray-200 group-hover:border-pink-500 group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-purple-600 transition-all flex items-center justify-center">
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
              );
            })}
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
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-400 transition-all text-sm"
              placeholder="Enter your full name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-400 transition-all text-sm" />
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
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in-up">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            PDF downloaded successfully!
          </div>
        )}

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 max-w-md mx-auto">
          {['Template', 'Details', 'Download'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                i === 0 ? 'bg-green-500 text-white shadow-sm' : i === 1 ? 'bg-gradient-to-br from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20' : 'bg-gray-100 text-gray-400'
              }`}>
                {i === 0 ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`ml-1.5 sm:ml-2 text-xs sm:text-sm font-medium ${
                i === 0 ? 'text-green-600' : i === 1 ? 'text-pink-600' : 'text-gray-400'
              }`}>
                {label}
              </span>
              {i < 2 && <div className={`w-8 sm:w-12 h-px mx-2 sm:mx-3 ${i === 0 ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Editor Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
              {/* Form Step Tabs */}
              <div className="flex border-b border-gray-100">
                {formSteps.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => setStep(i + 1)}
                    className={`flex-1 py-3 sm:py-3.5 text-xs sm:text-sm font-medium transition-all border-b-2 ${
                      step === i + 1
                        ? 'text-pink-600 border-pink-600 bg-pink-50/50'
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              <div className="p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  {formSteps[step - 1].title}
                </h2>
                {formSteps[step - 1].fields}

                <div className="flex justify-between pt-4 sm:pt-6 border-t border-gray-100 mt-4 sm:mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1) {
                        setSelectedTemplate(null);
                      } else {
                        setStep(prev => prev - 1);
                      }
                    }}
                    className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    {step === 1 ? 'Change Template' : 'Previous'}
                  </button>
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(prev => prev + 1)}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all shadow-sm shadow-pink-500/10"
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePayAndDownload}
                      disabled={isGenerating || isPaymentLoading}
                      className={`px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white rounded-xl transition-all flex items-center gap-2 shadow-sm ${
                        isPaid
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-pink-500/10'
                      } ${
                        (isGenerating || isPaymentLoading) ? 'opacity-70 cursor-not-allowed' : ''
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
                      ) : isPaymentLoading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </>
                      ) : isPaid ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Again
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Pay &amp; Download
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
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden sticky top-24">
              <div className="p-3 sm:p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-semibold text-gray-800">Live Preview</h2>
                <span className="text-[10px] sm:text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">
                  {selectedTemplateData?.name}
                </span>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50/50">
                {/* Watermarked preview (visible) */}
                <div ref={previewRef} className="aspect-[3/4] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-inner relative border border-gray-100/50">
                  <BiodataTemplate
                    templateId={selectedTemplate}
                    data={{
                      ...Object.fromEntries(
                        Object.entries(formData).map(([k, val]) => [k, val || defaultPreviewData[k as keyof BiodataFormData]])
                      ) as BiodataFormData,
                    }}
                  />
                  {!isPaid && <WatermarkOverlay />}
                </div>
                {!isPaid && (
                  <div className="mt-3 text-center">
                    <p className="text-[10px] sm:text-xs text-gray-500">
                      🔒 Watermark will be removed after payment
                    </p>
                  </div>
                )}
                {/* Clean (no watermark) preview for PDF capture — hidden offscreen */}
                <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                  <div ref={cleanPreviewRef} style={{ width: '800px', height: '1066px' }}>
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
    </div>
  );
}

export default function CreateBiodata() {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
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
    </>
  );
}
