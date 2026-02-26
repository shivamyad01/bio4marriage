'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { templates, religions } from './lib/templates';
import { TemplatePreview } from './lib/templateRenderers';

/* ─── Static data ─── */

const religionIcons: Record<string, string> = {
  Hindu: 'ॐ',
  Muslim: '☪',
  Christian: '✝',
  Sikh: 'ੴ',
  Buddhist: '☸',
  Jain: '卐',
};

const religionColors: Record<string, string> = {
  Hindu: 'from-orange-500 to-red-500',
  Muslim: 'from-emerald-500 to-teal-500',
  Christian: 'from-blue-500 to-indigo-500',
  Sikh: 'from-amber-500 to-orange-500',
  Buddhist: 'from-yellow-500 to-amber-500',
  Jain: 'from-red-500 to-rose-500',
};

const religionDescriptions: Record<string, string> = {
  Hindu: 'Traditional & modern designs with ॐ motifs, mandalas, and sacred patterns.',
  Muslim: 'Elegant Islamic patterns with crescent moon, geometric art, and calligraphy.',
  Christian: 'Graceful templates featuring cross symbols, chapel themes, and blessings.',
  Sikh: 'Proud Khalsa-inspired designs with Ek Onkar, Khanda, and Gurdwara elements.',
  Buddhist: 'Serene Bodhi leaf designs with dharma wheel and lotus motifs.',
  Jain: 'Sacred Ahimsa-inspired designs with Navkar mantra and Tirthankara art.',
};

const FeatureIcons = {
  templates: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
  ),
  edit: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/></svg>
  ),
  download: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
  ),
  globe: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>
  ),
  wallet: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg>
  ),
};

const features = [
  {
    title: '18+ Premium Templates',
    description: 'Professionally crafted designs for Hindu, Muslim, Christian, Sikh, Buddhist & Jain traditions.',
    icon: FeatureIcons.templates,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Easy Drag & Fill',
    description: 'Simple step-by-step form — fill your details and watch your biodata come alive instantly.',
    icon: FeatureIcons.edit,
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    title: 'HD PDF Download',
    description: 'Export your finished biodata as a crystal-clear PDF ready to print or share digitally.',
    icon: FeatureIcons.download,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: '100% Secure & Private',
    description: 'Your personal data is never stored or shared. Create with complete peace of mind.',
    icon: FeatureIcons.shield,
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    title: 'All Religions Supported',
    description: 'Dedicated templates for every major Indian religion with culturally appropriate designs.',
    icon: FeatureIcons.globe,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Affordable Pricing',
    description: 'Download any template after a secure, one-time payment — no subscriptions.',
    icon: FeatureIcons.wallet,
    gradient: 'from-teal-500 to-cyan-500',
  },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer, Bangalore',
    religion: 'Hindu',
    content: 'Bio4Marriage helped me create a stunning marriage biodata in minutes. My family was so impressed with the traditional design!',
    rating: 5,
    initials: 'RK',
    color: 'bg-orange-500',
  },
  {
    name: 'Ayesha Khan',
    role: 'Teacher, Hyderabad',
    religion: 'Muslim',
    content: 'The Islamic templates are beautifully designed with authentic calligraphy. Found the perfect match within weeks of sharing!',
    rating: 5,
    initials: 'AK',
    color: 'bg-emerald-500',
  },
  {
    name: 'Priya Sharma',
    role: 'Doctor, Mumbai',
    religion: 'Hindu',
    content: 'Incredibly easy to use. The modern Hindu template was exactly what I was looking for. Recommended to all my friends!',
    rating: 5,
    initials: 'PS',
    color: 'bg-purple-500',
  },
  {
    name: 'Gurpreet Singh',
    role: 'Business Owner, Amritsar',
    religion: 'Sikh',
    content: 'The Khalsa Gold template perfectly represents our culture. Professional quality at an amazing price. Worth every paisa!',
    rating: 5,
    initials: 'GS',
    color: 'bg-amber-500',
  },
  {
    name: 'Maria Joseph',
    role: 'Nurse, Kerala',
    religion: 'Christian',
    content: 'The Chapel Rose template was perfect for my biodata. The whole process took under 10 minutes — truly impressive!',
    rating: 5,
    initials: 'MJ',
    color: 'bg-blue-500',
  },
  {
    name: 'Arun & Meera',
    role: 'Found each other via Bio4Marriage',
    religion: 'Hindu',
    content: 'We both created our biodatas here. The professional presentation made all the difference. Now happily married for 2 years!',
    rating: 5,
    initials: 'AM',
    color: 'bg-pink-500',
  },
];

