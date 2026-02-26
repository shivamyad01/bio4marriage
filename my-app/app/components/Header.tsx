'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Templates', href: '/templates' },
    { name: 'Create Biodata', href: '/create' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = useCallback((href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <svg className="w-8 h-8 text-pink-600" viewBox="0 0 32 32" fill="none">
              <path d="M16 28s-12-7.5-12-16a8 8 0 0116 0 8 8 0 0116 0c0 8.5-12 16-12 16z" fill="currentColor" opacity="0.15"/>
              <path d="M16 28s-12-7.5-12-16a8 8 0 0116 0 8 8 0 0116 0c0 8.5-12 16-12 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Bio4Marriage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="ml-4 flex items-center space-x-3">
              <Link
                href="/login"
                className="text-gray-700 hover:text-pink-600 font-medium px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-pink-600 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-700 transition-colors shadow-sm hover:shadow-md"
              >
                Get Started
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <>
            <div 
              className="lg:hidden fixed inset-0 top-0 bg-black/20 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white shadow-xl z-50 border-t border-gray-100 animate-in slide-in-from-top-2">
              <nav className="flex flex-col p-4 space-y-1 max-h-[calc(100vh-60px)] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-medium py-3 px-4 rounded-lg transition-colors ${
                      isActive(link.href)
                        ? 'text-pink-600 bg-pink-50'
                        : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-gray-100 pt-4 mt-2 space-y-2">
                  <Link
                    href="/login"
                    className="block text-center text-gray-700 hover:text-pink-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block bg-pink-600 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-700 transition-colors text-center"
                  >
                    Get Started Free
                  </Link>
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
