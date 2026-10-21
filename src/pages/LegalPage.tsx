import React, { useState } from 'react';
import { PageId } from '../types';
import { ShieldCheck, FileText, Lock, CheckCircle } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'privacy' | 'terms';
  onNavigate: (page: PageId) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'privacy', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* Tab Switcher */}
      <div className="flex border-b border-white/10 pb-4 gap-4">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'privacy'
              ? 'text-white border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'terms'
              ? 'text-white border-b-2 border-indigo-500'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </button>
      </div>

      {activeTab === 'privacy' ? (
        <section className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <div className="space-y-2">
            <span className="text-xs font-mono text-indigo-400">Legal Document</span>
            <h1 className="text-3xl font-extrabold text-white">Nthropos Privacy Policy</h1>
            <p className="text-xs text-slate-500 font-mono">Last updated: October 2026</p>
          </div>

          <div className="p-4 rounded-lg bg-[#0e1322] border border-indigo-500/20 text-xs text-indigo-200">
            <strong>Key Commitment:</strong> Nthropos operates with zero invasive tracking scripts. We never sell user data, nor do we train public foundation models on proprietary client data or private inquiries.
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
            <p>
              When you submit a project inquiry or career application through our website, we collect your name, work email address, organization name, project specifications, and any files or links provided.
            </p>
            <p>
              We do not utilize third-party advertising tracking pixels or cross-site tracking cookies.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">2. How We Use Collected Information</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
              <li>To evaluate and respond to engineering inquiries and research proposals.</li>
              <li>To assess candidate qualifications for open research fellowships and engineering roles.</li>
              <li>To distribute requested research briefings and analytical publications.</li>
              <li>To detect and prevent spam submissions or abusive bot traffic.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">3. Client Data & Model Isolation</h2>
            <p>
              All proprietary datasets, vector indices, and custom adapter weights generated during client engagements remain strictly isolated. Client data is never commingled into public datasets or utilized for unsupervised pre-training without explicit written consent.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">4. Data Retention & Erasure</h2>
            <p>
              You may request complete erasure of your submitted inquiries or job applications at any time by contacting our privacy desk at <code>privacy@nthropos.ai</code>.
            </p>
          </div>
        </section>
      ) : (
        <section className="space-y-8 text-slate-300 text-sm leading-relaxed">
          <div className="space-y-2">
            <span className="text-xs font-mono text-indigo-400">Legal Document</span>
            <h1 className="text-3xl font-extrabold text-white">Nthropos Terms of Service</h1>
            <p className="text-xs text-slate-500 font-mono">Effective: October 2026</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing the Nthropos website, research documentation, demonstration prototypes, and associated APIs, you agree to comply with and be bound by these Terms of Service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">2. Intellectual Property Rights</h2>
            <p>
              All intellectual property rights in the website, research publications, architecture diagrams, and prototype demonstrations are the exclusive property of Nthropos Inc., unless otherwise attributed under open-source licenses.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">3. Acceptable Use of AI Prototypes & APIs</h2>
            <p>
              Users of Nthropos demonstration sandboxes and APIs agree not to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
              <li>Reverse engineer, decompile, or extract model weights through systematic adversarial extraction queries.</li>
              <li>Deploy autonomous agents generated via our tooling for malicious surveillance, harassment, or unlawful penetration testing.</li>
              <li>Circumvent security boundaries, containerized execution sandboxes, or rate-limiting guards.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">4. Warranty Disclaimer</h2>
            <p>
              Research publications and architectural demonstrations are provided "as is" for experimental and educational evaluation. While we strive for rigorous scientific accuracy, Nthropos makes no express guarantees regarding production suitability of unreleased prototypes.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};