const faqs = [
  {
    q: 'Is it free to create a marriage biodata?',
    a: 'Yes! You can create, customize, and preview your biodata completely free. You only pay when you want to download the final high-quality PDF without watermark.',
  },
  {
    q: 'How much does it cost to download?',
    a: 'Each biodata download is a small one-time payment. No subscriptions, no hidden fees. Pay securely via Razorpay (UPI, Cards, Net Banking).',
  },
  {
    q: 'Which religions are supported?',
    a: 'We support Hindu, Muslim, Christian, Sikh, Buddhist, and Jain templates — 3 unique designs per religion (Traditional, Modern, and Premium), totaling 18+ templates.',
  },
  {
    q: 'Is my personal information safe?',
    a: 'Absolutely. Your data is processed in your browser and is never stored on our servers. We take privacy very seriously.',
  },
  {
    q: 'Can I edit my biodata after downloading?',
    a: 'You can come back anytime, re-enter your details, and create a new biodata. Each download is a fresh, high-quality PDF.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major payment methods through Razorpay — UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and wallets.',
  },
];

const StatIcons = {
  doc: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>,
  heart: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>,
  grid: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  users: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/></svg>,
  star: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"/></svg>,
  bolt: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
};

const stats = [
  { label: 'Biodatas Created', value: '50,000+', icon: StatIcons.doc },
  { label: 'Happy Couples', value: '10,000+', icon: StatIcons.heart },
  { label: 'Templates', value: '18+', icon: StatIcons.grid },
  { label: 'Religions', value: '6', icon: StatIcons.users },
  { label: 'User Rating', value: '4.9★', icon: StatIcons.star },
  { label: 'Download', value: 'Instant', icon: StatIcons.bolt },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedReligion, setSelectedReligion] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const popularTemplates = useMemo(
    () => templates.filter((t) => t.popular),
    []
  );

  const visibleTemplates = useMemo(
    () =>
      selectedReligion === 'All'
        ? popularTemplates
        : popularTemplates.filter((t) => t.religion === selectedReligion),
    [popularTemplates, selectedReligion]
  );

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 4000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <div className="min-h-screen">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_#fdf2f8_0%,_#faf5ff_30%,_#eef2ff_60%,_#ffffff_100%)]">
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-200/40 to-purple-200/30 blur-3xl animate-float" />
          <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-200/30 to-blue-200/20 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-pink-100/30 blur-3xl animate-float" style={{ animationDelay: '5s' }} />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="lg:w-[55%] animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md text-pink-700 text-sm font-semibold px-5 py-2 rounded-full mb-8 shadow-sm border border-pink-100/60">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Trusted by 10,000+ Couples Across India
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Create Your Perfect
                <span className="block text-gradient mt-1">Marriage Biodata</span>
                <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-gray-500 mt-3">
                  for All Indian Religions
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Design a stunning biodata for <strong className="text-gray-800">Hindu, Muslim, Christian, Sikh, Buddhist &amp; Jain</strong> traditions. 
                18+ premium templates. Download as HD PDF.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/create"
                  className="group relative bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 px-8 sm:px-10 rounded-2xl transition-all duration-300 text-center shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-0.5 text-base sm:text-lg overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Create Your Biodata — Free
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/templates"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 font-semibold py-4 px-8 sm:px-10 rounded-2xl border border-gray-200/80 hover:border-pink-300 transition-all duration-300 text-center text-base sm:text-lg hover:-translate-y-0.5"
                >
                  Browse Templates
                </Link>
              </div>

              {/* Religion Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {religions.map((religion, i) => (
                  <Link
                    key={religion}
                    href={`/templates?religion=${religion}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200/60 text-sm font-medium text-gray-700 hover:border-pink-300 hover:text-pink-700 hover:bg-pink-50/50 transition-all shadow-sm hover:shadow"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="text-base">{religionIcons[religion]}</span>
                    {religion}
                  </Link>
                ))}
              </div>

              {/* Trust Stats Row */}
              <div className="grid grid-cols-3 gap-3 max-w-sm">
                {[
                  { val: '50K+', label: 'Biodatas Created' },
                  { val: '18+', label: 'Templates' },
                  { val: '4.9★', label: 'User Rating' },
                ].map((s) => (
                  <div key={s.label} className="text-center p-3 glass rounded-2xl">
                    <div className="text-xl sm:text-2xl font-extrabold text-gradient">{s.val}</div>
                    <div className="text-[11px] text-gray-500 mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Template Showcase */}
            <div className="lg:w-[45%] relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative max-w-[380px] mx-auto">
                {/* Main card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10 border border-white/50 aspect-[3/4] animate-float">
                  <TemplatePreview templateId={1} />
                </div>
                {/* Floating side cards */}
                <div className="absolute -bottom-4 -left-8 sm:-left-12 w-[120px] sm:w-[140px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transform -rotate-6 border-4 border-white/90 animate-float" style={{ animationDelay: '1s' }}>
                  <TemplatePreview templateId={4} />
                </div>
                <div className="absolute -top-4 -right-8 sm:-right-12 w-[120px] sm:w-[140px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transform rotate-6 border-4 border-white/90 animate-float" style={{ animationDelay: '2s' }}>
                  <TemplatePreview templateId={7} />
                </div>
                {/* Decorative blobs */}
                <div className="absolute -z-10 w-40 h-40 bg-pink-300/30 rounded-full -bottom-12 -right-12 blur-3xl" />
                <div className="absolute -z-10 w-32 h-32 bg-purple-300/30 rounded-full -top-8 left-8 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <section className="py-6 bg-white border-b border-gray-100/80">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center py-3 sm:py-4 rounded-2xl hover:bg-gray-50/80 transition-colors">
                <div className="flex items-center justify-center text-pink-500 mb-1.5">{stat.icon}</div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ RELIGION-WISE TEMPLATES SHOWCASE ═══════ */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-white via-gray-50/50 to-gray-50" id="templates">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-pink-100/60">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              18+ Premium Designs
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-gray-900 mb-4 leading-tight">
              Marriage Biodata Templates for{' '}
              <span className="text-gradient">Every Religion</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Culturally authentic designs for Hindu, Muslim, Christian, Sikh, Buddhist &amp; Jain communities.
            </p>
          </div>

          {/* Religion filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {['All', ...religions].map((religion) => (
              <button
                key={religion}
                type="button"
                onClick={() => setSelectedReligion(religion)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedReligion === religion
                    ? 'border-pink-500 bg-pink-50 text-pink-900 shadow-md shadow-pink-100'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-pink-300 hover:bg-pink-50/50'
                }`}
              >
                {religion !== 'All' && (
                  <span className="text-base sm:text-lg">{religionIcons[religion]}</span>
                )}
                <span>{religion === 'All' ? '✦ All' : religion}</span>
              </button>
            ))}
          </div>

          {/* Template grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {visibleTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100/80 hover:border-pink-200"
              >
                <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                  <TemplatePreview templateId={template.id} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-end p-4 sm:p-6 gap-2 sm:gap-3">
                    <Link
                      href={`/create?template=${template.id}`}
                      className="w-full bg-white text-pink-600 font-bold py-2.5 sm:py-3 px-4 rounded-xl text-center hover:bg-pink-50 transition-colors shadow-lg text-sm sm:text-base"
                    >
                      Use This Template
                    </Link>
                    <Link
                      href={`/templates?preview=${template.id}`}
                      className="w-full bg-white/20 backdrop-blur text-white font-medium py-2 sm:py-2.5 px-4 rounded-xl text-center hover:bg-white/30 transition-colors border border-white/30 text-sm"
                    >
                      Preview
                    </Link>
                  </div>
                  {/* Religion badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm text-[10px] sm:text-xs font-semibold text-gray-800">
                      <span>{religionIcons[template.religion]}</span>
                      {template.religion}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1">{template.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700">
                      {template.category}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-pink-600">Paid download</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-14">
            <Link
              href="/templates"
              className="inline-flex items-center px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-xl hover:-translate-y-0.5"
            >
              View All 18+ Templates
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ RELIGION-SPECIFIC SHOWCASE SECTION ═══════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-gray-900 mb-4 leading-tight">
              Templates Crafted for Your{' '}
              <span className="text-gradient">Tradition</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Every religion has unique customs — our templates honour them all
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
            {religions.map((religion) => (
              <Link
                key={religion}
                href={`/templates?religion=${religion}`}
                className="group relative bg-white rounded-2xl sm:rounded-3xl border border-gray-100 hover:border-pink-200 p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${religionColors[religion]} opacity-80 group-hover:opacity-100 transition-opacity`} />
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${religionColors[religion]} flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg shrink-0`}>
                    {religionIcons[religion]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
                      {religion} Biodata
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {religionDescriptions[religion]}
                    </p>
                    <div className="mt-2.5 sm:mt-3 flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold text-gray-400">3 templates</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-pink-600">Paid downloads</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {templates
                    .filter((t) => t.religion === religion)
                    .slice(0, 3)
                    .map((t) => (
                      <div key={t.id} className="flex-1 aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden border border-gray-200/60 bg-gray-50 group-hover:border-pink-200 transition-colors">
                        <TemplatePreview templateId={t.id} />
                      </div>
                    ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES SECTION ═══════ */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-purple-100/60">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-gray-900 mb-4 leading-tight">
              Why Bio4Marriage is India&apos;s{' '}
              <span className="text-gradient">#1 Biodata Maker</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Everything you need to create a professional marriage biodata
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-100/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-blue-100/60">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-gray-900 mb-4 leading-tight">
              Create Your Biodata in <span className="text-gradient">3 Easy Steps</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              No design skills needed — just fill and download
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  step: '1',
                  title: 'Choose Template',
                  description: 'Browse 18+ templates across 6 religions. Pick one that matches your style.',
                  icon: <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" /></svg>,
                },
                {
                  step: '2',
                  title: 'Fill Your Details',
                  description: 'Enter personal, education, family & professional info with our easy form.',
                  icon: <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
                },
                {
                  step: '3',
                  title: 'Pay & Download',
                  description: 'Preview your biodata, complete payment, and download the HD PDF instantly.',
                  icon: <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
                },
              ].map((item, index) => (
                <div key={index} className="relative text-center group">
                  {/* Connector */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-pink-300/60 to-purple-300/60 z-0">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-300" />
                    </div>
                  )}
                  <div className="relative z-10">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center mb-5 sm:mb-6 shadow-xl shadow-pink-500/15 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-100 text-pink-700 font-bold text-xs sm:text-sm mb-3">
                      {item.step}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xs mx-auto">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 sm:mt-14">
              <Link
                href="/create"
                className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3.5 sm:py-4 px-8 sm:px-10 rounded-2xl transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-xl hover:-translate-y-0.5 text-base sm:text-lg"
              >
                Start Creating Now — Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview removed per request */}

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-amber-100/60">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-gray-900 mb-4 leading-tight">
              What Our <span className="text-gradient">Happy Users</span> Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Join thousands of couples who created their biodata with Bio4Marriage
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative min-h-[280px] sm:min-h-[320px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 flex flex-col items-center justify-center ${
                    currentTestimonial === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className="glass bg-white/80 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-white/50 max-w-2xl mx-auto text-center">
                    {/* Stars */}
                    <div className="flex justify-center mb-3 sm:mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg sm:text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 italic mb-5 sm:mb-6 leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md`}>
                        {testimonial.initials}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</h4>
                        <p className="text-gray-500 text-xs sm:text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-pink-600 w-8 sm:w-10'
                      : 'bg-gray-300 hover:bg-gray-400 w-2.5 sm:w-3'
                  }`}
                  aria-label={`View testimonial from ${testimonials[index].name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ SECTION ═══════ */}
      <section className="py-14 md:py-20 bg-white" id="faq">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-indigo-100/60">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-gray-900 mb-4 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Everything you need to know about Bio4Marriage
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 overflow-hidden transition-all hover:shadow-sm hover:border-gray-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${openFaq === i ? 'max-h-60' : 'max-h-0'}`}>
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative py-14 sm:py-18 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600" />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        {/* Floating symbols */}
        <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
          <div className="absolute top-8 left-[10%] text-6xl sm:text-8xl animate-float">ॐ</div>
          <div className="absolute top-16 right-[15%] text-5xl sm:text-7xl animate-float" style={{ animationDelay: '2s' }}>☪</div>
          <div className="absolute bottom-8 left-[25%] text-5xl sm:text-7xl animate-float" style={{ animationDelay: '4s' }}>✝</div>
          <div className="absolute bottom-16 right-[20%] text-6xl sm:text-8xl animate-float" style={{ animationDelay: '1s' }}>ੴ</div>
          <div className="absolute top-1/2 left-1/2 text-4xl sm:text-6xl animate-float" style={{ animationDelay: '3s' }}>☸</div>
        </div>

        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 sm:mb-6 leading-tight">
            Ready to Create Your <br className="hidden sm:block" />
            Perfect Marriage Biodata?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Join 50,000+ users. Choose from 18+ templates across 6 religions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center bg-white text-pink-600 hover:bg-gray-50 font-bold py-3.5 sm:py-4 px-8 sm:px-10 rounded-2xl transition-all duration-300 shadow-xl text-base sm:text-lg hover:-translate-y-0.5"
            >
              Create Your Biodata Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center border-2 border-white/40 text-white hover:bg-white/10 font-bold py-3.5 sm:py-4 px-8 sm:px-10 rounded-2xl transition-all duration-300 text-base sm:text-lg"
            >
              Browse All Templates
            </Link>
          </div>
          <p className="mt-6 sm:mt-8 text-xs sm:text-sm opacity-70">
            <svg className="inline-block w-3.5 h-3.5 mr-1 -mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
            Secure payments via Razorpay · No subscription needed · 100% privacy
          </p>
        </div>
      </section>
    </div>
  );
}
