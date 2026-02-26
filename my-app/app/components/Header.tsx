'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';

const religionLinks = [
  { name: 'Hindu', icon: 'ॐ', href: '/templates?religion=Hindu', color: 'text-orange-600', bg: 'bg-orange-50' },
  { name: 'Muslim', icon: '☪', href: '/templates?religion=Muslim', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Christian', icon: '✝', href: '/templates?religion=Christian', color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Sikh', icon: 'ੴ', href: '/templates?religion=Sikh', color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Buddhist', icon: '☸', href: '/templates?religion=Buddhist', color: 'text-yellow-700', bg: 'bg-yellow-50' },
  { name: 'Jain', icon: '卐', href: '/templates?religion=Jain', color: 'text-red-700', bg: 'bg-red-50' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [religionOpen, setReligionOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setReligionOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsMenuOpen(false); setReligionOpen(false); }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setReligionOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'Create Biodata', href: '/create' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <>
      {/* ── ANNOUNCEMENT BAR ── */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white relative z-50">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium overflow-hidden">
          <span className="shrink-0 animate-pulse">💍</span>
          <span className="truncate">India&apos;s #1 Marriage Biodata Maker — 18+ Premium Templates</span>
          <Link href="/create" className="shrink-0 ml-2 underline underline-offset-2 hover:text-pink-200 transition-colors hidden sm:inline">
            Create Free →
          </Link>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header
        className={`sticky top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.06),0_4px_16px_0_rgba(0,0,0,0.04)] py-2'
            : 'bg-white/95 backdrop-blur-sm py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-700 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-gradient leading-none">
                  Bio4Marriage
                </span>
                <span className="text-[10px] font-medium text-gray-400 tracking-widest uppercase leading-none mt-0.5 hidden sm:block">
                  Biodata Maker
                </span>
              </div>
            </Link>

            {/* ── Desktop Navigation ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.name === 'Templates' ? (
                  <div key={link.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setReligionOpen(!religionOpen)}
                      className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 inline-flex items-center gap-1.5 ${
                        isActive(link.href)
                          ? 'text-pink-700 bg-pink-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                      <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${religionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {religionOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[320px] bg-white rounded-2xl shadow-2xl border border-gray-100/80 py-3 animate-fade-in-down z-50">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100/80 rotate-45" />
                        <Link
                          href="/templates"
                          className="relative flex items-center gap-3 px-4 py-3 mx-2 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all text-sm font-semibold text-gray-900 group/item"
                        >
                          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-lg shadow-md">✦</span>
                          <div>
                            <div>All Templates</div>
                            <div className="text-xs font-normal text-gray-400">Browse all 18+ designs</div>
                          </div>
                          <svg className="w-4 h-4 text-gray-300 ml-auto group-hover/item:text-pink-500 group-hover/item:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                        </Link>
                        <div className="h-px bg-gray-100 mx-4 my-2" />
                        <div className="grid grid-cols-2 gap-1 px-2">
                          {religionLinks.map((r) => (
                            <Link
                              key={r.name}
                              href={r.href}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all text-sm group/item"
                            >
                              <span className={`w-9 h-9 rounded-lg ${r.bg} flex items-center justify-center text-lg ${r.color} group-hover/item:scale-110 transition-transform`}>{r.icon}</span>
                              <div>
                                <div className="font-medium text-gray-800">{r.name}</div>
                                <div className="text-[11px] text-gray-400">3 designs</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-pink-700 bg-pink-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <div className="ml-3 flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-xl text-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/create"
                  className="relative group bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-pink-200/50 hover:shadow-lg hover:shadow-pink-300/50 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Get Started Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </div>
            </nav>

            {/* ── Mobile Hamburger ── */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="/create"
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-sm"
              >
                Create
              </Link>
              <button
                className="relative w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-200 ${isMenuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isMenuOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <div className="w-8 h-8 bg-gradient-to-br from-pink-600 to-purple-700 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <span className="text-lg font-extrabold text-gradient">Bio4Marriage</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 font-medium py-3.5 px-4 rounded-xl transition-all text-base ${
                  isActive(link.href)
                    ? 'text-pink-700 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50 active:bg-gray-100'
                }`}
              >
                <span className="text-lg">
                  {link.name === 'Home' && '🏠'}
                  {link.name === 'Templates' && '🎨'}
                  {link.name === 'Create Biodata' && '✏️'}
                  {link.name === 'Contact' && '📩'}
                </span>
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-3 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-3">Browse by Religion</p>
              <div className="grid grid-cols-2 gap-2">
                {religionLinks.map((r) => (
                  <Link
                    key={r.name}
                    href={r.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2.5 py-3 px-3 rounded-xl ${r.bg} hover:opacity-80 transition-all active:scale-95`}
                  >
                    <span className={`text-xl ${r.color}`}>{r.icon}</span>
                    <span className="font-medium text-gray-800 text-sm">{r.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="border-t border-gray-100 px-4 py-4 space-y-2">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block text-center text-gray-700 hover:text-pink-600 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Sign In
            </Link>
            <Link
              href="/create"
              onClick={() => setIsMenuOpen(false)}
              className="block bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all text-center shadow-lg shadow-pink-200/40"
            >
              Get Started Free →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
