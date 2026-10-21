import React, { useState } from 'react';
import { PageId, SiteConfig } from '../types';
import { HeroCanvas } from '../components/HeroCanvas';
import { ProjectCardVisual } from '../components/ProjectCardVisual';
import {
  capabilities,
  researchTopics,
  projectConcepts,
  articles
} from '../data/initialData';
import { storageService } from '../services/storageService';
import {
  Sparkles,
  Brain,
  Cpu,
  Workflow,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  ShieldCheck,
  CornerDownRight
} from 'lucide-react';

interface HomePageProps {
  config: SiteConfig;
  onNavigate: (page: PageId, extraId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ config, onNavigate }) => {
  // Contact Form State
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    setTimeout(() => {
      const res = storageService.saveSubmission({
        name: formData.name,
        workEmail: formData.workEmail,
        organization: formData.organization,
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        message: formData.message
      });

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
        setErrorMessage(res.error || 'Submission could not be completed.');
      }
    }, 400);
  };

  const capabilityIcons = {
    Sparkles: <Sparkles className="w-5 h-5 text-indigo-400" />,
    Brain: <Brain className="w-5 h-5 text-sky-400" />,
    Cpu: <Cpu className="w-5 h-5 text-indigo-300" />,
    Workflow: <Workflow className="w-5 h-5 text-cyan-400" />
  };

  return (
    <div className="space-y-32 pb-24">
      {/* =========================================================================
          SECTION A: HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
        {/* Interactive Neural Canvas Background */}
        <HeroCanvas />

        {/* Ambient radial lighting */}
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.15),rgba(7,9,14,0))]"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center z-10 space-y-8">
          {/* Quiet kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400/90 tracking-wide">
            <span>Research & Applied Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Frontier Systems</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] text-balance max-w-4xl mx-auto">
            {config.heroHeadline}
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {config.heroSupportingText}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('projects')}
              className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 text-sm font-medium text-slate-200 hover:text-white bg-[#0e1320] hover:bg-[#151c2e] border border-white/10 rounded-lg transition-all cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Core Trust / Focus Strip */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-t border-white/5 max-w-4xl mx-auto">
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-500">Methodology</span>
              <p className="text-sm font-medium text-slate-200">First-Principles Rigor</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-500">Architecture</span>
              <p className="text-sm font-medium text-slate-200">Hybrid Dense-Sparse RAG</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-500">Execution</span>
              <p className="text-sm font-medium text-slate-200">Deterministic Tool Sandboxes</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-500">Verification</span>
              <p className="text-sm font-medium text-slate-200">Automated Red-Teaming</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: WHAT WE DO (4 Premium Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono text-indigo-400">Core Capabilities</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Transforming Complex Intelligence into Production Reality
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            We bridge mathematical discovery with robust systems engineering to build reliable, high-performance AI applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="p-8 rounded-xl bg-[#0c101a] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-[#141a29] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {capabilityIcons[cap.iconName]}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {cap.shortDesc}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {cap.focusAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-slate-400 font-mono"
                    >
                      {area} {idx < cap.focusAreas.length - 1 ? '·' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                >
                  <span>Explore Technical Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION C: RESEARCH & INNOVATION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono text-indigo-400">Research Agenda</div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Investigating the Frontier of Neural Reasoning
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Our research focuses on foundational constraints: representation stability, multi-hop attribution, and bounded agent state machines.
            </p>
          </div>

          <button
            onClick={() => onNavigate('research')}
            className="px-4 py-2.5 text-xs font-medium text-white bg-[#121624] hover:bg-[#1a2135] border border-white/10 rounded-md transition-colors cursor-pointer shrink-0 flex items-center gap-2"
          >
            <span>Explore All Research Topics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchTopics.slice(0, 6).map((topic, i) => (
            <div
              key={topic.id}
              className="p-6 rounded-lg bg-[#0a0d15] border border-white/5 space-y-4 hover:border-white/15 transition-all"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>0{i + 1}. Investigation</span>
                <span className="text-indigo-400">{topic.status}</span>
              </div>

              <h3 className="text-base font-bold text-white tracking-tight">
                {topic.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {topic.description}
              </p>

              <div className="pt-2 border-t border-white/5 space-y-1.5">
                <span className="text-[11px] font-mono text-slate-500 block">Core Inquiry:</span>
                <p className="text-xs text-slate-300 italic">
                  "{topic.keyQuestions[0]}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION D: FEATURED PROJECTS (Image-led demonstration concepts)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono text-indigo-400">Featured Concepts</div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Demonstration Systems & Prototypes
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Interactive architectural concepts highlighting our approaches to retrieval, reasoning analysis, and execution sandboxes.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Launch Concept Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectConcepts.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onNavigate('projects', proj.id)}
              className="group p-6 rounded-xl bg-[#0b0f19] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 space-y-5 cursor-pointer"
            >
              {/* Technical vector visual */}
              <ProjectCardVisual type={proj.visualType} title={proj.title} />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>{proj.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-indigo-400">{proj.tag}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {proj.shortDescription}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                <span className="text-slate-500 font-mono">Status: Demonstration Prototype</span>
                <span className="text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Inspect Architecture</span>
                  <CornerDownRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION E: OUR APPROACH (Horizontal Desktop / Vertical Mobile Timeline)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono text-indigo-400">Engineering Philosophy</div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Our Approach to AI Development
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            We de-risk probabilistic systems through structured validation, reproducible experiments, and bounded execution guards.
          </p>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div
            className="hidden md:block absolute top-7 left-12 right-12 h-[1px] bg-white/10 z-0"
            aria-hidden="true"
          />

          {[
            {
              num: '01',
              title: 'Understand the Problem',
              desc: 'Identify user needs, technical constraints, data provenance, and measurable business objectives.'
            },
            {
              num: '02',
              title: 'Research & Experiment',
              desc: 'Evaluate candidate models, dense/sparse retrieval schemas, token budgets, and loss formulations.'
            },
            {
              num: '03',
              title: 'Build & Evaluate',
              desc: 'Develop modular prototypes, run automated red-teaming harnesses, and measure inter-rater calibration.'
            },
            {
              num: '04',
              title: 'Deploy & Improve',
              desc: 'Deliver production gateways with semantic caching, real-time telemetry, and continuous feedback loops.'
            }
          ].map((step, idx) => (
            <div
              key={idx}
              className="relative z-10 p-6 rounded-lg bg-[#0b0e18] border border-white/5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#121726] border border-indigo-500/40 text-indigo-300 font-mono text-xs flex items-center justify-center font-bold shadow-sm">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500">
                Phase {idx + 1} Milestone
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION F: VISION SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden rounded-2xl max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative p-10 sm:p-16 rounded-2xl bg-gradient-to-b from-[#0f1424] to-[#07090e] border border-indigo-500/20 text-center space-y-6">
          <div className="text-xs font-mono text-indigo-400">Guiding Principle</div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto text-balance">
            “Intelligence should move ideas forward.”
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {config.vision}
          </p>

          <div className="pt-4">
            <button
              onClick={() => onNavigate('about')}
              className="px-5 py-2.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Learn About Our Principles & Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION G: LATEST INSIGHTS (Editorial Publications)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono text-indigo-400">Publications & Notes</div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Research & Engineering Insights
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Analytical essays, architecture breakdowns, and empirical field notes from our research explorations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Insights ({articles.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((art) => (
            <article
              key={art.id}
              onClick={() => onNavigate('blog', art.id)}
              className="p-6 rounded-lg bg-[#0a0d15] border border-white/5 hover:border-white/15 transition-all space-y-4 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span>{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-indigo-400 font-medium">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION H: CONTACT CTA & INQUIRY FORM
          ========================================================================= */}
      <section id="contact-section" className="max-w-4xl mx-auto px-6">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-8">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="text-xs font-mono text-indigo-400">Collaborate</div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Have an ambitious idea? Let's build it.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Whether you are exploring custom LLM adaptation, enterprise retrieval, or autonomous workflow systems, connect with our engineering team.
            </p>
          </div>

          {formStatus === 'success' ? (
            <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Inquiry Received</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Your project brief has been securely routed to the Nthropos engineering desk. We review inquiries within one business day.
              </p>
              <button
                type="button"
                onClick={() => setFormStatus('idle')}
                className="pt-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5">
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
                    className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded-md focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
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
                    className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded-md focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Apex Health"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded-md focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Type *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded-md focus:outline-none focus:border-indigo-500 text-white"
                  >
                    <option value="Generative AI Application">Generative AI Application</option>
                    <option value="RAG & Knowledge Retrieval">RAG & Knowledge Retrieval</option>
                    <option value="Model Fine-Tuning & Adaptation">Model Fine-Tuning & Adaptation</option>
                    <option value="Autonomous Agent Workflow">Autonomous Agent Workflow</option>
                    <option value="Technical Feasibility Audit">Technical Feasibility Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Estimated Budget (Optional)
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded-md focus:outline-none focus:border-indigo-500 text-white"
                  >
                    <option value="Exploratory / Discovery (< $25k)">Exploratory / Discovery (&lt; $25k)</option>
                    <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                    <option value="$50,000 – $150,000">$50,000 – $150,000</option>
                    <option value="$150,000+ Enterprise">$150,000+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Project Description & Objectives *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline the core problem, existing technical stack, data characteristics, and timeline targets..."
                  className="w-full px-3.5 py-2.5 text-xs bg-[#121624] border border-white/10 rounded-md focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-md bg-rose-950/50 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] rounded-md transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {formStatus === 'submitting' ? (
                  <span>Recording Inquiry...</span>
                ) : (
                  <>
                    <span>Submit Project Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-500 font-mono">
                Submissions are stored securely and encrypted in transit · NDA provided upon request
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
