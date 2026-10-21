import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAdmin: () => void;
  announcement?: {
    active: boolean;
    text: string;
    linkPage?: PageId;
  };
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAdmin,
  announcement
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Research', page: 'research' },
    { label: 'Solutions', page: 'solutions' },
    { label: 'Projects', page: 'projects' },
    { label: 'About', page: 'about' }
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Optional Top Announcement Bar */}
      {announcement?.active && (
        <aside
          aria-label="Announcement"
          className="bg-indigo-950/70 border-b border-indigo-500/20 text-indigo-200 text-xs py-2 px-4 text-center font-mono tracking-tight"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span className="text-indigo-400">Notice</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{announcement.text}</span>
            {announcement.linkPage && (
              <button
                onClick={() => handleNavClick(announcement.linkPage!)}
                className="underline underline-offset-2 hover:text-white transition-colors cursor-pointer shrink-0 ml-1"
              >
                Read Paper
              </button>
            )}
          </div>
        </aside>
      )}

      {/* Top Bar following strict 3-Zone Contract */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'glass-nav shadow-lg shadow-black/40 py-3.5'
            : 'bg-[#07090e]/90 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand title & distinct abstract symbol */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded cursor-pointer shrink-0 group"
          >
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 via-indigo-600 to-sky-500 p-[1px] flex items-center justify-center shadow-sm shadow-indigo-500/20">
              <div className="w-full h-full bg-[#07090e] rounded-[5px] flex items-center justify-center group-hover:bg-[#0c101b] transition-colors">
                {/* Abstract geometric N-tensor symbol */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19V5l16 14V5" />
                  <circle cx="4" cy="5" r="1.5" fill="currentColor" />
                  <circle cx="20" cy="19" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
              Nthropos
            </span>
          </button>

          {/* Zone 2: 4-5 single-line clean nav links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
          >
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 relative hover:text-white ${
                  currentPage === item.page
                    ? 'text-white font-semibold'
                    : 'text-slate-400'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('blog')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 relative hover:text-white ${
                currentPage === 'blog'
                  ? 'text-white font-semibold'
                  : 'text-slate-400'
              }`}
            >
              Insights
              {currentPage === 'blog' && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 relative hover:text-white ${
                currentPage === 'careers'
                  ? 'text-white font-semibold'
                  : 'text-slate-400'
              }`}
            >
              Careers
              {currentPage === 'careers' && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action + admin control */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              title="Editorial & Submissions Manager"
              aria-label="Editorial & Submissions Manager"
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white rounded border border-white/5 hover:border-white/20 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Studio</span>
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all rounded-md shadow-sm shadow-indigo-600/30 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Contact Us
            </button>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#07090e] px-6 py-4 animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left text-base font-medium py-2 px-3 rounded-md transition-colors ${
                    currentPage === item.page
                      ? 'bg-indigo-950/60 text-white font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('blog')}
                className={`text-left text-base font-medium py-2 px-3 rounded-md transition-colors ${
                  currentPage === 'blog'
                    ? 'bg-indigo-950/60 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                Insights
              </button>
              <button
                onClick={() => handleNavClick('careers')}
                className={`text-left text-base font-medium py-2 px-3 rounded-md transition-colors ${
                  currentPage === 'careers'
                    ? 'bg-indigo-950/60 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                Careers
              </button>
              <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-left text-xs text-indigo-300 py-2 px-3"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Studio & Inquiries Manager</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
