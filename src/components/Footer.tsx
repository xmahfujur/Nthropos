import React, { useState } from 'react';
import { PageId, SiteConfig } from '../types';
import { storageService } from '../services/storageService';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface FooterProps {
  config: SiteConfig;
  onNavigate: (page: PageId) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onNavigate, onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [newsState, setNewsState] = useState<{
    status: 'idle' | 'success' | 'error';
    msg: string;
  }>({ status: 'idle', msg: '' });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const result = storageService.subscribeNewsletter(email);
    if (result.success) {
      setNewsState({ status: 'success', msg: result.message });
      setEmail('');
    } else {
      setNewsState({ status: 'error', msg: result.message });
    }
  };

  const handleNav = (p: PageId) => {
    onNavigate(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#06070a] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand & Briefing column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M4 19V5l16 14V5" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {config.companyName}
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An AI research and engineering company exploring the frontier of intelligent
              systems, generative AI, and practical AI engineering.
            </p>

            {/* Newsletter briefing */}
            <div className="pt-2">
              <span className="block text-xs font-mono text-slate-400 mb-2">
                Research Briefings & Updates
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full px-3 py-2 text-xs bg-[#0c101a] border border-white/10 rounded focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-xs font-medium bg-white text-slate-900 rounded hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
              {newsState.status === 'success' && (
                <p className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{newsState.msg}</span>
                </p>
              )}
              {newsState.status === 'error' && (
                <p className="flex items-center gap-1.5 text-xs text-rose-400 mt-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{newsState.msg}</span>
                </p>
              )}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-slate-300 font-medium">Architecture</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('research')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Research
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solutions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Products & Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Project Demonstrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Research Insights
                </button>
              </li>
            </ul>
          </div>

          {/* Organization Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-slate-300 font-medium">Organization</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Nthropos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('careers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers & Fellowships
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-indigo-400 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Team Studio & Submissions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-slate-300 font-medium">Network</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={config.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={config.socials.huggingface}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition-colors"
                >
                  Hugging Face Models
                </a>
              </li>
              <li>
                <a
                  href={config.socials.x}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition-colors"
                >
                  X / Research Logs
                </a>
              </li>
              <li>
                <a
                  href={config.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li className="pt-2 text-slate-500 font-mono text-[11px]">
                {config.contactEmail}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Nthropos Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-slate-600">
              {config.primaryLocation}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
