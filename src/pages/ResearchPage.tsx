import React, { useState } from 'react';
import { PageId } from '../types';
import { researchTopics } from '../data/initialData';
import {
  Search,
  Filter,
  ArrowRight,
  BookOpen,
  FlaskConical,
  Binary,
  Layers,
  Sparkles,
  GitBranch
} from 'lucide-react';

interface ResearchPageProps {
  onNavigate: (page: PageId, extraId?: string) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statuses = [
    { label: 'All Investigations', value: 'all' },
    { label: 'Core Discipline', value: 'Core Discipline' },
    { label: 'Active Investigation', value: 'Active Investigation' },
    { label: 'Planned Exploration', value: 'Planned Exploration' }
  ];

  const filteredTopics = researchTopics.filter((t) => {
    const matchesStatus =
      selectedStatus === 'all' || t.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.methods.some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-24">
      {/* Header */}
      <section className="max-w-3xl space-y-6">
        <div className="text-xs font-mono text-indigo-400">Research Program</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Theoretical Rigor for Frontier Intelligence
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          At Nthropos, our research agenda is grounded in first-principles inquiry into neural representations, attribution stability, and formal constraints on autonomous agent behaviors.
        </p>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          We share research hypotheses, exploratory methodologies, and architectural prototypes openly. We believe foundational advances require reproducible empirical methodologies rather than closed marketing claims.
        </p>
      </section>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0c101a] rounded-lg border border-white/5">
          {statuses.map((st) => (
            <button
              key={st.value}
              onClick={() => setSelectedStatus(st.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedStatus === st.value
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter research areas, methods..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#0c101a] border border-white/10 rounded-md focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Topics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTopics.map((topic, idx) => (
          <div
            key={topic.id}
            className="p-8 rounded-xl bg-[#0a0d15] border border-white/5 hover:border-indigo-500/30 transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  Topic 0{idx + 1}
                </span>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded border ${
                    topic.status === 'Core Discipline'
                      ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300'
                      : topic.status === 'Active Investigation'
                      ? 'bg-sky-950/60 border-sky-500/30 text-sky-300'
                      : 'bg-slate-900 border-white/10 text-slate-400'
                  }`}
                >
                  {topic.status}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight">
                {topic.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {topic.description}
              </p>

              {/* Research Inquiries */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-mono text-indigo-400 block font-medium">
                  Primary Research Questions:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {topic.keyQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">·</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Empirical Methods */}
              <div className="pt-3 border-t border-white/5">
                <span className="text-[11px] font-mono text-slate-500 block mb-2">
                  Experimental Methods & Paradigms:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400 font-mono">
                  {topic.methods.map((m, i) => (
                    <span key={i} className="text-slate-300">
                      {m}{i < topic.methods.length - 1 ? ' / ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs border-t border-white/5">
              <span className="text-slate-500 font-mono">Open Hypothesis</span>
              <button
                onClick={() => onNavigate('contact')}
                className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Propose Collaboration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Reproducibility Ethos Section */}
      <section className="p-10 rounded-2xl bg-[#0d121e] border border-white/10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-mono text-indigo-400">Reproducibility Commitment</div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Our Empirical Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We adhere to rigorous methodological guidelines designed to eliminate metric inflation and test-set contamination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-lg bg-[#07090e] border border-white/5 space-y-2">
            <FlaskConical className="w-5 h-5 text-indigo-400 mb-2" />
            <h3 className="text-sm font-semibold text-white">Blind Evaluation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All baseline comparative evaluations are performed with randomized model IDs to prevent judge model alignment bias.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#07090e] border border-white/5 space-y-2">
            <Binary className="w-5 h-5 text-sky-400 mb-2" />
            <h3 className="text-sm font-semibold text-white">Full Seed Reporting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We publish standard deviations across a minimum of 5 distinct random seeds for all sampling and adaptation runs.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#07090e] border border-white/5 space-y-2">
            <GitBranch className="w-5 h-5 text-emerald-400 mb-2" />
            <h3 className="text-sm font-semibold text-white">Contamination Probes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Targeted n-gram and semantic similarity audits are executed against all public training corpora before reporting benchmarks.
            </p>
          </div>
        </div>
      </section>

      {/* Research Fellowship Banner */}
      <section className="p-8 sm:p-12 rounded-xl bg-gradient-to-r from-indigo-950/30 to-sky-950/20 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-mono text-indigo-400">Visiting Fellows & Academic Partners</span>
          <h3 className="text-xl font-bold text-white">
            Have a research proposal in neural reasoning or inference efficiency?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            We provide compute grants and technical mentorship to researchers tackling foundational problems.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors cursor-pointer shrink-0"
        >
          Submit Research Inquiries
        </button>
      </section>
    </div>
  );
};
