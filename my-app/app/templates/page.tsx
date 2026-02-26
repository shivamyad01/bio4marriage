'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { templates, religions, getPreviewDataForReligion } from '../lib/templates';
import type { Template } from '../lib/templates';
import { TemplatePreview, BiodataTemplate } from '../lib/templateRenderers';

const categories = ['All', 'Traditional', 'Modern', 'Premium'] as const;
const religionFilters = ['All', ...religions] as const;

const religionIcons: Record<string, string> = {
  Hindu: 'ॐ',
  Muslim: '☪',
  Christian: '✝',
  Sikh: 'ੴ',
  Buddhist: '☸',
  Jain: '卐',
};

function TemplatesInner() {
  const searchParams = useSearchParams();
  const religionParam = searchParams.get('religion');

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedReligion, setSelectedReligion] = useState<string>(
    religionParam && (religions as readonly string[]).includes(religionParam) ? religionParam : 'All'
  );
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  useEffect(() => {
    if (religionParam && (religions as readonly string[]).includes(religionParam)) {
      setSelectedReligion(religionParam);
    }
  }, [religionParam]);

  const filteredTemplates = templates.filter(t => {
    const matchCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchReligion = selectedReligion === 'All' || t.religion === selectedReligion;
    return matchCategory && matchReligion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 animate-fade-in-up">
          <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-pink-100/60">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
            18+ Premium Designs
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Biodata <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Templates</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from professionally designed templates to create a stunning marriage biodata.
          </p>
        </div>

        {/* Religion Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
          {religionFilters.map((rel) => (
            <button
              key={rel}
              onClick={() => setSelectedReligion(rel)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                selectedReligion === rel
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md shadow-pink-500/20'
                  : 'bg-white text-gray-600 hover:bg-pink-50 border border-gray-200 hover:border-pink-300'
              }`}
            >
              {rel !== 'All' && <span className="text-sm sm:text-base">{religionIcons[rel]}</span>}
              {rel}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 sm:px-4 py-1.5 rounded-lg sm:rounded-xl text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100/80 hover:border-pink-200 hover:-translate-y-1">
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                <TemplatePreview templateId={template.id} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4 sm:p-6">
                  <Link
                    href={`/create?template=${template.id}`}
                    className="w-full bg-white text-pink-600 font-bold py-2.5 sm:py-3 rounded-xl text-center hover:bg-pink-50 transition-colors shadow-lg text-sm sm:text-base"
                  >
                    Use This Template
                  </Link>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-2 sm:mb-3 gap-2">
                  <h3 className="text-base sm:text-xl font-semibold text-gray-900">{template.name}</h3>
                  <div className="flex gap-1 sm:gap-1.5 shrink-0">
                    <span className="bg-blue-50 text-blue-700 text-[10px] sm:text-xs px-2 py-0.5 rounded-lg font-medium whitespace-nowrap">
                      {religionIcons[template.religion]} {template.religion}
                    </span>
                    <span className="bg-pink-50 text-pink-700 text-[10px] sm:text-xs px-2 py-0.5 rounded-lg font-medium">
                      {template.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-5 text-xs sm:text-sm leading-relaxed line-clamp-2">{template.description}</p>
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/create?template=${template.id}`}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all font-medium text-xs sm:text-sm shadow-sm shadow-pink-500/10"
                  >
                    Use Template
                  </Link>
                  <button 
                    onClick={() => setPreviewTemplate(template)}
                    className="text-pink-600 hover:text-pink-800 font-medium text-xs sm:text-sm hover:underline"
                  >
                    Preview →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500 text-lg font-medium">No templates found for this filter.</p>
            <p className="text-gray-400 text-sm mt-1">Try changing the religion or category filter.</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-14 sm:mt-16 glass bg-white/60 rounded-2xl sm:rounded-3xl p-8 sm:p-10 max-w-2xl mx-auto border border-white/50">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Can&apos;t Find What You&apos;re Looking For?</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            New templates are added regularly. Contact us if you have a specific design in mind.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-pink-700 hover:to-purple-700 transition-all font-medium shadow-lg shadow-pink-500/15"
          >
            Request a Custom Template
          </Link>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 bg-black/60 backdrop-blur-sm" onClick={() => setPreviewTemplate(null)}>
          <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden max-w-5xl w-full max-h-[95vh] shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 sm:p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{previewTemplate.name}</h3>
              <button onClick={() => setPreviewTemplate(null)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-3 sm:p-4 md:p-6 overflow-auto">
              <div className="w-full max-w-[800px] aspect-[3/4] bg-white shadow-md rounded-lg overflow-hidden">
                <BiodataTemplate templateId={previewTemplate.id} data={getPreviewDataForReligion(previewTemplate.religion)} />
              </div>
            </div>
            <div className="p-4 sm:p-5 border-t border-gray-100">
              <Link
                href={`/create?template=${previewTemplate.id}`}
                className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl text-center font-medium hover:from-pink-700 hover:to-purple-700 transition-all shadow-sm"
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

export default function TemplatesPage() {
  return (
    <Suspense fallback={
      <div className="py-16 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <TemplatesInner />
    </Suspense>
  );
}
