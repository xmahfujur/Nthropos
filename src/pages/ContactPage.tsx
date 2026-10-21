import React, { useState } from 'react';
import { PageId, SiteConfig } from '../types';
import { storageService } from '../services/storageService';
import {
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  MessageSquare
} from 'lucide-react';

interface ContactPageProps {
  config: SiteConfig;
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ config, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    workEmail: '',
    organization: '',
    projectType: 'Generative AI Application',
    budgetRange: '$25,000 – $50,000',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    setTimeout(() => {
      const res = storageService.saveSubmission(formData);
      if (res.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          workEmail: '',
          organization: '',
          projectType: 'Generative AI Application',
          budgetRange: '$25,000 – $50,000',
          message: ''
        });
      } else {
        setFormStatus('error');
        setErrorMessage(res.error || 'Submission failed. Please check inputs.');
      }
    }, 450);
  };

  const faqs = [
    {
      q: 'How does Nthropos structure client & partner engagements?',
      a: 'We offer two primary collaboration models: structured 3–8 week technical sprints for rapid prototype de-risking, and embedded research & engineering retainers for deep multi-quarter architecture buildouts.'
    },
    {
      q: 'Who owns the intellectual property created during an engagement?',
      a: 'All custom models, adapter weights, software codebases, and domain pipelines developed specifically for your organization remain 100% your proprietary intellectual property. We sign mutual NDAs before any technical disclosure.'
    },
    {
      q: 'Do you offer on-premise or air-gapped deployments?',
      a: 'Yes. Our inference engines and hybrid RAG architectures can be deployed entirely within your isolated AWS, GCP, Azure, or bare-metal Kubernetes infrastructure with zero data egress.'
    },
    {
      q: 'Can academic researchers request compute support or collaborate?',
      a: 'Absolutely. We reserve an allocation of cluster compute for visiting research fellows and university partnerships working on verifiable reasoning, attribution, and model evaluation.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-24">
      {/* Header */}
      <section className="max-w-3xl space-y-6">
        <div className="text-xs font-mono text-indigo-400">Inquiries & Partnerships</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Connect with Nthropos Engineering
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Whether you want to explore tailored foundation model integration, audit an existing AI architecture, or scope a custom retrieval system, our senior team is ready to assist.
        </p>
      </section>

      {/* 2-Column: Form & Direct Contact Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#0b0e18] border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2 border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold text-white">Project Inquiry Brief</h2>
            <p className="text-xs text-slate-400">
              Provide as much technical context as possible. We respond to verified work inquiries within 24 hours.
            </p>
          </div>

          {formStatus === 'success' ? (
            <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-semibold text-white">Inquiry Registered</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you. Your brief has been encrypted and recorded in our submission database. A member of our engineering leadership will contact you shortly.
              </p>
              <button
                type="button"
                onClick={() => setFormStatus('idle')}
                className="mt-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Jordan Hayes"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded focus:border-indigo-500 text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded focus:border-indigo-500 text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Precision AI Labs"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded focus:border-indigo-500 text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Primary Area of Inquiry *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded focus:border-indigo-500 text-white"
                  >
                    <option value="Generative AI Application">Generative AI Application</option>
                    <option value="RAG & Knowledge Retrieval">RAG & Knowledge Retrieval</option>
                    <option value="Model Fine-Tuning & Distillation">Model Fine-Tuning & Distillation</option>
                    <option value="Agentic Workflow Automation">Agentic Workflow Automation</option>
                    <option value="Technical Feasibility Audit">Technical Feasibility Audit</option>
                    <option value="Academic Research Fellowship">Academic Research Fellowship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Approximate Budget Target
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded focus:border-indigo-500 text-white"
                >
                  <option value="Exploratory / Discovery (< $25k)">Exploratory / Discovery (&lt; $25k)</option>
                  <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                  <option value="$50,000 – $150,000">$50,000 – $150,000</option>
                  <option value="$150,000+ Enterprise Tier">$150,000+ Enterprise Tier</option>
                  <option value="Grant / Academic Research">Grant / Academic Research</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Project Brief & Technical Specifications *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Summarize the core problem, your current infrastructure or data sources, and desired outcomes..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded focus:border-indigo-500 text-white placeholder-slate-500"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded bg-rose-950/40 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] rounded transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {formStatus === 'submitting' ? (
                  <span>Saving Inquiry...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Info & FAQs */}
        <div className="lg:col-span-5 space-y-8">
          <div className="p-6 rounded-xl bg-[#0a0d15] border border-white/5 space-y-4">
            <h3 className="text-base font-bold text-white">Direct Communication</h3>
            <div className="space-y-3 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400" />
                <a href={`mailto:${config.contactEmail}`} className="hover:text-white transition-colors">
                  {config.contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>{config.primaryLocation}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Response SLA: Within 24 business hours</span>
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Engagement Frequently Asked Questions</h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-[#0a0d15] border border-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-3.5 text-left text-xs font-semibold text-white flex items-center justify-between gap-2 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                        openFaq === idx ? 'rotate-180 text-indigo-400' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="p-3.5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
