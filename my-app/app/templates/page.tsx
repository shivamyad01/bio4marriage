'use client';

import Link from 'next/link';
import { useState } from 'react';
import { templates } from '../lib/templates';
import type { Template } from '../lib/templates';
import { TemplatePreview, BiodataTemplate } from '../lib/templateRenderers';
import { defaultPreviewData } from '../lib/templates';

const categories = ['All', 'Traditional', 'Modern', 'Premium'] as const;

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filteredTemplates = selectedCategory === 'All'
    ? templates
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Biodata Templates</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our professionally designed templates to create a stunning marriage biodata that stands out.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                <TemplatePreview templateId={template.id} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                  <span className="bg-pink-100 text-pink-800 text-xs px-2.5 py-1 rounded-full font-medium">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">{template.description}</p>
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/create?template=${template.id}`}
                    className="bg-pink-600 text-white px-5 py-2.5 rounded-lg hover:bg-pink-700 transition-colors font-medium text-sm"
                  >
                    Use This Template
                  </Link>
                  <button 
                    onClick={() => setPreviewTemplate(template)}
                    className="text-pink-600 hover:text-pink-800 font-medium text-sm"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No templates found in this category.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16 bg-white rounded-2xl p-10 shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Can&apos;t Find What You&apos;re Looking For?</h2>
          <p className="text-gray-600 mb-6">
            New templates are added regularly. Contact us if you have a specific design in mind.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors font-medium"
          >
            Request a Custom Template
          </Link>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setPreviewTemplate(null)}>
          <div className="relative bg-white rounded-2xl overflow-hidden max-w-lg w-full max-h-[90vh] shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">{previewTemplate.name}</h3>
              <button onClick={() => setPreviewTemplate(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-[3/4] bg-gray-50">
              <BiodataTemplate templateId={previewTemplate.id} data={defaultPreviewData} />
            </div>
            <div className="p-4 border-t border-gray-100">
              <Link
                href={`/create?template=${previewTemplate.id}`}
                className="block w-full bg-pink-600 text-white py-3 rounded-lg text-center font-medium hover:bg-pink-700 transition-colors"
              >
                Use This Template
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
